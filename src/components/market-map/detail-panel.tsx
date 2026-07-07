import { formatCurrency, formatTypeLabel } from "@/lib/market-map";
import { VentureEdge, VentureNode } from "@/types/venture";

interface DetailPanelProps {
  node: VentureNode | null;
  edges: VentureEdge[];
}

export function DetailPanel({ node, edges }: DetailPanelProps) {
  if (!node) {
    return (
      <aside className="hud-panel flex h-full flex-col p-5">
        <p className="hud-label">Details</p>
        <div className="mt-6 flex flex-1 items-center justify-center border border-dashed border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 text-center text-slate-400">
          Select a node to inspect valuation, geography, stage, and relationship signals.
        </div>
      </aside>
    );
  }

  return (
    <aside className="hud-panel flex h-full flex-col p-5">
      <p className="hud-label">Details</p>
      <div className="mt-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-medium text-white">{node.name}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">
              {node.type}
            </p>
          </div>
          <div className="border border-[rgba(109,252,241,0.16)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200">
            {node.country ?? "Global"}
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">{node.description}</p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <dt className="text-slate-400">Valuation</dt>
          <dd className="mt-2 text-base text-white">{formatCurrency(node.valuationGBP)}</dd>
        </div>
        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <dt className="text-slate-400">Stage</dt>
          <dd className="mt-2 text-base text-white">{node.stage ?? "N/A"}</dd>
        </div>
        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <dt className="text-slate-400">Sector</dt>
          <dd className="mt-2 text-base text-white">{node.sector ?? "N/A"}</dd>
        </div>
        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <dt className="text-slate-400">Founded</dt>
          <dd className="mt-2 text-base text-white">{node.foundedYear ?? "N/A"}</dd>
        </div>
        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <dt className="text-slate-400">Influence</dt>
          <dd className="mt-2 text-base text-white">{node.metrics.influenceScore}</dd>
        </div>
        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
          <dt className="text-slate-400">Funding</dt>
          <dd className="mt-2 text-base text-white">{formatCurrency(node.metrics.totalFundingGBP)}</dd>
        </div>
      </dl>

      <div className="mt-5 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
        <p className="hud-label">Connected Relationships</p>
        <div className="mt-4 space-y-3">
          {edges.slice(0, 8).map((edge) => {
            const direction = edge.source === node.id ? "Out" : "In";
            return (
              <div key={edge.id} className="border border-[rgba(255,255,255,0.08)] bg-[rgba(2,8,12,0.84)] p-3">
                <p className="text-sm text-white">{edge.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                  {direction} · {formatTypeLabel(edge.type)} · {edge.year}
                </p>
              </div>
            );
          })}
          {edges.length === 0 ? (
            <p className="text-sm text-slate-400">No relationships in the current filtered view.</p>
          ) : null}
        </div>
      </div>

      <div className="mt-5 border border-[rgba(109,252,241,0.16)] bg-[rgba(109,252,241,0.06)] p-4 text-sm leading-6 text-slate-300">
        <p className="font-medium text-cyan-100">Tags</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {node.tags.map((tag) => (
            <span key={tag} className="border border-[rgba(109,252,241,0.16)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
