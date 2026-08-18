import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteDocument from "@/components/SiteDocument";
import { getMetadata, isLocale, locales } from "@/lib/seo";
import "../globals.css";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return getMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <SiteDocument locale={locale}>{children}</SiteDocument>;
}
