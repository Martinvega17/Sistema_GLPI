// Configuración de los sistemas GLPI.
// Cada instancia se define por variables de entorno para no hardcodear
// credenciales en el código. Ver .env.example para el formato completo.

function envOr(name, fallback) {
  const v = process.env[name];
  return v && v.length > 0 ? v : fallback;
}

// DEMO_MODE=true usa datos de ejemplo en vez de llamar a los GLPI reales.
// Útil para ver el dashboard funcionando de inmediato, antes de habilitar
// la API REST en cada GLPI y confirmar los App-Tokens.
export const DEMO_MODE = envOr("DEMO_MODE", "true") === "true";

function buildSystem(id, label, extra = {}) {
  const prefix = id.toUpperCase();
  return {
    id,
    label,
    baseUrl: envOr(`GLPI_${prefix}_URL`, extra.defaultUrl || ""),
    appToken: process.env[`GLPI_${prefix}_APP_TOKEN`] || "",
    userToken: process.env[`GLPI_${prefix}_USER_TOKEN`] || "",
    user: process.env[`GLPI_${prefix}_USER`] || process.env.GLPI_USER || "",
    password: process.env[`GLPI_${prefix}_PASSWORD`] || process.env.GLPI_PASSWORD || "",
    insecureTLS: envOr(`GLPI_${prefix}_INSECURE_TLS`, "false") === "true",
    ...extra.overrides,
  };
}

export const SYSTEMS = [
  buildSystem("cns", "CNS", { defaultUrl: "https://opcenter.cns-ipicyt.mx/cns" }),
  buildSystem("unadm", "UnADM", { defaultUrl: "https://opcenter-unadm.cns-ipicyt.mx" }),
  buildSystem("prepa", "Prepa", { defaultUrl: "https://opcenter-prepa.cns-ipicyt.mx" }),
  buildSystem("secihti", "SECIHTI", { defaultUrl: "https://opcenter-secihti.cns-ipicyt.mx" }),
  buildSystem("mujeres", "Mujeres", { defaultUrl: "https://opcenter-mujeres.cns-ipicyt.mx" }),
  // Todavía no hay una instancia GLPI real conectada para IMSS: usa datos
  // de ejemplo aunque DEMO_MODE global sea false (demoOnly: true). En
  // cuanto tengan GLPI_IMSS_URL real, quiten ese flag y pasa a real sin
  // tocar el resto del código.
  buildSystem("imss", "IMSS", { overrides: { demoOnly: true } }),
];

export function isSystemDemo(system) {
  // "system" es el objeto completo (como se le pasa desde ticketSource.js),
  // no un id/índice — por eso NO se busca en SYSTEMS aquí, se lee la
  // propiedad directamente del objeto recibido.
  //
  // Se cae a demo si: el modo global lo pide, si el sistema lo fuerza a
  // propósito (demoOnly, como IMSS mientras no tenga credenciales), O si
  // simplemente no tiene baseUrl configurado — esto último es una red de
  // seguridad: si alguien agrega un sistema nuevo, o se pierde/borra la
  // bandera demoOnly, sin baseUrl real es IMPOSIBLE llamar a GLPI (el error
  // típico sería "Failed to parse URL from /apirest.php/initSession"), así
  // que más vale mostrar datos de ejemplo que tronar.
  return DEMO_MODE || system?.demoOnly === true || !system?.baseUrl;
}
