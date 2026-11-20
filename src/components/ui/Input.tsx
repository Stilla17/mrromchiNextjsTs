import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`mt-2 min-h-[52px] w-full rounded-xl border border-[#8da39530] bg-[var(--mini-bg)] px-4 text-[16px] text-[var(--mini-text)] outline-none focus:border-[var(--mini-accent)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}
