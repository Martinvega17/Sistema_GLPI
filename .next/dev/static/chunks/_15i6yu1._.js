(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Sidebar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InicioView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InicioView.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SystemTicketsView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SystemTicketsView.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AssistantPanel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AssistantPanel.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ToastNotifications$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ToastNotifications.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/systems.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const REFRESH_INTERVAL_MS = 30_000;
function DashboardPage() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("inicio"); // "inicio" | systemId
    const [selectedTicket, setSelectedTicket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastFetchError, setLastFetchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toasts, setToasts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Snapshot de la carga anterior (id -> dateModified) para detectar
    // tickets nuevos o con cambios entre refrescos. useRef porque no debe
    // disparar un re-render por sí solo.
    const prevTicketsMapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
                        pushToast({
                            type: "new",
                            ticketId: t.id,
                            title: `#${t.rawId} · ${t.systemLabel}`,
                            subtitle: t.title
                        });
                    } else if (prev.dateModified !== t.dateModified) {
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            load();
            const id = setInterval(load, REFRESH_INTERVAL_MS);
            return ({
                "DashboardPage.useEffect": ()=>clearInterval(id)
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], []);
    const ticketsBySystem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[ticketsBySystem]": ()=>{
            const map = {};
            if (data) {
                for (const t of data.tickets)(map[t.systemId] ||= []).push(t);
            }
            return map;
        }
    }["DashboardPage.useMemo[ticketsBySystem]"], [
        data
    ]);
    const sidebarSystems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[sidebarSystems]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYSTEMS"].map({
                "DashboardPage.useMemo[sidebarSystems]": (s)=>({
                        id: s.id,
                        label: s.label,
                        summary: data?.bySystem?.[s.id]?.open ?? null
                    })
            }["DashboardPage.useMemo[sidebarSystems]"])
    }["DashboardPage.useMemo[sidebarSystems]"], [
        data
    ]);
    const activeSystem = view !== "inicio" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SYSTEMS"].find((s)=>s.id === view) : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ToastNotifications$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                toasts: toasts,
                onDismiss: dismissToast
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                systems: sidebarSystems,
                activeView: view,
                onNavigate: setView,
                toastCount: toasts.length
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-y-auto scrollbar-thin relative",
                children: [
                    lastFetchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "m-4 rounded-md border border-signal-crit/40 bg-signal-crit/10 text-signal-crit text-sm font-body px-4 py-2",
                        children: lastFetchError
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this),
                    data?.errors?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "m-4 rounded-md border border-signal-warn/40 bg-signal-warn/10 text-signal-warn text-sm font-body px-4 py-2",
                        children: data.errors.map((e, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    "⚠ ",
                                    e.system,
                                    ": ",
                                    e.error
                                ]
                            }, i, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 115,
                        columnNumber: 11
                    }, this),
                    data?.demoMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "m-4 text-signal-warn text-xs font-mono border border-signal-warn/40 rounded px-2 py-1 inline-block",
                        children: "MODO DEMO — datos de ejemplo"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this),
                    !data && !lastFetchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 text-ink-mid font-mono text-sm",
                        children: "Conectando con los 5 sistemas…"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    data && view === "inicio" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InicioView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        data: data,
                        onGoToSystem: setView
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 134,
                        columnNumber: 39
                    }, this),
                    data && activeSystem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SystemTicketsView$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        system: activeSystem,
                        tickets: ticketsBySystem[activeSystem.id] || [],
                        onOpenDetail: setSelectedTicket,
                        generatedAt: data.generatedAt
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    selectedTicket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed inset-0 bg-black/40 z-40",
                                onClick: ()=>setSelectedTicket(null)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fixed top-0 right-0 h-full w-full max-w-md z-50 p-4 overflow-y-auto scrollbar-thin",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AssistantPanel$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    ticket: selectedTicket,
                                    onClose: ()=>setSelectedTicket(null)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 153,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "dLaccIZ+7IGVAERGg1BSdEWkZpY=");
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AssistantPanel.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AssistantPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("es-MX");
}
function AssistantPanel({ ticket, onClose }) {
    _s();
    const [suggestion, setSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingSuggestion, setLoadingSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingDetail, setLoadingDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssistantPanel.useEffect": ()=>{
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
            }).then({
                "AssistantPanel.useEffect": (r)=>r.json()
            }["AssistantPanel.useEffect"]).then({
                "AssistantPanel.useEffect": (data)=>{
                    if (!cancelled) setSuggestion(data);
                }
            }["AssistantPanel.useEffect"]).finally({
                "AssistantPanel.useEffect": ()=>{
                    if (!cancelled) setLoadingSuggestion(false);
                }
            }["AssistantPanel.useEffect"]);
            setLoadingDetail(true);
            fetch(`/api/ticket-detail?systemId=${encodeURIComponent(ticket.systemId)}&rawId=${encodeURIComponent(ticket.rawId)}`).then({
                "AssistantPanel.useEffect": (r)=>r.json()
            }["AssistantPanel.useEffect"]).then({
                "AssistantPanel.useEffect": (data)=>{
                    if (!cancelled) setDetail(data);
                }
            }["AssistantPanel.useEffect"]).catch({
                "AssistantPanel.useEffect": ()=>{
                    if (!cancelled) setDetail(null);
                }
            }["AssistantPanel.useEffect"]).finally({
                "AssistantPanel.useEffect": ()=>{
                    if (!cancelled) setLoadingDetail(false);
                }
            }["AssistantPanel.useEffect"]);
            return ({
                "AssistantPanel.useEffect": ()=>{
                    cancelled = true;
                }
            })["AssistantPanel.useEffect"];
        }
    }["AssistantPanel.useEffect"], [
        ticket?.id
    ]);
    // Descripción a mostrar: la del detalle si ya cargó, si no la que ya
    // trae el ticket de la lista (más rápida, evita esperar el detalle).
    const description = detail?.content || ticket?.content;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-line bg-base-900 shadow-panel p-4 flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs uppercase tracking-wider text-ink-lo font-body",
                        children: "Asistente de atención"
                    }, void 0, false, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "text-ink-lo hover:text-ink-hi text-sm leading-none px-1",
                        "aria-label": "Cerrar panel",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AssistantPanel.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            !ticket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-ink-mid text-sm font-body",
                children: "Selecciona un ticket de la tabla para ver la acción sugerida."
            }, void 0, false, {
                fileName: "[project]/components/AssistantPanel.jsx",
                lineNumber: 78,
                columnNumber: 9
            }, this),
            ticket && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-display font-semibold text-ink-hi",
                                children: [
                                    "#",
                                    ticket.rawId,
                                    " · ",
                                    ticket.systemLabel
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-ink-mid text-sm font-body",
                                children: ticket.title
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-line bg-base-800 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1",
                                children: "Descripción"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            loadingDetail && !description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-lo text-sm font-mono animate-pulse",
                                children: "Cargando…"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && !description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body",
                                children: "Sin descripción disponible."
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this),
                            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-ink-hi font-body leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto scrollbar-thin",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-line bg-base-800 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1",
                                children: "Última respuesta"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 112,
                                columnNumber: 13
                            }, this),
                            loadingDetail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-lo text-sm font-mono animate-pulse",
                                children: "Cargando…"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 114,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && detail?.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-signal-warn text-xs font-body",
                                children: [
                                    "No se pudo obtener el detalle: ",
                                    detail.error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && !detail?.error && !detail?.lastFollowup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body",
                                children: "Sin seguimientos registrados aún."
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            !loadingDetail && detail?.lastFollowup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2 text-xs font-mono text-ink-mid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.5 rounded border border-signal-info/40 text-signal-info",
                                                title: "Grupo(s) asignados al ticket",
                                                children: detail.groupNames?.length ? detail.groupNames.join(", ") : "Área no registrada"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AssistantPanel.jsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: formatDate(detail.lastFollowup.date)
                                            }, void 0, false, {
                                                fileName: "[project]/components/AssistantPanel.jsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this),
                                            detail.lastFollowup.isPrivate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-ink-lo",
                                                children: "(nota privada)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/AssistantPanel.jsx",
                                                lineNumber: 133,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/AssistantPanel.jsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-ink-hi font-body leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto scrollbar-thin",
                                        children: detail.lastFollowup.message || "(sin contenido)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/AssistantPanel.jsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    loadingSuggestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-ink-lo text-sm font-mono animate-pulse",
                        children: "Analizando…"
                    }, void 0, false, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 144,
                        columnNumber: 33
                    }, this),
                    !loadingSuggestion && suggestion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-md border border-line bg-base-800 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] uppercase tracking-wider text-ink-lo font-body mb-1",
                                children: "Acción sugerida"
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-ink-hi font-body leading-relaxed",
                                children: suggestion.text
                            }, void 0, false, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[11px] text-ink-lo font-mono",
                                children: [
                                    "fuente: ",
                                    suggestion.source === "claude" ? "Claude" : "reglas locales"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AssistantPanel.jsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AssistantPanel.jsx",
                        lineNumber: 146,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AssistantPanel.jsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AssistantPanel.jsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(AssistantPanel, "9r4NLUdoiGvGfhtAHHMK9KFHaqE=");
_c = AssistantPanel;
var _c;
__turbopack_context__.k.register(_c, "AssistantPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InicioView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InicioView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function greeting() {
    const h = new Date().getHours();
    if (h < 12) return "Buenos días";
    if (h < 19) return "Buenas tardes";
    return "Buenas noches";
}
function relativeTime(dateIso) {
    if (!dateIso) return null;
    const then = new Date(dateIso);
    if (Number.isNaN(then.getTime())) return null;
    const diffS = Math.max(0, Math.round((Date.now() - then.getTime()) / 1000));
    if (diffS < 60) return `hace ${diffS} segundo${diffS === 1 ? "" : "s"}`;
    const diffM = Math.round(diffS / 60);
    if (diffM < 60) return `hace ${diffM} minuto${diffM === 1 ? "" : "s"}`;
    const diffH = Math.round(diffM / 60);
    return `hace ${diffH} hora${diffH === 1 ? "" : "s"}`;
}
// Cuenta, entre los tickets ABIERTOS de un sistema, cuántos hay por cada
// prioridad — para las chips "Media 43 · Alta 14" de cada tarjeta.
function priorityBreakdown(tickets) {
    const counts = {};
    for (const t of tickets){
        if (!t.isOpen) continue;
        counts[t.priority] = (counts[t.priority] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b)=>b[1] - a[1]);
}
function lastResponseOf(tickets) {
    let latest = null;
    for (const t of tickets){
        if (!t.dateModified) continue;
        const d = new Date(t.dateModified.replace(" ", "T"));
        if (Number.isNaN(d.getTime())) continue;
        if (!latest || d > latest) latest = d;
    }
    return latest;
}
const PRIORITY_DOT = {
    Media: "bg-blue-500",
    Alta: "bg-orange-500",
    "Muy alta": "bg-red-500",
    Mayor: "bg-red-700",
    Baja: "bg-slate-400",
    "Muy baja": "bg-slate-300"
};
function SystemPendingCard({ sys, tickets, onGoToSystem, accent }) {
    const pending = tickets.filter((t)=>t.isOpen);
    const breakdown = priorityBreakdown(tickets);
    const lastResp = lastResponseOf(tickets);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `h-1 -mt-5 -mx-5 mb-1 rounded-t-2xl ${accent.bar}`
            }, void 0, false, {
                fileName: "[project]/components/InicioView.jsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-10 w-10 rounded-xl flex items-center justify-center ${accent.iconBg}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-lg ${accent.iconText}`,
                                    children: "◆"
                                }, void 0, false, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-display font-semibold text-slate-900",
                                        children: [
                                            "Pendientes ",
                                            sys.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InicioView.jsx",
                                        lineNumber: 69,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-slate-500",
                                        children: [
                                            "Atención y control de la operación ",
                                            sys.label,
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/InicioView.jsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InicioView.jsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-3xl font-display font-bold ${accent.numberText}`,
                                children: pending.length
                            }, void 0, false, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-slate-500",
                                children: "pendientes"
                            }, void 0, false, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InicioView.jsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InicioView.jsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[11px] uppercase tracking-wider text-slate-400 mb-1.5",
                        children: "Por prioridad"
                    }, void 0, false, {
                        fileName: "[project]/components/InicioView.jsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            breakdown.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-400",
                                children: "Sin pendientes"
                            }, void 0, false, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 82,
                                columnNumber: 38
                            }, this),
                            breakdown.map(([label, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-full px-2.5 py-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[label] || "bg-slate-400"}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        label,
                                        " ",
                                        count
                                    ]
                                }, label, true, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InicioView.jsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InicioView.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg bg-slate-50 px-3 py-2 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-slate-400",
                        children: "🕐"
                    }, void 0, false, {
                        fileName: "[project]/components/InicioView.jsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] uppercase tracking-wider text-slate-400",
                                children: "Última respuesta"
                            }, void 0, false, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-medium text-slate-700",
                                children: lastResp ? relativeTime(lastResp.toISOString()) : "Sin datos"
                            }, void 0, false, {
                                fileName: "[project]/components/InicioView.jsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InicioView.jsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/InicioView.jsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onGoToSystem(sys.id),
                className: `mt-auto w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 ${accent.buttonBg}`,
                children: [
                    "Ver pendientes ",
                    sys.label,
                    " →"
                ]
            }, void 0, true, {
                fileName: "[project]/components/InicioView.jsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/InicioView.jsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c = SystemPendingCard;
const ACCENTS = [
    {
        bar: "bg-emerald-500",
        iconBg: "bg-emerald-50",
        iconText: "text-emerald-500",
        numberText: "text-emerald-600",
        buttonBg: "bg-emerald-500"
    },
    {
        bar: "bg-blue-500",
        iconBg: "bg-blue-50",
        iconText: "text-blue-500",
        numberText: "text-blue-600",
        buttonBg: "bg-blue-500"
    },
    {
        bar: "bg-violet-500",
        iconBg: "bg-violet-50",
        iconText: "text-violet-500",
        numberText: "text-violet-600",
        buttonBg: "bg-violet-500"
    },
    {
        bar: "bg-amber-500",
        iconBg: "bg-amber-50",
        iconText: "text-amber-500",
        numberText: "text-amber-600",
        buttonBg: "bg-amber-500"
    },
    {
        bar: "bg-rose-500",
        iconBg: "bg-rose-50",
        iconText: "text-rose-500",
        numberText: "text-rose-600",
        buttonBg: "bg-rose-500"
    }
];
function InicioView({ data, onGoToSystem }) {
    _s();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InicioView.useEffect": ()=>{
            const id = setInterval({
                "InicioView.useEffect.id": ()=>setNow(Date.now())
            }["InicioView.useEffect.id"], 1000);
            return ({
                "InicioView.useEffect": ()=>clearInterval(id)
            })["InicioView.useEffect"];
        }
    }["InicioView.useEffect"], []);
    if (!data) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-8 text-slate-500 font-body text-sm",
            children: "Conectando con los 5 sistemas…"
        }, void 0, false, {
            fileName: "[project]/components/InicioView.jsx",
            lineNumber: 131,
            columnNumber: 12
        }, this);
    }
    const ticketsBySystem = {};
    for (const t of data.tickets){
        (ticketsBySystem[t.systemId] ||= []).push(t);
    }
    const systemsInOrder = Object.keys(data.bySystem).map((id)=>({
            id,
            label: data.bySystem[id].label
        }));
    const totalPending = data.totals.open;
    const highPriorityOrMore = data.tickets.filter((t)=>t.isOpen && t.priorityId >= 4).length;
    const hasErrors = data.errors && data.errors.length > 0;
    const generatedAtMs = data.generatedAt ? new Date(data.generatedAt).getTime() : null;
    const overallLastResponse = lastResponseOf(data.tickets);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-slate-50 min-h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm p-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        "Centro de operación · Actualización en tiempo real"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-display text-4xl font-bold text-slate-900",
                                    children: greeting()
                                }, void 0, false, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-500 mt-2 max-w-xl",
                                    children: "Una vista clara de lo que necesita atención ahora. Prioriza la operación y entra directamente a cada bandeja de pendientes."
                                }, void 0, false, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 rounded-xl border border-slate-200 bg-white px-4 py-3 flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-blue-500",
                                            children: "🔄"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-semibold text-slate-800",
                                                    children: hasErrors ? "Cobertura parcial" : `Cobertura completa al ${generatedAtMs ? new Date(generatedAtMs).toLocaleString("es-MX") : "—"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InicioView.jsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-slate-500",
                                                    children: hasErrors ? `${data.errors.length} sistema(s) con error de conexión — ver detalle abajo.` : "Todas las fuentes visibles completaron un ciclo dentro del umbral esperado."
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InicioView.jsx",
                                                    lineNumber: 174,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2",
                                    children: systemsInOrder.map((sys)=>{
                                        const err = data.errors?.find((e)=>e.system === sys.label);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onGoToSystem(sys.id),
                                            className: "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-slate-300 hover:shadow-sm transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `h-2 w-2 rounded-full ${err ? "bg-red-500" : "bg-emerald-500"}`
                                                }, void 0, false, {
                                                    fileName: "[project]/components/InicioView.jsx",
                                                    lineNumber: 191,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-semibold text-slate-800",
                                                            children: sys.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InicioView.jsx",
                                                            lineNumber: 193,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] text-slate-400",
                                                            children: err ? "Sin conexión" : `Actualizado ${relativeTime(new Date(generatedAtMs || now).toISOString())}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/InicioView.jsx",
                                                            lineNumber: 194,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/InicioView.jsx",
                                                    lineNumber: 192,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, sys.id, true, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 186,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 182,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InicioView.jsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4 lg:w-56",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-200 bg-white p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl font-display font-bold text-slate-900",
                                            children: totalPending
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 206,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 mt-1",
                                            children: "Tickets pendientes"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-200 bg-white p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-4xl font-display font-bold text-red-500",
                                            children: highPriorityOrMore
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 210,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 mt-1",
                                            children: "Prioridad alta o mayor"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-slate-200 bg-white p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-display font-semibold text-slate-800",
                                            children: overallLastResponse ? relativeTime(overallLastResponse.toISOString()) : "Sin datos"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500 mt-1",
                                            children: "Última respuesta en tickets pendientes"
                                        }, void 0, false, {
                                            fileName: "[project]/components/InicioView.jsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/InicioView.jsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InicioView.jsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-xl font-bold text-slate-900",
                            children: "Panorama de pendientes"
                        }, void 0, false, {
                            fileName: "[project]/components/InicioView.jsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-500 text-sm mt-1",
                            children: "Cantidad, nivel de prioridad y actividad reciente por frente operativo."
                        }, void 0, false, {
                            fileName: "[project]/components/InicioView.jsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
                            children: systemsInOrder.map((sys, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SystemPendingCard, {
                                    sys: sys,
                                    tickets: ticketsBySystem[sys.id] || [],
                                    onGoToSystem: onGoToSystem,
                                    accent: ACCENTS[i % ACCENTS.length]
                                }, sys.id, false, {
                                    fileName: "[project]/components/InicioView.jsx",
                                    lineNumber: 231,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/InicioView.jsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/InicioView.jsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/InicioView.jsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/InicioView.jsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(InicioView, "qIstTaHXAspKZoclBFL0Q8ycoIo=");
_c1 = InicioView;
var _c, _c1;
__turbopack_context__.k.register(_c, "SystemPendingCard");
__turbopack_context__.k.register(_c1, "InicioView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Sidebar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)"); // Si usas Next.js
// Importa tus imágenes
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$cns$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$icons$2f$cns$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/icons/cns.png.mjs { IMAGE => "[project]/public/icons/cns.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
(()=>{
    const e = new Error("Cannot find module '@/public/icons/unadm.png'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$prepa$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$icons$2f$prepa$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/public/icons/prepa.png.mjs { IMAGE => "[project]/public/icons/prepa.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
(()=>{
    const e = new Error("Cannot find module '@/public/icons/secihti.png'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/public/icons/mujeres.png'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const SYSTEM_ICONS = {
    cns: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$cns$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$icons$2f$cns$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    unadm: unadmIcon,
    prepa: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$prepa$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$public$2f$icons$2f$prepa$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
    secihti: secihtiIcon,
    mujeres: mujeresIcon
};
function Sidebar({ systems, activeView, onNavigate, toastCount }) {
    _s();
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: `shrink-0 border-r border-line bg-base-900 flex flex-col transition-[width] duration-200 ${collapsed ? "w-[76px]" : "w-64"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "flex-1 overflow-y-auto scrollbar-thin py-3 px-2 flex flex-col gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mt-3 mb-1 px-3 text-[10px] uppercase tracking-wider text-ink-lo ${collapsed ? "text-center" : ""}`,
                    children: collapsed ? "—" : "Sistemas"
                }, void 0, false, {
                    fileName: "[project]/components/Sidebar.jsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                systems.map((sys)=>{
                    const isActive = activeView === sys.id;
                    const summary = sys.summary;
                    const icon = SYSTEM_ICONS[sys.id];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onNavigate(sys.id),
                        className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-colors ${isActive ? "bg-base-800 text-ink-hi border border-signal-info/40" : "text-ink-mid hover:text-ink-hi hover:bg-base-800 border border-transparent"}`,
                        title: sys.label,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-6 w-6 rounded-full bg-base-700 flex items-center justify-center shrink-0 overflow-hidden",
                                children: icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: icon,
                                    alt: sys.label,
                                    width: 24,
                                    height: 24,
                                    className: "object-cover w-full h-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.jsx",
                                    lineNumber: 57,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-mono",
                                    children: sys.label[0]
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.jsx",
                                    lineNumber: 65,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.jsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            !collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex-1 text-left truncate",
                                children: sys.label
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.jsx",
                                lineNumber: 71,
                                columnNumber: 17
                            }, this),
                            !collapsed && summary != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-mono text-ink-lo",
                                children: summary
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.jsx",
                                lineNumber: 74,
                                columnNumber: 17
                            }, this)
                        ]
                    }, sys.id, true, {
                        fileName: "[project]/components/Sidebar.jsx",
                        lineNumber: 45,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/components/Sidebar.jsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Sidebar.jsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "IaHwFfvbaw8y79e5do0CzWS1eXc=");
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SystemTicketsView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SystemTicketsView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$statusFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/statusFilters.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const PAGE_SIZE = 25;
function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr.replace(" ", "T"));
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
function excerpt(text, max = 90) {
    if (!text) return "—";
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    return clean.slice(0, max) + "…";
}
// Fila individual — reporta cuándo entra en pantalla (para disparar la
// carga de sus datos extra) usando IntersectionObserver.
function TicketRow({ ticket, extras, extrasLoading, onVisible, onOpenDetail }) {
    _s();
    const rowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [descOpen, setDescOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [solOpen, setSolOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TicketRow.useEffect": ()=>{
            const el = rowRef.current;
            if (!el) return;
            const obs = new IntersectionObserver({
                "TicketRow.useEffect": (entries)=>{
                    if (entries.some({
                        "TicketRow.useEffect": (e)=>e.isIntersecting
                    }["TicketRow.useEffect"])) {
                        onVisible(ticket.rawId);
                        obs.disconnect();
                    }
                }
            }["TicketRow.useEffect"], {
                rootMargin: "200px"
            });
            obs.observe(el);
            return ({
                "TicketRow.useEffect": ()=>obs.disconnect()
            })["TicketRow.useEffect"];
        }
    }["TicketRow.useEffect"], [
        ticket.rawId,
        onVisible
    ]);
    const cellLoading = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-ink-lo font-mono text-xs animate-pulse",
        children: "…"
    }, void 0, false, {
        fileName: "[project]/components/SystemTicketsView.jsx",
        lineNumber: 45,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        ref: rowRef,
        className: "border-t border-line hover:bg-base-800/60 transition-colors align-top",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: ticket.url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-signal-info hover:underline font-mono text-sm",
                    children: ticket.rawId
                }, void 0, false, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 min-w-[180px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onOpenDetail(ticket),
                    className: "text-ink-hi hover:text-signal-info text-left font-medium text-sm",
                    children: ticket.title
                }, void 0, false, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 min-w-[220px] max-w-[320px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-ink-mid text-sm whitespace-pre-wrap",
                        children: descOpen ? ticket.content || "—" : excerpt(ticket.content)
                    }, void 0, false, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    ticket.content && ticket.content.length > 90 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setDescOpen((v)=>!v),
                        className: "text-signal-info text-xs hover:underline mt-0.5",
                        children: descOpen ? "Ver menos" : "Leer más"
                    }, void 0, false, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-flex items-center gap-1.5 text-xs text-ink-mid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `h-1.5 w-1.5 rounded-full ${ticket.isOpen ? "bg-signal-ok" : "bg-ink-lo"}`
                        }, void 0, false, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        ticket.status
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono",
                children: formatDate(ticket.dateCreated)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm",
                children: ticket.requester || "—"
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 min-w-[220px] max-w-[320px]",
                children: extrasLoading ? cellLoading : extras?.solutionText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-ink-mid text-sm whitespace-pre-wrap",
                            children: solOpen ? extras.solutionText : excerpt(extras.solutionText)
                        }, void 0, false, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this),
                        extras.solutionText.length > 90 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSolOpen((v)=>!v),
                            className: "text-signal-info text-xs hover:underline mt-0.5",
                            children: solOpen ? "Ver menos" : "Ver solución"
                        }, void 0, false, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 101,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-ink-lo text-sm",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono",
                children: extrasLoading ? cellLoading : formatDate(extras?.solvedDate)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono",
                children: extrasLoading ? cellLoading : formatDate(extras?.closedDate)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 min-w-[160px]",
                children: extrasLoading ? cellLoading : extras?.assignedStaff?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-0.5",
                    children: [
                        extras.assignedStaff.slice(0, 2).map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-ink-hi text-sm",
                                children: name
                            }, name, false, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)),
                        extras.assignedStaff.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-ink-lo text-xs",
                            children: [
                                "+",
                                extras.assignedStaff.length - 2,
                                " más"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 130,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 123,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-ink-lo text-sm",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 134,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 min-w-[160px]",
                children: extrasLoading ? cellLoading : extras?.groupNames?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-1",
                    children: [
                        extras.groupNames.slice(0, 2).map((name)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block text-[11px] px-1.5 py-0.5 rounded border border-signal-info/40 text-signal-info whitespace-nowrap",
                                children: name
                            }, name, false, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 143,
                                columnNumber: 15
                            }, this)),
                        extras.groupNames.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-ink-lo text-[11px]",
                            children: [
                                "+",
                                extras.groupNames.length - 2,
                                " áreas más"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 151,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-ink-lo text-sm",
                    children: "—"
                }, void 0, false, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono",
                children: extrasLoading ? cellLoading : formatDate(extras?.lastFollowupDate)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm font-mono",
                children: extrasLoading ? cellLoading : formatDate(extras?.lastTechFollowupDate)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap text-ink-mid text-sm",
                children: extrasLoading ? cellLoading : extras?.resolvedByName || "—"
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-3 py-2.5 whitespace-nowrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>onOpenDetail(ticket),
                    className: "text-ink-mid hover:text-signal-info text-sm",
                    title: "Ver notas y sugerencia",
                    children: "💬 Notas"
                }, void 0, false, {
                    fileName: "[project]/components/SystemTicketsView.jsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SystemTicketsView.jsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(TicketRow, "qEKyOjNdUo2ZQTJHw9c8BRXZdsc=");
_c = TicketRow;
function SystemTicketsView({ system, tickets, onOpenDetail, generatedAt }) {
    _s1();
    const [slaFilter, setSlaFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(PAGE_SIZE);
    const [extrasById, setExtrasById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // rawId -> extras
    const [extrasLoadingIds, setExtrasLoadingIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SystemTicketsView.useState": ()=>new Set()
    }["SystemTicketsView.useState"]);
    const pendingBatchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const flushTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SystemTicketsView.useMemo[filtered]": ()=>{
            const query = searchQuery.trim().toLowerCase();
            return tickets.filter({
                "SystemTicketsView.useMemo[filtered]": (t)=>{
                    if (slaFilter === "all") return true;
                    if (slaFilter === "open") return t.isOpen;
                    if (slaFilter === "closed") return !t.isOpen;
                    return t.slaStatus === slaFilter;
                }
            }["SystemTicketsView.useMemo[filtered]"]).filter({
                "SystemTicketsView.useMemo[filtered]": (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$statusFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchesStatusFilter"])(t, statusFilter)
            }["SystemTicketsView.useMemo[filtered]"]).filter({
                "SystemTicketsView.useMemo[filtered]": (t)=>{
                    if (!query) return true;
                    const haystack = [
                        t.rawId,
                        t.title,
                        t.status,
                        t.priority,
                        t.requester
                    ].filter(Boolean).join(" ").toLowerCase();
                    return haystack.includes(query);
                }
            }["SystemTicketsView.useMemo[filtered]"]).sort({
                "SystemTicketsView.useMemo[filtered]": (a, b)=>{
                    const dateA = a.dateCreated ? new Date(a.dateCreated.replace(" ", "T")).getTime() : 0;
                    const dateB = b.dateCreated ? new Date(b.dateCreated.replace(" ", "T")).getTime() : 0;
                    return dateB - dateA;
                }
            }["SystemTicketsView.useMemo[filtered]"]);
        }
    }["SystemTicketsView.useMemo[filtered]"], [
        tickets,
        slaFilter,
        statusFilter,
        searchQuery
    ]);
    // Reinicia la paginación visible cuando cambian los filtros o de sistema.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SystemTicketsView.useEffect": ()=>{
            setVisibleCount(PAGE_SIZE);
        }
    }["SystemTicketsView.useEffect"], [
        system.id,
        slaFilter,
        statusFilter,
        searchQuery
    ]);
    const visibleTickets = filtered.slice(0, visibleCount);
    // Agrupa en lotes las peticiones de "extras" que van llegando fila por
    // fila (según entran en pantalla), para no mandar una llamada HTTP por
    // cada fila individual — se juntan las que lleguen en ~150ms y se piden
    // juntas en una sola llamada a /api/ticket-extras.
    function requestExtras(rawId) {
        if (extrasById[rawId] || pendingBatchRef.current.has(rawId)) return;
        pendingBatchRef.current.add(rawId);
        setExtrasLoadingIds((prev)=>new Set(prev).add(rawId));
        if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
        flushTimerRef.current = setTimeout(async ()=>{
            const ids = [
                ...pendingBatchRef.current
            ];
            pendingBatchRef.current = new Set();
            try {
                const res = await fetch("/api/ticket-extras", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        systemId: system.id,
                        rawIds: ids,
                        tickets: ids.map((id)=>tickets.find((t)=>String(t.rawId) === String(id))).filter(Boolean)
                    })
                });
                const json = await res.json();
                setExtrasById((prev)=>({
                        ...prev,
                        ...json.extras || {}
                    }));
            } catch  {
            // deja las celdas en "—" si falla; no bloquea el resto de la tabla
            } finally{
                setExtrasLoadingIds((prev)=>{
                    const next = new Set(prev);
                    for (const id of ids)next.delete(id);
                    return next;
                });
            }
        }, 150);
    }
    // Sentinela al final de la tabla: cuando entra en pantalla, se muestra
    // otra página de filas (paginación en el cliente, sin pedir nada nuevo a
    // GLPI porque ya tenemos el listado base completo).
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SystemTicketsView.useEffect": ()=>{
            const el = sentinelRef.current;
            if (!el) return;
            const obs = new IntersectionObserver({
                "SystemTicketsView.useEffect": (entries)=>{
                    if (entries.some({
                        "SystemTicketsView.useEffect": (e)=>e.isIntersecting
                    }["SystemTicketsView.useEffect"])) {
                        setVisibleCount({
                            "SystemTicketsView.useEffect": (c)=>Math.min(c + PAGE_SIZE, filtered.length)
                        }["SystemTicketsView.useEffect"]);
                    }
                }
            }["SystemTicketsView.useEffect"], {
                rootMargin: "300px"
            });
            obs.observe(el);
            return ({
                "SystemTicketsView.useEffect": ()=>obs.disconnect()
            })["SystemTicketsView.useEffect"];
        }
    }["SystemTicketsView.useEffect"], [
        filtered.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-block text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-400/40 rounded px-1.5 py-0.5",
                                        children: "BETA"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SystemTicketsView.jsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-ink-lo text-xs font-body",
                                        children: "Versión temprana del sistema; algunas funciones pueden cambiar."
                                    }, void 0, false, {
                                        fileName: "[project]/components/SystemTicketsView.jsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 282,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-display text-2xl font-bold text-ink-hi mt-2",
                                children: [
                                    "Tickets ",
                                    system.label
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-ink-mid text-sm font-body mt-0.5",
                                children: [
                                    filtered.length,
                                    " registro",
                                    filtered.length === 1 ? "" : "s",
                                    " con los criterios actuales",
                                    generatedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-ink-lo",
                                        children: [
                                            " · actualizado ",
                                            new Date(generatedAt).toLocaleTimeString("es-MX")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SystemTicketsView.jsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: (e)=>setSearchQuery(e.target.value),
                                placeholder: "Buscar…",
                                className: "w-56 px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-hi placeholder-ink-lo focus:outline-none focus:border-signal-info transition-colors"
                            }, void 0, false, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `/api/report?format=csv&scope=all&systemId=${system.id}`,
                                className: "px-3 py-1.5 rounded-md text-sm font-body border border-line bg-base-900 text-ink-mid hover:text-ink-hi transition-colors whitespace-nowrap",
                                children: "⭳ Exportar"
                            }, void 0, false, {
                                fileName: "[project]/components/SystemTicketsView.jsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: [
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
                ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSlaFilter(key),
                        className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${slaFilter === key ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                        children: label
                    }, key, false, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 321,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs uppercase tracking-wider text-ink-lo font-body mr-1",
                        children: "Estado:"
                    }, void 0, false, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 336,
                        columnNumber: 9
                    }, this),
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$statusFilters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATUS_FILTER_OPTIONS"].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setStatusFilter(key),
                            className: `px-3 py-1.5 rounded-md text-sm font-body border transition-colors ${statusFilter === key ? "border-signal-info bg-base-800 text-ink-hi" : "border-line bg-base-900 text-ink-mid hover:text-ink-hi"}`,
                            children: label
                        }, key, false, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-line bg-base-900 p-8 text-center text-ink-mid font-body",
                children: "No hay tickets que coincidan con el filtro actual."
            }, void 0, false, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 353,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-line bg-base-900 shadow-panel overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto scrollbar-thin",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-base-800 text-ink-mid text-xs uppercase tracking-wider font-body",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Folio"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 362,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Título"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 363,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Descripción"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Estado"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 365,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Fecha de apertura"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 366,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Solicitante"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Descripción de la solución"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 368,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Fecha de solución"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Fecha de cierre"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 370,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Personal que atendió"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 371,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Áreas asignadas"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 372,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Última retro"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 373,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Última respuesta del área técnica"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 374,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Personal que resolvió"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 375,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left px-3 py-2.5 font-medium whitespace-nowrap",
                                                children: "Notas"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SystemTicketsView.jsx",
                                                lineNumber: 376,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SystemTicketsView.jsx",
                                        lineNumber: 361,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/SystemTicketsView.jsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "font-body",
                                    children: visibleTickets.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TicketRow, {
                                            ticket: t,
                                            extras: extrasById[t.rawId],
                                            extrasLoading: extrasLoadingIds.has(t.rawId),
                                            onVisible: requestExtras,
                                            onOpenDetail: onOpenDetail
                                        }, t.id, false, {
                                            fileName: "[project]/components/SystemTicketsView.jsx",
                                            lineNumber: 381,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/SystemTicketsView.jsx",
                                    lineNumber: 379,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SystemTicketsView.jsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this),
                    visibleCount < filtered.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: sentinelRef,
                        className: "text-center py-4 text-ink-lo text-xs font-mono",
                        children: "Cargando más tickets…"
                    }, void 0, false, {
                        fileName: "[project]/components/SystemTicketsView.jsx",
                        lineNumber: 394,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/SystemTicketsView.jsx",
                lineNumber: 357,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SystemTicketsView.jsx",
        lineNumber: 279,
        columnNumber: 5
    }, this);
}
_s1(SystemTicketsView, "kC0tneWWWBhZVH+rVhdSksI+C9U=");
_c1 = SystemTicketsView;
var _c, _c1;
__turbopack_context__.k.register(_c, "TicketRow");
__turbopack_context__.k.register(_c1, "SystemTicketsView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ToastNotifications.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToastNotifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// Tiempo que cada toast permanece visible antes de auto-descartarse.
const TOAST_DURATION_MS = 8000;
function ToastNotifications({ toasts, onDismiss }) {
    if (!toasts || toasts.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none",
        children: toasts.map((toast)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
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
_c = ToastNotifications;
function Toast({ toast, onDismiss }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            const id = setTimeout({
                "Toast.useEffect.id": ()=>onDismiss(toast.id)
            }["Toast.useEffect.id"], TOAST_DURATION_MS);
            return ({
                "Toast.useEffect": ()=>clearTimeout(id)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"], [
        toast.id,
        onDismiss
    ]);
    const isNew = toast.type === "new";
    const colorClasses = isNew ? "border-signal-ok/50 bg-signal-ok/10" : "border-signal-warn/50 bg-signal-warn/10";
    const dotClasses = isNew ? "bg-signal-ok" : "bg-signal-warn";
    const labelClasses = isNew ? "text-signal-ok" : "text-signal-warn";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `pointer-events-auto rounded-lg border ${colorClasses} bg-base-900 shadow-panel px-4 py-3 flex items-start gap-3 animate-toast_in`,
        role: "status",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `mt-1 h-2 w-2 rounded-full shrink-0 ${dotClasses}`
            }, void 0, false, {
                fileName: "[project]/components/ToastNotifications.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: `text-[11px] uppercase tracking-wider font-body font-semibold ${labelClasses}`,
                        children: isNew ? "Ticket nuevo" : "Nueva respuesta"
                    }, void 0, false, {
                        fileName: "[project]/components/ToastNotifications.jsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-ink-hi font-body leading-snug mt-0.5 truncate",
                        children: toast.title
                    }, void 0, false, {
                        fileName: "[project]/components/ToastNotifications.jsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    toast.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c1 = Toast;
var _c, _c1;
__turbopack_context__.k.register(_c, "ToastNotifications");
__turbopack_context__.k.register(_c1, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/statusFilters.js [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/systems.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_MODE",
    ()=>DEMO_MODE,
    "SYSTEMS",
    ()=>SYSTEMS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Configuración de los 5 sistemas GLPI.
// Cada instancia se define por variables de entorno para no hardcodear credenciales.
// Ver .env.example para el formato completo.
function envOr(name, fallback) {
    const v = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env[name];
    return v && v.length > 0 ? v : fallback;
}
const DEMO_MODE = envOr("DEMO_MODE", "true") === "true";
const SYSTEMS = [
    {
        id: "cns",
        label: "CNS",
        baseUrl: envOr("GLPI_CNS_URL", "https://opcenter.cns-ipicyt.mx/cns"),
        appToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_CNS_APP_TOKEN || "",
        userToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_CNS_USER_TOKEN || "",
        user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_CNS_USER || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_USER || "",
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_CNS_PASSWORD || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_CNS_INSECURE_TLS", "false") === "true"
    },
    {
        id: "unadm",
        label: "UnADM",
        baseUrl: envOr("GLPI_UNADM_URL", "https://opcenter-unadm.cns-ipicyt.mx"),
        appToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_UNADM_APP_TOKEN || "",
        userToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_UNADM_USER_TOKEN || "",
        user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_UNADM_USER || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_USER || "",
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_UNADM_PASSWORD || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_UNADM_INSECURE_TLS", "false") === "true"
    },
    {
        id: "prepa",
        label: "Prepa",
        baseUrl: envOr("GLPI_PREPA_URL", "https://opcenter-prepa.cns-ipicyt.mx"),
        appToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PREPA_APP_TOKEN || "",
        userToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PREPA_USER_TOKEN || "",
        user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PREPA_USER || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_USER || "",
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PREPA_PASSWORD || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_PREPA_INSECURE_TLS", "false") === "true"
    },
    {
        id: "secihti",
        label: "SECIHTI",
        baseUrl: envOr("GLPI_SECIHTI_URL", "https://opcenter-secihti.cns-ipicyt.mx"),
        appToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_SECIHTI_APP_TOKEN || "",
        userToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_SECIHTI_USER_TOKEN || "",
        user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_SECIHTI_USER || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_USER || "",
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_SECIHTI_PASSWORD || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_SECIHTI_INSECURE_TLS", "false") === "true"
    },
    {
        id: "mujeres",
        label: "Mujeres",
        baseUrl: envOr("GLPI_MUJERES_URL", "https://opcenter-mujeres.cns-ipicyt.mx"),
        appToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_MUJERES_APP_TOKEN || "",
        userToken: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_MUJERES_USER_TOKEN || "",
        user: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_MUJERES_USER || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_USER || "",
        password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_MUJERES_PASSWORD || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_MUJERES_INSECURE_TLS", "false") === "true"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/icons/cns.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/cns.3k1g-iceopea_.png");}),
"[project]/public/icons/cns.png.mjs { IMAGE => \"[project]/public/icons/cns.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$cns$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/icons/cns.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$cns$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 591,
    height: 591,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAsUlEQVR42pWOPQrCMACFYxotKdpS2t16gS6CIL2B2C4Za3HqVsQl0KGDkwXX5CBeIIMnCP6sITmKsbODfvCm9+B9APwChHDkWL6WURSFlNID5/xCCNkGQTCL4zj0PA8Pg7Ztj1rrlzHmLoS4VlVFmqbZZ1m2dF13DPq+Pymlnnb0kFLeyrLcFEWxzvN8laZpAhZJMu+6jjLGznVd73zfn2KMJ59Y0HBj/SBCyLGyEPzLGwNRLVR0Q500AAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/icons/prepa.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/prepa.1aygd6_0-xw_q.png");}),
"[project]/public/icons/prepa.png.mjs { IMAGE => \"[project]/public/icons/prepa.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$prepa$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/public/icons/prepa.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$icons$2f$prepa$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 185,
    height: 185,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AEdwTABHcEwASHFMAkhxTAJHcEwAR3BMAEdwTABHcEwAAEdwTABKdUsHbKY+XIGDUmprZ1YrWmtRFGZoVSFpZ1UlAE97SRFyrztxfZNiu55IlbS2U2x2nFpkXIlfXkd/Ylw+AIDENpGKlHTiZzC1nHU2pIGlVWtrlFxiS35iWzhyZVgrAIfOM6OHaaD9bRbb01JYcTBVbFANoFllWrFVamyVXGJSAHi5OHmOioP8cyDJwmlTdlFPbk4JeWNaNKZYZmOBYVw+AFyQQzGBh1yHlUiDmH9bZldSbU8NVG1QDWVoVB5Pbk4HAEdwTABJb00DSm9NA0dwTABHcEwAR3BMAEdwTABHcEwAFhRfAEpagEUAAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_15i6yu1._.js.map