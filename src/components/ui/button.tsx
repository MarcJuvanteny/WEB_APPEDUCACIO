import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-[0.95rem] font-medium transition-[transform,background-color,color,border-color] duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta text-cream hover:bg-terracotta-hover shadow-[0_10px_24px_-14px_rgba(181,86,47,0.7)]",
  secondary:
    "border border-ink/15 text-ink hover:border-terracotta/50 hover:text-terracotta bg-transparent",
  ghost: "text-ink-soft hover:text-terracotta",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
