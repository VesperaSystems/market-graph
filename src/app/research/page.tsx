import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/site/brand-mark";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = { title: "Research", description: "Research notes from Vespera Systems on graph-native finance technology.", alternates: { canonical: "/research" } };
export default function ResearchPage() { return <div className="min-h-screen px-6 py-6 text-white lg:px-10"><header className="mx-auto flex max-w-7xl items-center justify-between"><BrandMark /><Button asChild variant="outline"><Link href="/">Back</Link></Button></header><main className="mx-auto max-w-4xl py-20"><p className="hud-label">Research</p><h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Systems notes are coming next.</h1><p className="mt-6 text-lg leading-8 text-neutral-300">This route is reserved for essays on graph theory, market structure, diligence workflows, and agentic investment infrastructure.</p></main></div>; }
