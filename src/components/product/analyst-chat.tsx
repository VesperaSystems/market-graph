"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ClientWorkspaceConfig } from "@/lib/modules";

interface ChatMessage { role: "user" | "assistant"; content: string; }

export function AnalystChat({ workspace }: { workspace: ClientWorkspaceConfig }) {
  const [input, setInput] = useState("What changed in the graph that matters for this desk?");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setPending(true);
    const response = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: question, tenantType: workspace.tenantType, workspace: workspace.slug }) });
    const data = await response.json();
    setPending(false);
    setMessages((current) => [...current, { role: "assistant", content: data.text || data.error || "No response." }]);
  }

  return (
    <div className="grid h-[calc(100vh-7rem)] gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="hud-panel flex min-h-0 flex-col rounded-[34px] p-5">
        <div className="border-b border-white/10 pb-4"><p className="hud-label">AI analyst</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">Ask investment questions like a junior analyst is at the desk.</h1></div>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-5">
          {messages.length === 0 ? <p className="text-sm leading-6 text-neutral-500">Questions can target capital flows, relationships, legal context, watchlist companies, or strategy notes. Responses are tenant-aware and API-backed when OPENAI_API_KEY is configured.</p> : null}
          {messages.map((message, index) => <div key={index} className={`rounded-3xl border p-4 text-sm leading-6 ${message.role === "user" ? "ml-auto max-w-2xl border-white/20 bg-white text-black" : "max-w-3xl border-white/10 bg-white/[0.055] text-neutral-200"}`}>{message.content}</div>)}
          {pending ? <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 text-sm text-neutral-400">Synthesizing...</div> : null}
        </div>
        <form onSubmit={submit} className="grid gap-3 border-t border-white/10 pt-4"><Textarea value={input} onChange={(event) => setInput(event.target.value)} /><Button type="submit" disabled={pending}>Send query</Button></form>
      </section>
      <aside className="hud-panel rounded-[34px] p-5"><p className="hud-label">Guardrails</p><div className="mt-4 grid gap-3 text-sm leading-6 text-neutral-400"><p>Uses Vespera tenant prompts migrated from mission-control.</p><p>Message persistence schema is scaffolded in Drizzle for Postgres.</p><p>Production requires OPENAI_API_KEY, AUTH_SECRET, and POSTGRES_URL.</p></div></aside>
    </div>
  );
}
