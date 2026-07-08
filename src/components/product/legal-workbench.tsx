"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { LegalAnalysis } from "@/lib/legal/analyze";

export function LegalWorkbench({ workspaceSlug }: { workspaceSlug: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState("Review for ambiguity, enforceability, missing protections, and diligence risk.");
  const [analysis, setAnalysis] = useState<LegalAnalysis | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    setPending(true);
    setError("");
    const form = new FormData();
    form.set("file", file);
    form.set("context", context);
    form.set("workspace", workspaceSlug);
    const response = await fetch("/api/legal/analyze", { method: "POST", body: form });
    setPending(false);
    const data = await response.json().catch(() => null);
    if (!response.ok) { setError(data?.error || "Legal analysis failed."); return; }
    setAnalysis(data.analysis);
  }

  async function exportDocx() {
    if (!analysis) return;
    const response = await fetch("/api/legal/export", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ analysis }) });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${analysis.document || "vespera-legal-review"}.docx`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
      <form onSubmit={submit} className="hud-panel rounded-[34px] p-5">
        <p className="hud-label">Legal contract checker</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Review, correct, export.</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">DOCX/TXT are supported in the MVP. PDF parsing is tracked as future work.</p>
        <div className="mt-6 grid gap-4">
          <input type="file" accept=".docx,.txt,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => setFile(event.target.files?.[0] || null)} className="block w-full rounded-2xl border border-white/14 bg-white/[0.055] px-4 py-3 text-sm text-neutral-300" />
          <Textarea value={context} onChange={(event) => setContext(event.target.value)} />
          {error ? <div className="rounded-2xl border border-white/20 bg-white/8 px-4 py-3 text-sm text-neutral-200">{error}</div> : null}
          <Button type="submit" disabled={!file || pending}>{pending ? "Analyzing" : "Analyze document"}</Button>
        </div>
      </form>
      <section className="hud-panel rounded-[34px] p-5">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"><div><p className="hud-label">Issue register</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{analysis ? analysis.document : "Awaiting document"}</h2></div>{analysis ? <Button onClick={exportDocx} variant="outline">Export DOCX</Button> : null}</div>
        <div className="mt-5 grid gap-3">
          {!analysis ? <p className="text-sm leading-6 text-neutral-500">Upload a contract to see structured risks, original text, recommendations, and comments.</p> : null}
          {analysis?.issues.length === 0 ? <p className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-sm text-neutral-300">No material issues found in this MVP review.</p> : null}
          {analysis?.issues.map((issue) => <article key={issue.id} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5"><div className="flex items-center justify-between gap-4"><p className="hud-label">{issue.type}</p><span className="text-xs uppercase tracking-[0.2em] text-neutral-500">{issue.severity}</span></div><p className="mt-4 text-sm text-neutral-300"><strong className="text-white">Original:</strong> {issue.original_text}</p><p className="mt-3 text-sm text-neutral-300"><strong className="text-white">Recommended:</strong> {issue.recommended_text}</p><p className="mt-3 text-sm leading-6 text-neutral-400">{issue.comment}</p></article>)}
        </div>
      </section>
    </div>
  );
}
