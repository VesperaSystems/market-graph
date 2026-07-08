import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWorkspaceConfig, productModules } from "@/lib/modules";
export function ConfigPanel({ slug }: { slug: string }) {
  const workspace = getWorkspaceConfig(slug);
  return <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]"><Card><CardHeader><p className="hud-label">Tenant</p><CardTitle>{workspace.label}</CardTitle></CardHeader><CardContent><div className="grid gap-3 text-sm leading-6 text-neutral-400"><p>Desk: {workspace.desk}</p><p>Type: {workspace.tenantType}</p><p>Slug: {workspace.slug}</p></div></CardContent></Card><div className="grid gap-3 md:grid-cols-2">{productModules.map((module) => <div key={module.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5"><div className="flex items-center justify-between"><h3 className="text-xl font-semibold tracking-[-0.035em]">{module.label}</h3><Badge>{workspace.modules.includes(module.id) ? "enabled" : "off"}</Badge></div><p className="mt-3 text-sm leading-6 text-neutral-400">{module.summary}</p></div>)}</div></div>;
}
