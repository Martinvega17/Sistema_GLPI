"use client";

import RelativeTime from "./RelativeTime";

export default function SourceSyncGrid({ systems, generatedAt, errors }) {
  const errorLabels = new Set((errors || []).map((e) => e.system));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {systems.map((s) => {
        const hasError = errorLabels.has(s.label);
        return (
          <div
            key={s.id}
            className="flex items-center gap-2 rounded-md border border-line bg-slate-100/60 px-3 py-2"
          >
            <span
              className={`h-2 w-2 rounded-full ${hasError ? "bg-signal-crit" : "bg-signal-ok"} ${
                hasError ? "animate-pulse_dot" : ""
              }`}
            />
            <div>
              <div className="text-sm font-display font-semibold text-ink-hi leading-tight">{s.label}</div>
              <div className="text-[11px] text-ink-mid font-body leading-tight">
                {hasError ? "Sin conexión" : <RelativeTime iso={generatedAt} prefix="Actualizado " />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
