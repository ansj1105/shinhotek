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
    path: "/legal/privacy",
    title: isKo ? "개인정보처리방침 | SHINHOTEK" : "Privacy Policy | SHINHOTEK",
    description: isKo
      ? "SHINHOTEK 웹사이트 개인정보 수집, 이용, 보관 기준을 안내합니다."
      : "Review how the SHINHOTEK website collects, uses, and stores personal information.",
    keywords: ["개인정보처리방침", "Privacy Policy"],
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const heroConfig = await getPageHeroConfig("legal-privacy");

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "Legal" : heroConfig?.eyebrowEn || "Legal"}
        title={locale === "ko" ? heroConfig?.titleKo || "개인정보처리방침" : heroConfig?.titleEn || "Privacy Policy"}
        description={locale === "ko"
          ? heroConfig?.descriptionKo || "Shinhotek 웹사이트 이용 과정에서 수집되는 기본 정보와 처리 기준을 안내합니다."
          : heroConfig?.descriptionEn || "This page explains how Shinhotek handles basic information collected through the website."}
        tone="resources"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.6}
      />
      <div className="container subpageContent">
        <div className="resourceDetailBody">
          <p>
            {locale === "ko"
              ? "신호텍는 문의 응대와 서비스 운영에 필요한 최소한의 정보만 수집하며, 수집된 정보는 문의 확인, 답변, 운영 기록 관리 목적에 한해 사용됩니다."
              : "Shinhotek collects only the minimum information required for inquiry handling and site operations. The collected information is used only for response handling, communication, and service records."}
          </p>
          <p>
            {locale === "ko"
              ? "문의 폼을 통해 전달된 회사명, 담당자명, 이메일, 연락처, 문의 내용은 내부 운영 기준에 따라 안전하게 보관되며, 법령상 요구가 없는 한 제3자에게 제공하지 않습니다."
              : "Company name, contact name, email, phone number, and inquiry details submitted through the contact form are stored securely according to internal operational policies and are not shared with third parties unless required by law."}
          </p>
        </div>
      </div>
    </div>
  );
}
