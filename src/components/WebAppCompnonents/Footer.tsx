"use client";

import { links } from "@/data/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/features/users/session.hooks";

export default function Footer() {
  const pathname = usePathname();
  const session = useSession();
  const visibleLinks = links.filter(
    ({ href }) => href !== "/users/" || session.data?.role === "admin",
  );

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-[480px] -translate-x-1/2 items-center justify-around gap-3 border-t border-[#8da39525] bg-[var(--mini-card)] px-6 pt-2.5 pb-[calc(12px+env(safe-area-inset-bottom,0px)+var(--tg-content-safe-area-inset-bottom,0px))]"
      aria-label="Asosiy navigatsiya"
    >
      {visibleLinks.map(({ href, label, icon: Icon }) => {
        const active = pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-[5px] rounded-lg text-[10px] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--mini-accent)] ${active ? "text-[var(--mini-accent)]" : "text-[var(--mini-muted)]"}`}
          >
            <Icon
              size={22}
              aria-hidden="true"
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
