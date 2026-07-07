"use client";

import { useMemo } from "react";

import { DetailPanel } from "@/components/market-map/detail-panel";
import { FilterPanel } from "@/components/market-map/filter-panel";
import { GraphCanvas } from "@/components/market-map/graph-canvas";
import {
  formatCurrency,
  getConnectedEdges,
  getFilterOptions,
  getNodeById,
  getVisibleGraph,
} from "@/lib/market-map";
import { useMarketMapStore } from "@/store/use-market-map-store";

const filterOptions = getFilterOptions();

export function MarketMapExperience() {
  const { filters, selectedNodeId, selectNode, resetFilters, setFilter } = useMarketMapStore();

  const visibleGraph = useMemo(() => getVisibleGraph(filters), [filters]);
  const selectedNode = useMemo(() => getNodeById(selectedNodeId), [selectedNodeId]);
  const connectedEdges = useMemo(
    () => getConnectedEdges(selectedNodeId, visibleGraph.edges),
    [selectedNodeId, visibleGraph.edges],
  );

  const stats = useMemo(() => {
    const visibleCompanies = visibleGraph.nodes.filter((node) => node.type === "company");
    const totalValuation = visibleCompanies.reduce(
      (sum, node) => sum + (node.valuationGBP ?? 0),
      0,
    );

    return {
      nodes: visibleGraph.nodes.length,
      edges: visibleGraph.edges.length,
      companies: visibleCompanies.length,
      valuation: totalValuation,
    };
  }, [visibleGraph]);

  return (
    <div className="mx-auto flex w-full max-w-[1700px] flex-1 flex-col px-4 pb-6 pt-4 lg:px-6">
      <div className="mb-4 hud-panel p-4 lg:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="hud-label">Live Graph</p>
            <h1 className="mt-2 text-3xl font-medium text-white">Map how capital moves.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              A mission-control view of fictional venture capital relationships, designed for wall screens and rapid filtering.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Visible Nodes" value={String(stats.nodes)} />
            <StatCard label="Visible Edges" value={String(stats.edges)} />
            <StatCard label="Companies" value={String(stats.companies)} />
            <StatCard label="Mapped Value" value={formatCurrency(stats.valuation)} />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex-1 border border-[rgba(109,252,241,0.14)] bg-[rgba(2,8,12,0.88)] px-4 py-3">
            <input
              value={filters.search}
              onChange={(event) => setFilter("search", event.target.value)}
              placeholder="Search companies, investors, founders, sectors..."
              className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
          <div className="border border-[rgba(109,252,241,0.18)] bg-[rgba(109,252,241,0.06)] px-4 py-3 text-sm text-slate-300 tactical-copy">
            Orbit. Zoom. Select. Read the network.
          </div>
        </div>
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-[320px_minmax(0,1fr)_340px]">
        <FilterPanel
          filters={filters}
          options={filterOptions}
          onChange={setFilter}
          onReset={resetFilters}
        />
        <GraphCanvas
          nodes={visibleGraph.nodes}
          edges={visibleGraph.edges}
          selectedNodeId={selectedNodeId}
          onSelectNode={selectNode}
        />
        <DetailPanel node={selectedNode} edges={connectedEdges} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
      <p className="hud-label">{label}</p>
      <p className="mt-2 text-lg text-white">{value}</p>
    </div>
  );
}
