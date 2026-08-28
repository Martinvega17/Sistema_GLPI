import { SYSTEMS } from "./systems";

// Agrupación "de negocio" de los sistemas GLPI para el Inicio, el menú
// lateral y las vistas por proyecto. Antes "Proyectos" juntaba varios
// sistemas en una sola tarjeta; ahora cada sistema tiene su propia entrada
// para poder navegar a "Tickets de X" / "Pendientes de X" directamente
// desde el menú, igual que el resto del panel.
export const CATEGORIES = [
  {
    id: "imss",
    label: "IMSS",
    description: "Seguimiento operativo de la mesa IMSS.",
    systemIds: ["imss"],
    accent: "green",
    icon: "🏥",
  },
  {
    id: "cns",
    label: "CNS",
    description: "Atención y control de la operación CNS.",
    systemIds: ["cns"],
    accent: "blue",
    icon: "🛰️",
  },
  {
    id: "secihti",
    label: "SECIHTI",
    description: "Mesa de ayuda del proyecto SECIHTI.",
    systemIds: ["secihti"],
    accent: "amber",
    icon: "🧪",
  },
  {
    id: "prepa",
    label: "Prepa en Línea",
    description: "Mesa de ayuda de Prepa en Línea.",
    systemIds: ["prepa"],
    accent: "pink",
    icon: "🎓",
  },
  {
    id: "unadm",
    label: "UnADM",
    description: "Mesa de ayuda del proyecto UnADM.",
    systemIds: ["unadm"],
    accent: "cyan",
    icon: "🌐",
  },
  {
    id: "mujeres",
    label: "Mujeres",
    description: "Mesa de ayuda del proyecto Mujeres.",
    systemIds: ["mujeres"],
    accent: "rose",
    icon: "♀️",
  },
];

export function getCategory(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId) || null;
}

// Sistemas (objetos completos de lib/systems.js) que pertenecen a una
// categoría, en el mismo orden en que están definidos en SYSTEMS.
export function systemsForCategory(categoryId) {
  const category = getCategory(categoryId);
  if (!category) return [];
  const idSet = new Set(category.systemIds);
  return SYSTEMS.filter((s) => idSet.has(s.id));
}

export function categoryForSystemId(systemId) {
  return CATEGORIES.find((c) => c.systemIds.includes(systemId)) || null;
}
