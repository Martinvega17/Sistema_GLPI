"use client";

const SLA_BADGE = {
  breach: "bg-signal-crit/15 text-signal-crit border-signal-crit/40",
  warn: "bg-signal-warn/15 text-signal-warn border-signal-warn/40",
  ok: "bg-signal-ok/10 text-signal-ok border-signal-ok/30",
  closed: "bg-ink-lo/10 text-ink-lo border-ink-lo/30",
};

const SLA_LABEL = {
  breach: "VENCIDO",
  warn: "POR VENCER",
  ok: "OK",
  closed: "CERRADO",
};

export default function TicketTable({ tickets, onSelectTicket, selectedId }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-base-900 p-8 text-center text-ink-mid font-body">
        No hay tickets que coincidan con el filtro actual.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-base-900 shadow-panel overflow-hidden">
      <div className="max-h-[560px] overflow-y-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-base-800 text-ink-mid text-xs uppercase tracking-wider font-body">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Sistema</th>
              <th className="text-left px-4 py-2 font-medium">Ticket</th>
              <th className="text-left px-4 py-2 font-medium">Prioridad</th>
              <th className="text-left px-4 py-2 font-medium">Estado</th>
              <th className="text-right px-4 py-2 font-medium">Abierto hace</th>
              <th className="text-left px-4 py-2 font-medium">SLA</th>
            </tr>
          </thead>
          <tbody className="font-body">
            {tickets.map((t) => (
              <tr
                key={t.id}
                onClick={() => onSelectTicket(t)}
                className={`border-t border-line cursor-pointer transition-colors ${
                  selectedId === t.id ? "bg-base-700" : "hover:bg-base-800"
                }`}
              >
                <td className="px-4 py-2 text-ink-mid whitespace-nowrap">{t.systemLabel}</td>
                <td className="px-4 py-2 text-ink-hi">
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-signal-info hover:underline"
                  >
                    #{t.rawId} {t.title}
                  </a>
                </td>
                <td className="px-4 py-2 text-ink-mid whitespace-nowrap">{t.priority}</td>
                <td className="px-4 py-2 text-ink-mid whitespace-nowrap">{t.status}</td>
                <td className="px-4 py-2 text-right font-mono text-ink-mid whitespace-nowrap">
                  {t.ageHours != null ? `${Math.round(t.ageHours)}h` : "—"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded border text-xs font-mono ${SLA_BADGE[t.slaStatus]}`}
                  >
                    {SLA_LABEL[t.slaStatus]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
