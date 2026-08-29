import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata = {
  title: "Ops · Tickets CNS-IPICYT",
  description: "Monitoreo en vivo de los sistemas GLPI (IMSS, CNS, UnADM, Prepa, SECIHTI, Mujeres)",
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
      <body className="font-body bg-slate-100 text-ink-hi min-h-screen">
        {/* El menú lateral y la barra superior viven en un solo lugar
            (AppShell) para toda la app: así "/", "/proyecto/[id]" y
            "/tickets" comparten el mismo sidebar/topbar sin duplicarlo en
            cada página, y navegar entre ellas no recarga ese chrome. */}
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
