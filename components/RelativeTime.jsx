"use client";

import { useEffect, useState } from "react";

function formatRelative(iso) {
  if (!iso) return "sin datos";
  const then = new Date(iso.includes("T") || iso.includes("Z") ? iso : iso.replace(" ", "T"));
  if (Number.isNaN(then.getTime())) return "sin datos";
  const diffSec = Math.max(0, Math.floor((Date.now() - then.getTime()) / 1000));
  if (diffSec < 5) return "justo ahora";
  if (diffSec < 60) return `hace ${diffSec} segundo${diffSec === 1 ? "" : "s"}`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `hace ${diffMin} minuto${diffMin === 1 ? "" : "s"}`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `hace ${diffH} hora${diffH === 1 ? "" : "s"}`;
  const diffD = Math.floor(diffH / 24);
  return `hace ${diffD} día${diffD === 1 ? "" : "s"}`;
}

// Texto de "hace X tiempo" que se re-calcula solo, sin depender de que el
// componente padre vuelva a renderizar (útil para el Inicio, que solo
// vuelve a pedir datos cada 30s pero el texto de "hace Xs" debe sentirse
// vivo segundo a segundo).
export default function RelativeTime({ iso, prefix = "" }) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {prefix}
      {formatRelative(iso)}
    </>
  );
}
