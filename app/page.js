"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import InicioView from "@/components/InicioView";
import ToastNotifications from "@/components/ToastNotifications";

const REFRESH_INTERVAL_MS = 30_000;

export default function HomePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [lastFetchError, setLastFetchError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loadingSeconds, setLoadingSeconds] = useState(0);

  // Snapshot de la carga anterior (id -> dateModified) para detectar
  // tickets nuevos o con cambios entre refrescos. useRef porque no debe
  // disparar un re-render por sí solo.
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
            pushToast({
              type: "new",
              ticketId: t.id,
              title: `#${t.rawId} · ${t.systemLabel}`,
              subtitle: t.title,
            });
          } else if (prev.dateModified !== t.dateModified) {
            pushToast({
              type: "update",
              ticketId: t.id,
              title: `#${t.rawId} · ${t.systemLabel}`,
              subtitle: t.title,
            });
          }
        }
      }
      prevTicketsMapRef.current = new Map(json.tickets.map((t) => [t.id, { dateModified: t.dateModified }]));

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

  // Solo para la primera carga: cuenta los segundos que lleva esperando.
  useEffect(() => {
    if (data) return;
    const id = setInterval(() => setLoadingSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [data]);

  return (
    <div className="relative min-h-full bg-slate-50">
      <ToastNotifications toasts={toasts} onDismiss={dismissToast} />

      {lastFetchError && (
        <div className="m-4 rounded-md border border-signal-crit/40 bg-signal-crit/10 text-signal-crit text-sm font-body px-4 py-2">
          {lastFetchError}
        </div>
      )}

      {data?.errors?.length > 0 && (
        <div className="m-4 rounded-md border border-signal-warn/40 bg-signal-warn/10 text-signal-warn text-sm font-body px-4 py-2">
          {data.errors.map((e, i) => (
            <div key={i}>
              ⚠ {e.system}: {e.error}
            </div>
          ))}
        </div>
      )}

      {data?.demoMode && (
        <div className="m-4 text-signal-warn text-xs font-mono border border-signal-warn/40 rounded px-2 py-1 inline-block">
          MODO DEMO — datos de ejemplo
        </div>
      )}

      {!data && !lastFetchError && (
        <div className="p-8 text-slate-500 font-mono text-sm">
          Conectando con los sistemas… ({loadingSeconds}s)
          {loadingSeconds >= 20 && (
            <div className="mt-2 text-signal-warn text-xs max-w-md">
              Esto está tardando más de lo normal — puede ser que algún GLPI esté respondiendo lento
              por VPN/red. Revisa la terminal donde corre <code>npm run dev</code>: ahí se imprime el
              avance de cada sistema (sesión, páginas de tickets, o el error si falló).
            </div>
          )}
        </div>
      )}

      {data && (
        <InicioView data={data} onGoToSystem={(systemId) => router.push(`/proyecto/${systemId}?estado=pendientes`)} />
      )}
    </div>
  );
}
