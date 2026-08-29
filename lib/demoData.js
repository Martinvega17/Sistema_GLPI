import { SYSTEMS } from "./systems";

function hoursAgoIso(h) {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
}

// "frH" = horas que tardó mesa en dar la primera respuesta/escalar el
// ticket, contadas desde su creación. null = todavía sin primera
// respuesta (el ticket es más nuevo que ese tiempo simulado).
const DEMO_TEMPLATES = [
  { title: "No enciende switch de laboratorio", priorityId: 6, statusId: 2, ageH: 6, frH: 0.5 },
  { title: "Correo institucional no sincroniza", priorityId: 4, statusId: 1, ageH: 30, frH: 3 },
  { title: "Impresora sin tóner - control escolar", priorityId: 2, statusId: 4, ageH: 40, frH: 8 },
  { title: "VPN caída para acceso remoto", priorityId: 5, statusId: 2, ageH: 9, frH: null },
  { title: "Solicitud de alta de usuario", priorityId: 1, statusId: 1, ageH: 12, frH: 1 },
  { title: "Proyector de aula 4 sin señal", priorityId: 3, statusId: 3, ageH: 50, frH: 20 },
  { title: "Sistema de becas no carga", priorityId: 5, statusId: 1, ageH: 7, frH: 0.2 },
  { title: "Renovación de certificado SSL", priorityId: 4, statusId: 4, ageH: 26, frH: 2 },
];

// Construye el resultado de ejemplo para UN sistema (recibe el objeto del
// sistema, igual que fetchTicketsForSystem — así ticketSource.js lo puede
// usar como reemplazo directo cuando isSystemDemo(system) es true).
// "index" es la posición dentro de SYSTEMS, solo para variar un poco qué
// tickets de ejemplo le tocan a cada sistema; si no se conoce (sistema
// suelto, p. ej. IMSS en modo demo forzado), usa 0.
export function buildDemoResultForSystem(system, index = 0) {
  const tickets = DEMO_TEMPLATES.filter(
    (_, i) => (i + index) % DEMO_TEMPLATES.length !== DEMO_TEMPLATES.length - 1 || index === 0
  ).map((t, i) => ({
    id: `${system.id}-demo-${i}`,
    rawId: 1000 + i,
    systemId: system.id,
    systemLabel: system.label,
    title: t.title,
    statusId: t.statusId,
    status: ["", "Nuevo", "En curso (asignado)", "En curso (planificado)", "En espera", "Resuelto", "Cerrado"][t.statusId],
    priorityId: t.priorityId,
    priority: ["", "Muy baja", "Baja", "Media", "Alta", "Muy alta", "Mayor"][t.priorityId],
    dateCreated: hoursAgoIso(t.ageH),
    dateModified: hoursAgoIso(Math.max(0, t.ageH - 1)),
    // Simulación de "primera respuesta de mesa" para el export de
    // tiempos de respuesta (ver /api/report?metrics=first_response).
    // Solo existe si frH < ageH (si no, el ticket aún no tendría
    // respuesta a esta hora).
    firstResponseAt: t.frH != null && t.ageH > t.frH ? hoursAgoIso(t.ageH - t.frH) : null,
    requester: null,
    content: `Descripción de ejemplo: ${t.title}. Reportado por el usuario, pendiente de revisión técnica.`,
    url: `${system.baseUrl || "https://demo.local"}/front/ticket.form.php?id=${1000 + i}`,
  }));
  return { systemId: system.id, systemLabel: system.label, ok: true, tickets, error: null };
}

// Genera tickets de ejemplo para TODOS los sistemas configurados (uso:
// DEMO_MODE global en /api/tickets).
export function getDemoResults() {
  return SYSTEMS.map((system, sIdx) => buildDemoResultForSystem(system, sIdx));
}

// Detalle de ejemplo (descripción + último seguimiento + área) para cuando
// DEMO_MODE=true, ya que en ese modo no hay un GLPI real al que preguntarle.
export function getDemoTicketDetail(ticket) {
  return {
    ok: true,
    content: ticket?.content || "Descripción de ejemplo no disponible.",
    // Áreas asignadas al TICKET (pueden ser varias, como en GLPI real).
    groupNames: ["Redes y Telecomunicaciones", "Virtualización", "Almacenamiento"],
    lastFollowup: {
      date: hoursAgoIso(1),
      authorName: "Equipo de Soporte (demo)",
      groupNames: ["Redes y Telecomunicaciones", "Virtualización", "Almacenamiento"],
      // Área REAL de la persona que respondió (distinta a las del ticket):
      // así se ve en la plataforma cuando, por ejemplo, alguien de Mesa de
      // Servicios contesta un ticket asignado a varias áreas técnicas.
      authorGroupNames: ["Mesa de Servicios"],
      message: "Seguimiento de ejemplo: se revisó el caso y se está a la espera de más información del usuario.",
      isPrivate: false,
    },
    error: null,
  };
}

// Extras de ejemplo (Personal que atendió, Áreas asignadas, fechas de
// solución/cierre, etc.) para la tabla ampliada por sistema, en DEMO_MODE.
// Determinístico según el rawId, para que no "brinque" en cada refresco.
const DEMO_STAFF = ["María Guadalupe Leyva", "Noé Amable García", "Ingrid Sayuri Aranda", "Fernando José Torres"];
const DEMO_AREAS = ["Almacenamiento", "Monitoreo", "Seguridad", "Redes y Telecomunicaciones"];

export function getDemoTicketExtras(ticket) {
  const seed = Number(ticket?.rawId) || 0;
  const closed = ticket?.statusId === 5 || ticket?.statusId === 6;
  return {
    solvedDate: closed ? hoursAgoIso(4) : null,
    closedDate: ticket?.statusId === 6 ? hoursAgoIso(2) : null,
    solutionText: closed ? `Solución de ejemplo aplicada para: ${ticket?.title || "el ticket"}.` : null,
    assignedStaff: [DEMO_STAFF[seed % DEMO_STAFF.length], DEMO_STAFF[(seed + 1) % DEMO_STAFF.length]],
    groupNames: [DEMO_AREAS[seed % DEMO_AREAS.length]],
    lastFollowupDate: hoursAgoIso(1),
    lastTechFollowupDate: hoursAgoIso(1.5),
    resolvedByName: closed ? DEMO_STAFF[(seed + 2) % DEMO_STAFF.length] : null,
    error: null,
  };
}

