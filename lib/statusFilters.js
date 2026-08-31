// Filtros por "estado" del ticket, independientes del filtro de SLA que ya
// existía (Abiertos / Todos / Cerrados / Fuera de SLA / Por vencer). Estos
// usan las categorías tal cual las maneja GLPI en su propio buscador de
// tickets, incluyendo los meta-estados "No resuelto" y "No cerrado":
//   - No resuelto = el ticket todavía no pasa a Resuelto ni Cerrado
//     (Nuevo, En curso asignado/planificado, En espera).
//   - No cerrado = el ticket todavía no pasa a Cerrado, aunque ya esté
//     Resuelto (incluye Nuevo, En curso, En espera y Resuelto).
// Se combinan (AND) con el filtro de sistema y el de SLA existentes.

export const STATUS_FILTER_OPTIONS = [
  ["all", "Todos"],
  ["new", "Nuevo"],
  ["assigned", "Atendiéndose"],
  ["waiting", "En espera"],
  ["resolved", "Resuelto"],
  ["closed", "Cerrado"],
  ["notResolved", "No resuelto"],
  ["notClosed", "No cerrado"],
];

export function matchesStatusFilter(ticket, key) {
  // Number(...) por seguridad: garantiza que las comparaciones estrictas de
  // abajo funcionen aunque statusId llegara como texto en vez de número.
  const s = Number(ticket.statusId);
  switch (key) {
    case "new":
      return s === 1;
    case "assigned":
      // "En curso (asignado)" + "En curso (planificado)" = lo que GLPI
      // suele mostrar junto como "Atendiéndose".
      return s === 2 || s === 3;
    case "waiting":
      return s === 4;
    case "resolved":
      return s === 5;
    case "closed":
      return s === 6;
    case "notResolved":
      return [1, 2, 3, 4].includes(s);
    case "notClosed":
      return s !== 6;
    case "all":
    default:
      return true;
  }
}
