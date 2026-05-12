import type { Metadata } from "next";

import { ApplicationsIndexNav } from "@/components/applications-index-nav";
import { ApplicationImageRail } from "@/components/application-image-rail";
import { FadeImage } from "@/components/fade-image";
import { SubpageHero } from "@/components/subpage-hero";
import { applicationGalleryImages } from "@/lib/application-gallery";
import { getApplications, getPageHeroConfig } from "@/lib/content";
import { defaultApplications } from "@/lib/default-content";
import { getDictionary } from "@/lib/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";

const applicationEnglishCopy: Record<string, { title: string; body: string }> = {};
const applicationKoreanCopy: Record<string, { title: string; body: string }> = {};

function splitApplicationParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderApplicationLines(paragraph: string) {
  return paragraph.split("\n").map((line, index) => (
    <span key={`${index}-${line}`}>
      {index > 0 ? <br /> : null}
      {line}
    </span>
  ));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isKo = locale === "ko";

  return buildPageMetadata({
    locale,
    path: "/applications",
    title: isKo
      ? "응용분야 | 신호텍 레이저·광학 솔루션"
      : "Application | Shinhotek Laser and Optical Solutions",
    description: isKo
      ? "반도체, 디스플레이, 이차전지, 의료·바이오 등 산업 공정별 신호텍 광학 솔루션 적용 분야를 확인하세요."
      : "Explore Shinhotek optical solution applications across semiconductor, display, secondary battery, medical, and bio processes.",
    keywords: [
      "응용분야",
      "Application",
      "semiconductor laser process",
      "VCSEL for Lidar",
      "laser soldering",
      "wafer annealing",
      "AOI illumination",
      "OLED display laser",
    ],
    image: "/subpage-applications-bg.png",
  });
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [heroConfig, applications] = await Promise.all([
    getPageHeroConfig("applications"),
    getApplications(),
  ]);
  const applicationMap = new Map(applications.map((application) => [application.slug, application]));
  const applicationEntries = defaultApplications.map((entry) => {
    const source = applicationMap.get(entry.slug);
    const englishCopy = applicationEnglishCopy[entry.slug];
    const koreanCopy = applicationKoreanCopy[entry.slug];

    return {
      slug: entry.slug,
      titleKo: source?.titleKo ?? koreanCopy?.title ?? entry.titleKo,
      titleEn: source?.titleEn ?? englishCopy?.title ?? entry.titleEn,
      imageUrl: source?.imageUrl ?? entry.imageUrl ?? "",
      bodyKo: source?.summaryKo ?? koreanCopy?.body ?? entry.summaryKo,
      bodyEn: source?.summaryEn ?? englishCopy?.body ?? entry.summaryEn,
      galleryImages: applicationGalleryImages[entry.slug] ?? [],
    };
  });

  return (
    <div className="applicationsPage">
      <SubpageHero
        eyebrow={locale === "ko" ? heroConfig?.eyebrowKo || "APPLICATION" : heroConfig?.eyebrowEn || "APPLICATION"}
        title={locale === "ko" ? heroConfig?.titleKo || dict.applications.title : heroConfig?.titleEn || dict.applications.title}
        description={locale === "ko" ? heroConfig?.descriptionKo || dict.applications.lead : heroConfig?.descriptionEn || dict.applications.lead}
        tone="applications"
        backgroundImageUrl={heroConfig?.backgroundImageUrl || "/subpage-applications-bg.png"}
        backgroundOpacity={heroConfig?.backgroundOpacity ?? 0.6}
      />
      {/* <ApplicationsIndexNav locale={locale} items={applicationEntries} /> */}

      <div className="applicationsBody applicationsBodyShowcase">
        <div className="container applicationsShowcase">
          {applicationEntries.map((entry) => {
            const localizedTitle = locale === "ko" ? entry.titleKo : entry.titleEn;
            const localizedBody = locale === "ko" ? entry.bodyKo : entry.bodyEn;

            return (
              <section key={entry.slug} id={entry.slug} className="applicationShowcaseRow">
                <div className="applicationShowcaseMedia">
                  <FadeImage
                    src={entry.imageUrl}
                    alt={localizedTitle}
                    width={960}
                    height={720}
                    sizes="(max-width: 720px) 100vw, (max-width: 960px) 220px, 280px"
                    className="applicationShowcaseImage"
                    skeletonClassName="applicationShowcaseSkeleton"
                  />
                </div>
                <div className="applicationShowcaseBody">
                  <h2 className="applicationShowcaseTitle">{localizedTitle}</h2>
                  <div className="applicationShowcaseText">
                    {splitApplicationParagraphs(localizedBody).map((paragraph, index) => (
                      <p key={`${entry.slug}-body-${index}`}>{renderApplicationLines(paragraph)}</p>
                    ))}
                  </div>
                </div>
                <ApplicationImageRail
                  images={entry.galleryImages}
                  title={localizedTitle}
                  locale={locale}
                />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
