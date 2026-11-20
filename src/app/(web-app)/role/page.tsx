import Link from "next/link";
import Image from "next/image";

export default function RolePage() {
  return (
    <main className="flex min-h-svh flex-col px-6 pt-7 pb-[max(24px,env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-[9px] text-[17px] font-bold tracking-[-.4px]">
        <Image
          className="h-16 w-16 shrink-0 object-contain"
          src="/logodark.png"
          alt=""
          width={64}
          height={64}
          priority
        />
      </div>
      <section className="my-auto text-center">
        <div className="mx-auto mb-[30px] grid h-[104px] w-[104px] rotate-[-5deg] place-items-center rounded-[30px] border border-[#8da39520] bg-[var(--mini-card)] text-[var(--mini-accent)] shadow-[0_8px_30px_#1e403608]">
          <Image
            className="h-[68px] w-[84px] rotate-[5deg] object-contain"
            src="/logodark.png"
            alt="GrandWindow"
            width={84}
            height={68}
            priority
          />
        </div>
        <p className="mb-[10px] text-[10px] font-semibold tracking-[1.6px] text-[var(--mini-muted)]">
          XUSH KELIBSIZ
        </p>
        <h1 className="my-3 mb-4 text-[29px] leading-[1.2] font-bold tracking-[-1px]">
          Ish maydoningiz,
          <br />
          doim yoningizda.
        </h1>
        <p className="text-[13px] leading-[1.65] text-[var(--mini-muted)]">
          Jamoangiz bilan ishlash endi Telegram ichida.
          <br />
          Boshlash uchun rolingizni tanlang.
        </p>
      </section>
      {[
        { role: "admin", title: "Administrator" },
        { role: "user", title: "Foydalanuvchi" },
      ].map(({ role, title }) => (
        <Link
          key={role}
          href={`/login/?role=${role}`}
        >
          <div className="mb-auto pt-5">
            <button
              type="button"
              className="flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-gradient-to-b from-[#2aabee] to-[#229ed9] px-5 font-semibold text-white shadow-[0_10px_24px_#229ed94d] transition-[transform,box-shadow] duration-150 hover:shadow-[0_12px_28px_#229ed966] active:scale-[.98] focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#2aabee]"
            >
              {title}
              <Image
                className="h-[40px] w-[40px] rotate-[5deg] object-contain"
                src="/telegram_logo.webp"
                alt="GrandWindow"
                width={84}
                height={68}
                priority
              />
            </button>
          </div>
        </Link>
      ))}
      <p className="mt-6 mb-0 text-center text-[10px] leading-[1.7] text-[var(--mini-muted)]">
        GrandWindow · Jamoa uchun yagona maydon
      </p>
    </main>
  );
}
