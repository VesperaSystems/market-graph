import { headers } from "next/headers";
import Link from "next/link";

const proofPoints = [
  { value: "48h", label: "from brief to board-ready prototype" },
  { value: "4", label: "operator workspaces in one secure config hub" },
  { value: "24/7", label: "market and client intelligence visibility" },
];

const offers = [
  {
    title: "AI operating layer",
    body: "Client research, partner notes, and opportunity memos shaped into repeatable workflows instead of scattered prompt experiments.",
  },
  {
    title: "Legal intelligence",
    body: "Deal documents, policy shifts, diligence threads, and risk summaries routed into the same executive interface.",
  },
  {
    title: "Quant cockpit",
    body: "Market signals, scenario models, and ranking logic presented clearly enough for a Monday morning investment meeting.",
  },
  {
    title: "Python editor",
    body: "A hands-on technical workspace for analysts who need to inspect, tune, and extend the models behind the room.",
  },
];

const outcomes = [
  "Turn internal expertise into a client-facing intelligence product.",
  "Give partners a shared view of what deserves attention now.",
  "Package AI, legal, quant, and code workflows without sending clients through four separate tools.",
];

const process = [
  ["01", "Map the revenue moment", "We identify the client conversations, diligence moments, and recurring reports that should become productised intelligence."],
  ["02", "Configure the operating rooms", "Vespera shapes the AI, legal, quant, and Python workspaces around the client-facing promise."],
  ["03", "Launch the brochure-to-config path", "The public story wins trust, then qualified users move into the secure Vespera Systems config layer."],
];

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get("host") || "vesperasystems.com";
  const isBrochureDomain = host.includes("vesperasystems.com");

  return (
    <div className="min-h-screen text-stone-50">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[1.2rem] border border-amber-200/30 bg-amber-200/10 text-sm font-semibold text-amber-100 shadow-[0_0_40px_rgba(251,191,36,0.14)]">
            VS
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Vespera Systems
            </span>
            <span className="block text-xs text-stone-400 transition group-hover:text-amber-100">
              Client-winning intelligence systems
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://vespera.systems/config"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-100 transition hover:border-amber-200/40 hover:bg-amber-200/10 sm:px-5 sm:tracking-[0.22em]"
          >
            Config
          </a>
          <a
            href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20client%20growth%20brief"
            className="rounded-full bg-amber-200 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-amber-100 sm:px-5 sm:tracking-[0.22em]"
          >
            Win clients
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <div className="inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-amber-100">
            {isBrochureDomain ? "Brochure site for new clients" : "Vespera Systems public front door"}
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Make your firm look inevitable before the first call.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
            Vespera Systems builds the client-facing intelligence layer for ambitious advisory, investment, and operating teams: a premium brochure presence on vesperasystems.com, connected to secure AI, legal, quant, and Python configuration at vespera.systems/config.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@vespera.systems?subject=Build%20our%20Vespera%20client%20acquisition%20system"
              className="inline-flex items-center justify-center rounded-full bg-amber-200 px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-stone-950 shadow-[0_0_44px_rgba(251,191,36,0.2)] transition hover:bg-amber-100"
            >
              Start the brief
            </a>
            <a
              href="https://vespera.systems/config"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Open config
            </a>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point.label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-white">{point.value}</p>
                <p className="mt-2 text-sm leading-6 text-stone-400">{point.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[56px] bg-amber-200/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-stone-950/90 p-5 shadow-[0_0_130px_rgba(251,191,36,0.1)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_30%)]" />
            <div className="relative rounded-[32px] border border-amber-200/20 bg-black/35 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber-100">Acquisition system</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                    Prospect to config
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Live
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  ["vesperasystems.com", "Public brochure", "Trust, clarity, premium positioning"],
                  ["Qualified conversation", "Sales motion", "Brief, demo, pricing, implementation"],
                  ["vespera.systems/config", "Secure workspace", "AI, legal, quant, Python editor"],
                ].map(([label, title, body]) => (
                  <article key={label} className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-100">{label}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-400">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <article key={offer.title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-100">Config module</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">{offer.title}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-300">{offer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
        <div className="grid gap-6 rounded-[38px] border border-white/10 bg-stone-950/75 p-6 lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-amber-100">Built to sell the work</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              A brochure site with a real product behind it.
            </h2>
            <p className="mt-5 text-base leading-7 text-stone-300">
              The public site is designed to win confidence quickly. The config route gives the delivery team a credible operational destination once the conversation turns serious.
            </p>
          </div>
          <div className="grid gap-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-lg leading-7 text-stone-100">
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10">
        <div className="overflow-hidden rounded-[38px] border border-amber-200/20 bg-amber-200/10 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-amber-100">How Vespera helps you win</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                From positioning to a working client intelligence system.
              </h2>
            </div>
            <div className="grid gap-3">
              {process.map(([step, title, body]) => (
                <article key={step} className="grid gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 sm:grid-cols-[4rem_1fr]">
                  <div className="font-mono text-sm text-amber-100">{step}</div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-300">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-stone-300">
              Use vesperasystems.com to create demand. Use vespera.systems/config to deliver the system clients believed they were buying.
            </p>
            <a
              href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20new%20client%20pipeline"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-amber-100"
            >
              Build pipeline
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
