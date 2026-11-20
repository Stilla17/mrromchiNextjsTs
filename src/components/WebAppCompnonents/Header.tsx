"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, UserRound } from "lucide-react";
import { motion } from "motion/react";

const iconButtonClass =
  "grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full " +
  "bg-[color-mix(in_srgb,var(--mini-accent)_9%,var(--mini-card))] " +
  "text-[var(--mini-accent)] " +
  "focus-visible:outline-[3px] focus-visible:outline-offset-[3px] " +
  "focus-visible:outline-[#8dab9e]";

const Header = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <header className="flex items-center justify-between border-b border-[#8da39515] bg-[var(--mini-card)] p-5">
      <div className="flex items-center gap-[9px] text-[17px] font-bold tracking-[-.4px]">
        <Link
          href="/home"
          className="inline-block"
          aria-label="Bosh sahifa"
        >
          <Image
            className="h-12 w-24 object-contain dark:hidden"
            src="/logodark.png"
            alt="GrandWindow"
            width={96}
            height={48}
            priority
          />
          <Image
            className="hidden h-12 w-24 object-contain dark:block"
            src="/logolight.png"
            alt="GrandWindow"
            width={96}
            height={48}
            priority
          />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          className={`${iconButtonClass} relative overflow-hidden cursor-pointer`}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Kun yoki tun rejimini almashtirish"
        >
          <motion.span
            key={resolvedTheme}
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid place-items-center"
          >
            {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.span>
        </motion.button>

        <Link
          href="/role/"
          className={iconButtonClass}
          aria-label="Rolni almashtirish"
        >
          <UserRound size={21} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
