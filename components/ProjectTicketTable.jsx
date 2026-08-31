"use client";

import { useMemo, useState } from "react";

const STATUS_DOT = {
  1: "bg-blue-500", // Nuevo
  2: "bg-blue-500", // En curso (asignado)
  3: "bg-blue-500", // En curso (planificado)
  4: "bg-amber-500", // En espera
  5: "bg-emerald-500", // Resuelto
  6: "bg-slate-400", // Cerrado
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

function ExpandableText({ text, emptyLabel = "—", linkLabel = "Leer más", title, onOpen }) {
  if (!text) return <span className="text-slate-400">{emptyLabel}</span>;
  const isLong = text.length > 90;
  const preview = isLong ? `${text.slice(0, 90)}…` : text;
  return (
    <div className="max-w-[260px] whitespace-pre-line">
      <span>{preview}</span>
      {isLong && (
        <button
          onClick={() => onOpen({ title, text })}
          className="block text-blue-600 hover:underline text-xs mt-0.5"
        >
          {linkLabel}
        </button>
      )}
    </div>
  );
}

// Ventana emergente para leer el texto completo de una celda larga
// (Descripción / Descripción de la solución) sin tener que expandir la fila
// y desplazarse hacia abajo en toda la tabla — el texto trae su propio
// scroll interno si es muy largo.
function TextModal({ content, onClose }) {
  if (!content) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-900/40" />
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-slate-200 shrink-0">
          <h3 className="font-display font-semibold text-slate-800 text-sm">{content.title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-lg leading-none shrink-0"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto text-sm text-slate-700 whitespace-pre-line scrollbar-thin">
          {content.text}
        </div>
      </div>
    </div>
  );
}

function ChipList({ items, colorClass = "bg-slate-100 text-slate-600", max = 2 }) {
  const [expanded, setExpanded] = useState(false);
  const list = items || [];
  if (list.length === 0) return <span className="text-slate-400">—</span>;
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
        <button onClick={() => setExpanded(true)} className="text-left text-xs text-blue-600 hover:underline">
          + {remaining} más · Ver todos
        </button>
      )}
      {expanded && list.length > max && (
        <button onClick={() => setExpanded(false)} className="text-left text-xs text-slate-400 hover:underline">
          Ver menos
        </button>
      )}
    </div>
  );
}

export default function ProjectTicketTable({ tickets }) {
  const [sort, setSort] = useState(null); // { key, direction, type }
  const [modalContent, setModalContent] = useState(null); // { title, text } | null

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
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500 font-body">
        No hay tickets que coincidan con el filtro actual.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="max-h-[640px] overflow-auto scrollbar-thin">
        <table className="text-sm border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-body">
            <tr>
              {COLUMNS.map((col) => {
                const isSorted = sort?.key === col.sortKey && col.sortKey;
                return (
                  <th
                    key={col.key}
                    className={`text-left px-4 py-2 font-medium whitespace-nowrap border-b border-slate-200 ${
                      col.sortKey ? "cursor-pointer select-none hover:text-slate-900" : ""
                    }`}
                    onClick={() => toggleSort(col)}
                  >
                    {col.sortKey && <span className="text-slate-400 mr-1">Ordenar por</span>}
                    {col.label}
                    {isSorted && <span className="ml-1">{sort.direction === "asc" ? "▲" : "▼"}</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="font-body">
            {sorted.map((t) => (
              <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50 align-top">
                <td className="px-4 py-3 text-blue-600 font-mono whitespace-nowrap">
                  <a href={t.url} target="_blank" rel="noreferrer" className="hover:underline">
                    {t.rawId}
                  </a>
                </td>
                <td className="px-4 py-3 text-slate-800 max-w-[220px]">{t.title}</td>
                <td className="px-4 py-3 text-slate-600">
                  <ExpandableText
                    text={t.content}
                    title={`Descripción · Ticket #${t.rawId}`}
                    onOpen={setModalContent}
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[t.statusId] || "bg-slate-400"}`} />
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.dateCreated)}
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{t.requester || "—"}</td>
                <td className="px-4 py-3 text-slate-600">
                  <ExpandableText
                    text={t.solution}
                    linkLabel="Ver solución"
                    title={`Descripción de la solución · Ticket #${t.rawId}`}
                    onOpen={setModalContent}
                  />
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.dateSolved)}
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.dateClosed)}
                </td>
                <td className="px-4 py-3">
                  <ChipList items={t.attendedByAll} colorClass="bg-blue-50 text-blue-600" />
                </td>
                <td className="px-4 py-3">
                  <ChipList items={t.areas} colorClass="bg-violet-50 text-violet-600" />
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.lastFollowupAt)}
                </td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap font-mono text-xs">
                  {formatDateTime(t.lastTechResponseAt)}
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{t.resolvedBy || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TextModal content={modalContent} onClose={() => setModalContent(null)} />
    </div>
  );
}
