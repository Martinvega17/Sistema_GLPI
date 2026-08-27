module.exports = [
"[project]/app/tickets/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusStrip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatusStrip.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatCards$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatCards.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TicketTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TicketTable.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AssistantPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AssistantPanel.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ToastNotifications$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ToastNotifications.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$statusFilters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/statusFilters.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
const REFRESH_INTERVAL_MS = 30_000;
function DashboardPage() {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeSystem, setActiveSystem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [slaFilter, setSlaFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("open"); // open | all | closed | breach | warn
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all"); // ver lib/statusFilters.js
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedTicket, setSelectedTicket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastFetchError, setLastFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Snapshot de la carga anterior (id -> dateModified) para poder comparar
    // contra la carga nueva y detectar tickets nuevos o con cambios. Es un
    // useRef (no state) porque no necesita disparar un re-render por sí solo.
    // null = todavía no hubo una primera carga exitosa (para no disparar
    // notificaciones de "nuevo ticket" para TODO el histórico al abrir la página).
    const prevTicketsMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    function pushToast(toast) {
        const id = `${toast.type}-${toast.ticketId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev)=>[
                ...prev,
                {
                    ...toast,
                    id
                }
            ]);
    }
    function dismissToast(id) {
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    }
    async function load() {
        try {
            const res = await fetch("/api/tickets", {
                cache: "no-store"
            });
            const json = await res.json();
            const prevMap = prevTicketsMapRef.current;
            if (prevMap) {
                for (const t of json.tickets){
                    const prev = prevMap.get(t.id);
                    if (!prev) {
                        // No estaba en la carga anterior -> ticket nuevo (verde).
                        pushToast({
                            type: "new",
                            ticketId: t.id,
                            title: `#${t.rawId} · ${t.systemLabel}`,
                            subtitle: t.title
                        });
                    } else if (prev.dateModified !== t.dateModified) {
                        // Ya existía, pero su fecha de modificación cambió -> lo más
                        // probable es que le hayan respondido o cambiado de estado
                        // (amarillo). No distinguimos el motivo exacto porque
                        // consultar los seguimientos de CADA ticket en cada refresco de
                        // 30s sería demasiado pesado contra los 5 GLPI.
                        pushToast({
                            type: "update",
                            ticketId: t.id,
                            title: `#${t.rawId} · ${t.systemLabel}`,
                            subtitle: t.title
                        });
                    }
                }
            }
            prevTicketsMapRef.current = new Map(json.tickets.map((t)=>[
                    t.id,
                    {
                        dateModified: t.dateModified
                    }
                ]));
            setData(json);
            setLastFetchError(null);
        } catch (err) {
            setLastFetchError(err.message || "Error al consultar /api/tickets");
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load();
        const id = setInterval(load, REFRESH_INTERVAL_MS);
        return ()=>clearInterval(id);
    }, []);
    const filteredTickets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!data) return [];
        const query = searchQuery.trim().toLowerCase();
        return data.tickets.filter((t)=>activeSystem ? t.systemId === activeSystem : true).filter((t)=>{
            if (slaFilter === "all") return true;
            if (slaFilter === "open") return t.isOpen;
            if (slaFilter === "closed") return !t.isOpen;
            return t.slaStatus === slaFilter; // breach | warn
        }).filter((t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$statusFilters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchesStatusFilter"])(t, statusFilter)).filter((t)=>{
            if (!query) return true;
            const haystack = [
                t.rawId,
                t.title,
                t.systemLabel,
                t.status,
                t.priority,
                t.requester
            ].filter(Boolean).join(" ").toLowerCase();
            return haystack.includes(query);
        })// Más nuevos primero (fecha de creación descendente). Los tickets sin
        // fecha válida se van al final en vez de romper el orden.
        .sort((a, b)=>{
            const dateA = a.dateCreated ? new Date(a.dateCreated.replace(" ", "T")).getTime() : 0;
            const dateB = b.dateCreated ? new Date(b.dateCreated.replace(" ", "T")).getTime() : 0;
            return dateB - dateA;
        });
    }, [
        data,
        activeSystem,
        slaFilter,
        statusFilter,
        searchQuery
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ToastNotifications$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                toasts: toasts,
                onDismiss: dismissToast
            }, void 0, false, {
                fileName: "[project]/app/tickets/page.js",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-wrap items-end justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-display text-2xl font-bold text-ink-hi",
                                children: "Ops · Tickets CNS-IPICYT"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body mt-1",
                                children: [
                                    "CNS · UnADM · Prepa · SECIHTI · Mujeres — monitoreo consolidado, actualiza cada",
                                    " ",
                                    REFRESH_INTERVAL_MS / 1000,
                                    "s"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            data?.demoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-signal-warn text-xs font-mono border border-signal-warn/40 rounded px-2 py-1 mb-1 inline-block",
                                children: "MODO DEMO — datos de ejemplo"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-ink-lo text-xs font-mono",
                                children: data ? `última actualización ${new Date(data.generatedAt).toLocaleTimeString("es-MX")}` : "cargando…"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/tickets/page.js",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            lastFetchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-signal-crit/40 bg-signal-crit/10 text-signal-crit text-sm font-body px-4 py-2",
                children: lastFetchError
            }, void 0, false, {
                fileName: "[project]/app/tickets/page.js",
                lineNumber: 141,
                columnNumber: 9
            }, this),
            data?.errors?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-signal-warn/40 bg-signal-warn/10 text-signal-warn text-sm font-body px-4 py-2",
                children: data.errors.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "⚠ ",
                            e.system,
                            ": ",
                            e.error
                        ]
                    }, i, true, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/tickets/page.js",
                lineNumber: 147,
                columnNumber: 9
            }, this),
            data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatusStrip$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        bySystem: data.bySystem,
                        errors: data.errors,
                        activeSystem: activeSystem,
                        onSelectSystem: setActiveSystem
                    }, void 0, false, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatCards$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        totals: data.totals
                    }, void 0, false, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
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
                                ],
                                [
                                    "breach",
                                    "Fuera de SLA"
                                ],
                                [
                                    "warn",
                                    "Por vencer"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSlaFilter(key),
                                    className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${slaFilter === key ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                                    children: label
                                }, key, false, {
                                    fileName: "[project]/app/tickets/page.js",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Buscar ticket (id, título, sistema...)",
                                className: "ml-auto w-64 px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-hi placeholder-ink-lo focus:outline-none focus:border-signal-info transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/api/report?format=csv",
                                className: "px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi transition-colors",
                                children: "⭳ Exportar CSV"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 194,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/api/report?format=csv&scope=all&metrics=first_response",
                                title: "Incluye cuánto tardó mesa en dar la primera respuesta/escalar cada ticket, desde que fue creado",
                                className: "px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi transition-colors",
                                children: "⭳ Exportar tiempos de respuesta"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs uppercase tracking-wider text-ink-lo font-body mr-1",
                                children: "Estado:"
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 210,
                                columnNumber: 13
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$statusFilters$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_FILTER_OPTIONS"].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setStatusFilter(key),
                                    className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${statusFilter === key ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                                    children: label
                                }, key, false, {
                                    fileName: "[project]/app/tickets/page.js",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TicketTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                tickets: filteredTickets,
                                onSelectTicket: setSelectedTicket,
                                selectedId: selectedTicket?.id
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AssistantPanel$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                ticket: selectedTicket
                            }, void 0, false, {
                                fileName: "[project]/app/tickets/page.js",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/tickets/page.js",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/tickets/page.js",
                lineNumber: 157,
                columnNumber: 9
            }, this),
            !data && !lastFetchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-ink-mid font-mono text-sm",
                children: "Conectando con los 5 sistemas…"
            }, void 0, false, {
                fileName: "[project]/app/tickets/page.js",
                lineNumber: 238,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/tickets/page.js",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/AssistantPanel.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssistantPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("es-MX");
}
function AssistantPanel({ ticket }) {
    const [suggestion, setSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingSuggestion, setLoadingSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingDetail, setLoadingDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ticket) {
            setSuggestion(null);
            setDetail(null);
            return;
        }
        let cancelled = false;
        setLoadingSuggestion(true);
        fetch("/api/assistant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ticket
            })
        }).then((r)=>r.json()).then((data)=>{
            if (!cancelled) setSuggestion(data);
        }).finally(()=>{
            if (!cancelled) setLoadingSuggestion(false);
        });
        setLoadingDetail(true);
        fetch(`/api/ticket-detail?systemId=${encodeURIComponent(ticket.systemId)}&rawId=${encodeURIComponent(ticket.rawId)}`).then((r)=>r.json()).then((data)=>{
            if (!cancelled) setDetail(data);
        }).catch(()=>{
            if (!cancelled) setDetail(null);
        }).finally(()=>{
            if (!cancelled) setLoadingDetail(false);
        });
        return ()=>{
            cancelled = true;
        };
    }, [
        ticket?.id
    ]);
    // Descripción a mostrar: la del detalle si ya cargó, si no la que ya
    // trae el ticket de la lista (más rápida, evita esperar el detalle).
    const description = detail?.content || ticket?.content;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-line bg-base-900 shadow-panel p-4 flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs uppercase tracking-wider text-ink-lo font-body",
                children: "Asistente de atención"
            }, void 0, false, {
                fileName: "[project]/components/AssistantPanel.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            !ticket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-ink-mid text-sm font-body",
                children: "Selecciona un ticket de la tabla para ver la acción sugerida."
            }, void 0, false, {
                fileName: "[project]/components/AssistantPanel.jsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            ticket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-display font-semibold text-ink-hi",
                                children: [
                                    "#",
                                    ticket.rawId,
                                    " · ",
                                    ticket.systemLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-ink-mid text-sm font-body",
                                children: ticket.title
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-line bg-base-800 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1",
                                children: "Descripción"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            loadingDetail && !description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-lo text-sm font-mono animate-pulse",
                                children: "Cargando…"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && !description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body",
                                children: "Sin descripción disponible."
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-ink-hi font-body leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto scrollbar-thin",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-line bg-base-800 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1",
                                children: "Última respuesta"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this),
                            loadingDetail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-lo text-sm font-mono animate-pulse",
                                children: "Cargando…"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && detail?.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-signal-warn text-xs font-body",
                                children: [
                                    "No se pudo obtener el detalle: ",
                                    detail.error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && !detail?.error && !detail?.lastFollowup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body",
                                children: "Sin seguimientos registrados aún."
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && detail?.lastFollowup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2 text-xs font-mono text-ink-mid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5 rounded border border-signal-info/40 text-signal-info",
                                                title: "Grupo(s) asignados al ticket",
                                                children: detail.groupNames?.length ? detail.groupNames.join(", ") : "Área no registrada"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AssistantPanel.jsx",
                                                lineNumber: 114,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: formatDate(detail.lastFollowup.date)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AssistantPanel.jsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this),
                                            detail.lastFollowup.isPrivate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-ink-lo",
                                                children: "(nota privada)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AssistantPanel.jsx",
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AssistantPanel.jsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-ink-hi font-body leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto scrollbar-thin",
                                        children: detail.lastFollowup.message || "(sin contenido)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AssistantPanel.jsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    loadingSuggestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-ink-lo text-sm font-mono animate-pulse",
                        children: "Analizando…"
                    }, void 0, false, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 133,
                        columnNumber: 33
                    }, this),
                    !loadingSuggestion && suggestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-line bg-base-800 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1",
                                children: "Acción sugerida"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-ink-hi font-body leading-relaxed",
                                children: suggestion.text
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] text-ink-lo font-mono",
                                children: [
                                    "fuente: ",
                                    suggestion.source === "claude" ? "Claude" : "reglas locales"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AssistantPanel.jsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AssistantPanel.jsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/StatCards.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function Card({ label, value, tone }) {
    const toneClass = {
        hi: "text-ink-hi",
        warn: "text-signal-warn",
        crit: "text-signal-crit",
        info: "text-signal-info"
    }[tone || "hi"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-1 min-w-[140px] rounded-lg border border-line bg-base-900 px-4 py-3 shadow-panel",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs uppercase tracking-wider text-ink-lo font-body",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/StatCards.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `font-mono text-3xl font-medium mt-1 ${toneClass}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/StatCards.jsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StatCards.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
function StatCards({ totals }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                label: "Tickets abiertos",
                value: totals.open,
                tone: "hi"
            }, void 0, false, {
                fileName: "[project]/components/StatCards.jsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                label: "Fuera de SLA",
                value: totals.breach,
                tone: "crit"
            }, void 0, false, {
                fileName: "[project]/components/StatCards.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                label: "Por vencer",
                value: totals.warn,
                tone: "warn"
            }, void 0, false, {
                fileName: "[project]/components/StatCards.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Card, {
                label: "Total histórico visible",
                value: totals.total,
                tone: "info"
            }, void 0, false, {
                fileName: "[project]/components/StatCards.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StatCards.jsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/StatusStrip.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const DOT_COLOR = {
    breach: "bg-signal-crit",
    warn: "bg-signal-warn",
    ok: "bg-signal-ok",
    down: "bg-ink-lo"
};
function systemState(sys, errors) {
    const hasError = errors.some((e)=>e.system === sys.label);
    if (hasError) return "down";
    if (sys.breach > 0) return "breach";
    if (sys.warn > 0) return "warn";
    return "ok";
}
function StatusStrip({ bySystem, errors, activeSystem, onSelectSystem }) {
    const entries = Object.entries(bySystem);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onSelectSystem(null),
                className: `px-3 py-2 rounded-md border text-sm font-mono transition-colors ${activeSystem === null ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                children: "TODOS"
            }, void 0, false, {
                fileName: "[project]/components/StatusStrip.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            entries.map(([id, sys])=>{
                const state = systemState(sys, errors);
                const isActive = activeSystem === id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onSelectSystem(id),
                    className: `flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors ${isActive ? "border-signal-info bg-base-800" : "border-line bg-base-900 hover:bg-base-800"}`,
                    title: state === "down" ? "Sin conexión" : `${sys.breach} fuera de SLA · ${sys.warn} por vencer`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `h-2 w-2 rounded-full ${DOT_COLOR[state]} ${state !== "ok" ? "animate-pulse_dot" : ""}`
                        }, void 0, false, {
                            fileName: "[project]/components/StatusStrip.jsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-display font-semibold text-ink-hi",
                            children: sys.label
                        }, void 0, false, {
                            fileName: "[project]/components/StatusStrip.jsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-xs text-ink-mid",
                            children: sys.open
                        }, void 0, false, {
                            fileName: "[project]/components/StatusStrip.jsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/components/StatusStrip.jsx",
                    lineNumber: 37,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/StatusStrip.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/TicketTable.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TicketTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
const SLA_BADGE = {
    breach: "bg-signal-crit/15 text-signal-crit border-signal-crit/40",
    warn: "bg-signal-warn/15 text-signal-warn border-signal-warn/40",
    ok: "bg-signal-ok/10 text-signal-ok border-signal-ok/30",
    closed: "bg-ink-lo/10 text-ink-lo border-ink-lo/30"
};
const SLA_LABEL = {
    breach: "VENCIDO",
    warn: "POR VENCER",
    ok: "OK",
    closed: "CERRADO"
};
function TicketTable({ tickets, onSelectTicket, selectedId }) {
    if (tickets.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-lg border border-line bg-base-900 p-8 text-center text-ink-mid font-body",
            children: "No hay tickets que coincidan con el filtro actual."
        }, void 0, false, {
            fileName: "[project]/components/TicketTable.jsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-line bg-base-900 shadow-panel overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-h-[560px] overflow-y-auto scrollbar-thin",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "sticky top-0 bg-base-800 text-ink-mid text-xs uppercase tracking-wider font-body",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-left px-4 py-2 font-medium",
                                    children: "Sistema"
                                }, void 0, false, {
                                    fileName: "[project]/components/TicketTable.jsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-left px-4 py-2 font-medium",
                                    children: "Ticket"
                                }, void 0, false, {
                                    fileName: "[project]/components/TicketTable.jsx",
                                    lineNumber: 33,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-left px-4 py-2 font-medium",
                                    children: "Prioridad"
                                }, void 0, false, {
                                    fileName: "[project]/components/TicketTable.jsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-left px-4 py-2 font-medium",
                                    children: "Estado"
                                }, void 0, false, {
                                    fileName: "[project]/components/TicketTable.jsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-right px-4 py-2 font-medium",
                                    children: "Abierto hace"
                                }, void 0, false, {
                                    fileName: "[project]/components/TicketTable.jsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "text-left px-4 py-2 font-medium",
                                    children: "SLA"
                                }, void 0, false, {
                                    fileName: "[project]/components/TicketTable.jsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/TicketTable.jsx",
                            lineNumber: 31,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/TicketTable.jsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "font-body",
                        children: tickets.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                onClick: ()=>onSelectTicket(t),
                                className: `border-t border-line cursor-pointer transition-colors ${selectedId === t.id ? "bg-base-700" : "hover:bg-base-800"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-ink-mid whitespace-nowrap",
                                        children: t.systemLabel
                                    }, void 0, false, {
                                        fileName: "[project]/components/TicketTable.jsx",
                                        lineNumber: 49,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-ink-hi",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: t.url,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            onClick: (e)=>e.stopPropagation(),
                                            className: "hover:text-signal-info hover:underline",
                                            children: [
                                                "#",
                                                t.rawId,
                                                " ",
                                                t.title
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/TicketTable.jsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/TicketTable.jsx",
                                        lineNumber: 50,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-ink-mid whitespace-nowrap",
                                        children: t.priority
                                    }, void 0, false, {
                                        fileName: "[project]/components/TicketTable.jsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-ink-mid whitespace-nowrap",
                                        children: t.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/TicketTable.jsx",
                                        lineNumber: 62,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 text-right font-mono text-ink-mid whitespace-nowrap",
                                        children: t.ageHours != null ? `${Math.round(t.ageHours)}h` : "—"
                                    }, void 0, false, {
                                        fileName: "[project]/components/TicketTable.jsx",
                                        lineNumber: 63,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-2 whitespace-nowrap",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `inline-block px-2 py-0.5 rounded border text-xs font-mono ${SLA_BADGE[t.slaStatus]}`,
                                            children: SLA_LABEL[t.slaStatus]
                                        }, void 0, false, {
                                            fileName: "[project]/components/TicketTable.jsx",
                                            lineNumber: 67,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/TicketTable.jsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, t.id, true, {
                                fileName: "[project]/components/TicketTable.jsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/TicketTable.jsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TicketTable.jsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/TicketTable.jsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/TicketTable.jsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ToastNotifications.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// Tiempo que cada toast permanece visible antes de auto-descartarse.
const TOAST_DURATION_MS = 8000;
function ToastNotifications({ toasts, onDismiss }) {
    if (!toasts || toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                toast: toast,
                onDismiss: onDismiss
            }, toast.id, false, {
                fileName: "[project]/components/ToastNotifications.jsx",
                lineNumber: 17,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/ToastNotifications.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
function Toast({ toast, onDismiss }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = setTimeout(()=>onDismiss(toast.id), TOAST_DURATION_MS);
        return ()=>clearTimeout(id);
    }, [
        toast.id,
        onDismiss
    ]);
    const isNew = toast.type === "new";
    const colorClasses = isNew ? "border-signal-ok/50 bg-signal-ok/10" : "border-signal-warn/50 bg-signal-warn/10";
    const dotClasses = isNew ? "bg-signal-ok" : "bg-signal-warn";
    const labelClasses = isNew ? "text-signal-ok" : "text-signal-warn";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `pointer-events-auto rounded-lg border ${colorClasses} bg-base-900 shadow-panel px-4 py-3 flex items-start gap-3 animate-toast_in`,
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `mt-1 h-2 w-2 rounded-full shrink-0 ${dotClasses}`
            }, void 0, false, {
                fileName: "[project]/components/ToastNotifications.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[11px] uppercase tracking-wider font-body font-semibold ${labelClasses}`,
                        children: isNew ? "Ticket nuevo" : "Nueva respuesta"
                    }, void 0, false, {
                        fileName: "[project]/components/ToastNotifications.jsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-ink-hi font-body leading-snug mt-0.5 truncate",
                        children: toast.title
                    }, void 0, false, {
                        fileName: "[project]/components/ToastNotifications.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    toast.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-ink-mid font-body mt-0.5 truncate",
                        children: toast.subtitle
                    }, void 0, false, {
                        fileName: "[project]/components/ToastNotifications.jsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ToastNotifications.jsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onDismiss(toast.id),
                className: "text-ink-lo hover:text-ink-hi text-xs shrink-0 leading-none px-1",
                "aria-label": "Cerrar notificación",
                children: "✕"
            }, void 0, false, {
                fileName: "[project]/components/ToastNotifications.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ToastNotifications.jsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/statusFilters.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Filtros por "estado" del ticket, independientes del filtro de SLA que ya
// existía (Abiertos / Todos / Cerrados / Fuera de SLA / Por vencer). Estos
// usan las categorías tal cual las maneja GLPI en su propio buscador de
// tickets, incluyendo los meta-estados "No resuelto" y "No cerrado":
//   - No resuelto = el ticket todavía no pasa a Resuelto ni Cerrado
//     (Nuevo, En curso asignado/planificado, En espera).
//   - No cerrado = el ticket todavía no pasa a Cerrado, aunque ya esté
//     Resuelto (incluye Nuevo, En curso, En espera y Resuelto).
// Se combinan (AND) con el filtro de sistema y el de SLA existentes.
__turbopack_context__.s([
    "STATUS_FILTER_OPTIONS",
    ()=>STATUS_FILTER_OPTIONS,
    "matchesStatusFilter",
    ()=>matchesStatusFilter
]);
const STATUS_FILTER_OPTIONS = [
    [
        "all",
        "Todos"
    ],
    [
        "new",
        "Nuevo"
    ],
    [
        "assigned",
        "Atendiéndose"
    ],
    [
        "waiting",
        "En espera"
    ],
    [
        "resolved",
        "Resuelto"
    ],
    [
        "closed",
        "Cerrado"
    ],
    [
        "notResolved",
        "No resuelto"
    ],
    [
        "notClosed",
        "No cerrado"
    ]
];
function matchesStatusFilter(ticket, key) {
    // Number(...) por seguridad: garantiza que las comparaciones estrictas de
    // abajo funcionen aunque statusId llegara como texto en vez de número.
    const s = Number(ticket.statusId);
    switch(key){
        case "new":
            return s === 1;
        case "assigned":
            // "En curso (asignado)" + "En curso (planificado)" = lo que GLPI
            // suele mostrar junto como "Atendiéndose".
            return s === 2 || s === 3;
        case "waiting":
            return s === 4;
        case "resolved":
            return s === 5;
        case "closed":
            return s === 6;
        case "notResolved":
            return [
                1,
                2,
                3,
                4
            ].includes(s);
        case "notClosed":
            return s !== 6;
        case "all":
        default:
            return true;
    }
}
}),
];

//# sourceMappingURL=_1e2wraj._.js.map