import Link from "next/link";
import { GraphDisplay } from "@/components/graph/graph-display";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getClientGraphConfig } from "@/lib/client-graphs";
import { getWorkspaceConfig, productModules } from "@/lib/modules";

export function WorkspaceHome({ slug }: { slug: string }) {
  const workspace = getWorkspaceConfig(slug);
  return (
    <div className="grid h-[calc(100vh-7rem)] gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="min-h-[520px] overflow-hidden rounded-[34px] border border-white/10 bg-black"><GraphDisplay config={{ ...getClientGraphConfig(workspace.slug), filters: workspace.filters, label: workspace.label, summary: workspace.summary }} /></div>
      <div className="grid content-start gap-4 overflow-y-auto">
        <Card><CardHeader><p className="hud-label">Mission brief</p><CardTitle>{workspace.label} workspace</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-neutral-400">{workspace.summary}</p></CardContent></Card>
        {productModules.filter((module) => workspace.modules.includes(module.id)).map((module) => <Link key={module.id} href={module.id === "graph" ? `/${workspace.slug}` : `/${workspace.slug}/${module.id}`} className="block rounded-[28px] border border-white/10 bg-white/[0.045] p-5 transition hover:border-white/30 hover:bg-white/[0.075]"><div className="flex items-start justify-between gap-4"><div><p className="hud-label">{module.eyebrow}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{module.label}</h3></div><Badge>{module.status}</Badge></div><p className="mt-3 text-sm leading-6 text-neutral-400">{module.summary}</p></Link>)}
      </div>
    </div>
  );
}
