"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
interface TabsContextValue { value: string; setValue: (value: string) => void; }
const TabsContext = React.createContext<TabsContextValue | null>(null);
export function Tabs({ defaultValue, value, onValueChange, className, children }: { defaultValue: string; value?: string; onValueChange?: (value: string) => void; className?: string; children: React.ReactNode }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  const setValue = React.useCallback((next: string) => { setInternal(next); onValueChange?.(next); }, [onValueChange]);
  return <TabsContext.Provider value={{ value: current, setValue }}><div className={className}>{children}</div></TabsContext.Provider>;
}
export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex flex-wrap gap-2 border border-white/10 bg-white/[0.035] p-1", className)} {...props} />; }
export function TabsTrigger({ value, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  const active = context?.value === value;
  return <button type="button" onClick={() => context?.setValue(value)} className={cn("px-4 py-2 text-sm text-neutral-400 transition hover:bg-white/8 hover:text-white", active && "bg-white text-black hover:bg-white hover:text-black", className)} {...props} />;
}
export function TabsContent({ value, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(TabsContext);
  if (context?.value !== value) return null;
  return <div className={className} {...props} />;
}
