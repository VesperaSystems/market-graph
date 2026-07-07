import type { MarketMapFilters } from "@/types/venture";

export interface ClientGraphConfig {
  slug: string;
  label: string;
  summary: string;
  filters: MarketMapFilters;
}

const baseFilters: MarketMapFilters = {
  valuationBand: "all",
  sector: "all",
  country: "all",
  stage: "all",
  investor: "all",
  year: "all",
  search: "",
};

const graphConfigs: Record<string, ClientGraphConfig> = {
  demo: {
    slug: "demo",
    label: "Demo Graph",
    summary: "Cross-market demonstration graph for fictional venture relationships.",
    filters: baseFilters,
  },
  rbs: {
    slug: "rbs",
    label: "RBS",
    summary: "UK fintech and infrastructure lens tuned for bank-side wall display review.",
    filters: {
      ...baseFilters,
      country: "United Kingdom",
      sector: "Fintech",
    },
  },
  sjp: {
    slug: "sjp",
    label: "SJP",
    summary: "Wealth, insuretech, and later-stage operating signals across UK and Europe.",
    filters: {
      ...baseFilters,
      stage: "Series B",
      country: "United Kingdom",
    },
  },
  ubs: {
    slug: "ubs",
    label: "UBS",
    summary: "Cross-border capital patterns around deeptech, climate, and frontier software.",
    filters: {
      ...baseFilters,
      sector: "Climate",
      valuationBand: "250m-1b",
    },
  },
};

function formatFallbackLabel(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.toUpperCase())
    .join(" ");
}

export function getClientGraphConfig(slug?: string): ClientGraphConfig {
  if (!slug) return graphConfigs.demo;
  return (
    graphConfigs[slug.toLowerCase()] ?? {
      slug,
      label: formatFallbackLabel(slug),
      summary: "Client-specific graph preset awaiting local configuration.",
      filters: baseFilters,
    }
  );
}

export function getClientGraphConfigs() {
  return Object.values(graphConfigs);
}
