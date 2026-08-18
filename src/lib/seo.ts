import type { Metadata } from "next";

export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";
export const baseUrl = "https://grandwindow.uz";
export const siteName = "Grand Window";

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

const seo = {
  uz: {
    title: "Grand Window - Premium Rom va Eshiklar | PVX va Alyumin Profillar",
    shortTitle: "Grand Window - Premium Rom va Eshiklar",
    description:
      "Toshkentda sifatli PVX va alyumin eshik va romlar. Bepul o'lchov va maslahat uchun Grand Window bilan bog'laning.",
    ogLocale: "uz_UZ",
    addressLocality: "Toshkent",
  },
  ru: {
    title: "Grand Window — Премиальные окна и двери | ПВХ и алюминий",
    shortTitle: "Grand Window — Премиальные окна и двери",
    description:
      "Качественные окна и двери из ПВХ и алюминия в Ташкенте. Бесплатный замер и консультация Grand Window.",
    ogLocale: "ru_RU",
    addressLocality: "Ташкент",
  },
  en: {
    title: "Grand Window - Premium Windows and Doors | PVC and Aluminium",
    shortTitle: "Grand Window - Premium Windows and Doors",
    description:
      "Quality PVC and aluminium windows and doors in Tashkent. Contact Grand Window for a free measurement and consultation.",
    ogLocale: "en_US",
    addressLocality: "Tashkent",
  },
} as const;

export function localePath(locale: Locale) {
  return `/${locale}`;
}

export function getMetadata(locale: Locale): Metadata {
  const content = seo[locale];
  const canonical = localePath(locale);

  return {
    metadataBase: new URL(baseUrl),
    applicationName: siteName,
    title: content.title,
    description: content.description,
    keywords: [
      "Grand Window",
      "PVC windows",
      "aluminium windows",
      "doors",
      "Tashkent",
      "PVX rom",
      "alyumin rom",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical,
      languages: {
        uz: "/uz",
        ru: "/ru",
        en: "/en",
        "x-default": "/uz",
      },
    },
    openGraph: {
      type: "website",
      locale: content.ogLocale,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => seo[item].ogLocale),
      url: canonical,
      siteName,
      title: content.shortTitle,
      description: content.description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: content.shortTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.shortTitle,
      description: content.description,
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
    verification: {
      google: "jeEHAF0nR1F1LkzqlNzrTGawwHTARTdZg6YSyAX16S8",
    },
    category: "business",
  };
}

export function getLocalBusinessJsonLd(locale: Locale) {
  const content = seo[locale];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}${localePath(locale)}#business`,
    name: siteName,
    url: `${baseUrl}${localePath(locale)}`,
    logo: `${baseUrl}/logolight.png`,
    image: `${baseUrl}/opengraph-image.png`,
    description: content.description,
    telephone: "+998957777075",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Allon 74",
      addressLocality: content.addressLocality,
      addressCountry: "UZ",
    },
    inLanguage: locale,
    sameAs: [
      "https://www.instagram.com/grand.window",
      "https://t.me/grand_window",
    ],
  };
}
