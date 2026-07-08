import type { Metadata } from "next";
import Link from "next/link";
import { ProductShell } from "@/components/product/product-shell";
import { requireWorkspaceSession } from "@/lib/auth/session";
import { clientWorkspaceConfigs, productModules } from "@/lib/modules";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export default async function AdminPage() {
  const session = await requireWorkspaceSession("demo");
  if (!session) return <div className="p-8 text-white"><Link href="/login?next=/admin">Sign in</Link></div>;
  return <ProductShell slug="demo" activeModule="config" session={session}><div className="grid gap-4 lg:grid-cols-2">{Object.values(clientWorkspaceConfigs).map((workspace) => <Card key={workspace.slug}><CardHeader><div className="flex items-center justify-between"><p className="hud-label">Tenant</p><Badge>{workspace.tenantType}</Badge></div><CardTitle>{workspace.label}</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-neutral-400">{workspace.summary}</p><div className="mt-4 flex flex-wrap gap-2">{productModules.map((module) => <Badge key={module.id} className={workspace.modules.includes(module.id) ? "" : "opacity-35"}>{module.label}</Badge>)}</div></CardContent></Card>)}</div></ProductShell>;
}
