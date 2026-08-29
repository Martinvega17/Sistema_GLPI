import { NextResponse } from "next/server";
import { fetchAllSystemResults } from "@/lib/ticketSource";
import { summarize } from "@/lib/sla";

export const dynamic = "force-dynamic";

// Este endpoint está pensado para que un cron externo lo invoque cada
// pocos minutos (ver README, sección "Alertas programadas"). Si se define
// ALERT_WEBHOOK_URL, manda un resumen a Slack/Discord/Teams (formato
// compatible con webhooks de "incoming webhook" que aceptan { text }).
export async function GET() {
  const results = await fetchAllSystemResults();

  const allTickets = results.flatMap((r) => r.tickets);
  const { tickets, totals } = summarize(allTickets);

  const critical = tickets.filter((t) => t.slaStatus === "breach");
  const warning = tickets.filter((t) => t.slaStatus === "warn");

  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  let webhookSent = false;

  if (webhookUrl && critical.length > 0) {
    const lines = critical
      .slice(0, 15)
      .map(
        (t) =>
          `• [${t.systemLabel}] #${t.rawId} "${t.title}" — ${t.priority}, abierto hace ${Math.round(
            t.ageHours
          )}h (límite ${t.slaHoursLimit}h)`
      )
      .join("\n");

    const body = {
      text: `🔴 *${critical.length} ticket(s) fuera de SLA* en los sistemas GLPI (${totals.open} abiertos en total)\n${lines}`,
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      webhookSent = true;
    } catch {
      webhookSent = false;
    }
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    totals,
    criticalCount: critical.length,
    warningCount: warning.length,
    critical,
    warning,
    webhookSent,
  });
}
