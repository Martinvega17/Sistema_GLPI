import { SYSTEMS } from "./systems";

function hoursAgoIso(h) {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
}

const STATUS_LABELS = ["", "Nuevo", "En curso (asignado)", "En curso (planificado)", "En espera", "Resuelto", "Cerrado"];
const PRIORITY_LABELS = ["", "Muy baja", "Baja", "Media", "Alta", "Muy alta", "Mayor"];

const ATTENDERS = ["María Guadalupe Leyva Saavedra", "Noe Amable García", "Fernando José Torres Tóvar"];
const AREAS_POOL = ["Mesa de Servicios", "Almacenamiento", "Monitoreo", "Seguridad", "Redes y Telecomunicaciones", "Virtualización"];

// "frH" = horas que tardó mesa en dar la primera respuesta/escalar el
// ticket, contadas desde su creación. null = todavía sin primera
// respuesta (el ticket es más nuevo que ese tiempo simulado).
const TEMPLATES = [
  { title: "No enciende switch de laboratorio", priorityId: 6, statusId: 2, ageH: 6, frH: 0.5 },
  { title: "Correo institucional no sincroniza", priorityId: 4, statusId: 1, ageH: 30, frH: 3 },
  { title: "Impresora sin tóner - control escolar", priorityId: 2, statusId: 4, ageH: 40, frH: 8 },
  { title: "VPN caída para acceso remoto", priorityId: 5, statusId: 2, ageH: 9, frH: null },
  { title: "Solicitud de alta de usuario", priorityId: 1, statusId: 1, ageH: 12, frH: 1 },
  { title: "Proyector de aula 4 sin señal", priorityId: 3, statusId: 3, ageH: 50, frH: 20 },
  { title: "Sistema de becas no carga", priorityId: 5, statusId: 1, ageH: 7, frH: 0.2 },
  { title: "Renovación de certificado SSL", priorityId: 4, statusId: 4, ageH: 26, frH: 2 },
  { title: "Solicitud de eliminación de VM", priorityId: 3, statusId: 6, ageH: 60, frH: 4 },
];

// Construye los tickets de ejemplo para UN sistema. "seedIndex" solo se usa
// para variar un poco la cantidad de tickets entre sistemas (para que no
// todos muestren exactamente los mismos números en el Inicio).
export function buildDemoResultForSystem(system, seedIndex = 0) {
  const tickets = TEMPLATES
    .filter((_, i) => (i + seedIndex) % 4 !== 0 || seedIndex === 0)
    .map((t, i) => {
      const isSolvedOrClosed = t.statusId >= 5;
      const isClosed = t.statusId === 6;
      const attendedBy = ATTENDERS[(i + seedIndex) % ATTENDERS.length];
      const attendedByAll = [ATTENDERS[(i + seedIndex) % ATTENDERS.length], ATTENDERS[(i + seedIndex + 1) % ATTENDERS.length]];
      const resolvedBy = isSolvedOrClosed ? ATTENDERS[(i + seedIndex + 1) % ATTENDERS.length] : null;
      const areas = [AREAS_POOL[i % AREAS_POOL.length], AREAS_POOL[(i + 2) % AREAS_POOL.length], AREAS_POOL[(i + 4) % AREAS_POOL.length]];

      return {
        id: `${system.id}-demo-${i}`,
        rawId: 1000 + i,
        systemId: system.id,
        systemLabel: system.label,
        title: t.title,
        statusId: t.statusId,
        status: STATUS_LABELS[t.statusId],
        priorityId: t.priorityId,
        priority: PRIORITY_LABELS[t.priorityId],
        dateCreated: hoursAgoIso(t.ageH),
        dateModified: hoursAgoIso(Math.max(0, t.ageH - 1)),
        // Simulación de "primera respuesta de mesa" para el export de
        // tiempos de respuesta (ver /api/report?metrics=first_response).
        // Solo existe si frH < ageH (si no, el ticket aún no tendría
        // respuesta a esta hora).
        firstResponseAt: t.frH != null && t.ageH > t.frH ? hoursAgoIso(t.ageH - t.frH) : null,
        requester: "usuario.demo",
        content: `Descripción de ejemplo: ${t.title}. Reportado por el usuario, pendiente de revisión técnica.`,
        url: `${system.baseUrl || "https://demo.local"}/front/ticket.form.php?id=${1000 + i}`,

        // --- Campos extra para la tabla detallada por proyecto ---
        solution: isSolvedOrClosed
          ? `Se atendió el caso "${t.title}". Se aplicó la solución de ejemplo y se confirmó con el solicitante.`
          : "",
        dateSolved: isSolvedOrClosed ? hoursAgoIso(Math.max(0, t.ageH - 3)) : null,
        dateClosed: isClosed ? hoursAgoIso(Math.max(0, t.ageH - 1)) : null,
        attendedBy,
        attendedByAll,
        resolvedBy,
        areas,
        lastFollowupAt: hoursAgoIso(Math.max(0, t.ageH - 1)),
        lastTechResponseAt: hoursAgoIso(Math.max(0, t.ageH - 1.3)),
      };
    });

  return { systemId: system.id, systemLabel: system.label, ok: true, tickets, error: null };
}

// Genera tickets de ejemplo con distintas edades/prioridades para que las
// reglas de SLA de lib/sla.js produzcan alertas visibles de inmediato, para
// TODOS los sistemas (usado cuando DEMO_MODE=true global).
export function getDemoResults() {
  return SYSTEMS.map((system, sIdx) => buildDemoResultForSystem(system, sIdx));
}

// Detalle de ejemplo (descripción + último seguimiento + área) para cuando
// un sistema está en modo demo (global o forzado, p. ej. IMSS todavía sin
// credenciales reales), ya que en ese caso no hay un GLPI real al que
// preguntarle.
export function getDemoTicketDetail(ticket) {
  return {
    ok: true,
    content: ticket?.content || "Descripción de ejemplo no disponible.",
    // Áreas asignadas al TICKET (pueden ser varias, como en GLPI real).
    groupNames: ticket?.areas || ["Redes y Telecomunicaciones", "Virtualización", "Almacenamiento"],
    lastFollowup: {
      date: ticket?.lastFollowupAt || hoursAgoIso(1),
      authorName: ticket?.attendedBy || "Equipo de Soporte (demo)",
      groupNames: ticket?.areas || ["Redes y Telecomunicaciones", "Virtualización", "Almacenamiento"],
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
