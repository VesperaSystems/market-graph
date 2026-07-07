import Link from "next/link";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Briefing" },
  { href: "/map", label: "Live Graph" },
  { href: "/about", label: "Thesis" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(109,252,241,0.12)] bg-[rgba(2,6,10,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-[rgba(109,252,241,0.3)] bg-[rgba(109,252,241,0.08)] font-mono text-xs font-semibold tracking-[0.3em] text-cyan-200 shadow-[0_0_24px_rgba(109,252,241,0.12)]">
            VS
          </div>
          <div>
            <p className="hud-label">Vespera Systems</p>
            <p className="text-sm text-slate-200">Mission Control for Venture Capital</p>
          </div>
        </Link>
        <nav className="flex items-center gap-2 border border-[rgba(109,252,241,0.12)] bg-[rgba(255,255,255,0.03)] p-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm text-slate-300 transition",
                "hover:bg-[rgba(109,252,241,0.08)] hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
