import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vespera Systems | Venture Intelligence Displays",
  description:
    "Subscription market intelligence and heads-up leaderboard displays for venture capital, family office, and asset management teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-slate-950 text-slate-100 antialiased">
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.16),transparent_22%),linear-gradient(180deg,#020617_0%,#020617_48%,#030712_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:5rem_5rem]" />
          <main className="relative z-10 flex min-h-screen flex-col">{children}</main>
        </div>
      </body>
    </html>
  );
}
