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
    title: isKo ? "견적문의 | SHINHOTEK 제품 상담" : "Contact | SHINHOTEK Product Inquiry",
    description: isKo
      ? "SHINHOTEK 레이저·광학 솔루션 도입과 기술 상담을 문의하세요."
      : "Contact SHINHOTEK for product consultation on laser and optical solutions.",
    keywords: ["견적문의", "Contact", "product inquiry", "laser and optical solution inquiry", "SHINHOTEK service", "optical measurement consultation"],
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
    <div className="contactPage quoteReferencePage">
      <SubpageHero
        eyebrow={isKo ? heroConfig?.eyebrowKo || "견적문의" : heroConfig?.eyebrowEn || "Contact"}
        title={isKo ? heroConfig?.titleKo || "견적문의" : heroConfig?.titleEn || "Contact"}
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
        <div className="quoteReferenceShell">
          <aside className="quoteReferenceAside">
            <span>{isKo ? "CONTACT" : "CONTACT"}</span>
            <strong>{isKo ? "제품 선정부터 테스트 요청까지" : "From product selection to test requests"}</strong>
            <p>
              {isKo
                ? "레이저, 스캐너, 계측, 광학 솔루션 조건을 남겨주시면 담당자가 검토 후 안내드립니다."
                : "Share your laser, scanner, metrology, or optical solution requirements and the right team will follow up."}
            </p>
          </aside>
          <div className="pageBody quoteReferenceForm">
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
