import "./globals.css";

export const metadata = {
  title: "Ops · Tickets CNS-IPICYT",
  description: "Monitoreo en vivo de los 5 sistemas GLPI (CNS, UnADM, Prepa, SECIHTI, Mujeres)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-body bg-base-950 text-ink-hi min-h-screen">{children}</body>
    </html>
  );
}
