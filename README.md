# Ops · Tickets CNS-IPICYT

Dashboard que consolida en un solo lugar los tickets de los 5 GLPI:
CNS, UnADM, Prepa, SECIHTI y Mujeres. Muestra estado en vivo (polling cada
30s), alerta cuando un ticket sale de SLA, y trae un asistente que sugiere
la siguiente acción por ticket.

## 1. Correrlo local (con datos de ejemplo)

No necesitas ninguna credencial para ver la app funcionando:

```bash
npm install
cp .env.example .env.local     # deja DEMO_MODE=true
npm run dev
```

Abre http://localhost:3000 — verás datos de ejemplo ya con tickets vencidos,
por vencer y en tiempo, para que puedas evaluar el diseño y el flujo antes
de conectar los GLPI reales.

## 2. Conectarlo a los 5 GLPI reales

### 2.1 Habilitar la API REST en cada GLPI

Esto se hace **una vez por cada uno de los 5 sistemas**, como administrador:

1. Entra a **Configuración → General → pestaña "API"**.
2. Activa **"Habilitar Rest API"**.
3. En la sección de "Clientes API", crea o revisa uno activo y copia su
   **App-Token** (si tu instalación no lo exige, puedes dejarlo vacío).
4. Confirma que el usuario `martin.vega` tenga un perfil con permiso de
   lectura sobre "Tickets" en ese GLPI.

### 2.2 Configurar `.env.local`

```bash
DEMO_MODE=false

GLPI_USER=martin.vega
GLPI_PASSWORD=tu_contraseña

GLPI_CNS_URL=https://opcenter.cns-ipicyt.mx/cns
GLPI_UNADM_URL=https://opcenter-unadm.cns-ipicyt.mx
GLPI_PREPA_URL=https://opcenter-prepa.cns-ipicyt.mx
GLPI_SECIHTI_URL=https://opcenter-secihti.cns-ipicyt.mx
GLPI_MUJERES_URL=https://opcenter-mujeres.cns-ipicyt.mx

# si alguno pide App-Token, ponlo en su variable correspondiente:
# GLPI_CNS_APP_TOKEN=...
```

Reinicia `npm run dev`. Si algún sistema falla (API no habilitada, usuario
sin permisos, App-Token faltante), el dashboard sigue funcionando con los
otros 4 y muestra el error específico de ese sistema en un banner amarillo.

> **Nota sobre "tiempo real":** GLPI no tiene webhooks nativos. Este
> dashboard usa *polling*: vuelve a preguntar cada 30 segundos
> (configurable en `app/page.js`, constante `REFRESH_INTERVAL_MS`). Es lo
> más cercano a tiempo real sin modificar GLPI.

## 3. Alertas automáticas de SLA

`GET /api/alerts` evalúa los 5 sistemas y, si hay tickets fuera de SLA,
puede notificar a un webhook (Slack, Discord, Microsoft Teams — cualquiera
que acepte `{ "text": "..." }`).

1. Crea un webhook entrante en tu canal de Slack/Teams/Discord.
2. Ponlo en `ALERT_WEBHOOK_URL` en `.env.local`.
3. Programa algo que golpee ese endpoint cada 5–15 minutos:
   - **Local/servidor propio:** un cron real, por ejemplo:
     `*/10 * * * * curl -s https://tu-dominio/api/alerts > /dev/null`
   - **Vercel (plan gratuito):** los Cron Jobs de Vercel Hobby solo permiten
     ejecución diaria, lo cual no alcanza para SLA. Usa un servicio externo
     gratuito como [cron-job.org](https://cron-job.org) apuntando a
     `https://tu-dominio.vercel.app/api/alerts` cada 5-10 minutos.

Los umbrales de SLA por prioridad están en `lib/sla.js`
(`SLA_HOURS_BY_PRIORITY`) — ajústalos a los tiempos reales que manejen.

## 4. Reportes automatizados

- `GET /api/report` → resumen JSON (totales, por sistema, top 10 vencidos).
- `GET /api/report?format=csv` → CSV de todos los tickets abiertos, listo
  para Excel o para adjuntar a un correo.
- `scripts/dailyReport.js` → script standalone que genera el CSV del día en
  `./reports/` y te dice si hubo tickets fuera de SLA. Pensado para
  `crontab` en un servidor propio:

  ```bash
  # ejemplo: correr todos los días a las 8:00 am
  0 8 * * * cd /ruta/al/proyecto && /usr/bin/node scripts/dailyReport.js
  ```

  (Este script necesita que la app esté corriendo, o adáptalo para llamar
  directo a `lib/glpiClient.js` si prefieres que sea 100% independiente.)

## 5. El asistente de atención

Por default funciona con un motor de reglas local (sin costo, sin
configuración) que sugiere qué hacer según prioridad, antigüedad y estado
del ticket — ver `lib/assistant.js`.

Si defines `ANTHROPIC_API_KEY` en `.env.local`, las sugerencias las genera
Claude con más contexto y matiz. Es opcional.

## 6. Desplegar en Vercel (gratis)

```bash
npm i -g vercel
vercel
```

En el panel de Vercel, ve a **Settings → Environment Variables** y agrega
las mismas variables de `.env.local` (nunca subas `.env.local` al repo).

Limitaciones a tener en cuenta en el plan gratuito de Vercel:
- Las funciones serverless tienen timeout corto (10s en Hobby); si algún
  GLPI responde lento, esa llamada puede cortarse. Si pasa seguido, se
  puede aumentar el timeout en un plan de pago o mover el polling a un
  servidor propio con Node corriendo 24/7.
- Cron Jobs de Vercel Hobby: 1 ejecución al día. Para alertas de SLA cada
  pocos minutos, usa un cron externo gratuito (ver sección 3).

## 7. Seguridad — importante

- **Cambia la contraseña de `martin.vega`** ahora que se compartió en texto
  plano en esta conversación, y usa una distinta para cada sistema si es
  posible.
- Nunca subas `.env.local` a git (ya está en `.gitignore`).
- Considera crear en GLPI un usuario de **solo lectura** dedicado a este
  dashboard, en vez de usar una cuenta de administrador.

## Estructura del proyecto

```
app/
  page.js                 → dashboard principal (polling cada 30s)
  api/tickets/route.js    → agrega tickets de los 5 GLPI
  api/alerts/route.js     → evalúa SLA y notifica webhook
  api/report/route.js     → reporte JSON/CSV
  api/assistant/route.js  → sugerencia de siguiente acción
lib/
  systems.js              → configuración de los 5 sistemas (desde .env)
  glpiClient.js           → cliente REST de GLPI (initSession/Ticket/killSession)
  sla.js                  → reglas de SLA por prioridad
  assistant.js            → motor de reglas + integración opcional con Claude
  demoData.js             → datos de ejemplo para DEMO_MODE=true
components/               → UI del dashboard
scripts/dailyReport.js    → reporte programable vía cron
```
