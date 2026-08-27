"use client";

import { useEffect, useState } from "react";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

function relativeTime(dateIso) {
  if (!dateIso) return null;
  const then = new Date(dateIso);
  if (Number.isNaN(then.getTime())) return null;
  const diffS = Math.max(0, Math.round((Date.now() - then.getTime()) / 1000));
  if (diffS < 60) return `hace ${diffS} segundo${diffS === 1 ? "" : "s"}`;
  const diffM = Math.round(diffS / 60);
  if (diffM < 60) return `hace ${diffM} minuto${diffM === 1 ? "" : "s"}`;
  const diffH = Math.round(diffM / 60);
  return `hace ${diffH} hora${diffH === 1 ? "" : "s"}`;
}

// Cuenta, entre los tickets ABIERTOS de un sistema, cuántos hay por cada
// prioridad — para las chips "Media 43 · Alta 14" de cada tarjeta.
function priorityBreakdown(tickets) {
  const counts = {};
  for (const t of tickets) {
    if (!t.isOpen) continue;
    counts[t.priority] = (counts[t.priority] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function lastResponseOf(tickets) {
  let latest = null;
  for (const t of tickets) {
    if (!t.dateModified) continue;
    const d = new Date(t.dateModified.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) continue;
    if (!latest || d > latest) latest = d;
  }
  return latest;
}

const PRIORITY_DOT = {
  Media: "bg-blue-500",
  Alta: "bg-orange-500",
  "Muy alta": "bg-red-500",
  Mayor: "bg-red-700",
  Baja: "bg-slate-400",
  "Muy baja": "bg-slate-300",
};

function SystemPendingCard({ sys, tickets, onGoToSystem, accent }) {
  const pending = tickets.filter((t) => t.isOpen);
  const breakdown = priorityBreakdown(tickets);
  const lastResp = lastResponseOf(tickets);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-4">
      <div className={`h-1 -mt-5 -mx-5 mb-1 rounded-t-2xl ${accent.bar}`} />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${accent.iconBg}`}>
            <span className={`text-lg ${accent.iconText}`}>◆</span>
          </div>
          <div>
            <div className="font-display font-semibold text-slate-900">Pendientes {sys.label}</div>
            <div className="text-xs text-slate-500">Atención y control de la operación {sys.label}.</div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-display font-bold ${accent.numberText}`}>{pending.length}</div>
          <div className="text-[11px] text-slate-500">pendientes</div>
        </div>
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-1.5">Por prioridad</div>
        <div className="flex flex-wrap gap-2">
          {breakdown.length === 0 && <span className="text-xs text-slate-400">Sin pendientes</span>}
          {breakdown.map(([label, count]) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-full px-2.5 py-1"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[label] || "bg-slate-400"}`} />
              {label} {count}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-slate-50 px-3 py-2 flex items-center gap-2">
        <span className="text-slate-400">🕐</span>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">Última respuesta</div>
          <div className="text-sm font-medium text-slate-700">
            {lastResp ? relativeTime(lastResp.toISOString()) : "Sin datos"}
          </div>
        </div>
      </div>

      <button
        onClick={() => onGoToSystem(sys.id)}
        className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 ${accent.buttonBg}`}
      >
        Ver pendientes {sys.label} →
      </button>
    </div>
  );
}

const ACCENTS = [
  { bar: "bg-emerald-500", iconBg: "bg-emerald-50", iconText: "text-emerald-500", numberText: "text-emerald-600", buttonBg: "bg-emerald-500" },
  { bar: "bg-blue-500", iconBg: "bg-blue-50", iconText: "text-blue-500", numberText: "text-blue-600", buttonBg: "bg-blue-500" },
  { bar: "bg-violet-500", iconBg: "bg-violet-50", iconText: "text-violet-500", numberText: "text-violet-600", buttonBg: "bg-violet-500" },
  { bar: "bg-amber-500", iconBg: "bg-amber-50", iconText: "text-amber-500", numberText: "text-amber-600", buttonBg: "bg-amber-500" },
  { bar: "bg-rose-500", iconBg: "bg-rose-50", iconText: "text-rose-500", numberText: "text-rose-600", buttonBg: "bg-rose-500" },
];

export default function InicioView({ data, onGoToSystem }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!data) {
    return <div className="p-8 text-slate-500 font-body text-sm">Conectando con los 5 sistemas…</div>;
  }

  const ticketsBySystem = {};
  for (const t of data.tickets) {
    (ticketsBySystem[t.systemId] ||= []).push(t);
  }

  const systemsInOrder = Object.keys(data.bySystem).map((id) => ({
    id,
    label: data.bySystem[id].label,
  }));

  const totalPending = data.totals.open;
  const highPriorityOrMore = data.tickets.filter((t) => t.isOpen && t.priorityId >= 4).length;
  const hasErrors = data.errors && data.errors.length > 0;
  const generatedAtMs = data.generatedAt ? new Date(data.generatedAt).getTime() : null;
  const overallLastResponse = lastResponseOf(data.tickets);

  return (
    <div className="bg-slate-50 min-h-full">
      <div className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8">
        {/* Hero */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Centro de operación · Actualización en tiempo real
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-900">{greeting()}</h1>
            <p className="text-slate-500 mt-2 max-w-xl">
              Una vista clara de lo que necesita atención ahora. Prioriza la operación y entra
              directamente a cada bandeja de pendientes.
            </p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-3">
              <span className="text-blue-500">🔄</span>
              <div>
                <div className="text-sm font-semibold text-slate-800">
                  {hasErrors
                    ? "Cobertura parcial"
                    : `Cobertura completa al ${generatedAtMs ? new Date(generatedAtMs).toLocaleString("es-MX") : "—"}`}
                </div>
                <div className="text-xs text-slate-500">
                  {hasErrors
                    ? `${data.errors.length} sistema(s) con error de conexión — ver detalle abajo.`
                    : "Todas las fuentes visibles completaron un ciclo dentro del umbral esperado."}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {systemsInOrder.map((sys) => {
                const err = data.errors?.find((e) => e.system === sys.label);
                return (
                  <button
                    key={sys.id}
                    onClick={() => onGoToSystem(sys.id)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <span className={`h-2 w-2 rounded-full ${err ? "bg-red-500" : "bg-emerald-500"}`} />
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{sys.label}</div>
                      <div className="text-[11px] text-slate-400">
                        {err ? "Sin conexión" : `Actualizado ${relativeTime(new Date(generatedAtMs || now).toISOString())}`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:w-56">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-4xl font-display font-bold text-slate-900">{totalPending}</div>
              <div className="text-xs text-slate-500 mt-1">Tickets pendientes</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-4xl font-display font-bold text-red-500">{highPriorityOrMore}</div>
              <div className="text-xs text-slate-500 mt-1">Prioridad alta o mayor</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="text-sm font-display font-semibold text-slate-800">
                {overallLastResponse ? relativeTime(overallLastResponse.toISOString()) : "Sin datos"}
              </div>
              <div className="text-xs text-slate-500 mt-1">Última respuesta en tickets pendientes</div>
            </div>
          </div>
        </div>

        {/* Panorama de pendientes */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">Panorama de pendientes</h2>
          <p className="text-slate-500 text-sm mt-1">
            Cantidad, nivel de prioridad y actividad reciente por frente operativo.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {systemsInOrder.map((sys, i) => (
              <SystemPendingCard
                key={sys.id}
                sys={sys}
                tickets={ticketsBySystem[sys.id] || []}
                onGoToSystem={onGoToSystem}
                accent={ACCENTS[i % ACCENTS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
