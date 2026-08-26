import { NextResponse } from "next/server";
import { SYSTEMS, DEMO_MODE } from "@/lib/systems";
import { fetchTicketsForSystem } from "@/lib/glpiClient";
import { getDemoResults } from "@/lib/demoData";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic";

function toCsv(tickets) {
  const header = [
    "sistema",
    "id",
    "titulo",
    "estado",
    "prioridad",
    "creado",
    "modificado",
    "horas_abierto",
    "sla_limite_horas",
    "sla_estado",
  ];
  const rows = tickets.map((t) =>
    [
      t.systemLabel,
      t.rawId,
      `"${(t.title || "").replace(/"/g, '""')}"`,
      t.status,
      t.priority,
      t.dateCreated,
      t.dateModified,
      t.ageHours != null ? Math.round(t.ageHours) : "",
      t.slaHoursLimit,
      t.slaStatus,
    ].join(",")
  );
  return [header.join(","), ...rows].join("\n");
}

// GET /api/report                    -> resumen en JSON
// GET /api/report?format=csv         -> tickets abiertos en CSV
// GET /api/report?format=csv&scope=all -> todos los tickets (incluye cerrados) en CSV
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "json";
  const scope = searchParams.get("scope") || "open";

  const results = DEMO_MODE
    ? getDemoResults()
    : await Promise.all(SYSTEMS.map((s) => fetchTicketsForSystem(s)));

  const allTickets = results.flatMap((r) => r.tickets);
  const { tickets, totals, bySystem } = summarize(allTickets);

  if (format === "csv") {
    const csv = toCsv(scope === "all" ? tickets : tickets.filter((t) => t.isOpen));
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="reporte-tickets-${new Date()
          .toISOString()
          .slice(0, 10)}.csv"`,
      },
    });
  }

  const topOverdue = tickets
    .filter((t) => t.slaStatus === "breach")
    .sort((a, b) => (b.ageHours || 0) - (a.ageHours || 0))
    .slice(0, 10);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    periodo: "instantáneo (bajo demanda)",
    totals,
    bySystem,
    topOverdue,
  });
}
