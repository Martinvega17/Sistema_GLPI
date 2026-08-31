import { NextResponse } from "next/server";
import { SYSTEMS } from "@/lib/systems";

export const dynamic = "force-dynamic";

// GET /api/glpi-image?system=cns&path=/front/document.send.php?docid=42
//
// GLPI incrusta las imágenes pegadas/adjuntas en la descripción y en los
// seguimientos como <img src="/front/document.send.php?docid=NN">. Esa URL
// solo es accesible con una sesión de GLPI activa (cookie de sesión web),
// que el navegador del usuario NO tiene — este endpoint abre una sesión de
// GLPI del lado del servidor, pide la imagen, y la reenvía tal cual.
//
// Por seguridad, "path" solo se acepta si apunta al endpoint conocido de
// descarga de documentos de ese mismo sistema (ver lib/glpiClient.js,
// extractImages) — así este endpoint no se vuelve un proxy abierto hacia
// cualquier URL.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const systemId = searchParams.get("system");
  const path = searchParams.get("path");

  if (!systemId || !path) {
    return NextResponse.json({ error: "Faltan 'system' y/o 'path'" }, { status: 400 });
  }
  if (!/^\/front\/document\.send\.php\?/i.test(path)) {
    return NextResponse.json({ error: "Ruta no permitida" }, { status: 400 });
  }

  const system = SYSTEMS.find((s) => s.id === systemId);
  if (!system || !system.baseUrl) {
    return NextResponse.json({ error: `Sistema desconocido: ${systemId}` }, { status: 404 });
  }

  let sessionToken;
  try {
    const headers = {};
    if (system.appToken) headers["App-Token"] = system.appToken;
    if (system.userToken) {
      headers["Authorization"] = `user_token ${system.userToken}`;
    } else {
      headers["Authorization"] =
        "Basic " + Buffer.from(`${system.user}:${system.password}`).toString("base64");
    }

    const sessionRes = await fetch(`${system.baseUrl}/apirest.php/initSession`, {
      headers,
      cache: "no-store",
    });
    if (!sessionRes.ok) {
      return NextResponse.json({ error: "No se pudo abrir sesión con GLPI" }, { status: 502 });
    }
    const sessionData = await sessionRes.json();
    sessionToken = sessionData.session_token;

    const imgRes = await fetch(`${system.baseUrl}${path}`, {
      headers: {
        "Session-Token": sessionToken,
        ...(system.appToken ? { "App-Token": system.appToken } : {}),
      },
      cache: "no-store",
    });

    if (!imgRes.ok) {
      return NextResponse.json({ error: "No se pudo descargar el archivo" }, { status: 502 });
    }

    const contentType = imgRes.headers.get("content-type") || "application/octet-stream";
    const buffer = await imgRes.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Error al obtener la imagen" }, { status: 500 });
  } finally {
    if (sessionToken) {
      try {
        await fetch(`${system.baseUrl}/apirest.php/killSession`, {
          headers: {
            "Session-Token": sessionToken,
            ...(system.appToken ? { "App-Token": system.appToken } : {}),
          },
          cache: "no-store",
        });
      } catch {
        // no crítico
      }
    }
  }
}
