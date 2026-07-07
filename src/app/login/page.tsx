"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import {
  createBrowserSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = useMemo(() => {
    if (!isSupabaseConfigured) {
      return null;
    }

    return createBrowserSupabaseClient();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!supabase) {
      setError(
        "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      );
      return;
    }

    setIsSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message || "Unable to sign in with those details.");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const nextPath = params.get("next") || "/";
    window.location.assign(nextPath.startsWith("/") ? nextPath : "/");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 items-center px-6 py-12 lg:px-10">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="order-2 lg:order-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
              VS
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.28em] text-white">
              Vespera Systems
            </span>
          </Link>

          <div className="mt-10 rounded-[34px] border border-white/10 bg-slate-950/82 p-6 shadow-[0_0_120px_rgba(34,211,238,0.1)] sm:p-8">
            <p className="text-xs uppercase tracking-[0.26em] text-cyan-200">
              Secure access
            </p>
            <h1 className="mt-5 text-4xl font-medium tracking-[-0.045em] text-white sm:text-5xl">
              Sign in to the Vespera intelligence layer.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Use the account attached to your Vespera subscription to access configured displays, market intelligence, and office HUD controls.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="partner@firm.com"
                  className="h-13 rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-white/[0.08]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-13 rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:bg-white/[0.08]"
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm leading-6 text-rose-100">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-13 items-center justify-center rounded-full bg-cyan-300 px-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in" : "Sign in"}
              </button>
            </form>
          </div>
        </section>

        <section className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-black/35 p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_34%)]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">
                    Access console
                  </p>
                  <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-white">
                    Market room online
                  </h2>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Auth
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  ["Subscription", "Signal layer and company rankings"],
                  ["Displays", "HUD views for office screens"],
                  ["Controls", "Admin handover and tenant access"],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4"
                  >
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
