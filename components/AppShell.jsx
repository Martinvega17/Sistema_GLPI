"use client";

import { Suspense, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Shell persistente de la app: el menú lateral y la barra superior viven
// aquí (en app/layout.js) en vez de en cada página, así que al navegar
// entre "Tickets de UnADM", "Pendientes de CNS", etc. (todas rutas de
// Next.js normales bajo /proyecto/[id]) NO hay recarga de página completa:
// Next solo vuelve a renderizar lo que cambia dentro de <main>, mientras el
// menú y la campana de notificaciones se quedan fijos.
export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar usa useSearchParams() (para resaltar Tickets/Pendientes
          activo) — Next exige que eso vaya dentro de un <Suspense>, aunque
          aquí se resuelve casi instantáneo porque no depende de red. */}
      <Suspense fallback={<div className="hidden md:block w-72 h-screen bg-white border-r border-slate-200" />}>
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </Suspense>

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenMobileMenu={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          collapsed={collapsed}
        />
        {/* bg-slate-50: mismo tono claro que el sidebar, para que Inicio no
            se sienta "cortado" contra un fondo oscuro. Las vistas que sí
            son oscuras (Tickets por proyecto, /tickets) ponen su propio
            fondo oscuro sobre este, así que no se ven afectadas. */}
        <main className="flex-1 min-w-0 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
