"use client";

import { useState } from "react";
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
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenMobileMenu={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          collapsed={collapsed}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
