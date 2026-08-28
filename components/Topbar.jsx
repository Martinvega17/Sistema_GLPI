"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RelativeTime from "./RelativeTime";

const REFRESH_INTERVAL_MS = 30_000;
const MAX_EVENTS = 12;

// A partir de la lista completa de tickets (la misma que usa el resto del
// dashboard, /api/tickets) arma una lista de "eventos" recientes:
//   - resueltos/cerrados recientemente (verde)
//   - abiertos que llevan tiempo sin respuesta según su SLA (amarillo/rojo)
// No es un feed en tiempo real de GLPI (no tiene webhooks); se recalcula
// en cada refresco de 30s comparando contra el estado actual de los tickets.
function buildEvents(tickets) {
  const events = [];
  for (const t of tickets) {
    const at = t.dateModified || t.dateCreated;
    if (!at) continue;

    if (!t.isOpen) {
      events.push({
        id: `resolved-${t.id}`,
        kind: "resolved",
        systemId: t.systemId,
        system: t.systemLabel,
        rawId: t.rawId,
        title: t.title,
        at,
      });
    } else if (t.slaStatus === "breach" || t.slaStatus === "warn") {
      events.push({
        id: `sla-${t.id}`,
        kind: t.slaStatus,
        systemId: t.systemId,
        system: t.systemLabel,
        rawId: t.rawId,
        title: t.title,
        hoursLimit: t.slaHoursLimit,
        at,
      });
    }
  }
  events.sort((a, b) => String(b.at).localeCompare(String(a.at)));
  return events.slice(0, MAX_EVENTS);
}

function EventIcon({ kind }) {
  if (kind === "resolved") return <span className="text-signal-ok">✓</span>;
  if (kind === "breach") return <span className="text-signal-crit">⏱</span>;
  return <span className="text-signal-warn">⏱</span>;
}

function eventText(ev) {
  if (ev.kind === "resolved") {
    return {
      heading: `Ticket #${ev.rawId} resuelto · Herramienta: ${ev.system}`,
      detail: ev.title,
    };
  }
  const urgency = ev.kind === "breach" ? "Fuera de SLA" : "Por vencer SLA";
  return {
    heading: `${urgency} · Ticket #${ev.rawId} · Herramienta: ${ev.system}`,
    detail: ev.title,
  };
}

export default function Topbar({ onOpenMobileMenu, onToggleCollapse, collapsed }) {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/tickets", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled) setTickets(json.tickets || []);
      } catch {
        // Silencioso: si falla, la campana simplemente no actualiza esta
        // vuelta; el resto del dashboard ya muestra el error de conexión.
      }
    }

    load();
    const id = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const events = buildEvents(tickets);
  const urgentCount = events.filter((e) => e.kind === "breach").length;
  const badgeCount = urgentCount > 0 ? urgentCount : events.length;

  return (
    <header className="h-16 shrink-0 border-b border-line bg-base-900 flex items-center gap-3 px-4 sticky top-0 z-20">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        className="md:hidden text-ink-mid hover:text-ink-hi text-lg"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden md:flex text-ink-mid hover:text-ink-hi text-sm h-8 w-8 items-center justify-center rounded-md hover:bg-base-800 transition-colors"
        aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        title={collapsed ? "Expandir menú" : "Colapsar menú"}
      >
        {collapsed ? "»" : "«"}
      </button>

      <div className="flex-1" />

      <div className="relative" ref={panelRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative h-9 w-9 rounded-md flex items-center justify-center text-ink-mid hover:text-ink-hi hover:bg-base-800 transition-colors"
          aria-label="Notificaciones"
        >
          🔔
          {badgeCount > 0 && (
            <span
              className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] leading-4 font-mono text-base-950 ${
                urgentCount > 0 ? "bg-signal-crit" : "bg-signal-info"
              }`}
            >
              {badgeCount > 9 ? "9+" : badgeCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-96 max-w-[90vw] rounded-lg border border-line bg-base-900 shadow-panel overflow-hidden">
            <div className="px-4 py-3 border-b border-line">
              <div className="font-display font-semibold text-ink-hi text-sm">Notificaciones</div>
              <div className="text-xs text-ink-lo font-body">Actividad reciente</div>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              {events.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-ink-mid font-body">
                  Sin actividad reciente.
                </div>
              )}
              {events.map((ev) => {
                const { heading, detail } = eventText(ev);
                return (
                  <Link
                    key={ev.id}
                    href={`/proyecto/${ev.systemId}`}
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-2.5 px-4 py-3 border-b border-line last:border-b-0 hover:bg-base-800/60 transition-colors"
                  >
                    <span className="mt-0.5 shrink-0">
                      <EventIcon kind={ev.kind} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm text-ink-hi font-body leading-snug">{heading}</div>
                      {detail && (
                        <div className="text-xs text-ink-mid font-body truncate">{detail}</div>
                      )}
                      <div className="text-[11px] text-ink-lo font-mono mt-0.5">
                        <RelativeTime iso={ev.at} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/tickets"
              onClick={() => setOpen(false)}
              className="block text-center py-2.5 text-sm font-body text-signal-info hover:underline border-t border-line"
            >
              Ver todos →
            </Link>
          </div>
        )}
      </div>

      <div className="h-9 w-9 rounded-full bg-base-800 border border-line flex items-center justify-center text-xs font-display font-semibold text-ink-hi">
        CT
      </div>
    </header>
  );
}
