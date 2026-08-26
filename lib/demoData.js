import { SYSTEMS } from "./systems";

function hoursAgoIso(h) {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
}

// Genera tickets de ejemplo con distintas edades/prioridades para que las
// reglas de SLA de lib/sla.js produzcan alertas visibles de inmediato.
export function getDemoResults() {
  const templates = [
    { title: "No enciende switch de laboratorio", priorityId: 6, statusId: 2, ageH: 6 },
    { title: "Correo institucional no sincroniza", priorityId: 4, statusId: 1, ageH: 30 },
    { title: "Impresora sin tóner - control escolar", priorityId: 2, statusId: 4, ageH: 40 },
    { title: "VPN caída para acceso remoto", priorityId: 5, statusId: 2, ageH: 9 },
    { title: "Solicitud de alta de usuario", priorityId: 1, statusId: 1, ageH: 12 },
    { title: "Proyector de aula 4 sin señal", priorityId: 3, statusId: 3, ageH: 50 },
    { title: "Sistema de becas no carga", priorityId: 5, statusId: 1, ageH: 7 },
    { title: "Renovación de certificado SSL", priorityId: 4, statusId: 4, ageH: 26 },
  ];

  return SYSTEMS.map((system, sIdx) => {
    const tickets = templates
      .filter((_, i) => (i + sIdx) % SYSTEMS.length !== SYSTEMS.length - 1 || sIdx === 0)
      .map((t, i) => ({
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
        requester: null,
        content: `Descripción de ejemplo: ${t.title}. Reportado por el usuario, pendiente de revisión técnica.`,
        url: `${system.baseUrl}/front/ticket.form.php?id=${1000 + i}`,
      }));
    return { systemId: system.id, systemLabel: system.label, ok: true, tickets, error: null };
  });
}

// Detalle de ejemplo (descripción + último seguimiento + área) para cuando
// DEMO_MODE=true, ya que en ese modo no hay un GLPI real al que preguntarle.
export function getDemoTicketDetail(ticket) {
  return {
    ok: true,
    content: ticket?.content || "Descripción de ejemplo no disponible.",
    groupNames: ["Soporte Técnico"],
    lastFollowup: {
      date: hoursAgoIso(1),
      authorName: "Equipo de Soporte (demo)",
      groupNames: ["Soporte Técnico"],
      message: "Seguimiento de ejemplo: se revisó el caso y se está a la espera de más información del usuario.",
      isPrivate: false,
    },
    error: null,
  };
}
