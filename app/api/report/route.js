import { NextResponse } from "next/server";
import { SYSTEMS, DEMO_MODE } from "@/lib/systems";
import { fetchTicketsForSystem, fetchFirstResponseForTickets } from "@/lib/glpiClient";
import { getDemoResults } from "@/lib/demoData";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic";

// Separador de columnas del CSV. Se usa punto y coma en vez de coma porque
// Excel en configuración regional de México/Latinoamérica (donde el
// separador decimal es la coma) espera ";" como separador de listas al
// abrir un .csv con doble clic; con "," todo el archivo cae en una sola
// columna, como pasó en la captura que compartiste.
const CSV_DELIMITER = ";";

// Escapa un valor para CSV: lo entrecomilla si contiene el separador,
// comillas o saltos de línea, y duplica las comillas internas.
function csvField(value) {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(CSV_DELIMITER) || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(values) {
  return values.map(csvField).join(CSV_DELIMITER);
}

function toCsv(tickets, { includeFirstResponse = false } = {}) {
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
  if (includeFirstResponse) {
    header.push("primera_respuesta_fecha", "primera_respuesta_minutos");
  }

  const rows = tickets.map((t) => {
    const row = [
      t.systemLabel,
      t.rawId,
      t.title || "",
      t.status,
      t.priority,
      t.dateCreated,
      t.dateModified,
      t.ageHours != null ? Math.round(t.ageHours) : "",
      t.slaHoursLimit,
      t.slaStatus,
    ];
    if (includeFirstResponse) {
      row.push(
        t.firstResponseDate || "",
        t.firstResponseHours != null ? Math.round(t.firstResponseHours * 60) : ""
      );
    }
    return csvRow(row);
  });
  // "\ufeff" (BOM) al inicio: le indica a Excel que el archivo es UTF-8,
  // para que acentos y "ñ" se vean bien en vez de aparecer como "Ã³", "Ã±".
  return "\ufeff" + [csvRow(header), ...rows].join("\r\n");
}

// Agrega a cada ticket cuánto tardó mesa en dar la primera
// respuesta/escalación (firstResponseDate / firstResponseHours), medido
// desde la creación del ticket hasta su primer seguimiento (ITILFollowup).
// Como la primera respuesta siempre la da mesa, este mismo dato sirve tanto
// para "cuánto tardan en contestar" como para "cuánto tardan en escalar".
async function attachFirstResponseTimes(tickets) {
  const dateByTicketId = {};

  if (DEMO_MODE) {
    // En modo demo cada ticket ya trae "firstResponseAt" simulado.
    for (const t of tickets) dateByTicketId[t.id] = t.firstResponseAt || null;
  } else {
    const bySystemId = {};
    for (const t of tickets) (bySystemId[t.systemId] ||= []).push(t);

    await Promise.all(
      Object.entries(bySystemId).map(async ([systemId, sysTickets]) => {
        const system = SYSTEMS.find((s) => s.id === systemId);
        if (!system) return;
        const dates = await fetchFirstResponseForTickets(
          system,
          sysTickets.map((t) => t.rawId)
        );
        for (const t of sysTickets) dateByTicketId[t.id] = dates[t.rawId] || null;
      })
    );
  }

  return tickets.map((t) => {
    const firstResponseDate = dateByTicketId[t.id] || null;
    let firstResponseHours = null;
    if (firstResponseDate && t.dateCreated) {
      const created = new Date(t.dateCreated.replace(" ", "T"));
      const responded = new Date(firstResponseDate.replace(" ", "T"));
      if (!Number.isNaN(created.getTime()) && !Number.isNaN(responded.getTime())) {
        firstResponseHours = (responded.getTime() - created.getTime()) / (1000 * 60 * 60);
      }
    }
    return { ...t, firstResponseDate, firstResponseHours };
  });
}

// GET /api/report                    -> resumen en JSON
// GET /api/report?format=csv         -> tickets abiertos en CSV
// GET /api/report?format=csv&scope=all -> todos los tickets (incluye cerrados) en CSV
// GET /api/report?format=csv&metrics=first_response -> agrega cuánto tardó
//   mesa en dar la primera respuesta/escalar cada ticket (columnas
//   primera_respuesta_fecha / primera_respuesta_minutos). No se usa en el
//   dashboard, solo en este export, porque implica una llamada extra por
//   ticket a cada GLPI.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "json";
  const scope = searchParams.get("scope") || "open";
  const includeFirstResponse = searchParams.get("metrics") === "first_response";
  const systemId = searchParams.get("systemId"); // opcional: acota el export a un solo sistema

  const results = DEMO_MODE
    ? getDemoResults()
    : await Promise.all(SYSTEMS.map((s) => fetchTicketsForSystem(s)));

  const allTickets = results.flatMap((r) => r.tickets);
  const { tickets: allEvaluated, totals, bySystem } = summarize(allTickets);
  const tickets = systemId ? allEvaluated.filter((t) => t.systemId === systemId) : allEvaluated;

  if (format === "csv") {
    let scoped = scope === "all" ? tickets : tickets.filter((t) => t.isOpen);
    if (includeFirstResponse) {
      scoped = await attachFirstResponseTimes(scoped);
    }
    const csv = toCsv(scoped, { includeFirstResponse });
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
