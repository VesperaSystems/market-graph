import type { Metadata } from "next";
import { Toaster } from "sonner";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "@/components/theme-provider";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vespera Systems | Graph Display",
  description:
    "Monochrome mission-control graph for exploring fictional venture companies, investors, valuations, and capital relationships.",
  icons: {
    icon: [
      { url: "/brand/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icons/vespera-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icons/vespera-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/brand/favicons/favicon-32x32.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <body className={cn("min-h-dvh bg-background font-sans text-foreground antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            <div className="pointer-events-none absolute inset-0 scan-grid opacity-45" />
            <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(1,3,5,0.08)_48%,rgba(1,3,5,0.72)_100%)]" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex flex-1 flex-col">{children}</main>
              <SiteFooter />
            </div>
          </div>
          <Toaster position="top-center" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
