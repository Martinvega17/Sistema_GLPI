"use client";

import { useEffect } from "react";

// Tiempo que cada toast permanece visible antes de auto-descartarse.
const TOAST_DURATION_MS = 8000;

// toast = { id, type: "new" | "update", title, subtitle }
// type "new"    -> ticket nuevo (verde, signal-ok)
// type "update" -> respuesta/seguimiento nuevo en un ticket existente (amarillo, signal-warn)
export default function ToastNotifications({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const id = setTimeout(() => onDismiss(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(id);
  }, [toast.id, onDismiss]);

  const isNew = toast.type === "new";
  const colorClasses = isNew
    ? "border-signal-ok/50 bg-signal-ok/10"
    : "border-signal-warn/50 bg-signal-warn/10";
  const dotClasses = isNew ? "bg-signal-ok" : "bg-signal-warn";
  const labelClasses = isNew ? "text-signal-ok" : "text-signal-warn";

  return (
    <div
      className={`pointer-events-auto rounded-lg border ${colorClasses} bg-base-900 shadow-panel px-4 py-3 flex items-start gap-3 animate-toast_in`}
      role="status"
    >
      <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${dotClasses}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[11px] uppercase tracking-wider font-body font-semibold ${labelClasses}`}>
          {isNew ? "Ticket nuevo" : "Nueva respuesta"}
        </p>
        <p className="text-sm text-ink-hi font-body leading-snug mt-0.5 truncate">{toast.title}</p>
        {toast.subtitle && (
          <p className="text-xs text-ink-mid font-body mt-0.5 truncate">{toast.subtitle}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-ink-lo hover:text-ink-hi text-xs shrink-0 leading-none px-1"
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
}
