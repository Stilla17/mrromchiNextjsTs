import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import I18nProvider from "@/providers/I18nProvider";
import { getLocalBusinessJsonLd, type Locale } from "@/lib/seo";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const googleAnalyticsId = "G-Z4FSD92E35";

export default function SiteDocument({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  return (
    <html lang={locale} className={jakarta.variable}>
      <body style={{ fontFamily: "var(--font-jakarta)" }}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessJsonLd(locale)),
          }}
        />
        <I18nProvider language={locale}>
          {children}
          <ToastContainer />
        </I18nProvider>
      </body>
    </html>
  );
}
