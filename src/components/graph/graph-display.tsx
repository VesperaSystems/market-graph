"use client";

import { useMemo, useState } from "react";

import type { ClientGraphConfig } from "@/lib/client-graphs";
import { GraphCanvas } from "@/components/market-map/graph-canvas";
import { getVisibleGraph } from "@/lib/market-map";

export function GraphDisplay({ config }: { config: ClientGraphConfig }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const graph = useMemo(() => getVisibleGraph(config.filters), [config.filters]);

  return (
    <div className="mx-auto flex w-full max-w-[1800px] flex-1 flex-col px-3 py-3 lg:px-5">
      <div className="mb-3 flex items-center justify-between border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-3">
        <div>
          <p className="hud-label">Graph</p>
          <h1 className="mt-2 text-2xl font-medium text-white">{config.label}</h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">{config.summary}</p>
        </div>
        <div className="text-right text-sm text-zinc-400">
          <p>{graph.nodes.length} nodes</p>
          <p>{graph.edges.length} edges</p>
        </div>
      </div>
      <div className="flex-1">
        <GraphCanvas
          nodes={graph.nodes}
          edges={graph.edges}
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          compact
        />
      </div>
    </div>
  );
}
