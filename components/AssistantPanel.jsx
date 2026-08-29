"use client";

import { useEffect, useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleString("es-MX");
}

export default function AssistantPanel({ ticket, onClose }) {
  const [suggestion, setSuggestion] = useState(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    if (!ticket) {
      setSuggestion(null);
      setDetail(null);
      return;
    }
    let cancelled = false;

    setLoadingSuggestion(true);
    fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticket }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSuggestion(data);
      })
      .finally(() => {
        if (!cancelled) setLoadingSuggestion(false);
      });

    setLoadingDetail(true);
    fetch(`/api/ticket-detail?systemId=${encodeURIComponent(ticket.systemId)}&rawId=${encodeURIComponent(ticket.rawId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setDetail(data);
      })
      .catch(() => {
        if (!cancelled) setDetail(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingDetail(false);
      });

    return () => {
      cancelled = true;
    };
  }, [ticket?.id]);

  // Descripción a mostrar: la del detalle si ya cargó, si no la que ya
  // trae el ticket de la lista (más rápida, evita esperar el detalle).
  const description = detail?.content || ticket?.content;

  return (
    <div className="rounded-lg border border-line bg-base-900 shadow-panel p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-ink-lo font-body">Asistente de atención</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-ink-lo hover:text-ink-hi text-sm leading-none px-1"
            aria-label="Cerrar panel"
          >
            ✕
          </button>
        )}
      </div>

      {!ticket && (
        <p className="text-ink-mid text-sm font-body">
          Selecciona un ticket de la tabla para ver la acción sugerida.
        </p>
      )}

      {ticket && (
        <div className="flex flex-col gap-3">
          <div>
            <div className="font-display font-semibold text-ink-hi">
              #{ticket.rawId} · {ticket.systemLabel}
            </div>
            <div className="text-ink-mid text-sm font-body">{ticket.title}</div>
          </div>

          {/* Resumen / descripción completa del ticket */}
          <div className="rounded-md border border-line bg-slate-100 p-3">
            <p className="text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1">Descripción</p>
            {loadingDetail && !description && (
              <p className="text-ink-lo text-sm font-mono animate-pulse">Cargando…</p>
            )}
            {!loadingDetail && !description && (
              <p className="text-ink-mid text-sm font-body">Sin descripción disponible.</p>
            )}
            {description && (
              <p className="text-sm text-ink-hi font-body leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto scrollbar-thin">
                {description}
              </p>
            )}
          </div>

          {/* Última respuesta: qué área respondió (según el grupo asignado
              al ticket) y qué dijo. Ya no se muestra el grupo del autor
              individual ni su nombre — solo el área/grupo del ticket. */}
          <div className="rounded-md border border-line bg-slate-100 p-3">
            <p className="text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1">Última respuesta</p>
            {loadingDetail && (
              <p className="text-ink-lo text-sm font-mono animate-pulse">Cargando…</p>
            )}
            {!loadingDetail && detail?.error && (
              <p className="text-signal-warn text-xs font-body">No se pudo obtener el detalle: {detail.error}</p>
            )}
            {!loadingDetail && !detail?.error && !detail?.lastFollowup && (
              <p className="text-ink-mid text-sm font-body">Sin seguimientos registrados aún.</p>
            )}
            {!loadingDetail && detail?.lastFollowup && (
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-ink-mid">
                  <span
                    className="px-1.5 py-0.5 rounded border border-signal-info/40 text-signal-info"
                    title="Grupo(s) asignados al ticket"
                  >
                    {detail.groupNames?.length ? detail.groupNames.join(", ") : "Área no registrada"}
                  </span>
                  <span>{formatDate(detail.lastFollowup.date)}</span>
                  {detail.lastFollowup.isPrivate && (
                    <span className="text-ink-lo">(nota privada)</span>
                  )}
                </div>
                <p className="text-sm text-ink-hi font-body leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto scrollbar-thin">
                  {detail.lastFollowup.message || "(sin contenido)"}
                </p>
              </div>
            )}
          </div>

          {/* Sugerencia de acción (reglas locales o Claude) */}
          {loadingSuggestion && <div className="text-ink-lo text-sm font-mono animate-pulse">Analizando…</div>}
          {!loadingSuggestion && suggestion && (
            <div className="rounded-md border border-line bg-slate-100 p-3">
              <p className="text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1">Acción sugerida</p>
              <p className="text-sm text-ink-hi font-body leading-relaxed">{suggestion.text}</p>
              <p className="mt-2 text-[11px] text-ink-lo font-mono">
                fuente: {suggestion.source === "claude" ? "Claude" : "reglas locales"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
