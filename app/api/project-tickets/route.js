import { NextResponse } from "next/server";
import { getCategory, systemsForCategory } from "@/lib/categories";
import { isSystemDemo } from "@/lib/systems";
import { fetchAllSystemResults } from "@/lib/ticketSource";
import { enrichTicketsWithDetails } from "@/lib/ticketEnrichment";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic";

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

// GET /api/project-tickets?category=imss|cns|secihti|prepa|unadm|mujeres
//     &page=1&pageSize=10&system=all&estado=all|open|closed&q=texto
//
// La lista "rápida" (folio, título, estado, fecha, solicitante) sí se trae
// completa para poder filtrar y contar bien los tabs de sistema. Pero los
// campos "pesados" que en GLPI real cuestan una llamada extra POR TICKET
// (solución, personal que atendió, áreas, última retro...) solo se piden
// para los tickets de la página que se va a mostrar, no para los 400+ del
// proyecto completo. Esto es lo que hacía lenta la carga: antes se
// enriquecía TODO antes de responder.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");

  const category = getCategory(categoryId);
  if (!category) {
    return NextResponse.json({ error: `Categoría desconocida: ${categoryId}` }, { status: 404 });
  }

  const page = Math.max(1, parseInt(searchParams.get("page"), 10) || 1);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, parseInt(searchParams.get("pageSize"), 10) || DEFAULT_PAGE_SIZE)
  );
  const systemFilter = searchParams.get("system") || "all";
  const statusFilter = searchParams.get("estado") || "all"; // all | open | closed
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const systems = systemsForCategory(categoryId);
  const results = await fetchAllSystemResults(systems);

  const errors = results.filter((r) => !r.ok).map((r) => ({ system: r.systemLabel, error: r.error }));
  const allTickets = results.filter((r) => r.ok).flatMap((r) => r.tickets);

  // "totals"/"bySystem" se calculan sobre TODA la categoría (sin filtrar),
  // para que los contadores de los tabs de sistema y las tarjetas del
  // Inicio no cambien según la página/filtro que se esté viendo.
  const { tickets: evaluated, totals, bySystem } = summarize(allTickets);

  const filtered = evaluated
    .filter((t) => (systemFilter === "all" ? true : t.systemId === systemFilter))
    .filter((t) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "open") return t.isOpen;
      return !t.isOpen;
    })
    .filter((t) => {
      if (!query) return true;
      const haystack = [t.rawId, t.title, t.status, t.requester, t.systemLabel]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    })
    .sort((a, b) => Number(b.rawId) - Number(a.rawId));

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageTickets = filtered.slice(start, start + pageSize);

  // Agrupa los tickets de ESTA página por sistema (una página puede mezclar
  // sistemas cuando el filtro es "Todos") para enriquecerlos en lote por
  // sistema, igual que antes, pero solo ~10 tickets en vez de cientos.
  const ticketsBySystem = new Map();
  for (const t of pageTickets) {
    if (!ticketsBySystem.has(t.systemId)) ticketsBySystem.set(t.systemId, []);
    ticketsBySystem.get(t.systemId).push(t);
  }

  const enrichedGroups = await Promise.all(
    [...ticketsBySystem.entries()].map(async ([systemId, ticketsForSystem]) => {
      const system = systems.find((s) => s.id === systemId);
      if (!system || isSystemDemo(system)) return ticketsForSystem;
      return enrichTicketsWithDetails(system, ticketsForSystem);
    })
  );

  const enrichedById = new Map();
  for (const group of enrichedGroups) {
    for (const t of group) enrichedById.set(t.id, t);
  }
  const pageTicketsEnriched = pageTickets.map((t) => enrichedById.get(t.id) || t);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    category: { id: category.id, label: category.label, description: category.description },
    totals,
    bySystem,
    tickets: pageTicketsEnriched,
    pagination: { page: safePage, pageSize, totalCount, totalPages },
    errors,
  });
}
