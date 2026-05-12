import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getDictionary } from "@/lib/dictionaries";
import { buildPageMetadata, buildStructuredData } from "@/lib/seo";
import { locales, type Locale } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const dict = getDictionary(locale as Locale);

  return buildPageMetadata({
    locale: locale as Locale,
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const structuredData = buildStructuredData(locale as Locale);

  return (
    <PageShell locale={locale as Locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </PageShell>
  );
}
