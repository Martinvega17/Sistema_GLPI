import { NextResponse } from "next/server";
import { SYSTEMS, DEMO_MODE } from "@/lib/systems";
import { fetchTicketDetail } from "@/lib/glpiClient";
import { getDemoTicketDetail } from "@/lib/demoData";

export const dynamic = "force-dynamic";

// GET /api/ticket-detail?systemId=unadm&rawId=123
// Se llama solo cuando el usuario selecciona un ticket en el panel (no para
// toda la lista), porque cada llamada implica varias peticiones extra al
// GLPI correspondiente (ticket completo, seguimientos, grupo, autor).
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const systemId = searchParams.get("systemId");
  const rawId = searchParams.get("rawId");

  if (!systemId || !rawId) {
    return NextResponse.json({ error: "Faltan 'systemId' y/o 'rawId'" }, { status: 400 });
  }

  const system = SYSTEMS.find((s) => s.id === systemId);
  if (!system) {
    return NextResponse.json({ error: `Sistema desconocido: ${systemId}` }, { status: 404 });
  }

  if (DEMO_MODE) {
    return NextResponse.json(getDemoTicketDetail({ content: null }));
  }

  const detail = await fetchTicketDetail(system, rawId);
  return NextResponse.json(detail);
}
