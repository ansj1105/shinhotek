import type { Metadata } from "next";

import { ContactSubnav } from "@/components/contact-subnav";
import { DirectionsContent } from "@/components/directions-content";
import { getPageHeroConfig } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import { SubpageHero } from "@/components/subpage-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return buildPageMetadata({
    locale,
    path: "/contact/directions",
    title: isKo ? "찾아오시는 길 | SHINHOTEK Headquarter" : "Directions | SHINHOTEK Headquarter",
    description: isKo
      ? "서울 금천구 가산디지털1로 19 대륭테크노타운 18차 1306호 SHINHOTEK 본사 위치, 연락처, 이메일 정보를 확인하세요."
      : "Find SHINHOTEK headquarter address, contact numbers, and email in Geumcheon-gu, Seoul, Korea.",
    keywords: ["찾아오시는 길", "SHINHOTEK 주소", "Shinhotek Seoul", "Headquarter", "Gasan digital", "Geumcheon-gu"],
    image: "/contact/directions-building.png",
  });
}

export default async function ContactDirectionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const heroConfig = await getPageHeroConfig("contact-directions");
  const eyebrowKo =
    heroConfig?.eyebrowKo === "찾아오시는길"
      ? "찾아오시는 길"
      : heroConfig?.eyebrowKo || "찾아오시는 길";
  const titleKo =
    heroConfig?.titleKo === "찾아오시는길"
      ? "찾아오시는 길"
      : heroConfig?.titleKo || dict.directions.title;

  return (
    <div className="subpageShell">
      <SubpageHero
        eyebrow={locale === "ko" ? eyebrowKo : heroConfig?.eyebrowEn || "Directions"}
        title={locale === "ko" ? titleKo : heroConfig?.titleEn || dict.directions.title}
        description={locale === "ko" ? heroConfig?.descriptionKo || dict.directions.body : heroConfig?.descriptionEn || dict.directions.body}
        tone="directions"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-contact-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.9}
        lightText
      />
      {/* <ContactSubnav locale={locale} activeHref="/contact/directions" /> */}
      <div className="container subpageContent">
        <DirectionsContent locale={locale} />
      </div>
    </div>
  );
}
