import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/systems";
import { fetchAllSystemResults } from "@/lib/ticketSource";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic"; // nunca cachear: esto es lo que da el "tiempo real"

export async function GET() {
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
