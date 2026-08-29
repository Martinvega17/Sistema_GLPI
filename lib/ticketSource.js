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
const cache = new Map(); // systemId -> { expiresAt, promise }

function fetchSystemResultCached(system, seedIndex) {
  if (isSystemDemo(system)) {
    // Los datos demo son gratis de generar (no hay red de por medio) — no
    // vale la pena cachearlos, y así siempre reflejan el reloj actual.
    return Promise.resolve(buildDemoResultForSystem(system, seedIndex));
  }

  const cached = cache.get(system.id);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise;
  }

  // Se cachea la PROMESA (no el resultado ya resuelto): si dos peticiones
  // llegan casi al mismo tiempo (p. ej. Topbar + la página activa), la
  // segunda reutiliza la misma llamada a GLPI en vuelo en vez de disparar
  // una sesión nueva en paralelo.
  const promise = fetchTicketsForSystem(system);
  cache.set(system.id, { expiresAt: Date.now() + CACHE_TTL_MS, promise });
  // Si falla, no dejamos el error cacheado — la siguiente petición puede
  // reintentar de inmediato en vez de esperar a que expire el TTL.
  promise.catch(() => cache.delete(system.id));
  return promise;
}

// Trae los tickets de TODOS los sistemas configurados, usando datos de
// ejemplo para los sistemas que estén en modo demo (global o forzado, como
// IMSS mientras no tenga credenciales reales) y GLPI real (con caché corto,
// ver arriba) para el resto.
export async function fetchAllSystemResults(systems = SYSTEMS) {
  return Promise.all(systems.map((system, i) => fetchSystemResultCached(system, i)));
}

// Por si algún día se quiere invalidar a mano (p. ej. un botón "Actualizar
// ahora" que ignore el caché) — no se usa todavía, pero queda disponible.
export function invalidateSystemCache(systemId) {
  cache.delete(systemId);
}
