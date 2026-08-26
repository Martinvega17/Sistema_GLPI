import { NextResponse } from "next/server";
import { SYSTEMS, DEMO_MODE } from "@/lib/systems";
import { fetchTicketsForSystem } from "@/lib/glpiClient";
import { getDemoResults } from "@/lib/demoData";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic"; // nunca cachear: esto es lo que da el "tiempo real"

export async function GET() {
  const results = DEMO_MODE
    ? getDemoResults()
    : await Promise.all(SYSTEMS.map((s) => fetchTicketsForSystem(s)));

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
