"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Graph" },
  { href: "/config", label: "Config" },
  { href: "/about", label: "About" },
];

function isPresentationRoute(pathname: string) {
  if (pathname === "/") return true;
  if (pathname === "/about" || pathname === "/config" || pathname === "/map" || pathname === "/admin") {
    return false;
  }
  return /^\/[^/]+$/.test(pathname);
}

export function SiteHeader() {
  const pathname = usePathname();
  const presentationRoute = useMemo(() => isPresentationRoute(pathname), [pathname]);
  const [mouseReveal, setMouseReveal] = useState(false);
  const [keyReveal, setKeyReveal] = useState(false);

  useEffect(() => {
    if (!presentationRoute) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "n") {
        setKeyReveal((current) => !current);
      }

      if (event.key === "Escape") {
        setMouseReveal(false);
        setKeyReveal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [presentationRoute]);

  const visible = !presentationRoute || mouseReveal || keyReveal;

  return (
    <>
      {presentationRoute ? (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-40 h-4"
          onMouseEnter={() => setMouseReveal(true)}
        />
      ) : null}
      <header
        className={cn(
          "z-50 border-b border-white/10 bg-[rgba(5,5,5,0.92)] backdrop-blur-xl transition-transform duration-300",
          presentationRoute ? "fixed inset-x-0 top-0" : "sticky top-0",
          visible ? "translate-y-0" : "-translate-y-full",
        )}
        onMouseLeave={() => {
          if (!keyReveal) {
            setMouseReveal(false);
          }
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <p className="hud-label">Vespera Systems</p>
              <p className="text-sm text-zinc-200">Graph Display</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 border border-white/10 bg-[rgba(255,255,255,0.02)] p-1">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm text-zinc-300 transition",
                    "hover:bg-[rgba(255,255,255,0.06)] hover:text-white",
                    active && "bg-[rgba(255,255,255,0.08)] text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
