import type { Metadata, Viewport } from "next";
import "../globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import Footer from "@/components/WebAppCompnonents/Footer";
import QueryProvider from "@/providers/QueryProvider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "GrandWindow | Mini App",
  description: "GrandWindow jamoasi uchun Telegram Mini App",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uz"
      suppressHydrationWarning
    >
      <body
        className="
          m-0 font-[Arial,Helvetica,sans-serif] text-[14px]
          [-webkit-tap-highlight-color:transparent]

          [--mini-bg:#f2f5f4]
          [--mini-card:#ffffff]
          [--mini-text:#203d34]
          [--mini-muted:#687970]
          [--mini-accent:#285c48]
          [--mini-button-text:#ffffff]

          dark:[--mini-bg:#111916]
          dark:[--mini-card:#1a2620]
          dark:[--mini-text:#e6eee9]
          dark:[--mini-muted:#9eafa5]
          dark:[--mini-accent:#8ccca9]
          dark:[--mini-button-text:#11251b]

          bg-[var(--mini-bg)] text-[var(--mini-text)]
        "
      >
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <ThemeProvider>
          <QueryProvider>
            <div className="mx-auto min-h-svh min-h-dvh max-w-[480px] wrap-anywhere bg-[var(--mini-bg)] pt-[calc(env(safe-area-inset-top,0px)+var(--tg-content-safe-area-inset-top,0px))] min-[481px]:border-x min-[481px]:border-[#8da39515] min-[481px]:shadow-[0_0_60px_#203d3409]">
              {children}
            </div>
            <Footer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
