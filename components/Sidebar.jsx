"use client";

import { useState } from "react";

const SYSTEM_INITIAL = {
  cns: "C",
  unadm: "U",
  prepa: "P",
  secihti: "S",
  mujeres: "M",
};

export default function Sidebar({ systems, activeView, onNavigate, toastCount }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`shrink-0 border-r border-line bg-base-900 flex flex-col transition-[width] duration-200 ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-line">
        {!collapsed && <span className="font-display font-bold text-ink-hi">Ops · GLPI</span>}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-ink-mid hover:text-ink-hi p-1.5 rounded-md hover:bg-base-800 transition-colors"
          aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          title={collapsed ? "Expandir" : "Colapsar"}
        >
          ☰
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 flex flex-col gap-1">
        <button
          onClick={() => onNavigate("inicio")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${
            activeView === "inicio"
              ? "bg-signal-warn/15 text-signal-warn border border-signal-warn/40"
              : "text-ink-mid hover:text-ink-hi hover:bg-base-800 border border-transparent"
          }`}
        >
          <span className="text-base">🏠</span>
          {!collapsed && <span>Inicio</span>}
        </button>

        <div className={`mt-3 mb-1 px-3 text-[10px] uppercase tracking-wider text-ink-lo ${collapsed ? "text-center" : ""}`}>
          {collapsed ? "—" : "Sistemas"}
        </div>

        {systems.map((sys) => {
          const isActive = activeView === sys.id;
          const summary = sys.summary;
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
              <span className="h-6 w-6 rounded-full bg-base-700 flex items-center justify-center text-[11px] font-mono shrink-0">
                {SYSTEM_INITIAL[sys.id] || sys.label[0]}
              </span>
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

      {!collapsed && (
        <div className="border-t border-line p-3 flex items-center justify-between">
          <span className="text-[11px] text-ink-lo font-mono">🔔 {toastCount || 0}</span>
          <span className="h-7 w-7 rounded-full bg-signal-info/20 text-signal-info flex items-center justify-center text-[11px] font-mono font-semibold">
            CT
          </span>
        </div>
      )}
    </aside>
  );
}
