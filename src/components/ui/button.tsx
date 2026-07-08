import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean; variant?: ButtonVariant; }
const variants: Record<ButtonVariant, string> = {
  primary: "bg-white text-black hover:bg-neutral-200",
  secondary: "border border-white/14 bg-white/8 text-white hover:bg-white/12",
  ghost: "bg-transparent text-neutral-200 hover:bg-white/8 hover:text-white",
  outline: "border border-white/18 bg-transparent text-white hover:border-white/36 hover:bg-white/8",
};
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn("inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold uppercase tracking-[0.18em] transition disabled:pointer-events-none disabled:opacity-50", variants[variant], className)} {...props} />;
});
Button.displayName = "Button";
