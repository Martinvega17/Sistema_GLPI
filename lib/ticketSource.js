import fs from "fs";
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
// - freshUntil/promise: lo de siempre, un resultado (o promesa) que sigue
//   siendo válido dentro del TTL de 15s.
// - lastResult/lastResultAt: el último resultado real que este PROCESO ya
//   obtuvo de GLPI, aunque su TTL ya haya vencido — se usa para responder al
//   instante mientras se refresca en segundo plano (ver más abajo).
const memory = new Map();

function getEntry(systemId) {
  let e = memory.get(systemId);
  if (!e) {
    e = { freshUntil: 0, promise: null, inFlight: null, lastResult: null, lastResultAt: null };
    memory.set(systemId, e);
  }
  return e;
}

// --- Snapshot en DISCO -------------------------------------------------
// La caché de arriba vive solo en memoria del proceso: al pausar/reiniciar
// el servidor desaparece, así que la primera carga después de un reinicio
// siempre tenía que re-autenticar y re-descargar el historial completo de
// los 5 GLPI desde cero (varios segundos por sistema, más si hay VPN de por
// medio). Este snapshot en disco resuelve eso: guarda el último resultado
// bueno de cada sistema en un archivo, y al arrancar el proceso se puede
// servir de inmediato (marcado "stale") mientras se refresca en segundo
// plano contra GLPI real — en vez de dejar a quien esté viendo la app
// esperando el roundtrip completo.
//
// OJO: esto solo ayuda si el disco sobrevive el reinicio (p. ej. pausar y
// reanudar el mismo proceso/contenedor, o reiniciar con PM2/systemd). Si el
// "inicio desde 0" es un contenedor/deploy nuevo con disco efímero, este
// archivo no estará ahí y la primera carga vuelve a ser la real — en ese
// caso lo que hace falta es un disco persistente montado en CACHE_DIR (o
// una caché externa tipo Redis), no un cambio más de código.
const CACHE_DIR = path.join(process.cwd(), ".data", "ticket-cache");

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
  //    llamada real a GLPI en segundo plano. No se espera aquí — quien
  //    llamó a esta función puede recibir algo servible más abajo mientras
  //    esto termina.
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
  //    que tengamos servible, marcado como "stale" para quien quiera
  //    distinguirlo en la UI:
  //    a) el último resultado real que este proceso ya trajo (aunque su TTL
  //       haya vencido) — cubre pestañas/filtros que se recargan seguido;
  //    b) si el proceso acaba de arrancar y no tiene nada en memoria
  //       todavía, el snapshot que quedó guardado en disco de la corrida
  //       anterior — esto es lo que evita el "Conectando…" largo al
  //       reiniciar el servidor.
  if (entry.lastResult) {
    return Promise.resolve({ ...entry.lastResult, stale: true, cachedAt: entry.lastResultAt });
  }

  const disk = readDiskCacheSafe(system.id);
  if (disk) {
    entry.lastResult = disk.result;
    entry.lastResultAt = disk.savedAt;
    return Promise.resolve({ ...disk.result, stale: true, cachedAt: disk.savedAt });
  }

  // 4) Primera vez de la vida de este sistema (sin memoria ni snapshot en
  //    disco): no queda más remedio que esperar la llamada real completa.
  return entry.inFlight;
}

// Trae los tickets de TODOS los sistemas configurados, usando datos de
// ejemplo para los sistemas que estén en modo demo (global o forzado, como
// IMSS mientras no tenga credenciales reales) y GLPI real (con caché corto +
// snapshot en disco, ver arriba) para el resto.
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
