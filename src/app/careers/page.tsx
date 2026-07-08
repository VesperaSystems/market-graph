import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/site/brand-mark";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = { title: "Careers", description: "Build graph-native finance technology at Vespera Systems.", alternates: { canonical: "/careers" } };
export default function CareersPage() { return <div className="min-h-screen px-6 py-6 text-white lg:px-10"><header className="mx-auto flex max-w-7xl items-center justify-between"><BrandMark /><Button asChild variant="outline"><Link href="/">Back</Link></Button></header><main className="mx-auto max-w-4xl py-20"><p className="hud-label">Careers</p><h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">Small team. Serious systems.</h1><p className="mt-6 text-lg leading-8 text-neutral-300">We are interested in engineers, designers, and operators who can make powerful tools feel precise, usable, and quietly cinematic.</p><Button asChild className="mt-8"><a href="mailto:hello@vespera.systems?subject=Vespera%20Systems%20careers">Introduce yourself</a></Button></main></div>; }
