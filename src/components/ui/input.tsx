import * as React from "react";
import { cn } from "@/lib/utils";
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("h-12 w-full rounded-2xl border border-white/14 bg-white/[0.055] px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/36", className)} {...props} />
));
Input.displayName = "Input";
