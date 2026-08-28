module.exports = [
"[project]/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

var e = new Error('Could not parse module \'[project]/app/page.js\'\n\nreading file "\\\\\\\\?\\\\C:\\\\Users\\\\CNS-16481\\\\Documents\\\\Sistema_GLPI\\\\app\\\\page.js"\n\nCaused by:\n- El proceso no tiene acceso al archivo porque está siendo utilizado por otro proceso. (os error 32)\n\nDebug info:\n- Execution of <FileSource as Asset>::content failed\n- Execution of <DiskFileSystem as FileSystem>::read failed\n- reading file "\\\\\\\\?\\\\C:\\\\Users\\\\CNS-16481\\\\Documents\\\\Sistema_GLPI\\\\app\\\\page.js"\n- El proceso no tiene acceso al archivo porque está siendo utilizado por otro proceso. (os error 32)');
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/components/CategoryPendingCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategoryPendingCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RelativeTime$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RelativeTime.jsx [app-ssr] (ecmascript)");
"use client";
;
;
;
const PRIORITY_ORDER = [
    1,
    2,
    3,
    4,
    5,
    6
];
const PRIORITY_LABEL = {
    1: "Muy baja",
    2: "Baja",
    3: "Media",
    4: "Alta",
    5: "Muy alta",
    6: "Mayor"
};
// Media o menor -> tono info (azul); Alta o mayor -> tono warn (naranja),
// igual que el resto del dashboard usa para marcar urgencia.
const PRIORITY_COLOR = (id)=>id >= 4 ? "bg-signal-warn" : "bg-signal-info";
const PRIORITY_DOT = (id)=>id >= 4 ? "bg-signal-warn" : "bg-signal-info";
const ACCENT_BORDER = {
    green: "border-signal-ok",
    blue: "border-signal-info",
    purple: "border-[#B285F0]",
    amber: "border-amber-400",
    pink: "border-pink-400",
    cyan: "border-cyan-400",
    rose: "border-rose-400"
};
const ACCENT_ICON_BG = {
    green: "bg-signal-ok/15 text-signal-ok",
    blue: "bg-signal-info/15 text-signal-info",
    purple: "bg-[#B285F0]/15 text-[#B285F0]",
    amber: "bg-amber-400/15 text-amber-400",
    pink: "bg-pink-400/15 text-pink-400",
    cyan: "bg-cyan-400/15 text-cyan-400",
    rose: "bg-rose-400/15 text-rose-400"
};
const ACCENT_BUTTON = {
    green: "bg-signal-ok text-base-950 hover:opacity-90",
    blue: "bg-signal-info text-base-950 hover:opacity-90",
    purple: "bg-[#B285F0] text-base-950 hover:opacity-90",
    amber: "bg-amber-400 text-base-950 hover:opacity-90",
    pink: "bg-pink-400 text-base-950 hover:opacity-90",
    cyan: "bg-cyan-400 text-base-950 hover:opacity-90",
    rose: "bg-rose-400 text-base-950 hover:opacity-90"
};
function latestDate(tickets) {
    let best = null;
    for (const t of tickets){
        const d = t.dateModified || t.dateCreated;
        if (!d) continue;
        if (!best || d > best) best = d;
    }
    return best;
}
function CategoryPendingCard({ category, tickets, systems }) {
    const open = tickets.filter((t)=>t.isOpen);
    const total = open.length;
    const byPriority = PRIORITY_ORDER.map((id)=>({
            id,
            label: PRIORITY_LABEL[id],
            count: open.filter((t)=>t.priorityId === id).length
        })).filter((p)=>p.count > 0);
    const lastResponse = latestDate(tickets);
    const isMultiSystem = systems.length > 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-lg border-t-2 ${ACCENT_BORDER[category.accent]} border-line bg-base-900 shadow-panel p-5 flex flex-col gap-4`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-9 w-9 rounded-md flex items-center justify-center font-display font-bold text-sm ${ACCENT_ICON_BG[category.accent]}`,
                                children: category.label.slice(0, 2).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-display font-semibold text-ink-hi",
                                        children: [
                                            "Pendientes ",
                                            category.label
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CategoryPendingCard.jsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-ink-mid font-body",
                                        children: category.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/CategoryPendingCard.jsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-display font-bold text-2xl text-ink-hi leading-none",
                                children: total
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] uppercase tracking-wider text-ink-lo font-body",
                                children: "pendientes"
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CategoryPendingCard.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] uppercase tracking-wider text-ink-lo font-body mb-1",
                        children: "Por prioridad"
                    }, void 0, false, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 rounded-full bg-base-700 overflow-hidden flex mb-2",
                        children: total === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full w-full bg-base-700"
                        }, void 0, false, {
                            fileName: "[project]/components/CategoryPendingCard.jsx",
                            lineNumber: 87,
                            columnNumber: 13
                        }, this) : byPriority.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: PRIORITY_COLOR(p.id),
                                style: {
                                    width: `${p.count / total * 100}%`
                                }
                            }, p.id, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: [
                            byPriority.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-ink-lo font-body",
                                children: "Sin pendientes"
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 99,
                                columnNumber: 39
                            }, this),
                            byPriority.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5 text-xs text-ink-mid font-body",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `h-2 w-2 rounded-full ${PRIORITY_DOT(p.id)}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/CategoryPendingCard.jsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this),
                                        p.label,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-ink-hi font-semibold",
                                            children: p.count
                                        }, void 0, false, {
                                            fileName: "[project]/components/CategoryPendingCard.jsx",
                                            lineNumber: 103,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/components/CategoryPendingCard.jsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CategoryPendingCard.jsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-md border border-line bg-base-800 px-3 py-2 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-signal-info",
                        children: "⏱"
                    }, void 0, false, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[10px] uppercase tracking-wider text-ink-lo font-body",
                                children: "Última respuesta"
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-ink-hi font-body",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RelativeTime$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    iso: lastResponse
                                }, void 0, false, {
                                    fileName: "[project]/components/CategoryPendingCard.jsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            lastResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-ink-lo font-mono",
                                children: new Date(lastResponse.replace(" ", "T")).toLocaleString("es-MX")
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CategoryPendingCard.jsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            isMultiSystem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: systems.map((s)=>{
                    const count = open.filter((t)=>t.systemId === s.id).length;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1.5 rounded-md border border-line bg-base-800 px-2 py-1 text-xs font-body text-ink-mid",
                        children: [
                            s.label,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded bg-[#B285F0]/20 text-[#B285F0] px-1.5 font-mono",
                                children: count
                            }, void 0, false, {
                                fileName: "[project]/components/CategoryPendingCard.jsx",
                                lineNumber: 134,
                                columnNumber: 17
                            }, this)
                        ]
                    }, s.id, true, {
                        fileName: "[project]/components/CategoryPendingCard.jsx",
                        lineNumber: 129,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/CategoryPendingCard.jsx",
                lineNumber: 125,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: `/proyecto/${category.id}`,
                className: `mt-auto text-center rounded-md px-3 py-2 text-sm font-display font-semibold transition-opacity ${ACCENT_BUTTON[category.accent]}`,
                children: [
                    "Ver pendientes ",
                    category.label,
                    " →"
                ]
            }, void 0, true, {
                fileName: "[project]/components/CategoryPendingCard.jsx",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CategoryPendingCard.jsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/RelativeTime.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RelativeTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function formatRelative(iso) {
    if (!iso) return "sin datos";
    const then = new Date(iso.includes("T") || iso.includes("Z") ? iso : iso.replace(" ", "T"));
    if (Number.isNaN(then.getTime())) return "sin datos";
    const diffSec = Math.max(0, Math.floor((Date.now() - then.getTime()) / 1000));
    if (diffSec < 5) return "justo ahora";
    if (diffSec < 60) return `hace ${diffSec} segundo${diffSec === 1 ? "" : "s"}`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `hace ${diffMin} minuto${diffMin === 1 ? "" : "s"}`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `hace ${diffH} hora${diffH === 1 ? "" : "s"}`;
    const diffD = Math.floor(diffH / 24);
    return `hace ${diffD} día${diffD === 1 ? "" : "s"}`;
}
function RelativeTime({ iso, prefix = "" }) {
    const [, setTick] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const id = setInterval(()=>setTick((t)=>t + 1), 1000);
        return ()=>clearInterval(id);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            prefix,
            formatRelative(iso)
        ]
    }, void 0, true, {
        fileName: "[project]/components/RelativeTime.jsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SourceSyncGrid.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SourceSyncGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RelativeTime$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RelativeTime.jsx [app-ssr] (ecmascript)");
"use client";
;
;
function SourceSyncGrid({ systems, generatedAt, errors }) {
    const errorLabels = new Set((errors || []).map((e)=>e.system));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
        children: systems.map((s)=>{
            const hasError = errorLabels.has(s.label);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 rounded-md border border-line bg-base-800/60 px-3 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-2 w-2 rounded-full ${hasError ? "bg-signal-crit" : "bg-signal-ok"} ${hasError ? "animate-pulse_dot" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/components/SourceSyncGrid.jsx",
                        lineNumber: 17,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm font-display font-semibold text-ink-hi leading-tight",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/components/SourceSyncGrid.jsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[11px] text-ink-mid font-body leading-tight",
                                children: hasError ? "Sin conexión" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RelativeTime$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    iso: generatedAt,
                                    prefix: "Actualizado "
                                }, void 0, false, {
                                    fileName: "[project]/components/SourceSyncGrid.jsx",
                                    lineNumber: 25,
                                    columnNumber: 46
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/SourceSyncGrid.jsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SourceSyncGrid.jsx",
                        lineNumber: 22,
                        columnNumber: 13
                    }, this)
                ]
            }, s.id, true, {
                fileName: "[project]/components/SourceSyncGrid.jsx",
                lineNumber: 13,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/SourceSyncGrid.jsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/categories.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "categoryForSystemId",
    ()=>categoryForSystemId,
    "getCategory",
    ()=>getCategory,
    "systemsForCategory",
    ()=>systemsForCategory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/systems.js [app-ssr] (ecmascript)");
;
const CATEGORIES = [
    {
        id: "imss",
        label: "IMSS",
        description: "Seguimiento operativo de la mesa IMSS.",
        systemIds: [
            "imss"
        ],
        accent: "green",
        icon: "🏥"
    },
    {
        id: "cns",
        label: "CNS",
        description: "Atención y control de la operación CNS.",
        systemIds: [
            "cns"
        ],
        accent: "blue",
        icon: "🛰️"
    },
    {
        id: "secihti",
        label: "SECIHTI",
        description: "Mesa de ayuda del proyecto SECIHTI.",
        systemIds: [
            "secihti"
        ],
        accent: "amber",
        icon: "🧪"
    },
    {
        id: "prepa",
        label: "Prepa en Línea",
        description: "Mesa de ayuda de Prepa en Línea.",
        systemIds: [
            "prepa"
        ],
        accent: "pink",
        icon: "🎓"
    },
    {
        id: "unadm",
        label: "UnADM",
        description: "Mesa de ayuda del proyecto UnADM.",
        systemIds: [
            "unadm"
        ],
        accent: "cyan",
        icon: "🌐"
    },
    {
        id: "mujeres",
        label: "Mujeres",
        description: "Mesa de ayuda del proyecto Mujeres.",
        systemIds: [
            "mujeres"
        ],
        accent: "rose",
        icon: "♀️"
    }
];
function getCategory(categoryId) {
    return CATEGORIES.find((c)=>c.id === categoryId) || null;
}
function systemsForCategory(categoryId) {
    const category = getCategory(categoryId);
    if (!category) return [];
    const idSet = new Set(category.systemIds);
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SYSTEMS"].filter((s)=>idSet.has(s.id));
}
function categoryForSystemId(systemId) {
    return CATEGORIES.find((c)=>c.systemIds.includes(systemId)) || null;
}
}),
"[project]/lib/systems.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEMO_MODE",
    ()=>DEMO_MODE,
    "SYSTEMS",
    ()=>SYSTEMS
]);
// Configuración de los 5 sistemas GLPI.
// Cada instancia se define por variables de entorno para no hardcodear credenciales.
// Ver .env.example para el formato completo.
function envOr(name, fallback) {
    const v = process.env[name];
    return v && v.length > 0 ? v : fallback;
}
const DEMO_MODE = envOr("DEMO_MODE", "true") === "true";
const SYSTEMS = [
    {
        id: "cns",
        label: "CNS",
        baseUrl: envOr("GLPI_CNS_URL", "https://opcenter.cns-ipicyt.mx/cns"),
        appToken: process.env.GLPI_CNS_APP_TOKEN || "",
        userToken: process.env.GLPI_CNS_USER_TOKEN || "",
        user: process.env.GLPI_CNS_USER || process.env.GLPI_USER || "",
        password: process.env.GLPI_CNS_PASSWORD || process.env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_CNS_INSECURE_TLS", "false") === "true"
    },
    {
        id: "unadm",
        label: "UnADM",
        baseUrl: envOr("GLPI_UNADM_URL", "https://opcenter-unadm.cns-ipicyt.mx"),
        appToken: process.env.GLPI_UNADM_APP_TOKEN || "",
        userToken: process.env.GLPI_UNADM_USER_TOKEN || "",
        user: process.env.GLPI_UNADM_USER || process.env.GLPI_USER || "",
        password: process.env.GLPI_UNADM_PASSWORD || process.env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_UNADM_INSECURE_TLS", "false") === "true"
    },
    {
        id: "prepa",
        label: "Prepa",
        baseUrl: envOr("GLPI_PREPA_URL", "https://opcenter-prepa.cns-ipicyt.mx"),
        appToken: process.env.GLPI_PREPA_APP_TOKEN || "",
        userToken: process.env.GLPI_PREPA_USER_TOKEN || "",
        user: process.env.GLPI_PREPA_USER || process.env.GLPI_USER || "",
        password: process.env.GLPI_PREPA_PASSWORD || process.env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_PREPA_INSECURE_TLS", "false") === "true"
    },
    {
        id: "secihti",
        label: "SECIHTI",
        baseUrl: envOr("GLPI_SECIHTI_URL", "https://opcenter-secihti.cns-ipicyt.mx"),
        appToken: process.env.GLPI_SECIHTI_APP_TOKEN || "",
        userToken: process.env.GLPI_SECIHTI_USER_TOKEN || "",
        user: process.env.GLPI_SECIHTI_USER || process.env.GLPI_USER || "",
        password: process.env.GLPI_SECIHTI_PASSWORD || process.env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_SECIHTI_INSECURE_TLS", "false") === "true"
    },
    {
        id: "mujeres",
        label: "Mujeres",
        baseUrl: envOr("GLPI_MUJERES_URL", "https://opcenter-mujeres.cns-ipicyt.mx"),
        appToken: process.env.GLPI_MUJERES_APP_TOKEN || "",
        userToken: process.env.GLPI_MUJERES_USER_TOKEN || "",
        user: process.env.GLPI_MUJERES_USER || process.env.GLPI_USER || "",
        password: process.env.GLPI_MUJERES_PASSWORD || process.env.GLPI_PASSWORD || "",
        insecureTLS: envOr("GLPI_MUJERES_INSECURE_TLS", "false") === "true"
    }
];
}),
];

//# sourceMappingURL=_04yq4b6._.js.map