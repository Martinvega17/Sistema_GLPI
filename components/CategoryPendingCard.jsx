"use client";

import Link from "next/link";
import RelativeTime from "./RelativeTime";

const PRIORITY_ORDER = [1, 2, 3, 4, 5, 6];
const PRIORITY_LABEL = { 1: "Muy baja", 2: "Baja", 3: "Media", 4: "Alta", 5: "Muy alta", 6: "Mayor" };
// Media o menor -> tono info (azul); Alta o mayor -> tono warn (naranja),
// igual que el resto del dashboard usa para marcar urgencia.
const PRIORITY_COLOR = (id) => (id >= 4 ? "bg-signal-warn" : "bg-signal-info");
const PRIORITY_DOT = (id) => (id >= 4 ? "bg-signal-warn" : "bg-signal-info");

const ACCENT_BORDER = {
  green: "border-signal-ok",
  blue: "border-signal-info",
  purple: "border-[#B285F0]",
  amber: "border-amber-400",
  pink: "border-pink-400",
  cyan: "border-cyan-400",
  rose: "border-rose-400",
};
const ACCENT_ICON_BG = {
  green: "bg-signal-ok/15 text-signal-ok",
  blue: "bg-signal-info/15 text-signal-info",
  purple: "bg-[#B285F0]/15 text-[#B285F0]",
  amber: "bg-amber-400/15 text-amber-400",
  pink: "bg-pink-400/15 text-pink-400",
  cyan: "bg-cyan-400/15 text-cyan-400",
  rose: "bg-rose-400/15 text-rose-400",
};
const ACCENT_BUTTON = {
  green: "bg-signal-ok text-base-950 hover:opacity-90",
  blue: "bg-signal-info text-base-950 hover:opacity-90",
  purple: "bg-[#B285F0] text-base-950 hover:opacity-90",
  amber: "bg-amber-400 text-base-950 hover:opacity-90",
  pink: "bg-pink-400 text-base-950 hover:opacity-90",
  cyan: "bg-cyan-400 text-base-950 hover:opacity-90",
  rose: "bg-rose-400 text-base-950 hover:opacity-90",
};

function latestDate(tickets) {
  let best = null;
  for (const t of tickets) {
    const d = t.dateModified || t.dateCreated;
    if (!d) continue;
    if (!best || d > best) best = d;
  }
  return best;
}

export default function CategoryPendingCard({ category, tickets, systems }) {
  const open = tickets.filter((t) => t.isOpen);
  const total = open.length;

  const byPriority = PRIORITY_ORDER.map((id) => ({
    id,
    label: PRIORITY_LABEL[id],
    count: open.filter((t) => t.priorityId === id).length,
  })).filter((p) => p.count > 0);

  const lastResponse = latestDate(tickets);

  const isMultiSystem = systems.length > 1;

  return (
    <div className={`rounded-lg border-t-2 ${ACCENT_BORDER[category.accent]} border-line bg-base-900 shadow-panel p-5 flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`h-9 w-9 rounded-md flex items-center justify-center font-display font-bold text-sm ${ACCENT_ICON_BG[category.accent]}`}>
            {category.label.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="font-display font-semibold text-ink-hi">Pendientes {category.label}</div>
            <div className="text-xs text-ink-mid font-body">{category.description}</div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-display font-bold text-2xl text-ink-hi leading-none">{total}</div>
          <div className="text-[10px] uppercase tracking-wider text-ink-lo font-body">pendientes</div>
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-ink-lo font-body mb-1">Por prioridad</div>
        <div className="h-1.5 rounded-full bg-base-700 overflow-hidden flex mb-2">
          {total === 0 ? (
            <div className="h-full w-full bg-base-700" />
          ) : (
            byPriority.map((p) => (
              <div
                key={p.id}
                className={PRIORITY_COLOR(p.id)}
                style={{ width: `${(p.count / total) * 100}%` }}
              />
            ))
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {byPriority.length === 0 && <span className="text-xs text-ink-lo font-body">Sin pendientes</span>}
          {byPriority.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1.5 text-xs text-ink-mid font-body">
              <span className={`h-2 w-2 rounded-full ${PRIORITY_DOT(p.id)}`} />
              {p.label} <span className="text-ink-hi font-semibold">{p.count}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-line bg-base-800 px-3 py-2 flex items-center gap-2">
        <span className="text-signal-info">⏱</span>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-ink-lo font-body">Última respuesta</div>
          <div className="text-sm text-ink-hi font-body">
            <RelativeTime iso={lastResponse} />
          </div>
          {lastResponse && (
            <div className="text-[11px] text-ink-lo font-mono">
              {new Date(lastResponse.replace(" ", "T")).toLocaleString("es-MX")}
            </div>
          )}
        </div>
      </div>

      {isMultiSystem && (
        <div className="flex flex-wrap gap-2">
          {systems.map((s) => {
            const count = open.filter((t) => t.systemId === s.id).length;
            return (
              <span
                key={s.id}
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-base-800 px-2 py-1 text-xs font-body text-ink-mid"
              >
                {s.label}
                <span className="rounded bg-[#B285F0]/20 text-[#B285F0] px-1.5 font-mono">{count}</span>
              </span>
            );
          })}
        </div>
      )}

      <Link
        href={`/proyecto/${category.id}`}
        className={`mt-auto text-center rounded-md px-3 py-2 text-sm font-display font-semibold transition-opacity ${ACCENT_BUTTON[category.accent]}`}
      >
        Ver pendientes {category.label} →
      </Link>
    </div>
  );
}
