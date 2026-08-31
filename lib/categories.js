import { SYSTEMS } from "./systems";

// Agrupación "de negocio" de los sistemas GLPI para el menú lateral y las
// vistas por proyecto. Cada sistema tiene su propia entrada para poder
// navegar a "Tickets de X" / "Pendientes de X" directamente desde el menú.
export const CATEGORIES = [
  { id: "imss", label: "IMSS", description: "Seguimiento operativo de la mesa IMSS." },
  { id: "cns", label: "CNS", description: "Atención y control de la operación CNS." },
  { id: "secihti", label: "SECIHTI", description: "Mesa de ayuda del proyecto SECIHTI." },
  { id: "prepa", label: "Prepa en Línea", description: "Mesa de ayuda de Prepa en Línea." },
  { id: "unadm", label: "UnADM", description: "Mesa de ayuda del proyecto UnADM." },
  { id: "mujeres", label: "Mujeres", description: "Mesa de ayuda del proyecto Mujeres." },
];

export function getCategory(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId) || null;
}

// Sistemas (objetos completos de lib/systems.js) que pertenecen a una
// categoría. Hoy cada categoría mapea a un único sistema con el mismo id,
// pero se resuelve por búsqueda para poder agrupar varios sistemas bajo
// una misma categoría en el futuro sin tocar el resto del código.
export function systemsForCategory(categoryId) {
  if (!getCategory(categoryId)) return [];
  return SYSTEMS.filter((s) => s.id === categoryId);
}
