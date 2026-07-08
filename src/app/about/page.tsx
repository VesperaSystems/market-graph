import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/site/brand-mark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "About", description: "The Vespera Systems thesis: finance is a graph of capital, people, incentives, and time.", alternates: { canonical: "/about" } };
const points = ["Markets are networks, not rows.", "Investment teams need synthesis more than another dashboard.", "AI, legal, quant, and graph context should share memory."];
export default function AboutPage() {
  return <div className="min-h-screen px-6 py-6 text-white lg:px-10"><header className="mx-auto flex max-w-7xl items-center justify-between"><BrandMark /><Button asChild variant="outline"><Link href="/">Back</Link></Button></header><main className="mx-auto max-w-7xl py-20"><p className="hud-label">Company thesis</p><h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">Vespera exists because finance is already a graph. Most tools just pretend it is a spreadsheet.</h1><div className="mt-12 grid gap-4 md:grid-cols-3">{points.map((point) => <Card key={point}><CardHeader><CardTitle>{point}</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-neutral-400">We build operational systems around this belief: relationship-first displays, AI analysis, legal workflow, and quant tooling as one institutional layer.</p></CardContent></Card>)}</div></main></div>;
}
