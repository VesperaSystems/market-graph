"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const template = `# Vespera Strategy Draft
# Arbitrary execution is disabled until the sandbox worker is live.

def score_company(revenue_growth, margin, graph_influence):
    return revenue_growth * 0.45 + margin * 0.25 + graph_influence * 0.30

watchlist = [
    {"name": "Astra Meridian", "score": score_company(0.38, 0.21, 0.84)},
    {"name": "SignalForge", "score": score_company(0.52, 0.16, 0.77)},
]
`;

export function QuantBench({ workspaceSlug }: { workspaceSlug: string }) {
  const [code, setCode] = useState(template);
  const artifact = useMemo(() => ({ workspace: workspaceSlug, language: "python", chars: code.length, status: "review-only" }), [code, workspaceSlug]);
  return <div className="grid h-[calc(100vh-7rem)] gap-4 xl:grid-cols-[minmax(0,1fr)_380px]"><section className="hud-panel flex min-h-0 flex-col rounded-[34px] p-5"><div className="border-b border-white/10 pb-4"><p className="hud-label">Python strategy engine</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Safe artifact bench.</h1><p className="mt-2 text-sm text-neutral-400">Execution is intentionally disabled until the isolated worker, timeouts, allowlists, and audit logs are built.</p></div><Textarea value={code} onChange={(event) => setCode(event.target.value)} className="mt-5 min-h-0 flex-1 resize-none font-mono text-xs leading-6" spellCheck={false} /></section><aside className="hud-panel rounded-[34px] p-5"><p className="hud-label">Artifact</p><pre className="mt-4 overflow-auto rounded-3xl border border-white/10 bg-black/40 p-4 text-xs leading-6 text-neutral-300">{JSON.stringify(artifact, null, 2)}</pre><Button className="mt-5" variant="outline" onClick={() => navigator.clipboard.writeText(code)}>Copy strategy</Button><div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-neutral-400">Future worker: package allowlist, CPU/memory caps, stdout/image capture, signed audit trail.</div></aside></div>;
}
