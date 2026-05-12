import type { Metadata } from "next";

import { DirectionsContent } from "@/components/directions-content";
import { SubpageHero } from "@/components/subpage-hero";
import { getDictionary } from "@/lib/dictionaries";
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
    path: "/directions",
    title: isKo ? "오시는 길 | SHINHOTEK" : "Directions | SHINHOTEK",
    description: isKo
      ? "SHINHOTEK 방문을 위한 본사 위치와 연락처를 안내합니다."
      : "Find SHINHOTEK location and contact information for visiting the headquarters.",
    keywords: ["오시는 길", "Directions", "SHINHOTEK location", "Shinhotek Seoul", "Gasan digital"],
    image: "/contact/directions-building.png",
  });
}

export default async function DirectionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <div className="subpageShell">
      <SubpageHero
        eyebrow="Directions"
        title={dict.directions.title}
        description={dict.directions.body}
        tone="directions"
      />
      <div className="container subpageContent">
        <DirectionsContent locale={locale} />
      </div>
    </div>
  );
}
