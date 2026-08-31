import { fetchTicketExtrasBatch } from "./glpiClient";

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

// Enriquece una lista de tickets (todos del MISMO sistema) con los campos
// que requieren llamadas extra a GLPI: solución, fecha de solución/cierre,
// personal que atendió/resolvió y áreas.
//
// IMPORTANTE: antes esta función llamaba a fetchTicketDetail() UNA VEZ POR
// TICKET, y esa función abre y cierra su propia sesión de GLPI cada vez —
// con 10 tickets en una página eso eran 10 handshakes de sesión (150–500ms
// cada uno) más sus propias llamadas internas, la causa principal de que
// cambiar de página/filtro tardara 10-15 segundos. Ahora se usa
// fetchTicketExtrasBatch(), que abre UNA sola sesión para TODOS los
// tickets que hagan falta y reutiliza esa sesión internamente.
//
// Devuelve una copia de los tickets con los campos añadidos, en el MISMO
// orden en que llegaron. Los que fallan individualmente no tiran toda la
// operación: quedan con los campos originales (sin los "extra"), y se puede
// reintentar en la siguiente carga (no se cachean los fallos).
export async function enrichTicketsWithDetails(system, tickets) {
  const now = Date.now();
  const enrichedByRawId = new Map();
  const pending = [];

  for (const ticket of tickets) {
    const cached = cache.get(cacheKey(system.id, ticket.rawId));
    if (cached && cached.expiresAt > now) {
      enrichedByRawId.set(ticket.rawId, { ...ticket, ...cached.data });
    } else {
      pending.push(ticket);
    }
  }

  if (pending.length > 0) {
    const extrasById = await fetchTicketExtrasBatch(
      system,
      pending.map((t) => t.rawId)
    );

    for (const ticket of pending) {
      const extras = extrasById[ticket.rawId];
      if (!extras || extras.error) {
        enrichedByRawId.set(ticket.rawId, ticket);
        continue;
      }

      const mapped = {
        solution: extras.solutionText || "",
        dateSolved: ticket.dateSolved || extras.solvedDate || null,
        dateClosed: ticket.dateClosed || extras.closedDate || null,
        attendedBy: extras.assignedStaff?.[0] || null,
        attendedByAll: extras.assignedStaff || [],
        resolvedBy: extras.resolvedByName || null,
        areas: extras.groupNames || [],
        // Subconjunto de "areas" que ya dejó seguimiento público — por si
        // más adelante se quiere pintar un check de "ya respondió" también
        // en esta tabla, igual que en Tickets por sistema.
        respondedAreas: extras.respondedGroupNames || [],
        lastFollowupAt: extras.lastFollowupDate || null,
        lastTechResponseAt: extras.lastTechFollowupDate || null,
        // "Solicitante" resuelto a nombre (o correo, si el nombre no vino
        // por permisos) — antes se quedaba como el ID numérico crudo que
        // trae la lista rápida de tickets.
        requester: extras.requesterDisplay || ticket.requester || null,
      };

      cache.set(cacheKey(system.id, ticket.rawId), { expiresAt: Date.now() + CACHE_TTL_MS, data: mapped });
      enrichedByRawId.set(ticket.rawId, { ...ticket, ...mapped });
    }
  }

  return tickets.map((t) => enrichedByRawId.get(t.rawId) || t);
}
