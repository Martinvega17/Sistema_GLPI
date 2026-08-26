// Reglas de SLA por prioridad. Ajusta estos umbrales (en horas) a los
// tiempos reales que maneje tu mesa de ayuda. Si en el futuro cada GLPI
// expone su propio campo de SLA (time_to_resolve), se puede sustituir esta
// heurística por ese dato real vía la API (SLA / SlaLevel en GLPI).
const SLA_HOURS_BY_PRIORITY = {
  6: 4, // Mayor
  5: 8, // Muy alta
  4: 24, // Alta
  3: 48, // Media
  2: 96, // Baja
  1: 168, // Muy baja
};

const OPEN_STATUS_IDS = new Set([1, 2, 3, 4]); // Nuevo, en curso, en espera

function hoursSince(dateStr) {
  if (!dateStr) return null;
  const then = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(then.getTime())) return null;
  return (Date.now() - then.getTime()) / (1000 * 60 * 60);
}

// Devuelve el ticket enriquecido con banderas de SLA:
//   slaHoursLimit, ageHours, slaStatus: "ok" | "warn" | "breach" | "closed"
function evaluateSla(ticket) {
  const limit = SLA_HOURS_BY_PRIORITY[ticket.priorityId] ?? 48;
  const age = hoursSince(ticket.dateCreated);
  // Number(...) por seguridad: si statusId llegara como texto (no debería,
  // ya se normaliza en glpiClient.js), Set.has() con un número adentro no
  // lo reconocería y el ticket caería siempre en "closed" por defecto.
  const isOpen = OPEN_STATUS_IDS.has(Number(ticket.statusId));

  let slaStatus = "ok";
  if (!isOpen) {
    slaStatus = "closed"; // resuelto o cerrado: ya no aplica SLA
  } else if (age !== null) {
    if (age >= limit) slaStatus = "breach";
    else if (age >= limit * 0.75) slaStatus = "warn";
  }

  return { ...ticket, slaHoursLimit: limit, ageHours: age, slaStatus, isOpen };
}

function evaluateAll(tickets) {
  return tickets.map(evaluateSla);
}

function summarize(tickets) {
  const evaluated = evaluateAll(tickets);
  const bySystem = {};
  for (const t of evaluated) {
    bySystem[t.systemId] = bySystem[t.systemId] || {
      label: t.systemLabel,
      total: 0,
      open: 0,
      breach: 0,
      warn: 0,
    };
    bySystem[t.systemId].total += 1;
    if (t.isOpen) bySystem[t.systemId].open += 1;
    if (t.slaStatus === "breach") bySystem[t.systemId].breach += 1;
    if (t.slaStatus === "warn") bySystem[t.systemId].warn += 1;
  }

  return {
    tickets: evaluated,
    totals: {
      total: evaluated.length,
      open: evaluated.filter((t) => t.isOpen).length,
      breach: evaluated.filter((t) => t.slaStatus === "breach").length,
      warn: evaluated.filter((t) => t.slaStatus === "warn").length,
    },
    bySystem,
  };
}

export { evaluateSla, evaluateAll, summarize, SLA_HOURS_BY_PRIORITY };
