import Link from "next/link";

const modules = [
  {
    title: "AI",
    eyebrow: "Reasoning layer",
    status: "Ready for client workflows",
    body: "Configure research copilots, briefing assistants, client Q&A flows, and executive narrative systems from one secure surface.",
    metrics: ["Prompt suites", "Client memory", "Brief generation"],
  },
  {
    title: "Legal",
    eyebrow: "Risk and diligence",
    status: "Structured for review",
    body: "Route contracts, diligence questions, compliance notes, policy shifts, and legal summaries into a controlled review workspace.",
    metrics: ["Matter intake", "Risk flags", "Review trails"],
  },
  {
    title: "Quant",
    eyebrow: "Signal engine",
    status: "Model cockpit online",
    body: "Tune scoring models, scenario assumptions, market rankings, and portfolio signal dashboards without burying the logic in spreadsheets.",
    metrics: ["Signal weights", "Scenario runs", "Ranking logic"],
  },
  {
    title: "Python Editor",
    eyebrow: "Analyst bench",
    status: "Notebook-grade control",
    body: "Give technical operators a focused place to inspect data, test transformations, and extend the intelligence layer behind the client experience.",
    metrics: ["Data scripts", "Model tests", "Export jobs"],
  },
];

const rails = [
  ["Identity", "Client, workspace, and team permissions stay attached to the config layer."],
  ["Delivery", "Each module maps to a revenue-facing promise on the brochure site."],
  ["Governance", "Legal and quant decisions are visible enough to explain, review, and improve."],
];

export const metadata = {
  title: "Vespera Config | AI, Legal, Quant, Python Editor",
  description:
    "Secure Vespera Systems configuration hub for AI, legal, quant, and Python editor workspaces.",
};

export default function ConfigPage() {
  return (
    <div className="min-h-screen text-stone-50">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[1.2rem] border border-cyan-200/30 bg-cyan-200/10 text-sm font-semibold text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.14)]">
            VS
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Vespera Config
            </span>
            <span className="block text-xs text-stone-400 transition group-hover:text-cyan-100">
              AI, Legal, Quant, Python Editor
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://vesperasystems.com"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-100 transition hover:border-cyan-200/40 hover:bg-cyan-200/10 sm:px-5 sm:tracking-[0.22em]"
          >
            Brochure
          </a>
          <Link
            href="/login?next=/config"
            className="rounded-full bg-cyan-200 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-cyan-100 sm:px-5 sm:tracking-[0.22em]"
          >
            Sign in
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-7xl px-6 pb-14 pt-8 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
              vespera.systems/config
            </div>
            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              The control room behind the client promise.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              AI, legal, quant, and Python editor workflows now live together at Vespera Systems config: one operational surface for the capabilities prospects discover on the brochure site.
            </p>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-stone-950/75 p-6 shadow-[0_0_120px_rgba(34,211,238,0.1)]">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Workspace rails</p>
            <div className="mt-5 grid gap-3">
              {rails.map(([title, body]) => (
                <article key={title} className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-6 pb-20 md:grid-cols-2 lg:px-10">
        {modules.map((module) => (
          <article key={module.title} className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">{module.eyebrow}</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">{module.title}</h2>
              </div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-200">
                Online
              </span>
            </div>
            <p className="mt-5 text-base leading-7 text-stone-300">{module.body}</p>
            <div className="mt-6 rounded-3xl border border-cyan-200/15 bg-cyan-200/10 p-4">
              <p className="text-sm font-semibold text-cyan-50">{module.status}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {module.metrics.map((metric) => (
                  <span key={metric} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-stone-300">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10">
        <div className="rounded-[38px] border border-cyan-200/20 bg-cyan-200/10 p-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 lg:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-cyan-100">Next move</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              Keep prospects on the brochure. Bring operators here.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300">
              This route is now the destination for AI, legal, quant, and Python editor work. The public brochure can stay focused on winning client confidence.
            </p>
          </div>
          <Link
            href="/login?next=/config"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-cyan-100 lg:mt-0"
          >
            Secure access
          </Link>
        </div>
      </section>
    </div>
  );
}
