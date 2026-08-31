# Ops · Tickets CNS-IPICYT

Dashboard que consolida en un solo lugar los tickets de los GLPI de CNS,
UnADM, Prepa, SECIHTI, Mujeres e IMSS. Muestra estado en vivo (polling cada
30s), alerta cuando un ticket sale de SLA, y trae un asistente que sugiere
la siguiente acción por ticket.

Este proyecto es una reescritura completa de la versión anterior: misma
lógica y funcionalidad, pero con la estructura simplificada y algunos
errores corregidos (ver "Qué cambió" al final).

## 1. Correrlo local (con datos de ejemplo)

No necesitas ninguna credencial para ver la app funcionando:

```bash
npm install
cp .env.example .env.local     # deja DEMO_MODE=true
npm run dev
```

Abre http://localhost:3000 — verás datos de ejemplo ya con tickets vencidos,
por vencer y en tiempo, para evaluar el diseño y el flujo antes de conectar
los GLPI reales.

## 2. Conectarlo a los GLPI reales

### 2.1 Habilitar la API REST en cada GLPI

Una vez por cada sistema, como administrador:

1. **Configuración → General → pestaña "API"**.
2. Activa **"Habilitar Rest API"**.
3. En "Clientes API", crea o revisa uno activo y copia su **App-Token** (si
   tu instalación no lo exige, puedes dejarlo vacío).
4. Confirma que el usuario configurado tenga permiso de lectura sobre
   "Tickets" en ese GLPI.

### 2.2 Configurar `.env.local`

```bash
DEMO_MODE=false

GLPI_USER=usuario
GLPI_PASSWORD=tu_contraseña

GLPI_CNS_URL=https://opcenter.cns-ipicyt.mx/cns
GLPI_UNADM_URL=https://opcenter-unadm.cns-ipicyt.mx
GLPI_PREPA_URL=https://opcenter-prepa.cns-ipicyt.mx
GLPI_SECIHTI_URL=https://opcenter-secihti.cns-ipicyt.mx
GLPI_MUJERES_URL=https://opcenter-mujeres.cns-ipicyt.mx

# Si alguno pide App-Token o usas token personal en vez de usuario/contraseña:
# GLPI_CNS_APP_TOKEN=...
# GLPI_CNS_USER_TOKEN=...
```

Si algún sistema falla (API no habilitada, usuario sin permisos, App-Token
faltante), el dashboard sigue funcionando con los demás y muestra el error
específico de ese sistema en un banner.

> **Nota sobre "tiempo real":** GLPI no tiene webhooks nativos. El
> dashboard usa *polling* cada 30 segundos (constante `REFRESH_INTERVAL_MS`
> en `app/page.js` y `app/tickets/page.js`).

## 3. Alertas automáticas de SLA

`GET /api/alerts` evalúa todos los sistemas y, si hay tickets fuera de SLA,
notifica a un webhook (Slack, Discord, Teams — cualquiera que acepte
`{ "text": "..." }`) definido en `ALERT_WEBHOOK_URL`.

Prográmalo con un cron externo gratuito como
[cron-job.org](https://cron-job.org) apuntando a
`https://tu-dominio.vercel.app/api/alerts` cada 5-10 minutos (los Cron Jobs
de Vercel Hobby solo permiten ejecución diaria, insuficiente para SLA).

Los umbrales de SLA por prioridad están en `lib/sla.js`.

## 4. Reportes

- `GET /api/report` → resumen JSON.
- `GET /api/report?format=csv` → CSV de tickets abiertos.
- `GET /api/report?format=csv&scope=all&metrics=first_response` → todos los
  tickets con tiempos de primera respuesta.
- `scripts/dailyReport.js` → genera el CSV del día en `./reports/`, pensado
  para `crontab` en un servidor propio (requiere que la app esté corriendo
  en `APP_URL`).

## 5. El asistente de atención

Por default usa un motor de reglas local (sin costo). Si defines
`ANTHROPIC_API_KEY` en `.env.local`, las sugerencias las genera Claude con
más contexto — ver `lib/assistant.js`.

## 6. Desplegar en Vercel

```bash
npm i -g vercel
vercel
```

En **Settings → Environment Variables** agrega las mismas variables de
`.env.local` (nunca subas `.env.local` al repo — ya está en `.gitignore`).

Limitaciones del plan gratuito:
- Timeout corto en funciones serverless (Hobby); si un GLPI responde lento
  esa llamada puede cortarse. Ajusta `GLPI_REQUEST_TIMEOUT_MS` si hace
  falta, o considera un plan de pago si pasa seguido.
- Cron Jobs de Vercel Hobby: 1 ejecución al día — usa un cron externo para
  alertas de SLA (ver sección 3).
- El snapshot en disco de `lib/ticketSource.js` usa el directorio temporal
  del sistema; en Vercel eso es efímero por instancia, así que ayuda dentro
  de una misma instancia "caliente" pero no sustituye un caché persistente
  real (Redis, etc.) si eso llega a ser necesario.

## 7. Seguridad

- Nunca subas `.env.local` a git.
- Usa en GLPI un usuario de **solo lectura** dedicado a este dashboard, no
  una cuenta de administrador.
- Si compartiste alguna contraseña en texto plano en algún momento
  (chat, correo, etc.), cámbiala.

## Estructura del proyecto

```
app/
  page.js                 → dashboard "Inicio" (polling cada 30s)
  tickets/page.js         → vista consolidada de todos los sistemas
  proyecto/[category]/    → vista por sistema (tickets/pendientes, paginada)
  api/tickets/             → agrega tickets de todos los sistemas
  api/project-tickets/     → tickets paginados/filtrados de un sistema
  api/alerts/               → evalúa SLA y notifica webhook
  api/report/                → reporte JSON/CSV
  api/assistant/              → sugerencia de siguiente acción
  api/ticket-detail/           → descripción + último seguimiento de un ticket
  api/ticket-extras/            → campos "pesados" en lote (solución, áreas...)
  api/glpi-image/                → reenvía imágenes adjuntas de GLPI
lib/
  systems.js               → configuración de los sistemas (desde .env)
  glpiClient.js             → cliente REST de GLPI
  sla.js                     → reglas de SLA por prioridad
  assistant.js                 → motor de reglas + integración opcional con Claude
  ticketSource.js                → caché de tickets por sistema
  ticketEnrichment.js               → enriquecimiento en lote para la vista de proyecto
  demoData.js                        → datos de ejemplo para DEMO_MODE=true
components/               → UI del dashboard
scripts/dailyReport.js    → reporte programable vía cron
```

## Qué cambió respecto a la versión anterior

- **`/api/glpi-image` ahora existe.** El código para extraer imágenes
  adjuntas de un ticket (`extractImages` en `lib/glpiClient.js`) ya estaba
  escrito pero nunca se usaba ni se exponía la ruta que las sirve — las
  imágenes simplemente nunca cargaban. Ahora el detalle del ticket incluye
  `images` y el panel del asistente las muestra.
- **`.env.local` ahora sí está en `.gitignore`.** El README anterior decía
  que ya lo estaba, pero el archivo real no lo incluía.
- **Se quitaron componentes muertos** (`SystemTicketsView.jsx`,
  `CategoryPendingCard.jsx`) que ya no se usaban en ninguna página y solo
  agregaban confusión al proyecto.
- **`lib/systems.js` se simplificó** con una función que arma cada sistema
  a partir de su prefijo de variables de entorno, en vez de repetir el
  mismo bloque 6 veces — mismas variables de entorno, mismo comportamiento.
- **El snapshot en disco de tickets** ahora usa el directorio temporal del
  sistema en vez de una carpeta dentro del proyecto, para que no truene si
  se despliega en un entorno de solo lectura como Vercel.
- El modelo usado por el asistente de Claude se actualizó al modelo vigente
  (`claude-sonnet-5`).
