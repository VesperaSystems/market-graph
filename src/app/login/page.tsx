"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { BrandMark } from "@/components/site/brand-mark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("operator@vespera.systems");
  const [password, setPassword] = useState("demo");
  const [tenant, setTenant] = useState("demo");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/session", { method: "POST", body: JSON.stringify({ email, password, tenant }) });
    setPending(false);
    if (!response.ok) {
      setError(await response.text());
      return;
    }
    const next = new URLSearchParams(window.location.search).get("next") || `/${tenant}`;
    window.location.assign(next.startsWith("/") ? next : `/${tenant}`);
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 text-white lg:px-10">
      <div className="grid w-full gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section>
          <BrandMark product />
          <div className="hud-panel mt-10 rounded-[38px] p-7 sm:p-9">
            <p className="hud-label">Secure access</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Sign in to the intelligence layer.</h1>
            <p className="mt-4 text-sm leading-7 text-neutral-400">This MVP uses NextAuth-compatible local session scaffolding until production Postgres credentials are connected.</p>
            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-2"><Label>Email</Label><Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
              <div className="grid gap-2"><Label>Password</Label><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
              <div className="grid gap-2"><Label>Tenant slug</Label><Input value={tenant} onChange={(event) => setTenant(event.target.value.toLowerCase())} required /></div>
              {error ? <div className="rounded-2xl border border-white/20 bg-white/8 px-4 py-3 text-sm text-neutral-200">{error}</div> : null}
              <Button type="submit" disabled={pending}>{pending ? "Signing in" : "Sign in"}</Button>
            </form>
          </div>
        </section>
        <section className="hud-panel rounded-[42px] p-8">
          <p className="hud-label">Access profile</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em]">Operators enter the product. Buyers stay on the company site.</h2>
          <div className="mt-8 grid gap-3 text-sm text-neutral-300">
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">Client workspaces: <Link className="text-white underline" href="/ubs">/ubs</Link>, <Link className="text-white underline" href="/rbs">/rbs</Link>, <Link className="text-white underline" href="/sjp">/sjp</Link></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">Production hardening next: real credential provider, Drizzle adapter, SSO/SAML, audit logs.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
