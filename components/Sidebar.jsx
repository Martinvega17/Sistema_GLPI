"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

const ACCENT_TEXT = {
  green: "text-signal-ok",
  blue: "text-signal-info",
  amber: "text-amber-400",
  pink: "text-pink-400",
  cyan: "text-cyan-400",
  rose: "text-rose-400",
};

// Ítems de cada sección del menú. Ambos apuntan a la misma ruta
// (/proyecto/[id]) que ya trae la tabla completa de tickets del sistema;
// "Pendientes" solo agrega ?estado=pendientes para que la vista abra
// filtrada en "Abiertos" en vez de "Todos" (ver app/proyecto/[category]/page.js).
function subItemsFor(categoryId) {
  return [
    { key: "tickets", label: "Tickets", href: `/proyecto/${categoryId}` },
    { key: "pendientes", label: "Pendientes", href: `/proyecto/${categoryId}?estado=pendientes` },
  ];
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openGroups, setOpenGroups] = useState(() => new Set());

  // Si estoy parado en /proyecto/[id], abre automáticamente ese grupo para
  // que el usuario vea de inmediato en qué sección está.
  useEffect(() => {
    const match = pathname?.match(/^\/proyecto\/([^/]+)/);
    if (match) {
      setOpenGroups((prev) => new Set(prev).add(match[1]));
    }
  }, [pathname]);

  function toggleGroup(id) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function isActive(href) {
    const [hrefPath, hrefQuery] = href.split("?");
    if (pathname !== hrefPath) return false;
    const currentEstado = searchParams.get("estado") || "";
    const hrefEstado = new URLSearchParams(hrefQuery || "").get("estado") || "";
    return currentEstado === hrefEstado;
  }

  return (
    <>
      {/* Fondo oscuro detrás del menú en móvil, para cerrarlo tocando fuera */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-40 shrink-0
          bg-base-900 border-r border-line flex flex-col
          transition-transform md:transition-[width] duration-200
          ${collapsed ? "md:w-16" : "md:w-64"} w-64
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center gap-2 px-4 border-b border-line shrink-0">
          <span className="text-signal-info text-lg">☰</span>
          {!collapsed && (
            <span className="font-display font-bold text-ink-hi truncate">Manager GLPI</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
          <Link
            href="/"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-colors ${
              pathname === "/"
                ? "text-ink-hi bg-base-800"
                : "text-ink-mid hover:text-ink-hi hover:bg-base-800/60"
            }`}
          >
            <span className="text-base">🏠</span>
            {!collapsed && <span>Inicio</span>}
          </Link>

          <Link
            href="/tickets"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-colors ${
              pathname === "/tickets"
                ? "text-ink-hi bg-base-800"
                : "text-ink-mid hover:text-ink-hi hover:bg-base-800/60"
            }`}
          >
            <span className="text-base">🗂️</span>
            {!collapsed && <span>Todos los tickets</span>}
          </Link>

          <div className="my-2 border-t border-line" />

          {CATEGORIES.map((category) => {
            const isOpen = openGroups.has(category.id);
            return (
              <div key={category.id}>
                <button
                  type="button"
                  onClick={() => toggleGroup(category.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-body transition-colors ${
                    ACCENT_TEXT[category.accent] || "text-ink-mid"
                  } hover:bg-base-800/60`}
                  title={category.label}
                >
                  <span className="text-base shrink-0">{category.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="font-display font-semibold flex-1 text-left truncate">
                        {category.label}
                      </span>
                      <span
                        className={`text-xs text-ink-lo transition-transform ${isOpen ? "rotate-180" : ""}`}
                      >
                        ▾
                      </span>
                    </>
                  )}
                </button>

                {!collapsed && isOpen && (
                  <div className="pb-1">
                    {subItemsFor(category.id).map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={onCloseMobile}
                        className={`flex items-center gap-2 pl-11 pr-4 py-2 text-sm font-body transition-colors ${
                          isActive(item.href)
                            ? "text-ink-hi bg-base-800"
                            : "text-ink-mid hover:text-ink-hi hover:bg-base-800/40"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
