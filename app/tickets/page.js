"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import StatusStrip from "@/components/StatusStrip";
import StatCards from "@/components/StatCards";
import TicketTable from "@/components/TicketTable";
import AssistantPanel from "@/components/AssistantPanel";
import ToastNotifications from "@/components/ToastNotifications";
import { STATUS_FILTER_OPTIONS, matchesStatusFilter } from "@/lib/statusFilters";

const REFRESH_INTERVAL_MS = 30_000;

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [activeSystem, setActiveSystem] = useState(null);
  const [slaFilter, setSlaFilter] = useState("open"); // open | all | closed | breach | warn
  const [statusFilter, setStatusFilter] = useState("all"); // ver lib/statusFilters.js
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [lastFetchError, setLastFetchError] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Snapshot de la carga anterior (id -> dateModified) para poder comparar
  // contra la carga nueva y detectar tickets nuevos o con cambios. Es un
  // useRef (no state) porque no necesita disparar un re-render por sí solo.
  // null = todavía no hubo una primera carga exitosa (para no disparar
  // notificaciones de "nuevo ticket" para TODO el histórico al abrir la página).
  const prevTicketsMapRef = useRef(null);

  function pushToast(toast) {
    const id = `${toast.type}-${toast.ticketId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }

  function dismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  async function load() {
    try {
      const res = await fetch("/api/tickets", { cache: "no-store" });
      const json = await res.json();

      const prevMap = prevTicketsMapRef.current;
      if (prevMap) {
        for (const t of json.tickets) {
          const prev = prevMap.get(t.id);
          if (!prev) {
            // No estaba en la carga anterior -> ticket nuevo (verde).
            pushToast({
              type: "new",
              ticketId: t.id,
              title: `#${t.rawId} · ${t.systemLabel}`,
              subtitle: t.title,
            });
          } else if (prev.dateModified !== t.dateModified) {
            // Ya existía, pero su fecha de modificación cambió -> lo más
            // probable es que le hayan respondido o cambiado de estado
            // (amarillo). No distinguimos el motivo exacto porque
            // consultar los seguimientos de CADA ticket en cada refresco de
            // 30s sería demasiado pesado contra los 5 GLPI.
            pushToast({
              type: "update",
              ticketId: t.id,
              title: `#${t.rawId} · ${t.systemLabel}`,
              subtitle: t.title,
            });
          }
        }
      }
      prevTicketsMapRef.current = new Map(
        json.tickets.map((t) => [t.id, { dateModified: t.dateModified }])
      );

      setData(json);
      setLastFetchError(null);
    } catch (err) {
      setLastFetchError(err.message || "Error al consultar /api/tickets");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const filteredTickets = useMemo(() => {
    if (!data) return [];
    const query = searchQuery.trim().toLowerCase();
    return data.tickets
      .filter((t) => (activeSystem ? t.systemId === activeSystem : true))
      .filter((t) => {
        if (slaFilter === "all") return true;
        if (slaFilter === "open") return t.isOpen;
        if (slaFilter === "closed") return !t.isOpen;
        return t.slaStatus === slaFilter; // breach | warn
      })
      .filter((t) => matchesStatusFilter(t, statusFilter))
      .filter((t) => {
        if (!query) return true;
        const haystack = [t.rawId, t.title, t.systemLabel, t.status, t.priority, t.requester]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      // Más nuevos primero (fecha de creación descendente). Los tickets sin
      // fecha válida se van al final en vez de romper el orden.
      .sort((a, b) => {
        const dateA = a.dateCreated ? new Date(a.dateCreated.replace(" ", "T")).getTime() : 0;
        const dateB = b.dateCreated ? new Date(b.dateCreated.replace(" ", "T")).getTime() : 0;
        return dateB - dateA;
      });
  }, [data, activeSystem, slaFilter, statusFilter, searchQuery]);

  return (
    <main className="min-h-full bg-base-950 max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
      <ToastNotifications toasts={toasts} onDismiss={dismissToast} />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink-hi">Ops · Tickets CNS-IPICYT</h1>
          <p className="text-ink-mid text-sm font-body mt-1">
            CNS · UnADM · Prepa · SECIHTI · Mujeres — monitoreo consolidado, actualiza cada{" "}
            {REFRESH_INTERVAL_MS / 1000}s
          </p>
        </div>
        <div className="text-right">
          {data?.demoMode && (
            <div className="text-signal-warn text-xs font-mono border border-signal-warn/40 rounded px-2 py-1 mb-1 inline-block">
              MODO DEMO — datos de ejemplo
            </div>
          )}
          <div className="text-ink-lo text-xs font-mono">
            {data ? `última actualización ${new Date(data.generatedAt).toLocaleTimeString("es-MX")}` : "cargando…"}
          </div>
        </div>
      </header>

      {lastFetchError && (
        <div className="rounded-md border border-signal-crit/40 bg-signal-crit/10 text-signal-crit text-sm font-body px-4 py-2">
          {lastFetchError}
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

      {data && (
        <>
          <StatusStrip
            bySystem={data.bySystem}
            errors={data.errors}
            activeSystem={activeSystem}
            onSelectSystem={setActiveSystem}
          />

          <StatCards totals={data.totals} />

          <div className="flex gap-2">
            {[
              ["open", "Abiertos"],
              ["all", "Todos"],
              ["closed", "Cerrados"],
              ["breach", "Fuera de SLA"],
              ["warn", "Por vencer"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSlaFilter(key)}
                className={`px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${
                  slaFilter === key
                    ? "border-signal-info bg-base-800 text-ink-hi"
                    : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"
                }`}
              >
                {label}
              </button>
            ))}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ticket (id, título, sistema...)"
              className="ml-auto w-64 px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-hi placeholder-ink-lo focus:outline-none focus:border-signal-info transition-colors"
            />
            <a
              href="/api/report?format=csv"
              className="px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi transition-colors"
            >
              ⭳ Exportar CSV
            </a>
            <a
              href="/api/report?format=csv&scope=all&metrics=first_response"
              title="Incluye cuánto tardó mesa en dar la primera respuesta/escalar cada ticket, desde que fue creado"
              className="px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi transition-colors"
            >
              ⭳ Exportar tiempos de respuesta
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-ink-lo font-body mr-1">Estado:</span>
            {STATUS_FILTER_OPTIONS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${
                  statusFilter === key
                    ? "border-signal-info bg-base-800 text-ink-hi"
                    : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
            <TicketTable
              tickets={filteredTickets}
              onSelectTicket={setSelectedTicket}
              selectedId={selectedTicket?.id}
            />
            <AssistantPanel ticket={selectedTicket} />
          </div>
        </>
      )}

      {!data && !lastFetchError && (
        <div className="text-ink-mid font-mono text-sm">Conectando con los 5 sistemas…</div>
      )}
    </main>
  );
}
