import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger" | "icon";
};

const variants = {
  primary:
    "min-h-12 rounded-xl bg-[var(--mini-accent)] px-4 text-[13px] font-semibold text-[var(--mini-button-text)]",
  secondary:
    "min-h-12 rounded-xl border border-[#8da39530] px-4 text-[13px] font-semibold",
  danger:
    "min-h-12 rounded-xl bg-red-600 px-4 text-[13px] font-semibold text-white",
  icon: "size-11 shrink-0 rounded-full bg-[var(--mini-bg)] text-[var(--mini-muted)]",
};

export default function Button({
  variant = "primary",
  type = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center justify-center gap-2 transition-transform enabled:cursor-pointer enabled:active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mini-accent)] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
