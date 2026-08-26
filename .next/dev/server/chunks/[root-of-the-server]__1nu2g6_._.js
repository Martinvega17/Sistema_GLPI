module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/tickets/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/systems.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/glpiClient'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demoData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demoData.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sla$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/sla.js [app-route] (ecmascript)");
;
;
;
;
;
const dynamic = "force-dynamic"; // nunca cachear: esto es lo que da el "tiempo real"
async function GET() {
    const results = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_MODE"] ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demoData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDemoResults"])() : await Promise.all(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEMS"].map((s)=>fetchTicketsForSystem(s)));
    const allTickets = results.flatMap((r)=>r.tickets);
    const errors = results.filter((r)=>!r.ok).map((r)=>({
            system: r.systemLabel,
            error: r.error
        }));
    const { tickets, totals, bySystem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$sla$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["summarize"])(allTickets);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        generatedAt: new Date().toISOString(),
        demoMode: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEMO_MODE"],
        totals,
        bySystem,
        tickets,
        errors
    });
}
}),
"[project]/lib/demoData.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDemoResults",
    ()=>getDemoResults,
    "getDemoTicketDetail",
    ()=>getDemoTicketDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/systems.js [app-route] (ecmascript)");
;
function hoursAgoIso(h) {
    return new Date(Date.now() - h * 60 * 60 * 1000).toISOString().slice(0, 19).replace("T", " ");
}
function getDemoResults() {
    const templates = [
        {
            title: "No enciende switch de laboratorio",
            priorityId: 6,
            statusId: 2,
            ageH: 6
        },
        {
            title: "Correo institucional no sincroniza",
            priorityId: 4,
            statusId: 1,
            ageH: 30
        },
        {
            title: "Impresora sin tóner - control escolar",
            priorityId: 2,
            statusId: 4,
            ageH: 40
        },
        {
            title: "VPN caída para acceso remoto",
            priorityId: 5,
            statusId: 2,
            ageH: 9
        },
        {
            title: "Solicitud de alta de usuario",
            priorityId: 1,
            statusId: 1,
            ageH: 12
        },
        {
            title: "Proyector de aula 4 sin señal",
            priorityId: 3,
            statusId: 3,
            ageH: 50
        },
        {
            title: "Sistema de becas no carga",
            priorityId: 5,
            statusId: 1,
            ageH: 7
        },
        {
            title: "Renovación de certificado SSL",
            priorityId: 4,
            statusId: 4,
            ageH: 26
        }
    ];
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEMS"].map((system, sIdx)=>{
        const tickets = templates.filter((_, i)=>(i + sIdx) % __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEMS"].length !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systems$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SYSTEMS"].length - 1 || sIdx === 0).map((t, i)=>({
                id: `${system.id}-demo-${i}`,
                rawId: 1000 + i,
                systemId: system.id,
                systemLabel: system.label,
                title: t.title,
                statusId: t.statusId,
                status: [
                    "",
                    "Nuevo",
                    "En curso (asignado)",
                    "En curso (planificado)",
                    "En espera",
                    "Resuelto",
                    "Cerrado"
                ][t.statusId],
                priorityId: t.priorityId,
                priority: [
                    "",
                    "Muy baja",
                    "Baja",
                    "Media",
                    "Alta",
                    "Muy alta",
                    "Mayor"
                ][t.priorityId],
                dateCreated: hoursAgoIso(t.ageH),
                dateModified: hoursAgoIso(Math.max(0, t.ageH - 1)),
                requester: null,
                content: `Descripción de ejemplo: ${t.title}. Reportado por el usuario, pendiente de revisión técnica.`,
                url: `${system.baseUrl}/front/ticket.form.php?id=${1000 + i}`
            }));
        return {
            systemId: system.id,
            systemLabel: system.label,
            ok: true,
            tickets,
            error: null
        };
    });
}
function getDemoTicketDetail(ticket) {
    return {
        ok: true,
        content: ticket?.content || "Descripción de ejemplo no disponible.",
        groupNames: [
            "Soporte Técnico"
        ],
        lastFollowup: {
            date: hoursAgoIso(1),
            authorName: "Equipo de Soporte (demo)",
            groupNames: [
                "Soporte Técnico"
            ],
            message: "Seguimiento de ejemplo: se revisó el caso y se está a la espera de más información del usuario.",
            isPrivate: false
        },
        error: null
    };
}
}),
"[project]/lib/sla.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SLA_HOURS_BY_PRIORITY",
    ()=>SLA_HOURS_BY_PRIORITY,
    "evaluateAll",
    ()=>evaluateAll,
    "evaluateSla",
    ()=>evaluateSla,
    "summarize",
    ()=>summarize
]);
// Reglas de SLA por prioridad. Ajusta estos umbrales (en horas) a los
// tiempos reales que maneje tu mesa de ayuda. Si en el futuro cada GLPI
// expone su propio campo de SLA (time_to_resolve), se puede sustituir esta
// heurística por ese dato real vía la API (SLA / SlaLevel en GLPI).
const SLA_HOURS_BY_PRIORITY = {
    6: 4,
    5: 8,
    4: 24,
    3: 48,
    2: 96,
    1: 168
};
const OPEN_STATUS_IDS = new Set([
    1,
    2,
    3,
    4
]); // Nuevo, en curso, en espera
function hoursSince(dateStr) {
    if (!dateStr) return null;
    const then = new Date(dateStr.replace(" ", "T"));
    if (Number.isNaN(then.getTime())) return null;
    return (Date.now() - then.getTime()) / (1000 * 60 * 60);
}
// Devuelve el ticket enriquecido con banderas de SLA:
//   slaHoursLimit, ageHours, slaStatus: "ok" | "warn" | "breach" | "closed"
function evaluateSla(ticket) {
    const limit = SLA_HOURS_BY_PRIORITY[ticket.priorityId] ?? 48;
    const age = hoursSince(ticket.dateCreated);
    // Number(...) por seguridad: si statusId llegara como texto (no debería,
    // ya se normaliza en glpiClient.js), Set.has() con un número adentro no
    // lo reconocería y el ticket caería siempre en "closed" por defecto.
    const isOpen = OPEN_STATUS_IDS.has(Number(ticket.statusId));
    let slaStatus = "ok";
    if (!isOpen) {
        slaStatus = "closed"; // resuelto o cerrado: ya no aplica SLA
    } else if (age !== null) {
        if (age >= limit) slaStatus = "breach";
        else if (age >= limit * 0.75) slaStatus = "warn";
    }
    return {
        ...ticket,
        slaHoursLimit: limit,
        ageHours: age,
        slaStatus,
        isOpen
    };
}
function evaluateAll(tickets) {
    return tickets.map(evaluateSla);
}
function summarize(tickets) {
    const evaluated = evaluateAll(tickets);
    const bySystem = {};
    for (const t of evaluated){
        bySystem[t.systemId] = bySystem[t.systemId] || {
            label: t.systemLabel,
            total: 0,
            open: 0,
            breach: 0,
            warn: 0
        };
        bySystem[t.systemId].total += 1;
        if (t.isOpen) bySystem[t.systemId].open += 1;
        if (t.slaStatus === "breach") bySystem[t.systemId].breach += 1;
        if (t.slaStatus === "warn") bySystem[t.systemId].warn += 1;
    }
    return {
        tickets: evaluated,
        totals: {
            total: evaluated.length,
            open: evaluated.filter((t)=>t.isOpen).length,
            breach: evaluated.filter((t)=>t.slaStatus === "breach").length,
            warn: evaluated.filter((t)=>t.slaStatus === "warn").length
        },
        bySystem
    };
}
;
}),
"[project]/lib/systems.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1nu2g6_._.js.map