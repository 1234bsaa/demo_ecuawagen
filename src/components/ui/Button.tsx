import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-brand px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 active:scale-[0.97]";
const variants: Record<Variant, string> = {
  solid: "bg-accent text-accent-fg hover:bg-fg/80",
  outline: "border border-fg text-fg hover:bg-fg hover:text-bg",
};

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
}

export function buttonClasses(variant: Variant = "solid") {
  return cn(base, variants[variant]);
}

export function ButtonLink({ variant = "solid", className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={cn(base, variants[variant], className)} />;
}
