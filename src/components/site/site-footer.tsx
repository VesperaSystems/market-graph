"use client";

import { usePathname } from "next/navigation";

function isPresentationRoute(pathname: string) {
  if (pathname === "/") return true;
  if (pathname === "/about" || pathname === "/config" || pathname === "/map" || pathname === "/admin") {
    return false;
  }
  return /^\/[^/]+$/.test(pathname);
}

export function SiteFooter() {
  const pathname = usePathname();

  if (isPresentationRoute(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-[rgba(5,5,5,0.88)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p>Fictional venture ecosystem data for graph display and systems research.</p>
        <p>Demo graph at the apex. Client graphs can live at path-based routes.</p>
      </div>
    </footer>
  );
}
