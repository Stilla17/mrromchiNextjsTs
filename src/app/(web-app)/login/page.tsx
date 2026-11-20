import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col px-6 pt-7 pb-[max(24px,env(safe-area-inset-bottom))]">
      <Link
        href="/role/"
        className="flex min-h-11 self-start items-center gap-2 text-[13px] text-[var(--mini-muted)] no-underline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#8dab9e]"
      >
        <ArrowLeft size={20} /> Orqaga
      </Link>

      <section className="my-auto  pb-[30px] text-center">
        <div className="mx-auto mb-[30px] grid h-[104px] w-[104px] rotate-[-5deg] place-items-center rounded-[30px] border border-[#2aabee20] bg-[var(--mini-card)] shadow-[0_12px_36px_#2aabee18]">
          <Image
            src="/telegram_logo.webp"
            alt="Telegram"
            width={56}
            height={56}
            className="rotate-[5deg] object-contain"
            priority
          />
        </div>
        <p className="mb-[10px] text-[10px] font-semibold tracking-[1.6px] text-[var(--mini-muted)]">
          TELEGRAM MINI APP
        </p>
        <h1 className="my-3 mb-4 text-[29px] leading-[1.2] font-bold tracking-[-1px]">
          Telegram orqali kirish
        </h1>
      </section>

      <div className="mb-auto pt-5">
        <button
          type="button"
          className="flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#2aabee] to-[#229ed9] px-5 font-semibold text-white shadow-[0_10px_24px_#229ed94d] transition-[transform,box-shadow] duration-150 hover:shadow-[0_12px_28px_#229ed966] active:scale-[.98] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#2aabee]"
        >
          Telegram orqali kirish <ArrowRight size={19} />
        </button>
        <p className="mt-6 mb-0 text-center text-[11px] leading-[1.7] text-[var(--mini-muted)]">
          Kirish Telegram bot orqali amalga oshiriladi.
        </p>
      </div>
    </main>
  );
}
