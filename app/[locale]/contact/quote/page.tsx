import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
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
    path: "/contact/quote",
    title: isKo ? "문의하기 | SHINHOTEK 제품 상담" : "Contact | SHINHOTEK Product Inquiry",
    description: isKo
      ? "SHINHOTEK 레이저·광학 솔루션 도입과 기술 상담을 문의하세요."
      : "Contact SHINHOTEK for product consultation on laser and optical solutions.",
    keywords: ["문의하기", "Contact", "product inquiry", "laser and optical solution inquiry", "SHINHOTEK service", "optical measurement consultation"],
    image: "/subpage-contact-bg.png",
  });
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const heroConfig = await getPageHeroConfig("contact-quote");
  const isKo = locale === "ko";

  return (
    <div className="contactPage">
      <SubpageHero
        eyebrow={isKo ? "문의하기" : "Contact"}
        title={isKo ? "문의하기" : "Contact"}
        description={
          isKo
            ? heroConfig?.descriptionKo || "문의 유형과 요청 내용을 남겨주시면 담당자가 확인 후 안내드립니다."
            : heroConfig?.descriptionEn || "Share your request, and the right team will follow up with you."
        }
        tone="contact"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <div className="container subpageContent">
        <div className="pageBody">
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
