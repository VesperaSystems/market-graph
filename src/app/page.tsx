import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 lg:px-10 lg:py-20">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="hud-label">Vespera Systems</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-medium tracking-[-0.04em] text-white text-balance sm:text-6xl lg:text-7xl">
            Observe how capital moves through a living system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Venture Market Map turns a fictional venture ecosystem into a wall-scale network display for tracking companies, investors, founders, sectors, and the hidden paths that connect them.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="cyan" size="xl" className="rounded-none border border-cyan-300/30 shadow-[0_0_24px_rgba(109,252,241,0.12)]">
              <Link href="/map">Launch the live graph</Link>
            </Button>
            <Button asChild variant="glass" size="xl" className="rounded-none border border-white/10">
              <Link href="/about">Read the thesis</Link>
            </Button>
          </div>
        </div>

        <div className="hud-panel relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(109,252,241,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,183,71,0.12),transparent_28%)]" />
          <div className="relative grid gap-4">
            <div className="border border-[rgba(109,252,241,0.18)] bg-[rgba(109,252,241,0.06)] p-5">
              <p className="hud-label">Display Readout</p>
              <p className="mt-3 text-3xl text-white">58 nodes tracked</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Companies, founders, investors, sectors, and institutions rendered as one evolving venture graph.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
                <p className="hud-label">Capital Paths</p>
                <p className="mt-3 text-3xl text-white">112 edges</p>
              </div>
              <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
                <p className="hud-label">Mapped Value</p>
                <p className="mt-3 text-3xl text-white">Fictional only</p>
              </div>
            </div>
            <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5">
              <p className="hud-label">Why it matters</p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                <li>Surface who funds whom, who founded what, and where influence concentrates.</li>
                <li>Filter the network by valuation, sector, geography, stage, investor, and year.</li>
                <li>Present venture intelligence as an operating display instead of a dashboard.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
