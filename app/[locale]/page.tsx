import type { Metadata } from "next";

import { HomeSeriesOverview } from "@/components/home-series-overview";
import { HomeStorySection } from "@/components/home-story-section";
import { Hero } from "@/components/hero";
import { getProducts, getSiteConfig } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [config, products] = await Promise.all([getSiteConfig(), getProducts()]);
  const brandOriginTitle = locale === "ko" ? "SHINHOTEK" : "SHINHOTEK";
  const storyDisplayLines = locale === "ko" ? ["회사소개", "신호텍"] : ["Company", "Shinhotek"];
  const storyParagraphs =
    locale === "ko"
      ? [
          "신호텍은 레이저 공정과 광학 시스템 구축에 필요한 제품과 기술 지원을 제공하는 산업용 광학 솔루션 기업입니다.",
          "관리자 페이지에서 회사 소개, 제품군, 응용분야, 자료실과 대리점 정보를 직접 관리할 수 있도록 구성했습니다.",
        ]
      : [
          "Shinhotek provides industrial optical solutions for laser processes and optical system integration.",
          "The admin page is designed so operators can manage company content, product categories, applications, resources, and distributors directly.",
        ];

  return (
    <>
      <Hero locale={locale} heroImageUrl={config?.heroImageUrl} />
      <HomeStorySection
        brandOriginTitle={brandOriginTitle}
        storyDisplayLines={storyDisplayLines}
        storyParagraphs={storyParagraphs}
        storyTitleFontSize={locale === "ko" ? config?.storyTitleFontSizeKo : config?.storyTitleFontSizeEn}
        storyEyebrowFontSize={locale === "ko" ? config?.storyEyebrowFontSizeKo : config?.storyEyebrowFontSizeEn}
        storyBodyFontSize={
          (locale === "ko" ? config?.storyBodyFontSizeKo : config?.storyBodyFontSizeEn) ?? config?.storyFontSize
        }
      />

      <HomeSeriesOverview
        locale={locale}
        title={locale === "ko" ? config?.seriesTitleKo : config?.seriesTitleEn}
        lead={locale === "ko" ? config?.seriesLeadKo : config?.seriesLeadEn}
        products={products}
      />

      {/* Patent section disabled on the home page */}
    </>
  );
}
