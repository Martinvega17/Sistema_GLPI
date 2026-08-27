import "./globals.css";

export const metadata = {
  title: "Ops · Tickets CNS-IPICYT",
  description: "Monitoreo en vivo de los 5 sistemas GLPI (CNS, UnADM, Prepa, SECIHTI, Mujeres)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      {/* suppressHydrationWarning: extensiones del navegador como Dark
          Reader inyectan atributos (p. ej. data-darkreader-proxy-injected)
          en <html> antes de que React hidrate, lo que dispara el warning de
          "A tree hydrated but some attributes... didn't match" aunque la
          app esté bien. Esto solo silencia ESE warning específico de
          atributos en este nodo; no oculta errores reales de hidratación
          en el resto del árbol. */}
      <body className="font-body bg-base-950 text-ink-hi min-h-screen">{children}</body>
    </html>
  );
}
