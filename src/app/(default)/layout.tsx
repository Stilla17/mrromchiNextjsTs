import type { Metadata } from "next";
import SiteDocument from "@/components/SiteDocument";
import { defaultLocale, getMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = {
  ...getMetadata(defaultLocale),
  robots: { index: false, follow: true },
  alternates: { canonical: "/uz" },
};

export default function DefaultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument locale={defaultLocale}>{children}</SiteDocument>;
}
