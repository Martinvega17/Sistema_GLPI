"use client";

const DOT_COLOR = {
  breach: "bg-signal-crit",
  warn: "bg-signal-warn",
  ok: "bg-signal-ok",
  down: "bg-ink-lo",
};

function systemState(sys, errors) {
  const hasError = errors.some((e) => e.system === sys.label);
  if (hasError) return "down";
  if (sys.breach > 0) return "breach";
  if (sys.warn > 0) return "warn";
  return "ok";
}

export default function StatusStrip({ bySystem, errors, activeSystem, onSelectSystem }) {
  const entries = Object.entries(bySystem);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectSystem(null)}
        className={`px-3 py-2 rounded-md border text-sm font-mono transition-colors ${
          activeSystem === null
            ? "border-signal-info bg-slate-100 text-ink-hi"
            : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"
        }`}
      >
        TODOS
      </button>
      {entries.map(([id, sys]) => {
        const state = systemState(sys, errors);
        const isActive = activeSystem === id;
        return (
          <button
            key={id}
            onClick={() => onSelectSystem(id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors ${
              isActive ? "border-signal-info bg-slate-100" : "border-line bg-base-900 hover:bg-slate-100"
            }`}
            title={state === "down" ? "Sin conexión" : `${sys.breach} fuera de SLA · ${sys.warn} por vencer`}
          >
            <span className={`h-2 w-2 rounded-full ${DOT_COLOR[state]} ${state !== "ok" ? "animate-pulse_dot" : ""}`} />
            <span className="font-display font-semibold text-ink-hi">{sys.label}</span>
            <span className="font-mono text-xs text-ink-mid">{sys.open}</span>
          </button>
        );
      })}
    </div>
  );
}
