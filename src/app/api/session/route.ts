import { NextResponse } from "next/server";
import { encodeSession, VESPERA_SESSION_COOKIE } from "@/lib/auth/session";
import { getWorkspaceConfig } from "@/lib/modules";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string; tenant?: string } | null;
  if (!body?.email || !body.password) return new Response("Email and password are required.", { status: 400 });

  const configured = Boolean(process.env.AUTH_SECRET && process.env.POSTGRES_URL);
  if (configured) return new Response("Production credential authorization is wired for NextAuth/Drizzle but not enabled in this MVP route yet.", { status: 501 });

  const workspace = getWorkspaceConfig(body.tenant || "demo");
  const response = NextResponse.json({ ok: true, workspace: workspace.slug });
  response.cookies.set(VESPERA_SESSION_COOKIE, encodeSession({
    id: `local-${workspace.slug}`,
    email: body.email,
    name: "Vespera Operator",
    isAdmin: true,
    tenantSlug: workspace.slug,
    tenantType: workspace.tenantType,
    subscriptionType: 3,
  }), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(VESPERA_SESSION_COOKIE);
  return response;
}
