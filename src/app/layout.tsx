import type { Metadata } from "next";
import Script from "next/script";
import "i18n";
import { Plus_Jakarta_Sans } from "next/font/google";
import I18nProvider from "@/providers/I18nProvider";
import { ToastContainer } from "react-toastify";

import "./globals.css";

const baseUrl = "https://grandwindow.uz";
const siteName = "Grand Window";
const siteTitle = `${siteName} - Premium Rom va Eshiklar`;
const siteDescription =
  "Toshkentda eng sifatli PVX va alyumin eshik va romlar. Bepul o'lchov va maslahat. +998 90 933 38 98";
const googleSiteVerification = "jeEHAF0nR1F1LkzqlNzrTGawwHTARTdZg6YSyAX16S8";
const googleAnalyticsId = "G-Z4FSD92E35";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteName,
  url: baseUrl,
  logo: `${baseUrl}/logolight.png`,
  image: `${baseUrl}/opengraph-image.png`,
  description: siteDescription,
  telephone: "+998909333898",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Allon 74",
    addressLocality: "Toshkent",
    addressCountry: "UZ",
  },
  sameAs: [
    "https://www.instagram.com/grand.window",
    "https://t.me/grand_window",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: siteName,
  title: {
    default: `${siteTitle} | PVX va Alyumin Profillar`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "rom",
    "eshik",
    "pvx rom",
    "alyumin rom",
    "plastik oyna",
    "toshkent rom",
    "grand window",
    "grandwindow",
    "grand window uz",
    "eshik rom toshkent",
    "engelberg",
    "aldox",
    "termo profil",
    "fasad",
    "rolstavni",
    "markiza",
    "pergola",
    "oyna o'rnatish",
    "eshik o'rnatish",
    "bepul o'lchov",
    "sifatli rom",
    "premium eshik",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: baseUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${siteName} - Premium Rom va Eshiklar`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logolight.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: baseUrl,
    languages: {
      uz: baseUrl,
      ru: `${baseUrl}/ru`,
      en: `${baseUrl}/en`,
    },
  },
  verification: {
    google: googleSiteVerification,
  },
  category: "business",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={jakarta.variable}>
      <head>
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
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-jakarta)" }}>
        <I18nProvider>
          {children}
          <ToastContainer />
        </I18nProvider>
      </body>
    </html>
  );
}
