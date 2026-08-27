(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/proyecto/[category]/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProjectTicketTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ProjectTicketTable.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const REFRESH_INTERVAL_MS = 60_000; // más lento que /tickets: esta vista trae campos más pesados por ticket
const PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;
function ProjectPage() {
    _s();
    const { category: categoryId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    // El menú lateral manda ?estado=pendientes en el enlace "Pendientes" de
    // cada sistema; sin ese parámetro (enlace "Tickets") la vista abre
    // mostrando todo el histórico, igual que antes.
    const initialStatusFilter = searchParams.get("estado") === "pendientes" ? "open" : "all";
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [systemFilter, setSystemFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStatusFilter); // open | all | closed
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Debounce: espera a que el usuario deje de teclear antes de pedirle a
    // la API la lista filtrada (si no, cada letra dispararía una carga).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectPage.useEffect": ()=>{
            const id = setTimeout({
                "ProjectPage.useEffect.id": ()=>setSearchQuery(searchInput.trim())
            }["ProjectPage.useEffect.id"], SEARCH_DEBOUNCE_MS);
            return ({
                "ProjectPage.useEffect": ()=>clearTimeout(id)
            })["ProjectPage.useEffect"];
        }
    }["ProjectPage.useEffect"], [
        searchInput
    ]);
    // Cualquier cambio de filtro regresa a la página 1 (si no, podrías quedar
    // parado en una página que ya no existe para el nuevo filtro).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectPage.useEffect": ()=>{
            setPage(1);
        }
    }["ProjectPage.useEffect"], [
        categoryId,
        systemFilter,
        statusFilter,
        searchQuery
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectPage.useEffect": ()=>{
            const controller = new AbortController();
            async function load() {
                setLoading(true);
                try {
                    const params = new URLSearchParams({
                        category: categoryId,
                        page: String(page),
                        pageSize: String(PAGE_SIZE),
                        system: systemFilter,
                        estado: statusFilter
                    });
                    if (searchQuery) params.set("q", searchQuery);
                    const res = await fetch(`/api/project-tickets?${params.toString()}`, {
                        cache: "no-store",
                        signal: controller.signal
                    });
                    const json = await res.json();
                    setData(json);
                    setError(null);
                } catch (err) {
                    if (err.name !== "AbortError") {
                        setError(err.message || "Error al consultar /api/project-tickets");
                    }
                } finally{
                    setLoading(false);
                }
            }
            load();
            const id = setInterval(load, REFRESH_INTERVAL_MS);
            return ({
                "ProjectPage.useEffect": ()=>{
                    controller.abort();
                    clearInterval(id);
                }
            })["ProjectPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ProjectPage.useEffect"], [
        categoryId,
        page,
        systemFilter,
        statusFilter,
        searchQuery
    ]);
    // Si el usuario navega entre "Tickets" y "Pendientes" del mismo sistema
    // desde el menú lateral, la ruta (/proyecto/[category]) es la misma y
    // Next no vuelve a montar este componente: hay que reaccionar al cambio
    // de ?estado explícitamente para que el filtro se actualice.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProjectPage.useEffect": ()=>{
            setStatusFilter(searchParams.get("estado") === "pendientes" ? "open" : "all");
        }
    }["ProjectPage.useEffect"], [
        categoryId,
        searchParams
    ]);
    const systemOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectPage.useMemo[systemOptions]": ()=>{
            if (!data) return [];
            return Object.entries(data.bySystem).map({
                "ProjectPage.useMemo[systemOptions]": ([id, s])=>({
                        id,
                        label: s.label
                    })
            }["ProjectPage.useMemo[systemOptions]"]);
        }
    }["ProjectPage.useMemo[systemOptions]"], [
        data
    ]);
    const pagination = data?.pagination;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-[1600px] mx-auto px-6 py-8 flex flex-col gap-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-wrap items-end justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-display text-2xl font-bold text-ink-hi",
                                children: data?.category?.label || "Cargando…"
                            }, void 0, false, {
                                fileName: "[project]/app/proyecto/[category]/page.js",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body mt-1",
                                children: data?.category?.description
                            }, void 0, false, {
                                fileName: "[project]/app/proyecto/[category]/page.js",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/proyecto/[category]/page.js",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-ink-lo text-xs font-mono",
                        children: data ? `actualizado ${new Date(data.generatedAt).toLocaleTimeString("es-MX")}` : ""
                    }, void 0, false, {
                        fileName: "[project]/app/proyecto/[category]/page.js",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/proyecto/[category]/page.js",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-signal-crit/40 bg-signal-crit/10 text-signal-crit text-sm font-body px-4 py-2",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/proyecto/[category]/page.js",
                lineNumber: 110,
                columnNumber: 9
            }, this),
            data?.errors?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-signal-warn/40 bg-signal-warn/10 text-signal-warn text-sm font-body px-4 py-2",
                children: data.errors.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "⚠ ",
                            e.system,
                            ": ",
                            e.error
                        ]
                    }, i, true, {
                        fileName: "[project]/app/proyecto/[category]/page.js",
                        lineNumber: 118,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/proyecto/[category]/page.js",
                lineNumber: 116,
                columnNumber: 9
            }, this),
            data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            systemOptions.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSystemFilter("all"),
                                        className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${systemFilter === "all" ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                                        children: "Todos"
                                    }, void 0, false, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    systemOptions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSystemFilter(s.id),
                                            className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${systemFilter === s.id ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                                            children: s.label
                                        }, s.id, false, {
                                            fileName: "[project]/app/proyecto/[category]/page.js",
                                            lineNumber: 141,
                                            columnNumber: 19
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-px h-5 bg-line mx-1"
                                    }, void 0, false, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/proyecto/[category]/page.js",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this),
                            [
                                [
                                    "open",
                                    "Abiertos"
                                ],
                                [
                                    "all",
                                    "Todos"
                                ],
                                [
                                    "closed",
                                    "Cerrados"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStatusFilter(key),
                                    className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${statusFilter === key ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                                    children: label
                                }, key, false, {
                                    fileName: "[project]/app/proyecto/[category]/page.js",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchInput,
                                onChange: (e)=>setSearchInput(e.target.value),
                                placeholder: "Buscar ticket (folio, título, solicitante...)",
                                className: "ml-auto w-72 px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-hi placeholder-ink-lo focus:outline-none focus:border-signal-info transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/app/proyecto/[category]/page.js",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/proyecto/[category]/page.js",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: loading ? "opacity-60 transition-opacity" : "transition-opacity",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ProjectTicketTable$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            tickets: data.tickets
                        }, void 0, false, {
                            fileName: "[project]/app/proyecto/[category]/page.js",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/proyecto/[category]/page.js",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    pagination && pagination.totalCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-ink-mid font-body",
                                children: [
                                    "Mostrando",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-ink-hi font-semibold",
                                        children: [
                                            (pagination.page - 1) * pagination.pageSize + 1,
                                            "–",
                                            Math.min(pagination.page * pagination.pageSize, pagination.totalCount)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    "de ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-ink-hi font-semibold",
                                        children: pagination.totalCount
                                    }, void 0, false, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 194,
                                        columnNumber: 20
                                    }, this),
                                    " tickets"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/proyecto/[category]/page.js",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                        disabled: pagination.page <= 1 || loading,
                                        className: "px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                                        children: "← Anterior"
                                    }, void 0, false, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-body text-ink-mid px-1",
                                        children: [
                                            "Página ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-ink-hi font-semibold",
                                                children: pagination.page
                                            }, void 0, false, {
                                                fileName: "[project]/app/proyecto/[category]/page.js",
                                                lineNumber: 205,
                                                columnNumber: 26
                                            }, this),
                                            " de",
                                            " ",
                                            pagination.totalPages
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 204,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.min(pagination.totalPages, p + 1)),
                                        disabled: pagination.page >= pagination.totalPages || loading,
                                        className: "px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                                        children: "Siguiente →"
                                    }, void 0, false, {
                                        fileName: "[project]/app/proyecto/[category]/page.js",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/proyecto/[category]/page.js",
                                lineNumber: 196,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/proyecto/[category]/page.js",
                        lineNumber: 187,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/proyecto/[category]/page.js",
                lineNumber: 126,
                columnNumber: 9
            }, this),
            !data && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-ink-mid font-mono text-sm",
                children: "Cargando tickets del proyecto…"
            }, void 0, false, {
                fileName: "[project]/app/proyecto/[category]/page.js",
                lineNumber: 221,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/proyecto/[category]/page.js",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_s(ProjectPage, "roREpx7C1QGP74S/i42YwuxK/O8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ProjectPage;
var _c;
__turbopack_context__.k.register(_c, "ProjectPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ProjectTicketTable.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectTicketTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
const STATUS_DOT = {
    1: "bg-signal-info",
    2: "bg-signal-info",
    3: "bg-signal-info",
    4: "bg-signal-warn",
    5: "bg-signal-ok",
    6: "bg-ink-lo"
};
// Definición de columnas. "sortKey" solo se define en las columnas que el
// usuario pidió que fueran ordenables (Folio, Título, Fecha de apertura,
// Fecha de solución, Última retro, Última respuesta del área técnica).
const COLUMNS = [
    {
        key: "rawId",
        label: "Folio",
        sortKey: "rawId",
        type: "number"
    },
    {
        key: "title",
        label: "Título",
        sortKey: "title",
        type: "string"
    },
    {
        key: "content",
        label: "Descripción"
    },
    {
        key: "status",
        label: "Estado"
    },
    {
        key: "dateCreated",
        label: "Fecha de apertura",
        sortKey: "dateCreated",
        type: "date"
    },
    {
        key: "requester",
        label: "Solicitante"
    },
    {
        key: "solution",
        label: "Descripción de la solución"
    },
    {
        key: "dateSolved",
        label: "Fecha de solución",
        sortKey: "dateSolved",
        type: "date"
    },
    {
        key: "dateClosed",
        label: "Fecha de cierre"
    },
    {
        key: "attendedByAll",
        label: "Personal que atendió"
    },
    {
        key: "areas",
        label: "Áreas asignadas"
    },
    {
        key: "lastFollowupAt",
        label: "Última retro",
        sortKey: "lastFollowupAt",
        type: "date"
    },
    {
        key: "lastTechResponseAt",
        label: "Última respuesta del área técnica",
        sortKey: "lastTechResponseAt",
        type: "date"
    },
    {
        key: "resolvedBy",
        label: "Personal que resolvió"
    }
];
function formatDateTime(v) {
    if (!v) return "—";
    const d = new Date(v.includes("T") ? v : v.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
function compareValues(a, b, type) {
    if (type === "number") return (Number(a) || 0) - (Number(b) || 0);
    if (type === "date") {
        const da = a ? new Date(a.replace(" ", "T")).getTime() : -Infinity;
        const db = b ? new Date(b.replace(" ", "T")).getTime() : -Infinity;
        return da - db;
    }
    return String(a || "").localeCompare(String(b || ""), "es");
}
function ExpandableText({ text, emptyLabel = "—", linkLabel = "Leer más" }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!text) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-ink-lo",
        children: emptyLabel
    }, void 0, false, {
        fileName: "[project]/components/ProjectTicketTable.jsx",
        lineNumber: 53,
        columnNumber: 21
    }, this);
    const isLong = text.length > 90;
    const preview = isLong && !expanded ? `${text.slice(0, 90)}…` : text;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-[260px] whitespace-pre-line",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: preview
            }, void 0, false, {
                fileName: "[project]/components/ProjectTicketTable.jsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            isLong && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded((v)=>!v),
                className: "block text-signal-info hover:underline text-xs mt-0.5",
                children: expanded ? "Ver menos" : linkLabel
            }, void 0, false, {
                fileName: "[project]/components/ProjectTicketTable.jsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ProjectTicketTable.jsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(ExpandableText, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = ExpandableText;
function ChipList({ items, colorClass = "bg-base-700 text-ink-mid", max = 2 }) {
    _s1();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const list = items || [];
    if (list.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-ink-lo",
        children: "—"
    }, void 0, false, {
        fileName: "[project]/components/ProjectTicketTable.jsx",
        lineNumber: 74,
        columnNumber: 33
    }, this);
    const visible = expanded ? list : list.slice(0, max);
    const remaining = list.length - visible.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1 max-w-[220px]",
        children: [
            visible.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-block rounded px-1.5 py-0.5 text-xs w-fit ${colorClass}`,
                    children: item
                }, i, false, {
                    fileName: "[project]/components/ProjectTicketTable.jsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this)),
            remaining > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded(true),
                className: "text-left text-xs text-signal-info hover:underline",
                children: [
                    "+ ",
                    remaining,
                    " más · Ver todos"
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProjectTicketTable.jsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            expanded && list.length > max && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded(false),
                className: "text-left text-xs text-ink-lo hover:underline",
                children: "Ver menos"
            }, void 0, false, {
                fileName: "[project]/components/ProjectTicketTable.jsx",
                lineNumber: 90,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ProjectTicketTable.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s1(ChipList, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c1 = ChipList;
function ProjectTicketTable({ tickets }) {
    _s2();
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // { key, direction, type }
    const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ProjectTicketTable.useMemo[sorted]": ()=>{
            if (!sort) return tickets;
            const copy = [
                ...tickets
            ];
            copy.sort({
                "ProjectTicketTable.useMemo[sorted]": (a, b)=>{
                    const cmp = compareValues(a[sort.key], b[sort.key], sort.type);
                    return sort.direction === "desc" ? -cmp : cmp;
                }
            }["ProjectTicketTable.useMemo[sorted]"]);
            return copy;
        }
    }["ProjectTicketTable.useMemo[sorted]"], [
        tickets,
        sort
    ]);
    function toggleSort(col) {
        if (!col.sortKey) return;
        setSort((prev)=>{
            if (!prev || prev.key !== col.sortKey) {
                return {
                    key: col.sortKey,
                    direction: "asc",
                    type: col.type
                };
            }
            return {
                key: col.sortKey,
                direction: prev.direction === "asc" ? "desc" : "asc",
                type: col.type
            };
        });
    }
    if (tickets.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border border-line bg-base-900 p-8 text-center text-ink-mid font-body",
            children: "No hay tickets que coincidan con el filtro actual."
        }, void 0, false, {
            fileName: "[project]/components/ProjectTicketTable.jsx",
            lineNumber: 123,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-line bg-base-900 shadow-panel overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-h-[640px] overflow-auto scrollbar-thin",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "text-sm border-collapse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "sticky top-0 z-10 bg-base-800 text-ink-mid text-xs uppercase tracking-wider font-body",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: COLUMNS.map((col)=>{
                                const isSorted = sort?.key === col.sortKey && col.sortKey;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: `text-left px-4 py-2 font-medium whitespace-nowrap border-b border-line ${col.sortKey ? "cursor-pointer select-none hover:text-ink-hi" : ""}`,
                                    onClick: ()=>toggleSort(col),
                                    children: [
                                        col.sortKey && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-ink-lo mr-1",
                                            children: "Ordenar por"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 145,
                                            columnNumber: 37
                                        }, this),
                                        col.label,
                                        isSorted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1",
                                            children: sort.direction === "asc" ? "▲" : "▼"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 147,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, col.key, true, {
                                    fileName: "[project]/components/ProjectTicketTable.jsx",
                                    lineNumber: 138,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/ProjectTicketTable.jsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ProjectTicketTable.jsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "font-body",
                        children: sorted.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-t border-line hover:bg-base-800/60 align-top",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-signal-info font-mono whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: t.url,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "hover:underline",
                                            children: t.rawId
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 157,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-hi max-w-[220px]",
                                        children: t.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExpandableText, {
                                            text: t.content
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 162,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5 text-ink-mid",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `h-1.5 w-1.5 rounded-full ${STATUS_DOT[t.statusId] || "bg-ink-lo"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/ProjectTicketTable.jsx",
                                                    lineNumber: 167,
                                                    columnNumber: 21
                                                }, this),
                                                t.status
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 166,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs",
                                        children: formatDateTime(t.dateCreated)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 171,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap",
                                        children: t.requester || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExpandableText, {
                                            text: t.solution,
                                            linkLabel: "Ver solución"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 176,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs",
                                        children: formatDateTime(t.dateSolved)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 178,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs",
                                        children: formatDateTime(t.dateClosed)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 181,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChipList, {
                                            items: t.attendedByAll,
                                            colorClass: "bg-signal-info/10 text-signal-info"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 184,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChipList, {
                                            items: t.areas,
                                            colorClass: "bg-[#B285F0]/10 text-[#B285F0]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/ProjectTicketTable.jsx",
                                            lineNumber: 188,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 187,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs",
                                        children: formatDateTime(t.lastFollowupAt)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 190,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap font-mono text-xs",
                                        children: formatDateTime(t.lastTechResponseAt)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 193,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-ink-mid whitespace-nowrap",
                                        children: t.resolvedBy || "—"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ProjectTicketTable.jsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, t.id, true, {
                                fileName: "[project]/components/ProjectTicketTable.jsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ProjectTicketTable.jsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ProjectTicketTable.jsx",
                lineNumber: 132,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ProjectTicketTable.jsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ProjectTicketTable.jsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s2(ProjectTicketTable, "FaXmdoclbEsiDNOAXd9wKBn3rz8=");
_c2 = ProjectTicketTable;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ExpandableText");
__turbopack_context__.k.register(_c1, "ChipList");
__turbopack_context__.k.register(_c2, "ProjectTicketTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_028tyng._.js.map