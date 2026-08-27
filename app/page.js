"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SYSTEMS } from "@/lib/systems";
import { CATEGORIES, systemsForCategory } from "@/lib/categories";
import SourceSyncGrid from "@/components/SourceSyncGrid";
import CategoryPendingCard from "@/components/CategoryPendingCard";
import RelativeTime from "@/components/RelativeTime";

const REFRESH_INTERVAL_MS = 30_000;
const ORG_NAME = "CNS"; // TODO: si más adelante hay login, reemplazar por el usuario en sesión.

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export default function InicioPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const res = await fetch("/api/tickets", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message || "Error al consultar /api/tickets");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const tickets = data?.tickets || [];
  const openTickets = tickets.filter((t) => t.isOpen);
  const highPriorityCount = openTickets.filter((t) => t.priorityId >= 4).length;
  const lastActivity = tickets.reduce((best, t) => {
    const d = t.dateModified || t.dateCreated;
    return d && (!best || d > best) ? d : best;
  }, null);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
      {data?.demoMode && (
        <div className="rounded-md border border-signal-warn/40 bg-signal-warn/10 text-signal-warn text-xs font-mono px-3 py-2 inline-flex w-fit items-center gap-2">
          <span className="rounded bg-signal-warn text-base-950 px-1.5 py-0.5 font-bold">BETA</span>
          Versión temprana del sistema; algunas funciones pueden cambiar.
        </div>
      )}

      {error && (
        <div className="rounded-md border border-signal-crit/40 bg-signal-crit/10 text-signal-crit text-sm font-body px-4 py-2">
          {error}
        </div>
      )}

      {data?.errors?.length > 0 && (
        <div className="rounded-md border border-signal-warn/40 bg-signal-warn/10 text-signal-warn text-sm font-body px-4 py-2">
          {data.errors.map((e, i) => (
            <div key={i}>
              ⚠ {e.system}: {e.error}
            </div>
          ))}
        </div>
      )}

      <section className="rounded-xl border border-signal-info/40 bg-base-900 shadow-panel p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-signal-ok text-xs font-mono uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-signal-ok animate-pulse_dot" />
              Centro de operación · Actualización en tiempo real
            </div>

            <div>
              <h1 className="font-display text-3xl font-bold text-ink-hi">
                {greeting()}, {ORG_NAME}
              </h1>
              <p className="text-ink-mid font-body mt-2 max-w-xl">
                Una vista clara de lo que necesita atención ahora. Prioriza la operación y entra
                directamente a cada bandeja de pendientes.
              </p>
            </div>

            {data && (
              <div className="rounded-md border border-line bg-base-800 px-3 py-2 flex items-center gap-2 w-fit">
                <span className="text-signal-info">🔄</span>
                <div>
                  <div className="text-sm text-ink-hi font-body">
                    Cobertura completa al {new Date(data.generatedAt).toLocaleString("es-MX")}
                  </div>
                  <div className="text-xs text-ink-lo font-body">
                    Todas las fuentes visibles completaron un ciclo dentro del umbral esperado.
                  </div>
                </div>
              </div>
            )}

            <SourceSyncGrid systems={SYSTEMS} generatedAt={data?.generatedAt} errors={data?.errors} />
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-64">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-line bg-base-800 p-4">
                <div className="font-display font-bold text-3xl text-ink-hi">
                  {data ? openTickets.length : "—"}
                </div>
                <div className="text-xs text-ink-mid font-body">Tickets pendientes</div>
              </div>
              <div className="rounded-lg border border-line bg-base-800 p-4">
                <div className="font-display font-bold text-3xl text-signal-crit">
                  {data ? highPriorityCount : "—"}
                </div>
                <div className="text-xs text-ink-mid font-body">Prioridad alta o mayor</div>
              </div>
            </div>
            <div className="rounded-lg border border-line bg-base-800 p-4">
              <div className="font-display font-bold text-ink-hi">
                {data ? <RelativeTime iso={lastActivity} /> : "—"}
              </div>
              <div className="text-xs text-ink-mid font-body mt-1">Última respuesta en tickets pendientes</div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-hi">Panorama de pendientes</h2>
          <p className="text-ink-mid text-sm font-body">
            Cantidad, nivel de prioridad y actividad reciente por frente operativo.
          </p>
        </div>

        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CATEGORIES.map((category) => {
              const systems = systemsForCategory(category.id);
              const systemIds = new Set(systems.map((s) => s.id));
              const categoryTickets = tickets.filter((t) => systemIds.has(t.systemId));
              return (
                <CategoryPendingCard
                  key={category.id}
                  category={category}
                  tickets={categoryTickets}
                  systems={systems}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-ink-mid font-mono text-sm">Conectando con los sistemas…</div>
        )}
      </section>

      <div>
        <Link
          href="/tickets"
          className="inline-block rounded-md border border-line bg-base-900 px-4 py-2 text-sm font-body text-ink-mid hover:text-ink-hi hover:border-signal-info transition-colors"
        >
          Ver tablero completo de todos los tickets →
        </Link>
      </div>
    </main>
  );
}
