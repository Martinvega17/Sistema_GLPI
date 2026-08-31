import fs from "fs";
import os from "os";
import path from "path";
import { SYSTEMS, isSystemDemo } from "./systems";
import { fetchTicketsForSystem } from "./glpiClient";
import { buildDemoResultForSystem } from "./demoData";

// Caché corto EN MEMORIA del proceso, por sistema. GLPI usa sesiones (no hay
// "conexión persistente"): cada llamada real cuesta un initSession
// (150–500ms) + traer la lista completa de tickets del sistema (varios
// segundos si son cientos, como CNS). Sin este caché, CADA petición a
// /api/tickets o /api/project-tickets vuelve a pagar ese costo desde cero —
// y eso pasa muy seguido, porque:
//   - el Topbar hace polling de /api/tickets cada 30s en TODAS las páginas
//     (para la campana), no solo en Inicio;
//   - cambiar de página/filtro dentro del mismo proyecto vuelve a pedir el
//     listado completo de ese sistema aunque no haya pasado ni un segundo.
// TTL corto (bastante menor al intervalo de polling de 30s) para que los
// datos no se sientan "viejos", pero absorbe ráfagas de peticiones casi
// simultáneas (Topbar + la página que estás viendo, o varias pestañas).
const CACHE_TTL_MS = 15_000;

// memory: systemId -> { freshUntil, promise, inFlight, lastResult, lastResultAt }
const memory = new Map();

function getEntry(systemId) {
  let e = memory.get(systemId);
  if (!e) {
    e = { freshUntil: 0, promise: null, inFlight: null, lastResult: null, lastResultAt: null };
    memory.set(systemId, e);
  }
  return e;
}

// --- Snapshot en disco ------------------------------------------------
// La caché de arriba vive solo en memoria del proceso: si el proceso se
// reinicia, desaparece, y la primera carga después de eso vuelve a
// autenticar y descargar el historial completo de los 5 GLPI desde cero.
// Este snapshot resuelve eso: guarda el último resultado bueno de cada
// sistema en un archivo, y al arrancar el proceso se puede servir de
// inmediato (marcado "stale") mientras se refresca en segundo plano.
//
// Se usa el directorio temporal del sistema (os.tmpdir()) en vez de una
// carpeta dentro del proyecto: en un servidor propio eso es /tmp (persiste
// mientras el proceso/contenedor no se recree), y en Vercel es la única
// ruta con permiso de escritura dentro de una función serverless — aunque
// ahí NO persiste entre invocaciones frías distintas (cada una puede
// arrancar en una instancia nueva), sí ayuda dentro de instancias "calientes"
// reutilizadas y no rompe nada si el archivo no está: el catch de abajo ya
// contempla que no haya snapshot que servir.
const CACHE_DIR = path.join(os.tmpdir(), "glpi-ops-dashboard-cache");

function diskCachePath(systemId) {
  return path.join(CACHE_DIR, `${systemId}.json`);
}

function readDiskCacheSafe(systemId) {
  try {
    const raw = fs.readFileSync(diskCachePath(systemId), "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.result) return null;
    return parsed; // { result, savedAt }
  } catch {
    // No existe todavía, está corrupto, o no se pudo leer — no es fatal,
    // simplemente no hay snapshot que servir.
    return null;
  }
}

function writeDiskCacheSafe(systemId, result) {
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const payload = JSON.stringify({ result, savedAt: Date.now() });
    const finalPath = diskCachePath(systemId);
    const tmpPath = `${finalPath}.tmp`;
    // Escritura "atómica" (escribir a un temporal y renombrar) para no dejar
    // un archivo a medio escribir si el proceso muere justo en ese momento.
    fs.writeFileSync(tmpPath, payload, "utf8");
    fs.renameSync(tmpPath, finalPath);
  } catch (err) {
    // Si el disco es de solo lectura o no hay permisos, seguimos sin
    // snapshot — no debe tumbar la petición que sí tiene datos frescos.
    console.log(`[ticketSource:${systemId}] no se pudo escribir snapshot en disco: ${err.message}`);
  }
}

function fetchSystemResultCached(system, seedIndex) {
  if (isSystemDemo(system)) {
    // Los datos demo son gratis de generar (no hay red de por medio) — no
    // vale la pena cachearlos, y así siempre reflejan el reloj actual.
    return Promise.resolve(buildDemoResultForSystem(system, seedIndex));
  }

  const entry = getEntry(system.id);

  // 1) Memoria fresca (dentro del TTL de 15s): se devuelve tal cual, sea el
  //    resultado ya resuelto o la llamada en vuelo (dedupe de peticiones
  //    casi simultáneas, p. ej. Topbar + la página activa).
  if (entry.freshUntil > Date.now() && entry.promise) {
    return entry.promise;
  }

  // 2) No hay nada fresco: dispara (o reutiliza, si ya hay una en curso) una
  //    llamada real a GLPI en segundo plano.
  if (!entry.inFlight) {
    entry.inFlight = fetchTicketsForSystem(system)
      .then((result) => {
        entry.lastResult = result;
        entry.lastResultAt = Date.now();
        entry.freshUntil = Date.now() + CACHE_TTL_MS;
        entry.promise = Promise.resolve(result);
        if (result.ok) writeDiskCacheSafe(system.id, result);
        return result;
      })
      .catch((err) => {
        // No dejamos el error cacheado — la siguiente petición puede
        // reintentar de inmediato en vez de esperar a que expire el TTL.
        entry.freshUntil = 0;
        entry.promise = null;
        throw err;
      })
      .finally(() => {
        entry.inFlight = null;
      });
  }

  // 3) Mientras la llamada real sigue en vuelo, respondemos YA con lo mejor
  //    que tengamos servible, marcado como "stale":
  //    a) el último resultado real que este proceso ya trajo;
  //    b) si el proceso acaba de arrancar, el snapshot en disco de la
  //       corrida anterior — esto evita el "Conectando…" largo al reiniciar.
  if (entry.lastResult) {
    return Promise.resolve({ ...entry.lastResult, stale: true, cachedAt: entry.lastResultAt });
  }

  const disk = readDiskCacheSafe(system.id);
  if (disk) {
    entry.lastResult = disk.result;
    entry.lastResultAt = disk.savedAt;
    return Promise.resolve({ ...disk.result, stale: true, cachedAt: disk.savedAt });
  }

  // 4) Primera vez de la vida de este proceso para este sistema (sin
  //    memoria ni snapshot en disco): no queda más remedio que esperar la
  //    llamada real completa.
  return entry.inFlight;
}

// Trae los tickets de TODOS los sistemas indicados, usando datos de ejemplo
// para los sistemas en modo demo (global o forzado, como IMSS) y GLPI real
// (con caché corto + snapshot en disco, ver arriba) para el resto.
export async function fetchAllSystemResults(systems = SYSTEMS) {
  return Promise.all(systems.map((system, i) => fetchSystemResultCached(system, i)));
}

// Por si algún día se quiere invalidar a mano (p. ej. un botón "Actualizar
// ahora" que ignore el caché) — no se usa todavía, pero queda disponible.
export function invalidateSystemCache(systemId) {
  const entry = memory.get(systemId);
  if (entry) {
    entry.freshUntil = 0;
    entry.promise = null;
  }
}
