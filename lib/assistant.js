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
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Claude API respondió ${res.status}`);
  const data = await res.json();
  const text = data.content?.map((b) => b.text || "").join(" ").trim();
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

export async function suggestAction(ticket) {
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const suggestion = await suggestWithClaude(ticket);
      if (suggestion) return { text: suggestion, source: "claude" };
    } catch {
      // cae al motor de reglas si Claude falla
    }
  }
  return { text: suggestWithRules(ticket), source: "rules" };
}
