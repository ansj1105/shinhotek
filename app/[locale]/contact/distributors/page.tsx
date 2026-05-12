import type { Metadata } from "next";

import { DistributorPartnerDirectory } from "@/components/distributor-partner-directory";
import { SubpageHero } from "@/components/subpage-hero";
import { getDistributorDirectory, getPageHeroConfig } from "@/lib/content";
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
    path: "/contact/distributors",
    title: isKo ? "대리점 소개 | SHINHOTEK Asia Partner" : "Distributors | SHINHOTEK Asia Partner",
    description: isKo
      ? "중국 PulsePower 등 SHINHOTEK 아시아 파트너와 대리점 정보를 확인하세요. 등록 국가 외 지역은 SHINHOTEK 본사로 문의해 주세요."
      : "Find SHINHOTEK distributor and Asia partner information including PulsePower in China.",
    keywords: ["대리점", "Distributors", "PulsePower", "Pulse Power", "SHINHOTEK China", "Asia partner", "Beijing distributor"],
    image: "/contact/distributor-pulse.png",
  });
}

export default async function DistributorsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isKo = locale === "ko";
  const [heroConfig, distributorDirectory] = await Promise.all([
    getPageHeroConfig("contact-distributors"),
    getDistributorDirectory(),
  ]);

  return (
    <div className="contactPage distributorsPage">
      <SubpageHero
        eyebrow={isKo ? heroConfig?.eyebrowKo || "Distributors" : heroConfig?.eyebrowEn || "Distributors"}
        title={isKo ? heroConfig?.titleKo || "Distributors" : heroConfig?.titleEn || "Distributor Information"}
        description={isKo ? heroConfig?.descriptionKo || "" : heroConfig?.descriptionEn || ""}
        tone="contact"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      <div className="container subpageContent">
        <DistributorPartnerDirectory
          locale={locale}
          regions={distributorDirectory.regions}
          mapImageUrl={distributorDirectory.settings.mapImageUrl}
        />
      </div>
    </div>
  );
}
