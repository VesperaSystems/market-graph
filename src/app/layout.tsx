import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vesperasystems.com"),
  title: { default: "Vespera Systems | Graph-Native Finance Technology", template: "%s | Vespera Systems" },
  description: "Vespera Systems Ltd builds graph-native intelligence infrastructure for investment teams: AI analyst workflows, legal contract review, quant strategy tooling, and institutional market displays.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vespera Systems",
    description: "Graph-native intelligence infrastructure for investment teams.",
    url: "https://vesperasystems.com",
    siteName: "Vespera Systems",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased">
        <div className="monochrome-field relative min-h-screen overflow-hidden">
          <div className="pointer-events-none fixed inset-0 tactical-grid opacity-60" />
          <div className="pointer-events-none fixed inset-0 scanlines opacity-35" />
          <main className="relative z-10 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
