"use client";

import { useMemo, useState } from "react";

const STATUS_DOT = {
  1: "bg-signal-info", // Nuevo
  2: "bg-signal-info", // En curso (asignado)
  3: "bg-signal-info", // En curso (planificado)
  4: "bg-signal-warn", // En espera
  5: "bg-signal-ok", // Resuelto
  6: "bg-ink-lo", // Cerrado
};

// Definición de columnas. "sortKey" solo se define en las columnas que el
// usuario pidió que fueran ordenables (Folio, Título, Fecha de apertura,
// Fecha de solución, Última retro, Última respuesta del área técnica).
const COLUMNS = [
  { key: "rawId", label: "Folio", sortKey: "rawId", type: "number" },
  { key: "title", label: "Título", sortKey: "title", type: "string" },
  { key: "content", label: "Descripción" },
  { key: "status", label: "Estado" },
  { key: "dateCreated", label: "Fecha de apertura", sortKey: "dateCreated", type: "date" },
  { key: "requester", label: "Solicitante" },
  { key: "solution", label: "Descripción de la solución" },
  { key: "dateSolved", label: "Fecha de solución", sortKey: "dateSolved", type: "date" },
  { key: "dateClosed", label: "Fecha de cierre" },
  { key: "attendedByAll", label: "Personal que atendió" },
  { key: "areas", label: "Áreas asignadas" },
  { key: "lastFollowupAt", label: "Última retro", sortKey: "lastFollowupAt", type: "date" },
  { key: "lastTechResponseAt", label: "Última respuesta del área técnica", sortKey: "lastTechResponseAt", type: "date" },
  { key: "resolvedBy", label: "Personal que resolvió" },
];

function formatDateTime(v) {
  if (!v) return "—";
  const d = new Date(v.includes("T") ? v : v.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("es-MX", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function compareValues(a, b, type) {
  if (type === "number") return (Number(a) || 0) - (Number(b) || 0);
  if (type === "date") {
    const da = a ? new Date(a.replace(" ", "T")).getTime() : -Infinity;
    const db = b ? new Date(b.replace(" ", "T")).getTime() : -Infinity;
    return da - db;
  }
  return String(a || "").localeCompare(String(b || ""), "es");
}

function ExpandableText({ text, emptyLabel = "—", linkLabel = "Leer más" }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return <span className="text-ink-lo">{emptyLabel}</span>;
  const isLong = text.length > 90;
  const preview = isLong && !expanded ? `${text.slice(0, 90)}…` : text;
  return (
    <div className="max-w-[260px] whitespace-pre-line">
      <span>{preview}</span>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="block text-signal-info hover:underline text-xs mt-0.5"
        >
          {expanded ? "Ver menos" : linkLabel}
        </button>
      )}
    </div>
  );
}

function ChipList({ items, colorClass = "bg-base-700 text-ink-mid", max = 2 }) {
  const [expanded, setExpanded] = useState(false);
  const list = items || [];
  if (list.length === 0) return <span className="text-ink-lo">—</span>;
  const visible = expanded ? list : list.slice(0, max);
  const remaining = list.length - visible.length;
  return (
    <div className="flex flex-col gap-1 max-w-[220px]">
      {visible.map((item, i) => (
        <span key={i} className={`inline-block rounded px-1.5 py-0.5 text-xs w-fit ${colorClass}`}>
          {item}
        </span>
      ))}
      {remaining > 0 && (
        <button onClick={() => setExpanded(true)} className="text-left text-xs text-signal-info hover:underline">
          + {remaining} más · Ver todos
        </button>
      )}
      {expanded && list.length > max && (
        <button onClick={() => setExpanded(false)} className="text-left text-xs text-ink-lo hover:underline">
          Ver menos
        </button>
      )}
    </div>
  );
}

export default function ProjectTicketTable({ tickets }) {
  const [sort, setSort] = useState(null); // { key, direction, type }

  const sorted = useMemo(() => {
    if (!sort) return tickets;
    const copy = [...tickets];
    copy.sort((a, b) => {
      const cmp = compareValues(a[sort.key], b[sort.key], sort.type);
      return sort.direction === "desc" ? -cmp : cmp;
    });
    return copy;
  }, [tickets, sort]);

  function toggleSort(col) {
    if (!col.sortKey) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.sortKey) {
        return { key: col.sortKey, direction: "asc", type: col.type };
      }
      return { key: col.sortKey, direction: prev.direction === "asc" ? "desc" : "asc", type: col.type };
    });
  }

  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-slate-100 p-8 text-center text-ink-mid font-body">
        No hay tickets que coincidan con el filtro actual.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-slate-100 shadow-panel overflow-hidden">
      <div className="max-h-[640px] overflow-auto scrollbar-thin">
        <table className="text-sm border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-100 text-ink-mid text-xs uppercase tracking-wider font-body">
            <tr>
              {COLUMNS.map((col) => {
                const isSorted = sort?.key === col.sortKey && col.sortKey;
                return (
                  <th
                    key={col.key}
                    className={`text-left px-4 py-2 font-medium whitespace-nowrap border-b border-line ${
                      col.sortKey ? "cursor-pointer select-none hover:text-ink-hi" : ""
                    }`}
                    onClick={() => toggleSort(col)}
                  >
                    {col.sortKey && <span className="text-ink-lo mr-1">Ordenar por</span>}
                    {col.label}
                    {isSorted && <span className="ml-1">{sort.direction === "asc" ? "▲" : "▼"}</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="font-body">
            {sorted.map((t) => (
              <tr key={t.id} className="border-t border-line hover:bg-slate-100/60 align-top">
                <td className="px-4 py-3 text-signal-info font-mono whitespace-nowrap">
                  <a href={t.url} target="_blank" rel="noreferrer" className="hover:underline">
                    {t.rawId}
                  </a>
                </td>
                <td className="px-4 py-3 text-ink-hi max-w-[220px]">{t.title}</td>
                <td className="px-4 py-3 text-ink-mid">
                  <ExpandableText text={t.content} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-ink-mid">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[t.statusId] || "bg-ink-lo"}`} />
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.dateCreated)}
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap">{t.requester || "—"}</td>
                <td className="px-4 py-3 text-ink-mid">
                  <ExpandableText text={t.solution} linkLabel="Ver solución" />
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.dateSolved)}
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.dateClosed)}
                </td>
                <td className="px-4 py-3">
                  <ChipList items={t.attendedByAll} colorClass="bg-signal-info/10 text-signal-info" />
                </td>
                <td className="px-4 py-3">
                  <ChipList items={t.areas} colorClass="bg-[#B285F0]/10 text-[#B285F0]" />
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.lastFollowupAt)}
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.lastTechResponseAt)}
                </td>
                <td className="px-4 py-3 text-ink-mid whitespace-nowrap">{t.resolvedBy || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
