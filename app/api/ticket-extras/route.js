import { NextResponse } from "next/server";
import { SYSTEMS, isSystemDemo } from "@/lib/systems";
import { fetchTicketExtrasBatch } from "@/lib/glpiClient";
import { getDemoTicketExtras } from "@/lib/demoData";

export const dynamic = "force-dynamic";

// POST /api/ticket-extras  { systemId, rawIds: [123, 124, ...], tickets? }
// Se llama SOLO con los tickets que el usuario ya tiene visibles en pantalla
// (ver components/SystemTicketsView.jsx, carga perezosa con scroll) — nunca
// con el listado completo de un sistema de una sola vez, porque cada ticket
// implica varias peticiones extra al GLPI correspondiente.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { systemId, rawIds, tickets } = body || {};

  if (!systemId || !Array.isArray(rawIds) || rawIds.length === 0) {
    return NextResponse.json({ error: "Faltan 'systemId' y/o 'rawIds' (arreglo no vacío)" }, { status: 400 });
  }

  const system = SYSTEMS.find((s) => s.id === systemId);
  if (!system) {
    return NextResponse.json({ error: `Sistema desconocido: ${systemId}` }, { status: 404 });
  }

  if (isSystemDemo(system)) {
    const byId = {};
    const ticketById = new Map((tickets || []).map((t) => [String(t.rawId), t]));
    for (const rawId of rawIds) {
      byId[rawId] = getDemoTicketExtras(ticketById.get(String(rawId)) || { rawId });
    }
    return NextResponse.json({ extras: byId });
  }

  const extras = await fetchTicketExtrasBatch(system, rawIds);
  return NextResponse.json({ extras });
}
