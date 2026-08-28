"use client";

import { useState } from "react";
import Image from "next/image"; // Si usas Next.js

// Importa tus imágenes
import cnsIcon from "@/public/icons/cns.png";
import unadmIcon from "@/public/icons/unadm.png";
import prepaIcon from "@/public/icons/prepa.png";
import secihtiIcon from "@/public/icons/secihti.png";
import mujeresIcon from "@/public/icons/mujeres.png";

const SYSTEM_ICONS = {
  cns: cnsIcon,
  unadm: unadmIcon,
  prepa: prepaIcon,
  secihti: secihtiIcon,
  mujeres: mujeresIcon,
};

export default function Sidebar({ systems, activeView, onNavigate, toastCount }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`shrink-0 border-r border-line bg-base-900 flex flex-col transition-[width] duration-200 ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      {/* ... resto del código ... */}

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 flex flex-col gap-1">
        {/* ... botón Inicio ... */}

        <div className={`mt-3 mb-1 px-3 text-[10px] uppercase tracking-wider text-ink-lo ${collapsed ? "text-center" : ""}`}>
          {collapsed ? "—" : "Sistemas"}
        </div>

        {systems.map((sys) => {
          const isActive = activeView === sys.id;
          const summary = sys.summary;
          const icon = SYSTEM_ICONS[sys.id];
          
          return (
            <button
              key={sys.id}
              onClick={() => onNavigate(sys.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
                isActive
                  ? "bg-base-800 text-ink-hi border border-signal-info/40"
                  : "text-ink-mid hover:text-ink-hi hover:bg-base-800 border border-transparent"
              }`}
              title={sys.label}
            >
              <div className="h-6 w-6 rounded-full bg-base-700 flex items-center justify-center shrink-0 overflow-hidden">
                {icon ? (
                  <Image 
                    src={icon} 
                    alt={sys.label}
                    width={24}
                    height={24}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-[11px] font-mono">
                    {sys.label[0]}
                  </span>
                )}
              </div>
              {!collapsed && (
                <span className="flex-1 text-left truncate">{sys.label}</span>
              )}
              {!collapsed && summary != null && (
                <span className="text-[11px] font-mono text-ink-lo">{summary}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ... resto del código ... */}
    </aside>
  );
}