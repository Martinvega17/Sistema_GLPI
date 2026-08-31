"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RelativeTime from "./RelativeTime";

const REFRESH_INTERVAL_MS = 30_000;
const MAX_EVENTS = 12;
// Umbral para el aviso "Solicitar retro": ticket abierto sin ninguna
// modificación (dateModified) en más de este tiempo. Es una aproximación —
// /api/tickets no trae el detalle de seguimientos por ticket (sería muy
// caro pedirlo para cientos de tickets solo para la campana), así que se
// usa "última modificación" como proxy de "sin respuesta técnica".
const FOLLOWUP_STALE_HOURS = 24;

function hoursSince(dateStr) {
  if (!dateStr) return null;
  const then = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(then.getTime())) return null;
  return (Date.now() - then.getTime()) / (1000 * 60 * 60);
}

// A partir de la lista completa de tickets (la misma que usa el resto del
// dashboard, /api/tickets) arma una lista de "eventos" recientes:
//   - resueltos/cerrados recientemente (verde)
//   - abiertos que llevan tiempo sin respuesta según su SLA (amarillo/rojo)
//   - abiertos sin ninguna actividad en más de FOLLOWUP_STALE_HOURS
//     ("Solicitar retro" — pide seguimiento al área asignada)
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
    } else {
      const staleHours = hoursSince(t.dateModified);
      if (staleHours !== null && staleHours >= FOLLOWUP_STALE_HOURS) {
        events.push({
          id: `followup-${t.id}`,
          kind: "followup",
          systemId: t.systemId,
          system: t.systemLabel,
          rawId: t.rawId,
          title: t.title,
          staleHours: Math.floor(staleHours),
          at,
        });
      }
    }
  }
  events.sort((a, b) => String(b.at).localeCompare(String(a.at)));
  return events.slice(0, MAX_EVENTS);
}

function EventIcon({ kind }) {
  if (kind === "resolved") return <span className="text-signal-ok">✓</span>;
  if (kind === "breach") return <span className="text-signal-crit">⏱</span>;
  if (kind === "followup") return <span className="text-signal-warn">🔁</span>;
  return <span className="text-signal-warn">⏱</span>;
}

function eventText(ev) {
  if (ev.kind === "resolved") {
    return {
      heading: `Ticket #${ev.rawId} resuelto · Herramienta: ${ev.system}`,
      detail: ev.title,
    };
  }
  if (ev.kind === "followup") {
    return {
      heading: `Solicitar retro · Ticket #${ev.rawId} · Herramienta: ${ev.system}`,
      detail: `Más de ${ev.staleHours}h sin respuesta técnica. Solicita retro al área asignada.`,
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
    <header className="h-16 shrink-0 border-b border-slate-200 bg-white flex items-center gap-3 px-4 sticky top-0 z-20">
      <button
        type="button"
        onClick={onOpenMobileMenu}
        className="md:hidden text-slate-500 hover:text-slate-900 text-lg"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden md:flex text-slate-500 hover:text-slate-900 text-sm h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
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
          className="relative h-9 w-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          aria-label="Notificaciones"
        >
          🔔
          {badgeCount > 0 && (
            <span
              className={`absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] leading-4 font-mono text-white ${
                urgentCount > 0 ? "bg-rose-500" : "bg-blue-500"
              }`}
            >
              {badgeCount > 9 ? "9+" : badgeCount}
            </span>
          )}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-96 max-w-[90vw] rounded-lg border border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="font-display font-semibold text-slate-900 text-sm">Notificaciones</div>
              <div className="text-xs text-slate-400 font-body">Actividad reciente</div>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              {events.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-slate-500 font-body">
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
                    className="flex items-start gap-2.5 px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                  >
                    <span className="mt-0.5 shrink-0">
                      <EventIcon kind={ev.kind} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm text-slate-800 font-body leading-snug">{heading}</div>
                      {detail && (
                        <div className="text-xs text-slate-500 font-body truncate">{detail}</div>
                      )}
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
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
              className="block text-center py-2.5 text-sm font-body text-blue-600 hover:underline border-t border-slate-100"
            >
              Ver todos →
            </Link>
          </div>
        )}
      </div>

      <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-display font-semibold text-slate-700">
        CT
      </div>
    </header>
  );
}
