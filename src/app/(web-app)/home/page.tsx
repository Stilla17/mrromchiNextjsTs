import Header from "@/components/WebAppCompnonents/Header";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="px-5 pt-7 pb-[calc(110px+env(safe-area-inset-bottom,0px)+var(--tg-content-safe-area-inset-bottom,0px))]">
        <div>
          <h1 className="mb-[9px] text-[28px] leading-[1.2] font-bold tracking-[-1px]">
            Xayrli kun! 👋
          </h1>
          <p className="text-[13px] leading-[1.65] text-[var(--mini-muted)]">
            Bugungi ishlarni birga boshlaymiz.
          </p>
        </div>
      </main>
    </>
  );
}
