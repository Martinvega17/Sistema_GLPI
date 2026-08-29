"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ProjectTicketTable from "@/components/ProjectTicketTable";

const REFRESH_INTERVAL_MS = 60_000; // más lento que /tickets: esta vista trae campos más pesados por ticket
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const SEARCH_DEBOUNCE_MS = 400;

// Caché EN MEMORIA DEL NAVEGADOR (no del servidor), a nivel de módulo — por
// eso vive FUERA del componente: así sobrevive aunque el componente se
// desmonte/vuelva a montar (p. ej. al navegar Tickets -> Pendientes ->
// Tickets del mismo proyecto). Guarda la última respuesta por combinación
// exacta de filtros (categoría+página+tamaño+sistema+estado+búsqueda).
//
// Con esto, volver a una pestaña/filtro que ya viste hace poco muestra los
// datos AL INSTANTE (sin "Cargando…" ni golpear /api/project-tickets otra
// vez) mientras siga fresco; si ya pasó el TTL, se refresca en segundo
// plano sin bloquear lo que ya se está mostrando.
const pageCache = new Map(); // key -> { data, ts }
const CACHE_TTL_MS = 20_000;

export default function ProjectPage() {
  const { category: categoryId } = useParams();
  const searchParams = useSearchParams();
  // El menú lateral manda ?estado=pendientes en el enlace "Pendientes" de
  // cada sistema; sin ese parámetro (enlace "Tickets") la vista abre
  // mostrando todo el histórico, igual que antes.
  const initialStatusFilter = searchParams.get("estado") === "pendientes" ? "open" : "all";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [systemFilter, setSystemFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter); // open | all | closed
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  // Debounce: espera a que el usuario deje de teclear antes de pedirle a
  // la API la lista filtrada (si no, cada letra dispararía una carga).
  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(searchInput.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [searchInput]);

  // Cualquier cambio de filtro regresa a la página 1 (si no, podrías quedar
  // parado en una página que ya no existe para el nuevo filtro).
  useEffect(() => {
    setPage(1);
  }, [categoryId, systemFilter, statusFilter, searchQuery, pageSize]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      category: categoryId,
      page: String(page),
      pageSize: String(pageSize),
      system: systemFilter,
      estado: statusFilter,
    });
    if (searchQuery) params.set("q", searchQuery);
    const cacheKey = params.toString();

    const cached = pageCache.get(cacheKey);
    const isFresh = cached && Date.now() - cached.ts < CACHE_TTL_MS;

    if (cached) {
      // Ya lo teníamos: se muestra de inmediato, sin parpadeo de "Cargando…"
      // ni tocar el servidor (si además sigue fresco, ni se revalida).
      setData(cached.data);
      setError(null);
      setLoading(false);
    } else {
      setLoading(true);
    }

    if (isFresh) {
      return () => controller.abort();
    }

    async function load() {
      if (!pageCache.has(cacheKey)) setLoading(true);
      try {
        const res = await fetch(`/api/project-tickets?${cacheKey}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const json = await res.json();
        pageCache.set(cacheKey, { data: json, ts: Date.now() });
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error al consultar /api/project-tickets");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    const id = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      controller.abort();
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, page, pageSize, systemFilter, statusFilter, searchQuery]);

  // Si el usuario navega entre "Tickets" y "Pendientes" del mismo sistema
  // desde el menú lateral, la ruta (/proyecto/[category]) es la misma y
  // Next no vuelve a montar este componente: hay que reaccionar al cambio
  // de ?estado explícitamente para que el filtro se actualice.
  useEffect(() => {
    setStatusFilter(searchParams.get("estado") === "pendientes" ? "open" : "all");
  }, [categoryId, searchParams]);

  const systemOptions = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.bySystem).map(([id, s]) => ({ id, label: s.label }));
  }, [data]);

  const pagination = data?.pagination;

  return (
    <main className="min-h-full bg-slate-50 max-w-[1600px] mx-auto px-6 py-8 flex flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {data?.category?.label || "Cargando…"}
          </h1>
          <p className="text-slate-500 text-sm font-body mt-1">{data?.category?.description}</p>
        </div>
        <div className="text-slate-400 text-xs font-mono">
          {data ? `actualizado ${new Date(data.generatedAt).toLocaleTimeString("es-MX")}` : ""}
        </div>
      </header>

      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 text-rose-600 text-sm font-body px-4 py-2">
          {error}
        </div>
      )}

      {data?.errors?.length > 0 && (
        <div className="rounded-md border border-amber-200 bg-amber-50 text-amber-700 text-sm font-body px-4 py-2">
          {data.errors.map((e, i) => (
            <div key={i}>
              ⚠ {e.system}: {e.error}
            </div>
          ))}
        </div>
      )}

      {data && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {systemOptions.length > 1 && (
              <>
                <button
                  onClick={() => setSystemFilter("all")}
                  className={`px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${
                    systemFilter === "all"
                      ? "border-blue-300 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Todos
                </button>
                {systemOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSystemFilter(s.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${
                      systemFilter === s.id
                        ? "border-blue-300 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
                <span className="w-px h-5 bg-slate-200 mx-1" />
              </>
            )}
            {[
              ["open", "Abiertos"],
              ["all", "Todos"],
              ["closed", "Cerrados"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${
                  statusFilter === key
                    ? "border-blue-300 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                }`}
              >
                {label}
              </button>
            ))}
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar ticket (folio, título, solicitante...)"
              className="ml-auto w-72 px-3 py-1.5 rounded-md text-sm font-body border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
            <ProjectTicketTable tickets={data.tickets} />
          </div>

          {pagination && pagination.totalCount > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 font-body">
                Mostrando{" "}
                <span className="text-slate-800 font-semibold">
                  {(pagination.page - 1) * pagination.pageSize + 1}–
                  {Math.min(pagination.page * pagination.pageSize, pagination.totalCount)}
                </span>{" "}
                de <span className="text-slate-800 font-semibold">{pagination.totalCount}</span> tickets
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-sm font-body text-slate-500">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="px-2 py-1.5 rounded-md text-sm font-body border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-blue-400 transition-colors"
                  >
                    {PAGE_SIZE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  por página
                </label>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={pagination.page <= 1 || loading}
                  className="px-3 py-1.5 rounded-md text-sm font-body border border-slate-200 bg-white text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Anterior
                </button>
                <span className="text-sm font-body text-slate-500 px-1">
                  Página <span className="text-slate-800 font-semibold">{pagination.page}</span> de{" "}
                  {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={pagination.page >= pagination.totalPages || loading}
                  className="px-3 py-1.5 rounded-md text-sm font-body border border-slate-200 bg-white text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {!data && !error && <div className="text-slate-500 font-mono text-sm">Cargando tickets del proyecto…</div>}
    </main>
  );
}
