import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProductShell } from "@/components/product/product-shell";
import { WorkspaceHome } from "@/components/product/workspace-home";
import { requireWorkspaceSession } from "@/lib/auth/session";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ClientPage({ params }: { params: Promise<{ client: string }> }) {
  const { client } = await params;
  const session = await requireWorkspaceSession(client);
  if (!session) redirect(`/login?next=/${client}`);
  return <ProductShell slug={client} activeModule="graph" session={session}><WorkspaceHome slug={client} /></ProductShell>;
}
