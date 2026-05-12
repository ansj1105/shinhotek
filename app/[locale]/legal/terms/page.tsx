import type { Metadata } from "next";

import { SubpageHero } from "@/components/subpage-hero";
import { getPageHeroConfig } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return buildPageMetadata({
    locale,
    path: "/legal/terms",
    title: isKo ? "이용약관 | SHINHOTEK" : "Terms of Use | SHINHOTEK",
    description: isKo
      ? "SHINHOTEK 웹사이트 이용 조건과 운영 기준을 안내합니다."
      : "Review SHINHOTEK website terms of use and operating policies.",
    keywords: ["이용약관", "Terms of Use"],
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const heroConfig = await getPageHeroConfig("legal-terms");

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "Legal" : heroConfig?.eyebrowEn || "Legal"}
        title={locale === "ko" ? heroConfig?.titleKo || "이용약관" : heroConfig?.titleEn || "Terms of Service"}
        description={locale === "ko"
          ? heroConfig?.descriptionKo || "Shinhotek 웹사이트 이용에 관한 기본 조건과 책임 범위를 안내합니다."
          : heroConfig?.descriptionEn || "This page outlines the basic terms and responsibilities for using the Shinhotek website."}
        tone="resources"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.6}
      />
      <div className="container subpageContent">
        <div className="resourceDetailBody">
          <p>
            {locale === "ko"
              ? "본 웹사이트에 제공되는 제품 정보, 자료, 문의 기능은 회사 소개와 고객 커뮤니케이션을 위한 목적에 한해 제공됩니다. 사용자는 관련 법령과 일반적인 웹 이용 질서를 준수해야 합니다."
              : "The product information, resources, and contact features on this website are provided for company introduction and customer communication purposes. Users must comply with applicable laws and general standards of web usage."}
          </p>
          <p>
            {locale === "ko"
              ? "신호텍는 웹사이트 내용의 정확성과 최신성을 유지하기 위해 노력하지만, 사전 고지 없이 정보가 수정될 수 있으며, 개별 프로젝트 적용 조건은 별도 협의에 따릅니다."
              : "Shinhotek strives to keep website information accurate and up to date, but content may change without prior notice. Project-specific conditions and deliverables remain subject to separate consultation."}
          </p>
        </div>
      </div>
    </div>
  );
}
