import { NextResponse } from "next/server";
import { suggestAction } from "@/lib/assistant";

export async function POST(request) {
  const { ticket } = await request.json();
  if (!ticket) {
    return NextResponse.json({ error: "Falta 'ticket' en el body" }, { status: 400 });
  }
  const suggestion = await suggestAction(ticket);
  return NextResponse.json(suggestion);
}
