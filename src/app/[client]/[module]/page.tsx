import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AnalystChat } from "@/components/product/analyst-chat";
import { ConfigPanel } from "@/components/product/config-panel";
import { FilesPanel } from "@/components/product/files-panel";
import { LegalWorkbench } from "@/components/product/legal-workbench";
import { ProductShell } from "@/components/product/product-shell";
import { QuantBench } from "@/components/product/quant-bench";
import { requireWorkspaceSession } from "@/lib/auth/session";
import { getWorkspaceConfig, isProductModuleId, type ProductModuleId } from "@/lib/modules";

export const metadata: Metadata = { robots: { index: false, follow: false } };

function ModuleContent({ module, client }: { module: ProductModuleId; client: string }) {
  const workspace = getWorkspaceConfig(client);
  if (module === "chat") return <AnalystChat workspace={workspace} />;
  if (module === "legal") return <LegalWorkbench workspaceSlug={client} />;
  if (module === "quant") return <QuantBench workspaceSlug={client} />;
  if (module === "files") return <FilesPanel />;
  if (module === "config") return <ConfigPanel slug={client} />;
  return null;
}

export default async function ClientModulePage({ params }: { params: Promise<{ client: string; module: string }> }) {
  const { client, module } = await params;
  if (module === "graph") redirect(`/${client}`);
  if (!isProductModuleId(module)) notFound();
  const session = await requireWorkspaceSession(client);
  if (!session) redirect(`/login?next=/${client}/${module}`);
  const workspace = getWorkspaceConfig(client);
  if (!workspace.modules.includes(module)) notFound();
  return <ProductShell slug={client} activeModule={module} session={session}><ModuleContent module={module} client={client} /></ProductShell>;
}
