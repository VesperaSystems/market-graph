import Link from "next/link";
import { BrandMark } from "@/components/site/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getWorkspaceConfig, productModules, productModuleMap, type ProductModuleId } from "@/lib/modules";
import type { VesperaSession } from "@/lib/auth/types";

export function ProductShell({ slug, activeModule, session, children }: { slug: string; activeModule: ProductModuleId; session: VesperaSession; children: React.ReactNode }) {
  const workspace = getWorkspaceConfig(slug);
  const active = productModuleMap.get(activeModule);
  return (
    <div className="flex min-h-screen bg-black/20 text-white">
      <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-black/50 p-5 backdrop-blur-xl lg:flex lg:flex-col">
        <BrandMark href={`/${workspace.slug}`} product />
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.045] p-5"><p className="hud-label">Client workspace</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">{workspace.label}</h1><p className="mt-2 text-sm leading-6 text-neutral-400">{workspace.desk}</p></div>
        <nav className="mt-5 grid gap-2">
          {productModules.filter((module) => workspace.modules.includes(module.id)).map((module) => (
            <Link key={module.id} href={module.id === "graph" ? `/${workspace.slug}` : `/${workspace.slug}/${module.id}`} className={`rounded-2xl border px-4 py-3 text-sm transition ${activeModule === module.id ? "border-white/40 bg-white text-black" : "border-white/10 bg-white/[0.035] text-neutral-300 hover:border-white/28 hover:bg-white/[0.075] hover:text-white"}`}>
              <span className="block font-semibold uppercase tracking-[0.16em]">{module.label}</span><span className="mt-1 block text-xs opacity-70">{module.eyebrow}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.035] p-4 text-xs leading-5 text-neutral-500">Signed in as {session.user.email}. Product pages are noindex by proxy/header.</div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/72 px-4 py-4 backdrop-blur-xl lg:px-6"><div className="flex items-center justify-between gap-4"><div><p className="hud-label">{active?.eyebrow || "Workspace"}</p><h2 className="mt-1 text-2xl font-semibold tracking-[-0.045em]">{active?.label || workspace.label}</h2></div><div className="flex items-center gap-2"><Badge>{workspace.tenantType}</Badge><Button asChild variant="outline"><Link href="/login">Switch</Link></Button></div></div></header>
        <main className="min-h-0 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
