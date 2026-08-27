import { fetchTicketDetail } from "./glpiClient";

// Caché en memoria del proceso (se pierde si el servidor se reinicia — es
// intencional, no queremos persistencia, solo evitar pegarle a GLPI en cada
// clic/refresh de la vista de proyecto). TTL corto: la vista de proyecto no
// necesita estar tan "al segundo" como el Inicio, pero tampoco queremos que
// abrir la tabla haga una llamada por ticket cada vez.
const CACHE_TTL_MS = 60_000;
const cache = new Map(); // key: `${systemId}:${rawId}` -> { expiresAt, data }

function cacheKey(systemId, rawId) {
  return `${systemId}:${rawId}`;
}

// Corre "worker" tareas en paralelo (como mucho "concurrency" a la vez) en
// vez de Promise.all directo sobre TODOS los tickets, que abriría/cerraría
// cientos de sesiones GLPI simultáneas y probablemente tumbaría el rate
// limit (o la sesión) de la instancia.
async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function run() {
    for (;;) {
      const i = cursor;
      cursor += 1;
      if (i >= items.length) return;
      results[i] = await worker(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, run);
  await Promise.all(workers);
  return results;
}

// Enriquece una lista de tickets (todos del MISMO sistema) con los campos
// que requieren llamadas extra a GLPI: solución, fecha de solución/cierre
// (aunque estas últimas dos ya vienen en el ticket normal — se sobreescriben
// solo si vinieran vacías), personal que atendió/resolvió y áreas.
//
// Devuelve una copia de los tickets con los campos añadidos. Los que fallan
// individualmente NO tiran toda la operación: quedan con los campos en null
// y se puede reintentar en la siguiente carga (el caché no guarda errores).
export async function enrichTicketsWithDetails(system, tickets, { concurrency = 4 } = {}) {
  return mapWithConcurrency(tickets, concurrency, async (ticket) => {
    const key = cacheKey(system.id, ticket.rawId);
    const cached = cache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return { ...ticket, ...cached.data };
    }

    const detail = await fetchTicketDetail(system, ticket.rawId);
    if (!detail.ok) {
      // No cacheamos fallas: la próxima carga puede reintentar sin esperar
      // a que expire el TTL normal.
      return ticket;
    }

    const extra = {
      solution: detail.solution || "",
      dateSolved: ticket.dateSolved || detail.dateSolved || null,
      dateClosed: ticket.dateClosed || detail.dateClosed || null,
      attendedBy: detail.attendedBy || null,
      attendedByAll: detail.attendedByAll || [],
      resolvedBy: detail.resolvedBy || null,
      areas: detail.areas || [],
      lastFollowupAt: detail.lastFollowupAt || null,
      lastTechResponseAt: detail.lastTechResponseAt || null,
    };

    cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, data: extra });
    return { ...ticket, ...extra };
  });
}
