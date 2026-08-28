"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STATUS_FILTER_OPTIONS, matchesStatusFilter } from "@/lib/statusFilters";

const PAGE_SIZE = 25;

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function excerpt(text, max = 90) {
  if (!text) return "—";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max) + "…";
}

// Fila individual — reporta cuándo entra en pantalla (para disparar la
// carga de sus datos extra) usando IntersectionObserver.
function TicketRow({ ticket, extras, extrasLoading, onVisible, onOpenDetail }) {
  const rowRef = useRef(null);
  const [descOpen, setDescOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          onVisible(ticket.rawId);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ticket.rawId, onVisible]);

  const cellLoading = <span className="text-ink-lo font-mono text-xs animate-pulse">…</span>;

  return (
    <tr ref={rowRef} className="border-t border-line hover:bg-base-800/60 transition-colors align-top">
      <td className="px-3 py-2.5 whitespace-nowrap">
        <a
          href={ticket.url}
          target="_blank"
          rel="noreferrer"
          className="text-signal-info hover:underline font-mono text-sm"
        >
          {ticket.rawId}
        </a>
      </td>
      <td className="px-3 py-2.5 min-w-[180px]">
        <button
          onClick={() => onOpenDetail(ticket)}
          className="text-ink-hi hover:text-signal-info text-left font-medium text-sm"
        >
          {ticket.title}
        </button>
      </td>
      <td className="px-3 py-2.5 min-w-[220px] max-w-[320px]">
        <p className="text-ink-mid text-sm whitespace-pre-wrap">
          {descOpen ? ticket.content || "—" : excerpt(ticket.content)}
        </p>
        {ticket.content && ticket.content.length > 90 && (
          <button
            onClick={() => setDescOpen((v) => !v)}
            className="text-signal-info text-xs hover:underline mt-0.5"
          >
            {descOpen ? "Ver menos" : "Leer más"}
          </button>
        )}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-mid">
          <span className={`h-1.5 w-1.5 rounded-full ${ticket.isOpen ? "bg-signal-ok" : "bg-ink-lo"}`} />
          {ticket.status}
        </span>
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono">
        {formatDate(ticket.dateCreated)}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm">{ticket.requester || "—"}</td>

      {/* --- columnas "extra": cargan bajo demanda al hacer scroll --- */}
      <td className="px-3 py-2.5 min-w-[220px] max-w-[320px]">
        {extrasLoading ? (
          cellLoading
        ) : extras?.solutionText ? (
          <>
            <p className="text-ink-mid text-sm whitespace-pre-wrap">
              {solOpen ? extras.solutionText : excerpt(extras.solutionText)}
            </p>
            {extras.solutionText.length > 90 && (
              <button
                onClick={() => setSolOpen((v) => !v)}
                className="text-signal-info text-xs hover:underline mt-0.5"
              >
                {solOpen ? "Ver menos" : "Ver solución"}
              </button>
            )}
          </>
        ) : (
          <span className="text-ink-lo text-sm">—</span>
        )}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono">
        {extrasLoading ? cellLoading : formatDate(extras?.solvedDate)}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono">
        {extrasLoading ? cellLoading : formatDate(extras?.closedDate)}
      </td>
      <td className="px-3 py-2.5 min-w-[160px]">
        {extrasLoading ? (
          cellLoading
        ) : extras?.assignedStaff?.length ? (
          <div className="flex flex-col gap-0.5">
            {extras.assignedStaff.slice(0, 2).map((name) => (
              <span key={name} className="text-ink-hi text-sm">
                {name}
              </span>
            ))}
            {extras.assignedStaff.length > 2 && (
              <span className="text-ink-lo text-xs">+{extras.assignedStaff.length - 2} más</span>
            )}
          </div>
        ) : (
          <span className="text-ink-lo text-sm">—</span>
        )}
      </td>
      <td className="px-3 py-2.5 min-w-[160px]">
        {extrasLoading ? (
          cellLoading
        ) : extras?.groupNames?.length ? (
          <div className="flex flex-wrap gap-1">
            {extras.groupNames.slice(0, 2).map((name) => (
              <span
                key={name}
                className="inline-block text-[11px] px-1.5 py-0.5 rounded border border-signal-info/40 text-signal-info whitespace-nowrap"
              >
                {name}
              </span>
            ))}
            {extras.groupNames.length > 2 && (
              <span className="text-ink-lo text-[11px]">+{extras.groupNames.length - 2} áreas más</span>
            )}
          </div>
        ) : (
          <span className="text-ink-lo text-sm">—</span>
        )}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono">
        {extrasLoading ? cellLoading : formatDate(extras?.lastFollowupDate)}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono">
        {extrasLoading ? cellLoading : formatDate(extras?.lastTechFollowupDate)}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm">
        {extrasLoading ? cellLoading : extras?.resolvedByName || "—"}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap">
        <button
          onClick={() => onOpenDetail(ticket)}
          className="text-ink-mid hover:text-signal-info text-sm"
          title="Ver notas y sugerencia"
        >
          💬 Notas
        </button>
      </td>
    </tr>
  );
}

export default function SystemTicketsView({ system, tickets, onOpenDetail, generatedAt }) {
  const [slaFilter, setSlaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [extrasById, setExtrasById] = useState({}); // rawId -> extras
  const [extrasLoadingIds, setExtrasLoadingIds] = useState(() => new Set());
  const pendingBatchRef = useRef(new Set());
  const flushTimerRef = useRef(null);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tickets
      .filter((t) => {
        if (slaFilter === "all") return true;
        if (slaFilter === "open") return t.isOpen;
        if (slaFilter === "closed") return !t.isOpen;
        return t.slaStatus === slaFilter;
      })
      .filter((t) => matchesStatusFilter(t, statusFilter))
      .filter((t) => {
        if (!query) return true;
        const haystack = [t.rawId, t.title, t.status, t.priority, t.requester]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => {
        const dateA = a.dateCreated ? new Date(a.dateCreated.replace(" ", "T")).getTime() : 0;
        const dateB = b.dateCreated ? new Date(b.dateCreated.replace(" ", "T")).getTime() : 0;
        return dateB - dateA;
      });
  }, [tickets, slaFilter, statusFilter, searchQuery]);

  // Reinicia la paginación visible cuando cambian los filtros o de sistema.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [system.id, slaFilter, statusFilter, searchQuery]);

  const visibleTickets = filtered.slice(0, visibleCount);

  // Agrupa en lotes las peticiones de "extras" que van llegando fila por
  // fila (según entran en pantalla), para no mandar una llamada HTTP por
  // cada fila individual — se juntan las que lleguen en ~150ms y se piden
  // juntas en una sola llamada a /api/ticket-extras.
  function requestExtras(rawId) {
    if (extrasById[rawId] || pendingBatchRef.current.has(rawId)) return;
    pendingBatchRef.current.add(rawId);
    setExtrasLoadingIds((prev) => new Set(prev).add(rawId));

    if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    flushTimerRef.current = setTimeout(async () => {
      const ids = [...pendingBatchRef.current];
      pendingBatchRef.current = new Set();
      try {
        const res = await fetch("/api/ticket-extras", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemId: system.id,
            rawIds: ids,
            tickets: ids.map((id) => tickets.find((t) => String(t.rawId) === String(id))).filter(Boolean),
          }),
        });
        const json = await res.json();
        setExtrasById((prev) => ({ ...prev, ...(json.extras || {}) }));
      } catch {
        // deja las celdas en "—" si falla; no bloquea el resto de la tabla
      } finally {
        setExtrasLoadingIds((prev) => {
          const next = new Set(prev);
          for (const id of ids) next.delete(id);
          return next;
        });
      }
    }, 150);
  }

  // Sentinela al final de la tabla: cuando entra en pantalla, se muestra
  // otra página de filas (paginación en el cliente, sin pedir nada nuevo a
  // GLPI porque ya tenemos el listado base completo).
  const sentinelRef = useRef(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [filtered.length]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-400/40 rounded px-1.5 py-0.5">
              BETA
            </span>
            <span className="text-ink-lo text-xs font-body">Versión temprana del sistema; algunas funciones pueden cambiar.</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-ink-hi mt-2">Tickets {system.label}</h1>
          <p className="text-ink-mid text-sm font-body mt-0.5">
            {filtered.length} registro{filtered.length === 1 ? "" : "s"} con los criterios actuales
            {generatedAt && (
              <span className="text-ink-lo"> · actualizado {new Date(generatedAt).toLocaleTimeString("es-MX")}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar…"
            className="w-56 px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-hi placeholder-ink-lo focus:outline-none focus:border-signal-info transition-colors"
          />
          <a
            href={`/api/report?format=csv&scope=all&systemId=${system.id}`}
            className="px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi transition-colors whitespace-nowrap"
          >
            ⭳ Exportar
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
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

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-line bg-base-900 p-8 text-center text-ink-mid font-body">
          No hay tickets que coincidan con el filtro actual.
        </div>
      ) : (
        <div className="rounded-lg border border-line bg-base-900 shadow-panel overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead className="bg-base-800 text-ink-mid text-xs uppercase tracking-wider font-body">
                <tr>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Folio</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Título</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Descripción</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Estado</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Fecha de apertura</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Solicitante</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Descripción de la solución</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Fecha de solución</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Fecha de cierre</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Personal que atendió</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Áreas asignadas</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Última retro</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Última respuesta del área técnica</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Personal que resolvió</th>
                  <th className="text-left px-3 py-2.5 font-medium whitespace-nowrap">Notas</th>
                </tr>
              </thead>
              <tbody className="font-body">
                {visibleTickets.map((t) => (
                  <TicketRow
                    key={t.id}
                    ticket={t}
                    extras={extrasById[t.rawId]}
                    extrasLoading={extrasLoadingIds.has(t.rawId)}
                    onVisible={requestExtras}
                    onOpenDetail={onOpenDetail}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {visibleCount < filtered.length && (
            <div ref={sentinelRef} className="text-center py-4 text-ink-lo text-xs font-mono">
              Cargando más tickets…
            </div>
          )}
        </div>
      )}
    </div>
  );
}
