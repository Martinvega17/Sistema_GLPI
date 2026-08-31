import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/systems";
import { fetchAllSystemResults } from "@/lib/ticketSource";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic"; // nunca cachear a nivel Next: el TTL corto ya lo maneja lib/ticketSource.js

export async function GET() {
  // fetchAllSystemResults: usa demo por sistema (isSystemDemo — cubre IMSS
  // sin baseUrl) y reutiliza un caché corto en memoria para no volver a
  // autenticar+traer TODO el listado de cada GLPI real en cada poll de 30s.
  const results = await fetchAllSystemResults();

  const allTickets = results.flatMap((r) => r.tickets);
  const errors = results.filter((r) => !r.ok).map((r) => ({ system: r.systemLabel, error: r.error }));

  const { tickets, totals, bySystem } = summarize(allTickets);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    demoMode: DEMO_MODE,
    totals,
    bySystem,
    tickets,
    errors,
  });
}
