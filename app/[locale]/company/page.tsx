import type { Metadata } from "next";

import { FadeImage } from "@/components/fade-image";
import { getCompanyContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";

function localizedField(content: Record<string, unknown>, field: string, locale: Locale) {
  const suffix = locale === "ko" ? "Ko" : "En";
  return String(content[`${field}${suffix}`] ?? "");
}

function splitParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderLines(paragraph: string) {
  return paragraph.split("\n").map((line, index) => (
    <span key={`${line}-${index}`}>
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
    path: "/company",
    title: isKo ? "Company | SHINHOTEK 신호텍 소개" : "Company | About SHINHOTEK",
    description: isKo
      ? "SHINHOTEK는 한국 최초 상용 레이저·광학 솔루션 브랜드로, 산업용 광학 측정과 빔 분석 솔루션을 제공합니다."
      : "SHINHOTEK is a Korean commercial laser and optical solution brand delivering industrial optical measurement and beam analysis solutions.",
    keywords: ["Company", "About SHINHOTEK", "신호텍 소개", "한국 광학 솔루션", "Shinhotek", "optical solution Korea"],
    image: "/company/history-bg.png",
  });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const companyContent = await getCompanyContent();
  const historyTitle = localizedField(companyContent, "historyTitle", locale);
  const historyBody = localizedField(companyContent, "historyBody", locale);
  const brandTitle = localizedField(companyContent, "brandTitle", locale);
  const brandLead = localizedField(companyContent, "brandLead", locale);
  const companyPrinciples = [
    {
      heading: localizedField(companyContent, "visionTitle", locale),
      body: localizedField(companyContent, "visionBody", locale),
    },
    {
      heading: localizedField(companyContent, "goalTitle", locale),
      body: localizedField(companyContent, "goalBody", locale),
    },
  ];

  return (
    <div className="companyPage">
      <section className="companyHeroBand">
        <div className="companyHeroMedia">
          <FadeImage
            src="/company/history-bg.png"
            alt="SHINHOTEK history background"
            fill
            priority
            sizes="100vw"
            className="companyHeroImage"
            skeletonClassName="companyHeroSkeleton"
          />
          <div className="companyHeroOverlay" />
        </div>
      </section>

      <section className="companyHistorySection">
        <div className="container">
          <div className="companyHistorySurface">
            <div className="companyHistoryHeading">
              <h1 className="companyHistoryTitle">{historyTitle}</h1>
            </div>
            <div className="companyHistoryBody">
              {splitParagraphs(historyBody).map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 24)}-${index}`}>{renderLines(paragraph)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="companyPrinciplesSection">
        <div className="container">
          <div className="companyPrinciplesSurface">
            <div className="companyPrinciplesIntro">
              <strong className="companyPrinciplesBrand">{brandTitle}</strong>
              <p className="companyPrinciplesLead">{brandLead}</p>
            </div>

            <div className="companyPrinciplesTable" role="table" aria-label="SHINHOTEK vision and goal">
              {companyPrinciples.map((item) => (
                <div key={item.heading} className="companyPrinciplesColumn" role="rowgroup">
                  <div className="companyPrinciplesHead" role="row">
                    <span role="columnheader">{item.heading}</span>
                  </div>
                  <div className="companyPrinciplesCell" role="row">
                    <p role="cell">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
