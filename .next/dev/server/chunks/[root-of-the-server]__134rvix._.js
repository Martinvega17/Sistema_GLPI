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
"[project]/app/api/assistant/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant.js [app-route] (ecmascript)");
;
;
async function POST(request) {
    const { ticket } = await request.json();
    if (!ticket) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Falta 'ticket' en el body"
        }, {
            status: 400
        });
    }
    const suggestion = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["suggestAction"])(ticket);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(suggestion);
}
}),
"[project]/lib/assistant.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "suggestAction",
    ()=>suggestAction
]);
// Asistente de atención de tickets.
//
// Si defines ANTHROPIC_API_KEY en .env.local, las sugerencias se generan
// con Claude (más contextuales). Si no, se usa un motor de reglas simple
// que igual es útil y no depende de ninguna API externa.
async function suggestWithClaude(ticket) {
    const prompt = `Eres un asistente de mesa de ayuda (help desk) para instituciones educativas/gubernamentales en México que usan GLPI.
Ticket:
- Sistema: ${ticket.systemLabel}
- Título: ${ticket.title}
- Estado: ${ticket.status}
- Prioridad: ${ticket.priority}
- Horas abierto: ${ticket.ageHours != null ? Math.round(ticket.ageHours) : "desconocido"}
- Límite de SLA: ${ticket.slaHoursLimit}h
- Estado de SLA: ${ticket.slaStatus}

En máximo 2 frases y en español, sugiere la siguiente acción concreta que debería tomar el técnico asignado. Sé directo y accionable, sin relleno.`;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 200,
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
    });
    if (!res.ok) throw new Error(`Claude API respondió ${res.status}`);
    const data = await res.json();
    const text = data.content?.map((b)=>b.text || "").join(" ").trim();
    return text || null;
}
function suggestWithRules(ticket) {
    if (ticket.slaStatus === "breach") {
        return `Fuera de SLA (límite ${ticket.slaHoursLimit}h). Escalar de inmediato a un técnico disponible y notificar al solicitante del retraso.`;
    }
    if (ticket.slaStatus === "warn") {
        return `Cerca del límite de SLA (${ticket.slaHoursLimit}h). Confirmar que ya tiene técnico asignado y dar seguimiento hoy mismo.`;
    }
    if (ticket.statusId === 1) {
        return "Ticket nuevo sin asignar. Clasificar por categoría y asignar a la cola correspondiente.";
    }
    if (ticket.statusId === 4) {
        return "En espera. Verificar si sigue esperando respuesta del usuario o de un tercero; si ya pasó tiempo razonable, retomar.";
    }
    return "En curso dentro de tiempo. Continuar seguimiento normal.";
}
async function suggestAction(ticket) {
    if (process.env.ANTHROPIC_API_KEY) {
        try {
            const suggestion = await suggestWithClaude(ticket);
            if (suggestion) return {
                text: suggestion,
                source: "claude"
            };
        } catch  {
        // cae al motor de reglas si Claude falla
        }
    }
    return {
        text: suggestWithRules(ticket),
        source: "rules"
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__134rvix._.js.map