import { SYSTEMS, isSystemDemo } from "./systems";
import { fetchTicketsForSystem } from "./glpiClient";
import { buildDemoResultForSystem } from "./demoData";

// Trae los tickets de TODOS los sistemas configurados, usando datos de
// ejemplo para los sistemas que estén en modo demo (global o forzado, como
// IMSS mientras no tenga credenciales reales) y GLPI real para el resto.
// Esto reemplaza el antiguo "todo o nada" (DEMO_MODE global) por una mezcla
// sistema-por-sistema.
export async function fetchAllSystemResults(systems = SYSTEMS) {
  return Promise.all(
    systems.map((system, i) =>
      isSystemDemo(system)
        ? Promise.resolve(buildDemoResultForSystem(system, i))
        : fetchTicketsForSystem(system)
    )
  );
}
