import Link from "next/link";

import { MarketMapExperience } from "@/components/market-map/market-map-experience";
import { getClientGraphConfigs } from "@/lib/client-graphs";

export default function ConfigPage() {
  const presets = getClientGraphConfigs();

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-[1700px] px-4 pt-4 lg:px-6">
        <div className="border border-white/10 bg-[rgba(255,255,255,0.02)] px-4 py-4 lg:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="hud-label">Client Presets</p>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
                Each client route can now load its own graph preset. Use these paths on a large-screen display and tune the shown graph from this config surface.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Link
                  key={preset.slug}
                  href={preset.slug === "demo" ? "/" : `/${preset.slug}`}
                  className="border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300 transition hover:bg-white/5 hover:text-white"
                >
                  {preset.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <MarketMapExperience />
    </div>
  );
}
