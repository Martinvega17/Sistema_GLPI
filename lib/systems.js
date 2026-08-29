// Configuración de los 5 sistemas GLPI.
// Cada instancia se define por variables de entorno para no hardcodear credenciales.
// Ver .env.example para el formato completo.

function envOr(name, fallback) {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

// DEMO_MODE=true usa datos de ejemplo en vez de llamar a los GLPI reales.
// Útil para ver el dashboard funcionando de inmediato, antes de habilitar
// la API REST en cada GLPI y confirmar los App-Tokens.
export const DEMO_MODE = envOr("DEMO_MODE", "true") === "true";

export const SYSTEMS = [
  {
    id: "cns",
    label: "CNS",
    baseUrl: envOr("GLPI_CNS_URL", "https://opcenter.cns-ipicyt.mx/cns"),
    appToken: process.env.GLPI_CNS_APP_TOKEN || "",
    userToken: process.env.GLPI_CNS_USER_TOKEN || "",
    user: process.env.GLPI_CNS_USER || process.env.GLPI_USER || "",
    password: process.env.GLPI_CNS_PASSWORD || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr("GLPI_CNS_INSECURE_TLS", "false") === "true",
  },
  {
    id: "unadm",
    label: "UnADM",
    baseUrl: envOr("GLPI_UNADM_URL", "https://opcenter-unadm.cns-ipicyt.mx"),
    appToken: process.env.GLPI_UNADM_APP_TOKEN || "",
    userToken: process.env.GLPI_UNADM_USER_TOKEN || "",
    user: process.env.GLPI_UNADM_USER || process.env.GLPI_USER || "",
    password: process.env.GLPI_UNADM_PASSWORD || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr("GLPI_UNADM_INSECURE_TLS", "false") === "true",
  },
  {
    id: "prepa",
    label: "Prepa",
    baseUrl: envOr("GLPI_PREPA_URL", "https://opcenter-prepa.cns-ipicyt.mx"),
    appToken: process.env.GLPI_PREPA_APP_TOKEN || "",
    userToken: process.env.GLPI_PREPA_USER_TOKEN || "",
    user: process.env.GLPI_PREPA_USER || process.env.GLPI_USER || "",
    password: process.env.GLPI_PREPA_PASSWORD || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr("GLPI_PREPA_INSECURE_TLS", "false") === "true",
  },
  {
    id: "secihti",
    label: "SECIHTI",
    baseUrl: envOr("GLPI_SECIHTI_URL", "https://opcenter-secihti.cns-ipicyt.mx"),
    appToken: process.env.GLPI_SECIHTI_APP_TOKEN || "",
    userToken: process.env.GLPI_SECIHTI_USER_TOKEN || "",
    user: process.env.GLPI_SECIHTI_USER || process.env.GLPI_USER || "",
    password: process.env.GLPI_SECIHTI_PASSWORD || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr("GLPI_SECIHTI_INSECURE_TLS", "false") === "true",
  },
  {
    id: "mujeres",
    label: "Mujeres",
    baseUrl: envOr("GLPI_MUJERES_URL", "https://opcenter-mujeres.cns-ipicyt.mx"),
    appToken: process.env.GLPI_MUJERES_APP_TOKEN || "",
    userToken: process.env.GLPI_MUJERES_USER_TOKEN || "",
    user: process.env.GLPI_MUJERES_USER || process.env.GLPI_USER || "",
    password: process.env.GLPI_MUJERES_PASSWORD || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr("GLPI_MUJERES_INSECURE_TLS", "false") === "true",
  },
  {
    id: "imss",
    label: "IMSS",
    baseUrl: envOr("GLPI_IMSS_URL", ""),
    appToken: process.env.GLPI_IMSS_APP_TOKEN || "",
    userToken: process.env.GLPI_IMSS_USER_TOKEN || "",
    user: process.env.GLPI_IMSS_USER || process.env.GLPI_USER || "",
    password: process.env.GLPI_IMSS_PASSWORD || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr("GLPI_IMSS_INSECURE_TLS", "false") === "true",
    // Todavía no hay una instancia GLPI real conectada para IMSS: usa datos
    // de ejemplo aunque DEMO_MODE global sea false. En cuanto tengan
    // GLPI_IMSS_URL real, quiten este flag (o llénenlo y quítenlo) y pasa a
    // real sin tocar el resto del código.
    demoOnly: true,
  },
];

export function isSystemDemo(system) {
  // "system" es el objeto completo (como se le pasa desde ticketSource.js),
  // no un id/índice — por eso NO se busca en SYSTEMS aquí, se lee la
  // propiedad directamente del objeto recibido.
  //
  // Se cae a demo si: el modo global lo pide, si el sistema lo fuerza a
  // propósito (demoOnly, como IMSS mientras no tenga credenciales), O si
  // simplemente no tiene baseUrl configurado — este último caso es una red
  // de seguridad: si alguien agrega un sistema nuevo, o se pierde/borra la
  // bandera demoOnly, sin baseUrl real es IMPOSIBLE llamar a GLPI (el error
  // típico es "Failed to parse URL from /apirest.php/initSession"), así que
  // más vale mostrar datos de ejemplo que tronar.
  return DEMO_MODE || system?.demoOnly === true || !system?.baseUrl;
}
