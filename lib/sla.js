// Reglas de SLA por prioridad. Ajusta estos umbrales (en horas) a los
// tiempos reales que maneje tu mesa de ayuda. Si en el futuro cada GLPI
// expone su propio campo de SLA (time_to_resolve), se puede sustituir esta
// heurística por ese dato real vía la API (SLA / SlaLevel en GLPI).
//
// Prioridades GLPI: 1 Muy baja, 2 Baja, 3 Media, 4 Alta, 5 Muy alta, 6 Mayor.
//
// Esquema por defecto (CNS, SECIHTI, Mujeres): igual que antes, calendario
// 24/7 (no distingue horario laboral).
const SLA_HOURS_BY_PRIORITY = {
  6: 4, // Mayor
  5: 8, // Muy alta
  4: 24, // Alta
  3: 48, // Media
  2: 96, // Baja
  1: 168, // Muy baja
};

// Esquema especial para Prepa y UnADM. "businessHours: true" indica que el
// tiempo se cuenta solo dentro del horario laboral (ver BUSINESS_HOURS abajo)
// en vez de en horas naturales 24/7.
const CUSTOM_SLA_SYSTEMS = new Set(["prepa", "unadm"]);
const CUSTOM_SLA_HOURS_BY_PRIORITY = {
  4: { hours: 1, businessHours: false }, // Alta: 1h, 24/7
  3: { hours: 2, businessHours: false }, // Media: 2h, 24/7
  2: { hours: 4, businessHours: true }, // Baja: 4h, horario laboral MX
  // Muy baja (1), Muy alta (5) y Mayor (6) no se usan en Prepa/UnADM;
  // si llegaran a aparecer, caen al esquema por defecto (ver getSlaRule).
};

// Horario laboral para el cómputo de SLA en horas laborales: lunes a
// viernes, 9:00 a 18:00, hora de México, excluyendo días festivos oficiales.
const BUSINESS_START_HOUR = 9;
const BUSINESS_END_HOUR = 18;

const OPEN_STATUS_IDS = new Set([1, 2, 3, 4]); // Nuevo, en curso, en espera

function hoursSince(dateStr) {
  if (!dateStr) return null;
  const then = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(then.getTime())) return null;
  return (Date.now() - then.getTime()) / (1000 * 60 * 60);
}

// --- Días festivos oficiales en México (Art. 74 LFT) -----------------------
// Fijos: 1 ene, 1 may, 16 sep, 25 dic.
// Móviles: 1er lunes de febrero, 3er lunes de marzo, 3er lunes de noviembre.
// 1 de diciembre solo es festivo cada 6 años (transmisión del Poder
// Ejecutivo Federal); 2024 fue año de transmisión, por lo que se repite
// cada 6 años a partir de esa fecha.
function nthWeekdayOfMonth(year, monthIndex, weekday, n) {
  const d = new Date(year, monthIndex, 1);
  let count = 0;
  while (d.getMonth() === monthIndex) {
    if (d.getDay() === weekday) {
      count += 1;
      if (count === n) return new Date(d);
    }
    d.setDate(d.getDate() + 1);
  }
  return null;
}

function sameYMD(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function mexicanHolidaysForYear(year) {
  const holidays = [
    new Date(year, 0, 1), // Año nuevo
    nthWeekdayOfMonth(year, 1, 1, 1), // 1er lunes de febrero (Día de la Constitución)
    nthWeekdayOfMonth(year, 2, 1, 3), // 3er lunes de marzo (Natalicio de Benito Juárez)
    new Date(year, 4, 1), // Día del trabajo
    new Date(year, 8, 16), // Día de la Independencia
    nthWeekdayOfMonth(year, 10, 1, 3), // 3er lunes de noviembre (Revolución Mexicana)
    new Date(year, 11, 25), // Navidad
  ];
  if ((year - 2024) % 6 === 0) {
    holidays.push(new Date(year, 11, 1)); // Transmisión del Poder Ejecutivo
  }
  return holidays.filter(Boolean);
}

function isMexicanHoliday(date) {
  const holidays = mexicanHolidaysForYear(date.getFullYear());
  return holidays.some((h) => sameYMD(h, date));
}

function isBusinessDay(date) {
  const day = date.getDay(); // 0 domingo ... 6 sábado
  if (day === 0 || day === 6) return false;
  if (isMexicanHoliday(date)) return false;
  return true;
}

// Calcula las horas laborales transcurridas entre "start" y "end" (o ahora),
// contando solo lunes a viernes de 9:00 a 18:00, excluyendo festivos.
function businessHoursBetween(start, end) {
  if (!(start instanceof Date) || Number.isNaN(start.getTime())) return null;
  const rangeEnd = end instanceof Date && !Number.isNaN(end.getTime()) ? end : new Date();
  if (rangeEnd <= start) return 0;

  let totalMs = 0;
  const cursor = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  while (cursor <= rangeEnd) {
    if (isBusinessDay(cursor)) {
      const dayStart = new Date(cursor);
      dayStart.setHours(BUSINESS_START_HOUR, 0, 0, 0);
      const dayEnd = new Date(cursor);
      dayEnd.setHours(BUSINESS_END_HOUR, 0, 0, 0);

      const windowStart = start > dayStart ? start : dayStart;
      const windowEnd = rangeEnd < dayEnd ? rangeEnd : dayEnd;

      if (windowEnd > windowStart) {
        totalMs += windowEnd.getTime() - windowStart.getTime();
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return totalMs / (1000 * 60 * 60);
}

// Resuelve la regla de SLA (horas límite + si se cuenta en horario laboral)
// para un ticket dado, según su sistema (systemId) y prioridad (priorityId).
function getSlaRule(ticket) {
  if (CUSTOM_SLA_SYSTEMS.has(ticket.systemId)) {
    const rule = CUSTOM_SLA_HOURS_BY_PRIORITY[ticket.priorityId];
    if (rule) return rule;
  }
  return { hours: SLA_HOURS_BY_PRIORITY[ticket.priorityId] ?? 48, businessHours: false };
}

// Devuelve el ticket enriquecido con banderas de SLA:
//   slaHoursLimit, ageHours, slaStatus: "ok" | "warn" | "breach" | "closed"
function evaluateSla(ticket) {
  const rule = getSlaRule(ticket);
  const limit = rule.hours;

  let age;
  if (rule.businessHours) {
    const created = ticket.dateCreated
      ? new Date(ticket.dateCreated.replace(" ", "T"))
      : null;
    age =
      created && !Number.isNaN(created.getTime())
        ? businessHoursBetween(created, new Date())
        : null;
  } else {
    age = hoursSince(ticket.dateCreated);
  }

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

export {
  evaluateSla,
  evaluateAll,
  summarize,
  SLA_HOURS_BY_PRIORITY,
  CUSTOM_SLA_HOURS_BY_PRIORITY,
  CUSTOM_SLA_SYSTEMS,
  businessHoursBetween,
  isMexicanHoliday,
};
