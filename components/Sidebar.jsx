"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";

import cnsIcon from "@/public/icons/cns.png";
import unadmIcon from "@/public/icons/unadm.png";
import prepaIcon from "@/public/icons/prepa.png";
import secihtiIcon from "@/public/icons/secihti.png";
import mujeresIcon from "@/public/icons/mujeres.png";

const CATEGORY_ICONS = {
  cns: cnsIcon,
  unadm: unadmIcon,
  prepa: prepaIcon,
  secihti: secihtiIcon,
  mujeres: mujeresIcon,
  // "imss" no tiene logo todavía en /public/icons — cae al monograma de
  // abajo automáticamente (ver <CategoryLogo />).
};

function CategoryLogo({ category }) {
  const icon = CATEGORY_ICONS[category.id];
  if (icon) {
    return (
      <span className="h-7 w-7 rounded-md overflow-hidden shrink-0 bg-white border border-slate-200 flex items-center justify-center">
        <Image src={icon} alt={category.label} width={28} height={28} className="object-cover w-full h-full" />
      </span>
    );
  }
  return (
    <span className="h-7 w-7 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 bg-slate-100 text-slate-600">
      {category.label.slice(0, 2).toUpperCase()}
    </span>
  );
}

// Un grupo por categoría (proyecto/sistema), con 2 sub-enlaces: "Tickets"
// (todo el histórico) y "Pendientes" (solo lo que sigue abierto). Se navega
// con <Link> normal a /proyecto/[id] — el estado "activo" se calcula del
// pathname/searchParams actuales, no de un estado local, para que quede
// resaltado también si se llega por URL directa o al recargar la página.
function CategoryGroup({ category, pathname, searchParams }) {
  const basePath = `/proyecto/${category.id}`;
  const isThisCategory = pathname === basePath;
  const estado = searchParams.get("estado");
  const isPendientes = isThisCategory && estado === "pendientes";
  const isTickets = isThisCategory && estado !== "pendientes";

  const [open, setOpen] = useState(isThisCategory);

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
          isThisCategory ? "bg-amber-50" : "hover:bg-slate-50"
        }`}
      >
        <CategoryLogo category={category} />
        <span
          className={`flex-1 text-sm font-semibold uppercase tracking-wide truncate ${
            isThisCategory ? "text-amber-700" : "text-slate-700"
          }`}
        >
          {category.label}
        </span>
        <span className={`text-slate-400 text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="pb-2">
          <Link
            href={basePath}
            className={`flex items-center gap-2.5 pl-[3.1rem] pr-4 py-2 text-sm transition-colors ${
              isTickets ? "bg-amber-400 text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span aria-hidden>🎫</span>
            Tickets
          </Link>
          <Link
            href={`${basePath}?estado=pendientes`}
            className={`flex items-center gap-2.5 pl-[3.1rem] pr-4 py-2 text-sm transition-colors ${
              isPendientes ? "bg-amber-400 text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span aria-hidden>🕐</span>
            Pendientes
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInicio = pathname === "/";

  const body = (
    <aside
      className={`shrink-0 h-full border-r border-slate-200 bg-white flex flex-col transition-[width] duration-200 overflow-hidden ${
        collapsed ? "w-[72px]" : "w-72"
      }`}
    >
      <div className="h-16 shrink-0 flex items-center gap-2.5 px-4 border-b border-slate-100">
        <span className="text-amber-500 text-lg shrink-0" aria-hidden>
          ☰
        </span>
        {!collapsed && <span className="font-display font-bold text-slate-900 truncate">Manager GLPI</span>}
        <button
          onClick={onCloseMobile}
          className="md:hidden ml-auto text-slate-400 hover:text-slate-600"
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 border-b border-slate-100 transition-colors ${
            isInicio ? "bg-amber-50 text-amber-700 font-semibold" : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <span className="text-base shrink-0" aria-hidden>
            🏠
          </span>
          {!collapsed && <span className="text-sm">Inicio</span>}
        </Link>

        {!collapsed &&
          CATEGORIES.map((category) => (
            <CategoryGroup key={category.id} category={category} pathname={pathname} searchParams={searchParams} />
          ))}

        {collapsed &&
          CATEGORIES.map((category) => {
            const isActive = pathname === `/proyecto/${category.id}`;
            return (
              <Link
                key={category.id}
                href={`/proyecto/${category.id}`}
                title={category.label}
                className={`flex items-center justify-center py-3 border-b border-slate-100 ${
                  isActive ? "bg-amber-50" : "hover:bg-slate-50"
                }`}
              >
                <CategoryLogo category={category} />
              </Link>
            );
          })}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block h-screen sticky top-0">{body}</div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onCloseMobile} />
          <div className="relative h-full">{body}</div>
        </div>
      )}
    </>
  );
}
