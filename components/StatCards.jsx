"use client";

function Card({ label, value, tone }) {
  const toneClass = {
    hi: "text-ink-hi",
    warn: "text-signal-warn",
    crit: "text-signal-crit",
    info: "text-signal-info",
  }[tone || "hi"];

  return (
    <div className="flex-1 min-w-[140px] rounded-lg border border-line bg-base-900 px-4 py-3 shadow-panel">
      <div className="text-xs uppercase tracking-wider text-ink-lo font-body">{label}</div>
      <div className={`font-mono text-3xl font-medium mt-1 ${toneClass}`}>{value}</div>
    </div>
  );
}

export default function StatCards({ totals }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Card label="Tickets abiertos" value={totals.open} tone="hi" />
      <Card label="Fuera de SLA" value={totals.breach} tone="crit" />
      <Card label="Por vencer" value={totals.warn} tone="warn" />
      <Card label="Total histórico visible" value={totals.total} tone="info" />
    </div>
  );
}
