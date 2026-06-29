import type { Metadata } from "next";
import 'i18n';
import { Plus_Jakarta_Sans } from "next/font/google";
import I18nProvider from "@/providers/I18nProvider";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const baseUrl = 'https://grandwindow.uz'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Grand Window - Premium Rom va Eshiklar | PVX va Alyumin Profillar',
    template: '%s | Grand Window'
  },
  description: 'Grand Window - Toshkentda eng sifatli PVX va alyumin eshik va romlar. 24/7 xizmat, bepul o\'lchov va o\'rnatish. ☎️ +998 90 933 38 98',
  keywords: [
    'rom',
    'eshik',
    'pvx rom',
    'alyumin rom',
    'plastik oyna',
    'toshkent rom',
    'grand window',
    'engelberg',
    'aldox',
    'termo profil',
    'fasad',
    'rolstavni',
    'markiza',
    'pergola',
    'oyna o\'rnatish',
    'eshik o\'rnatish',
    'bepul o\'lchov',
    'sifatli rom',
    'premium eshik'
  ],
  authors: [{ name: 'Grand Window' }],
  creator: 'Grand Window',
  publisher: 'Grand Window',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: baseUrl,
    siteName: 'Grand Window',
    title: 'Grand Window - Premium Rom va Eshiklar',
    description: 'Toshkentda eng sifatli PVX va alyumin eshik va romlar. Bepul o\'lchov va maslahat. +998 90 933 38 98',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Grand Window - Premium Rom va Eshiklar',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logolight.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: baseUrl,
    languages: {
      'uz': baseUrl,
      'ru': `${baseUrl}/ru`,
      'en': `${baseUrl}/en`,
    },
  },
  verification: {
    google: 'googlecd8502e4a0d3046b.html',
    yandex: 'verification_code',
  },
  category: 'business',
}

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: 'swap',
})


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link rel="canonical" href={baseUrl} />
        <meta name="google-site-verification" content="icLVLMOf7ip40hWWskPw5d-nmqQsH0W2pPepFFU-F3c" />
      </head>
      <body style={{ fontFamily: 'var(--font-jakarta)' }}>
        <I18nProvider>
          {children}
          <ToastContainer />
        </I18nProvider>
      </body>
    </html>
  );
}
