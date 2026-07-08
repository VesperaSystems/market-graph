import { headers } from "next/headers";
import Link from "next/link";

function CompanySite() {
  const sections = [
    {
      title: "Graph-native intelligence",
      body: "Vespera Systems builds analytical products for investment teams that need to move from information to judgment with less friction and more continuity.",
    },
    {
      title: "Quant, legal, AI",
      body: "We combine graph thinking, legal intelligence, conversational systems, and research workflows into products that feel operational rather than decorative.",
    },
    {
      title: "Built for serious operators",
      body: "Our work is aimed at venture firms, asset managers, and family offices that want more coverage, better preparation, and sharper internal systems.",
    },
  ];

  return (
    <div className="min-h-screen text-stone-50">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[1.2rem] border border-white/20 bg-white/5 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,255,255,0.08)]">
            VS
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
              Vespera Systems
            </span>
            <span className="block text-xs text-stone-400 transition group-hover:text-stone-200">
              Graph-native finance technology
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://vespera.systems"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-100 transition hover:border-white/30 hover:bg-white/10 sm:px-5 sm:tracking-[0.22em]"
          >
            Enter product
          </a>
          <a
            href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20intro"
            className="rounded-full bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-stone-200 sm:px-5 sm:tracking-[0.22em]"
          >
            Contact
          </a>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-200">
            Company site
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Quant finance technology built around graphs, systems, and judgment.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            Vespera Systems builds graph-native products for investment teams. We work across legal intelligence, conversational systems, analytical workflows, and relationship-aware market interfaces.
          </p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-stone-400">
            The company site explains what we do. The product site shows it working.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://vespera.systems"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-stone-200"
            >
              See the product
            </a>
            <a
              href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20private%20demo"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Request a private demo
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[56px] bg-white/8 blur-3xl" />
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-stone-950/92 p-5 shadow-[0_0_120px_rgba(255,255,255,0.06)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.12),transparent_28%)]" />
            <div className="relative rounded-[32px] border border-white/10 bg-black/35 p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-300">What we do</p>
              <div className="mt-5 grid gap-3">
                {sections.map((section) => (
                  <article key={section.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5">
                    <h2 className="text-xl font-semibold tracking-[-0.03em] text-white">{section.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-stone-400">{section.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductSite() {
  const modules = [
    {
      eyebrow: "AI Chat",
      title: "Ask the system like you would ask an analyst.",
      body: "Move from a question to a synthesized answer with graph context, memory, and workflow awareness behind it.",
    },
    {
      eyebrow: "Quant",
      title: "Turn models into instruments, not notebooks in hiding.",
      body: "Scenario logic, rankings, signal weights, and analytical outputs live in an environment designed to be used, not just maintained.",
    },
    {
      eyebrow: "Graphs",
      title: "See relationships instead of isolated records.",
      body: "Capital, companies, people, and legal context become a living graph that can be explored, filtered, and focused in real time.",
    },
  ];

  const proof = [
    "Continuous analytical coverage across research, legal work, and market context.",
    "A graph-native system that helps investment teams prepare faster and miss less.",
    "The flagship product proves the claim: more leverage without more operational drag.",
  ];

  return (
    <div className="min-h-screen text-stone-50">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[1.2rem] border border-cyan-200/30 bg-cyan-200/10 text-sm font-semibold text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.14)]">
            VS
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-white">
              vespera.systems
            </span>
            <span className="block text-xs text-stone-400 transition group-hover:text-cyan-100">
              Flagship product
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/demo"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-100 transition hover:border-cyan-200/40 hover:bg-cyan-200/10 sm:px-5 sm:tracking-[0.22em]"
          >
            Open demo
          </Link>
          <Link
            href="/config"
            className="rounded-full bg-cyan-200 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-cyan-100 sm:px-5 sm:tracking-[0.22em]"
          >
            Enter system
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-24 lg:pt-16">
        <div>
          <div className="inline-flex rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
            Product surface
          </div>
          <h1 className="mt-8 max-w-6xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Want a junior analyst that never sleeps?
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            Vespera is an always-on analytical layer for investment teams. AI chat, quant workflows, graph intelligence, and agent systems come together in one operational product.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-cyan-200 px-7 py-4 text-sm font-bold uppercase tracking-[0.22em] text-stone-950 shadow-[0_0_44px_rgba(34,211,238,0.2)] transition hover:bg-cyan-100"
            >
              See the live graph
            </Link>
            <Link
              href="/config"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              Explore modules
            </Link>
          </div>
          <div className="mt-10 grid gap-3">
            {proof.map((point) => (
              <div key={point} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-base leading-7 text-stone-100">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[56px] bg-cyan-200/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-stone-950/92 p-5 shadow-[0_0_130px_rgba(34,211,238,0.12)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.14),transparent_28%)]" />
            <div className="relative rounded-[32px] border border-cyan-200/15 bg-black/35 p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">Flagship system</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-white">
                    Product mode: active
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Live
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {modules.map((module) => (
                  <article key={module.eyebrow} className="rounded-3xl border border-white/[0.08] bg-white/[0.045] p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100">{module.eyebrow}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-400">{module.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get("host") || "vesperasystems.com";

  if (host.includes("vesperasystems.com")) {
    return <CompanySite />;
  }

  return <ProductSite />;
}
