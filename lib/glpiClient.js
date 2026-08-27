// Cliente mínimo para la API REST de GLPI (apirest.php).
//
// Requisitos en cada GLPI (Configuración > General > API):
//   1. Activar "API REST".
//   2. Crear/activar un "Cliente API" y copiar su App-Token (obligatorio si
//      el GLPI lo exige — varios de los 5 sistemas sí lo requieren).
//   3. El usuario (martin.vega) debe tener permiso de lectura sobre Tickets.
//
// IMPORTANTE — dos formas de autenticar al usuario contra initSession:
//   a) Usuario + contraseña (Basic Auth). Solo funciona si el GLPI tiene
//      habilitada la opción "Iniciar sesión con credenciales" en
//      Configuración > General > API. Varios GLPI la traen desactivada
//      por seguridad -> da el error ERROR_LOGIN_WITH_CREDENTIALS_DISABLED.
//   b) Token personal del usuario ("user_token"). Se genera así:
//      - Entra al GLPI con martin.vega
//      - Preferencias (clic en el nombre, arriba a la derecha)
//      - Pestaña "Claves de acceso remoto" / "Remote access keys"
//      - Sección "Token API" -> Generar / Regenerar
//      - Copia ese token al .env.local (GLPI_<SISTEMA>_USER_TOKEN)
//   Esta implementación usa el token si está definido; si no, cae a
//   usuario/contraseña.
//
// GLPI no ofrece webhooks nativos, así que "tiempo real" se logra con
// polling: el dashboard vuelve a pedir datos cada N segundos (ver
// REFRESH_INTERVAL_MS en app/page.js) y este cliente abre/cierra una sesión
// por cada consulta para no dejar sesiones colgadas.

const TICKET_STATUS = {
  1: "Nuevo",
  2: "En curso (asignado)",
  3: "En curso (planificado)",
  4: "En espera",
  5: "Resuelto",
  6: "Cerrado",
};

const TICKET_PRIORITY = {
  1: "Muy baja",
  2: "Baja",
  3: "Media",
  4: "Alta",
  5: "Muy alta",
  6: "Mayor",
};

function statusLabel(id) {
  return TICKET_STATUS[id] || `Desconocido (${id})`;
}

function priorityLabel(id) {
  return TICKET_PRIORITY[id] || `Desconocida (${id})`;
}

// Los campos de texto de GLPI (content de Ticket e ITILFollowup) vienen en
// HTML — y en varias instancias, encima, con las etiquetas escapadas como
// entidades numéricas (&#60;p&#62; en vez de <p>). Primero decodificamos
// entidades (numéricas y las básicas con nombre), y luego recién
// convertimos las etiquetas HTML resultantes a texto plano.
function decodeEntities(str) {
  if (!str) return "";
  return str
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function stripHtml(html) {
  if (!html) return "";
  // Se decodifica dos veces por si el contenido viene doblemente escapado
  // (p. ej. "&amp;#60;" en vez de "&#60;"); la segunda pasada es inofensiva
  // si ya no queda nada por decodificar.
  let text = decodeEntities(html);
  text = decodeEntities(text);
  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Agente HTTPS que ignora errores de certificado — SOLO se usa si el
// sistema tiene insecureTLS=true en .env.local (ver systems.js). Sirve para
// servidores internos con certificado autofirmado/incompleto que el
// navegador tolera pero Node rechaza por defecto ("fetch failed"). Implica
// menor seguridad: solo actívalo si confías en la red/servidor.
let insecureAgent;
function dispatcherFor(system) {
  if (!system.insecureTLS) return undefined;
  if (!insecureAgent) {
    const { Agent } = require("undici");
    insecureAgent = new Agent({ connect: { rejectUnauthorized: false } });
  }
  return insecureAgent;
}

async function initSession(system) {
  const headers = {};
  if (system.appToken) headers["App-Token"] = system.appToken;

  if (system.userToken) {
    // Autenticación por token personal (requerida cuando el GLPI tiene
    // deshabilitado el login con usuario/contraseña).
    headers["Authorization"] = `user_token ${system.userToken}`;
  } else {
    headers["Authorization"] =
      "Basic " + Buffer.from(`${system.user}:${system.password}`).toString("base64");
  }

  const res = await fetch(`${system.baseUrl}/apirest.php/initSession`, {
    method: "GET",
    headers,
    cache: "no-store",
    dispatcher: dispatcherFor(system),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `[${system.label}] initSession falló (${res.status}): ${body.slice(0, 300)}`
    );
  }
  const data = await res.json();
  return data.session_token;
}

async function killSession(system, sessionToken) {
  try {
    await fetch(`${system.baseUrl}/apirest.php/killSession`, {
      method: "GET",
      headers: {
        "Session-Token": sessionToken,
        ...(system.appToken ? { "App-Token": system.appToken } : {}),
      },
      cache: "no-store",
      dispatcher: dispatcherFor(system),
    });
  } catch {
    // no crítico
  }
}

// Trae los tickets de un sistema (abiertos y cerrados) y los normaliza a un
// formato común para el dashboard.
//
// IMPORTANTE — paginación: un solo GET a GLPI solo devuelve como máximo
// "rangeSize" tickets (los que GLPI decida, generalmente por ID ascendente
// si no se pide "sort"). Si el sistema tiene más tickets que rangeSize,
// pedir solo la primera página puede traer únicamente tickets viejos ya
// cerrados y dejar fuera a los abiertos recientes — que es justo lo que
// pasaba antes: en GLPI directo sí aparecían tickets "En curso", pero acá
// nunca llegaban a pedirse. Por eso aquí SIEMPRE se pagina hasta traer
// todo el historial (o hasta maxTickets, como límite de seguridad).
async function fetchTicketsForSystem(system, { rangeSize = 500, maxTickets = 5000 } = {}) {
  let sessionToken;
  try {
    sessionToken = await initSession(system);

    const headers = {
      "Session-Token": sessionToken,
      ...(system.appToken ? { "App-Token": system.appToken } : {}),
    };

    let allRaw = [];
    let start = 0;
    let total = null;

    // Sin filtro de estado: traemos todo (abiertos, resueltos y cerrados).
    // No pedimos "sort"/"order" al API: el número de search option que
    // corresponde a "ID" varía entre instancias de GLPI (versión, plugins,
    // configuración local), y pedir uno que no existe en esta instancia
    // devuelve un error 400 ("sort param is not a field of glpi_tickets").
    // Ordenamos nosotros mismos en JS después de recibir todo (ver abajo).
    for (;;) {
      const url = new URL(`${system.baseUrl}/apirest.php/Ticket`);
      url.searchParams.set("range", `${start}-${start + rangeSize - 1}`);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers,
        cache: "no-store",
        dispatcher: dispatcherFor(system),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`[${system.label}] GET Ticket falló (${res.status}): ${body.slice(0, 300)}`);
      }

      const raw = await res.json();
      if (!Array.isArray(raw)) {
        // Algunas versiones de GLPI devuelven un objeto de error con 200 OK
        // en vez de un array cuando los criterios de búsqueda no son válidos.
        throw new Error(
          `[${system.label}] respuesta inesperada de GET Ticket: ${JSON.stringify(raw).slice(0, 300)}`
        );
      }
      allRaw = allRaw.concat(raw);

      // GLPI manda "Content-Range: inicio-fin/total" — de ahí sacamos
      // cuántos tickets hay en total para saber si falta pedir más páginas.
      if (total === null) {
        const cr = res.headers.get("content-range");
        if (cr && cr.includes("/")) {
          const parsedTotal = Number(cr.split("/")[1]);
          if (!Number.isNaN(parsedTotal)) total = parsedTotal;
        }
      }

      start += rangeSize;
      const paginaIncompleta = raw.length < rangeSize; // ya no hay más páginas
      const yaLlegoAlTotal = total !== null && start >= total;
      const llegoAlLimiteDeSeguridad = start >= maxTickets;

      if (paginaIncompleta || yaLlegoAlTotal || llegoAlLimiteDeSeguridad) break;
    }

    const tickets = allRaw
      .map((t) => normalizeTicket(t, system))
      .sort((a, b) => Number(b.rawId) - Number(a.rawId));

    return { systemId: system.id, systemLabel: system.label, ok: true, tickets, error: null };
  } catch (err) {
    // err.cause suele traer el motivo real cuando fetch falla a nivel red
    // (certificado SSL inválido/autofirmado, DNS, timeout, etc.) — "fetch
    // failed" solo es la etiqueta genérica de Node.
    const causeMsg = err.cause
      ? ` — causa: ${err.cause.code || ""} ${err.cause.message || err.cause}`.trim()
      : "";
    return {
      systemId: system.id,
      systemLabel: system.label,
      ok: false,
      tickets: [],
      error: (err.message || String(err)) + causeMsg,
    };
  } finally {
    if (sessionToken) await killSession(system, sessionToken);
  }
}

function normalizeTicket(t, system) {
  return {
    id: `${system.id}-${t.id}`,
    rawId: t.id,
    systemId: system.id,
    systemLabel: system.label,
    title: t.name || "(sin título)",
    // Number(...) es importante: algunas instancias de GLPI devuelven el
    // status/prioridad como texto ("2") en vez de número (2) en el JSON.
    // Si no se convierte, todas las comparaciones estrictas (===) de
    // lib/sla.js y lib/statusFilters.js fallan en silencio y CADA ticket
    // termina cayendo en la categoría "cerrado" por defecto — aunque su
    // estado real sea Nuevo/En curso — porque el filtro de "abierto" no
    // logra reconocerlo.
    statusId: Number(t.status),
    status: statusLabel(t.status),
    priorityId: Number(t.priority),
    priority: priorityLabel(t.priority),
    dateCreated: t.date,
    dateModified: t.date_mod,
    requester: t.users_id_recipient || null,
    // Descripción original del ticket (para el resumen del asistente).
    content: stripHtml(t.content || ""),
    url: `${system.baseUrl}/front/ticket.form.php?id=${t.id}`,
  };
}

// Trae el detalle "profundo" de UN ticket: su descripción completa, el
// último seguimiento (respuesta) registrado y el/los grupo(s) — área —
// asignados al ticket. Se llama bajo demanda (cuando el usuario selecciona
// un ticket en el panel), NO para toda la lista, porque cada llamada abre
// una sesión GLPI adicional y sería muy pesado hacerlo para cientos de
// tickets a la vez.
// Resuelve una lista de IDs de grupo a sus nombres (completename o name),
// consultando /Group/{id} en paralelo. Ignora silenciosamente los IDs que
// fallen o no existan. Compartida por la resolución de "área del ticket" y
// "área real de la persona" en fetchTicketDetail.
async function resolveGroupNames(system, groupIds, opts, debugNotes) {
  const uniqueIds = [...new Set((groupIds || []).filter(Boolean))];
  if (uniqueIds.length === 0) return [];
  const names = await Promise.all(
    uniqueIds.map(async (gid) => {
      try {
        const gRes = await fetch(`${system.baseUrl}/apirest.php/Group/${gid}`, opts);
        if (!gRes.ok) return { gid, ok: false, status: gRes.status, name: null };
        const gData = await gRes.json();
        return { gid, ok: true, status: gRes.status, name: gData.completename || gData.name || null };
      } catch (e) {
        return { gid, ok: false, status: null, name: null, error: e.message || String(e) };
      }
    })
  );
  const failed = names.filter((n) => !n.name);
  if (failed.length > 0 && Array.isArray(debugNotes)) {
    debugNotes.push(
      `Group/{id} no resolvió: ${failed
        .map((f) => `id=${f.gid} status=${f.status ?? "excepción: " + f.error}`)
        .join(" | ")}`
    );
  }
  return names.map((n) => n.name).filter(Boolean);
}

async function fetchTicketDetail(system, rawId) {
  let sessionToken;
  // Registra qué paso falló y por qué (status HTTP / excepción), para poder
  // diagnosticar por qué "área" sale vacía en un sistema y en otro no. No
  // afecta el comportamiento normal: solo se devuelve si se pide ?debug=1
  // desde /api/ticket-detail.
  const debugNotes = [];
  try {
    sessionToken = await initSession(system);
    const headers = {
      "Session-Token": sessionToken,
      ...(system.appToken ? { "App-Token": system.appToken } : {}),
    };
    const opts = { method: "GET", headers, cache: "no-store", dispatcher: dispatcherFor(system) };

    // 1) Ticket completo, para la descripción original.
    const ticketRes = await fetch(`${system.baseUrl}/apirest.php/Ticket/${rawId}`, opts);
    if (!ticketRes.ok) {
      const body = await ticketRes.text().catch(() => "");
      throw new Error(
        `[${system.label}] GET Ticket/${rawId} falló (${ticketRes.status}): ${body.slice(0, 300)}`
      );
    }
    const ticketRaw = await ticketRes.json();
    if (!ticketRaw || !ticketRaw.content) {
      debugNotes.push(
        `Ticket/${rawId}: la respuesta no trae 'content' (o vino vacío) — campos recibidos: ${Object.keys(ticketRaw || {}).slice(0, 15).join(", ")}`
      );
    }

    // 2) Seguimientos (respuestas). Igual que en fetchTicketsForSystem, NO
    // pedimos sort/order al API — varía por instancia y puede dar 400.
    // Ordenamos nosotros por fecha, más reciente primero.
    let followups = [];
    try {
      const fRes = await fetch(
        `${system.baseUrl}/apirest.php/Ticket/${rawId}/ITILFollowup?range=0-49`,
        opts
      );
      if (fRes.ok) {
        const raw = await fRes.json();
        if (Array.isArray(raw)) {
          followups = raw;
          if (raw.length === 0) {
            debugNotes.push(`ITILFollowup: respuesta OK pero 0 seguimientos para el ticket ${rawId} en este GLPI`);
          }
        } else {
          debugNotes.push(`ITILFollowup: respuesta OK pero no es un arreglo (¿objeto de error con 200?): ${JSON.stringify(raw).slice(0, 200)}`);
        }
      } else {
        const body = await fRes.text().catch(() => "");
        debugNotes.push(`ITILFollowup respondió HTTP ${fRes.status}: ${body.slice(0, 200)} — probable que esta instancia use 'TicketFollowup' en vez de 'ITILFollowup' (versión de GLPI más vieja), o falta de permiso`);
        // Respaldo: probamos el endpoint viejo TicketFollowup por si esta
        // instancia es una versión de GLPI anterior a la que renombró el
        // subitem a ITILFollowup.
        try {
          const legacyRes = await fetch(
            `${system.baseUrl}/apirest.php/Ticket/${rawId}/TicketFollowup?range=0-49`,
            opts
          );
          if (legacyRes.ok) {
            const legacyRaw = await legacyRes.json();
            if (Array.isArray(legacyRaw) && legacyRaw.length > 0) {
              followups = legacyRaw;
              debugNotes.push(`TicketFollowup (endpoint legado) SÍ devolvió ${legacyRaw.length} seguimiento(s) — esta instancia usa el nombre viejo del subitem`);
            }
          }
        } catch {
          // sin respaldo disponible
        }
      }
    } catch (e) {
      debugNotes.push(`ITILFollowup lanzó excepción: ${e.message || e}`);
    }
    followups.sort(
      (a, b) => new Date((b.date || "").replace(" ", "T")) - new Date((a.date || "").replace(" ", "T"))
    );
    const lastFollowup = followups[0] || null;

    // 3) Grupo(s) asignados al ticket = "área". En GLPI, Group_Ticket.type
    // 2 = grupo asignado (1 = solicitante, 3 = observador). Se compara con
    // Number(...) porque, igual que con statusId, algunas instancias
    // devuelven "type" como texto ("2") y la comparación estricta con el
    // número 2 fallaría en silencio, dejando "área" vacía siempre.
    let groupNames = [];
    try {
      const gtRes = await fetch(`${system.baseUrl}/apirest.php/Ticket/${rawId}/Group_Ticket`, opts);
      if (gtRes.ok) {
        const rawGroups = await gtRes.json();
        const groupList = Array.isArray(rawGroups) ? rawGroups : [];
        if (groupList.length === 0) {
          debugNotes.push("Group_Ticket: respuesta OK pero arreglo vacío (el ticket no tiene ningún grupo ligado en GLPI)");
        }
        let assignedIds = [
          ...new Set(
            groupList
              .filter((g) => Number(g.type) === 2)
              .map((g) => g.groups_id)
              .filter(Boolean)
          ),
        ];
        // Respaldo: si el ticket no tiene un grupo con type=2 (p. ej. está
        // asignado a un técnico individual, no a un grupo), mostramos
        // cualquier otro grupo ligado al ticket en vez de dejarlo vacío.
        if (assignedIds.length === 0) {
          assignedIds = [
            ...new Set(groupList.map((g) => g.groups_id).filter(Boolean)),
          ];
        }
        groupNames = await resolveGroupNames(system, assignedIds, opts, debugNotes);
        if (assignedIds.length > 0 && groupNames.length === 0) {
          debugNotes.push(
            `Group_Ticket devolvió IDs de grupo (${assignedIds.join(",")}) pero Group/{id} no resolvió ningún nombre — probable falta de permiso del usuario API sobre 'Group' en este GLPI`
          );
        }
      } else {
        debugNotes.push(`Group_Ticket respondió HTTP ${gtRes.status} (probable falta de permiso del usuario API sobre este endpoint)`);
      }
    } catch (e) {
      debugNotes.push(`Group_Ticket lanzó excepción: ${e.message || e}`);
    }

    // 4) Autor del último seguimiento (para mostrar quién respondió).
    let authorName = null;
    if (lastFollowup?.users_id) {
      try {
        const uRes = await fetch(`${system.baseUrl}/apirest.php/User/${lastFollowup.users_id}`, opts);
        if (uRes.ok) {
          const uData = await uRes.json();
          authorName = [uData.firstname, uData.realname].filter(Boolean).join(" ") || uData.name || null;
        }
      } catch {
        // no crítico
      }
    }

    // 5) Área REAL de quien respondió: el/los grupo(s) a los que pertenece
    // esa persona en GLPI (Group_User), NO el/los grupo(s) asignados al
    // ticket. Un ticket puede estar asignado a varias áreas (Redes,
    // Virtualización, Almacenamiento, etc.) aunque quien contestó sea, por
    // ejemplo, una sola persona de Mesa de Servicios — que es justo lo que
    // se veía distinto entre el dashboard y GLPI.
    let authorGroupNames = [];
    if (lastFollowup?.users_id) {
      try {
        const guRes = await fetch(
          `${system.baseUrl}/apirest.php/User/${lastFollowup.users_id}/Group_User`,
          opts
        );
        if (guRes.ok) {
          const rawGU = await guRes.json();
          const guList = Array.isArray(rawGU) ? rawGU : [];
          if (guList.length === 0) {
            debugNotes.push(`Group_User: el usuario ${lastFollowup.users_id} no pertenece a ningún grupo en este GLPI`);
          }
          const groupIds = [...new Set(guList.map((g) => g.groups_id).filter(Boolean))];
          authorGroupNames = await resolveGroupNames(system, groupIds, opts, debugNotes);
        } else {
          debugNotes.push(`Group_User respondió HTTP ${guRes.status} para el usuario ${lastFollowup.users_id}`);
        }
      } catch (e) {
        debugNotes.push(`Group_User lanzó excepción: ${e.message || e}`);
      }
    } else {
      debugNotes.push("El último seguimiento no tiene users_id (autor vacío/anónimo) — no se puede buscar su grupo");
    }

    return {
      ok: true,
      content: stripHtml(ticketRaw.content || ""),
      groupNames,
      lastFollowup: lastFollowup
        ? {
            date: lastFollowup.date,
            authorName,
            groupNames, // áreas asignadas al TICKET (se conserva por compatibilidad)
            authorGroupNames, // área(s) real(es) de la PERSONA que respondió
            message: stripHtml(lastFollowup.content || ""),
            isPrivate: !!lastFollowup.is_private,
          }
        : null,
      error: null,
      debugNotes,
    };
  } catch (err) {
    const causeMsg = err.cause
      ? ` — causa: ${err.cause.code || ""} ${err.cause.message || err.cause}`.trim()
      : "";
    return {
      ok: false,
      content: null,
      groupNames: [],
      lastFollowup: null,
      error: (err.message || String(err)) + causeMsg,
      debugNotes,
    };
  } finally {
    if (sessionToken) await killSession(system, sessionToken);
  }
}

// Trae, para una lista de tickets de UN sistema, la fecha de su primer
// seguimiento (primera respuesta/escalación de mesa). Se usa solo para el
// export "tiempos de respuesta" (app/api/report/route.js), NUNCA para el
// dashboard normal, porque implica una llamada extra por ticket y sería
// demasiado pesado hacerlo en cada refresco automático.
// Devuelve un objeto { [rawId]: fechaISOoNull }.
async function fetchFirstResponseForTickets(system, ticketRawIds) {
  const result = {};
  if (!ticketRawIds || ticketRawIds.length === 0) return result;

  let sessionToken;
  try {
    sessionToken = await initSession(system);
    const headers = {
      "Session-Token": sessionToken,
      ...(system.appToken ? { "App-Token": system.appToken } : {}),
    };
    const opts = { method: "GET", headers, cache: "no-store", dispatcher: dispatcherFor(system) };

    // Un ticket a la vez: GLPI no ofrece una forma simple de traer
    // seguimientos de varios tickets distintos en una sola llamada.
    for (const rawId of ticketRawIds) {
      try {
        const fRes = await fetch(
          `${system.baseUrl}/apirest.php/Ticket/${rawId}/ITILFollowup?range=0-49`,
          opts
        );
        if (!fRes.ok) {
          result[rawId] = null;
          continue;
        }
        const raw = await fRes.json();
        const list = Array.isArray(raw) ? raw : [];
        const earliest = list.reduce((min, f) => {
          const d = new Date((f.date || "").replace(" ", "T"));
          if (Number.isNaN(d.getTime())) return min;
          if (!min || d < min.date) return { date: d, raw: f.date };
          return min;
        }, null);
        result[rawId] = earliest?.raw || null;
      } catch {
        result[rawId] = null;
      }
    }
  } catch {
    // Sesión no disponible para este sistema: dejamos el mapa vacío, el
    // caller trata "sin dato" igual que "sin primera respuesta".
  } finally {
    if (sessionToken) await killSession(system, sessionToken);
  }

  return result;
}

export {
  fetchTicketsForSystem,
  fetchTicketDetail,
  fetchFirstResponseForTickets,
  statusLabel,
  priorityLabel,
  TICKET_STATUS,
  TICKET_PRIORITY,
};
