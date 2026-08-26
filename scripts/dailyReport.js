// Script independiente para generar/enviar el reporte diario.
// Pensado para correr con `crontab` o `node-cron` en un servidor propio
// (no depende de que Next.js esté corriendo).
//
// Uso:
//   node scripts/dailyReport.js
//
// Variables de entorno relevantes (mismas que .env.local):
//   GLPI_*_URL / GLPI_USER / GLPI_PASSWORD / GLPI_*_APP_TOKEN
//   ALERT_WEBHOOK_URL   -> si está definido, manda el resumen ahí también
//   REPORT_OUT_DIR      -> carpeta donde guardar el CSV (default: ./reports)

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");

// Usamos APP_URL para pedirle el reporte a la propia app Next.js si ya está
// corriendo (más simple que duplicar la lógica de GLPI aquí).
const APP_URL = process.env.APP_URL || "http://localhost:3000";

async function main() {
  const res = await fetch(`${APP_URL}/api/report?format=csv`);
  if (!res.ok) throw new Error(`No se pudo generar el reporte (${res.status})`);
  const csv = await res.text();

  const outDir = process.env.REPORT_OUT_DIR || path.join(__dirname, "..", "reports");
  fs.mkdirSync(outDir, { recursive: true });
  const filename = `reporte-tickets-${new Date().toISOString().slice(0, 10)}.csv`;
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, csv, "utf-8");
  console.log(`Reporte guardado en ${outPath}`);

  const alertsRes = await fetch(`${APP_URL}/api/alerts`);
  const alerts = await alertsRes.json();
  console.log(
    `Resumen: ${alerts.totals.open} abiertos · ${alerts.criticalCount} fuera de SLA · ${alerts.warningCount} por vencer`
  );
  if (alerts.webhookSent) console.log("Notificación enviada al webhook configurado.");
}

main().catch((err) => {
  console.error("Error generando el reporte diario:", err);
  process.exit(1);
});
