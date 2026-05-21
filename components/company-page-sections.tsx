import Link from "next/link";

import { DirectionsContent } from "@/components/directions-content";
import { FadeImage } from "@/components/fade-image";
import type { Locale } from "@/lib/site";

type LocalizedRecord = Record<string, unknown>;

type CompanyHeroConfig = {
  descriptionKo?: string | null;
  descriptionEn?: string | null;
  backgroundImageUrl?: string | null;
};

type CompanyPartnerItem = {
  name: string;
  body: string;
  website?: string | null;
};

function localizedField(content: LocalizedRecord, field: string, locale: Locale) {
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

export function CompanyHeroBand({ imageUrl }: { imageUrl?: string | null }) {
  const companyHeroImage = imageUrl || "/company/history-bg.png";

  return (
    <section className="companyHeroBand">
      <div className="companyHeroMedia">
        <FadeImage
          src={companyHeroImage}
          alt="SHINHOTEK company background"
          fill
          priority
          sizes="100vw"
          className="companyHeroImage"
          skeletonClassName="companyHeroSkeleton"
        />
        <div className="companyHeroOverlay" />
      </div>
    </section>
  );
}

export function CompanyOverviewSection({
  locale,
  companyContent,
  heroConfig,
}: {
  locale: Locale;
  companyContent: LocalizedRecord;
  heroConfig?: CompanyHeroConfig | null;
}) {
  const isKo = locale === "ko";
  const brandTitle = localizedField(companyContent, "brandTitle", locale) || (isKo ? "SHINHOTEK" : "SHINHOTEK");
  const brandLead = localizedField(companyContent, "brandLead", locale);
  const description = isKo ? heroConfig?.descriptionKo : heroConfig?.descriptionEn;
  const body = description || brandLead;
  const stats = [
    { value: "20+", label: isKo ? "산업 레이저 지원 경험" : "Years of laser support" },
    { value: "6", label: isKo ? "핵심 제품군" : "Core product groups" },
    { value: "1:1", label: isKo ? "공정 맞춤 기술 검토" : "Process-specific review" },
  ];
  const links = [
    {
      href: "/company/ceo-vision",
      label: isKo ? "CEO 인사말 & 회사비전" : "CEO Message & Vision",
      text: isKo ? "대표 인사말과 신호텍의 비전을 확인하세요." : "Review Shinhotek's message and vision.",
    },
    {
      href: "/company/partners",
      label: isKo ? "파트너사 소개" : "Partners",
      text: isKo ? "주요 파트너 네트워크를 확인하세요." : "Explore Shinhotek's partner network.",
    },
    {
      href: "/company/directions",
      label: isKo ? "찾아오는길" : "Directions",
      text: isKo ? "본사 위치와 방문 정보를 확인하세요." : "Find location and contact information.",
    },
  ];

  return (
    <section className="companyHistorySection">
      <div className="container">
        <div className="companyHistorySurface companyOverviewSurface">
          <div className="companyHistoryHeading">
            <h1 className="companyHistoryTitle">{isKo ? "회사소개" : "Company"}</h1>
            <span className="companyHistoryKicker">
              <span className="companyHistoryKickerMark" />
              ABOUT SHINHOTEK
            </span>
          </div>
          <div className="companyHistoryBody">
            <strong className="companyOverviewBrand">{brandTitle}</strong>
            {brandLead ? <p>{renderLines(brandLead)}</p> : null}
            {body && body !== brandLead
              ? splitParagraphs(body).map((paragraph, index) => (
                  <p key={`${paragraph.slice(0, 24)}-${index}`}>{renderLines(paragraph)}</p>
                ))
              : null}
          </div>
          <div className="companyCoreRayStats" aria-label={isKo ? "신호텍 회사 지표" : "Shinhotek company highlights"}>
            {stats.map((stat) => (
              <div key={stat.label} className="companyCoreRayStat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="companySubpageGrid">
            {links.map((link) => (
              <Link key={link.href} href={`/${locale}${link.href}`} className="companySubpageCard">
                <strong>{link.label}</strong>
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanyCeoVisionSections({
  locale,
  companyContent,
}: {
  locale: Locale;
  companyContent: LocalizedRecord;
}) {
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
    <>
      <section className="companyHistorySection">
        <div className="container">
          <div className="companyHistorySurface companyCeoSurface">
            <div className="companyHistoryHeading">
              <h1 className="companyHistoryTitle">{historyTitle}</h1>
              <span className="companyHistoryKicker">
                <span className="companyHistoryKickerMark" />
                CEO MESSAGE
              </span>
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
    </>
  );
}

export function CompanyPartnersSection({ locale, partners }: { locale: Locale; partners: CompanyPartnerItem[] }) {
  const isKo = locale === "ko";

  const logoWall = partners.length
    ? partners.map((partner) => partner.name)
    : ["COHERENT", "TRUMPF", "DATARAY", "ULO OPTICS", "JENOPTIK", "PULSEPOWER"];

  return (
    <section className="companyPartnerSection">
      <div className="container">
        <div className="companyPartnerSurface">
          <div className="companyPartnerIntro">
            <span className="eyebrow">PARTNERS</span>
            <h1 className="sectionTitle">{isKo ? "파트너사 소개" : "Partner Network"}</h1>
            <p className="sectionLead">
              {isKo
                ? "신호텍은 레이저, 광학, 계측, 자동화 분야의 파트너 네트워크를 기반으로 고객 공정에 맞는 제품과 솔루션을 연결합니다."
                : "Shinhotek connects products and solutions for customer processes through a partner network across lasers, optics, metrology, and automation."}
            </p>
          </div>
          <div className="companyPartnerLogoWall" aria-label={isKo ? "파트너 로고 목록" : "Partner logo list"}>
            {logoWall.map((name) => (
              <div key={name} className="companyPartnerLogoTile">
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className="companyPartnerGrid">
            {partners.map((partner) => (
              <article key={`${partner.name}-${partner.website ?? "partner"}`} className="companyPartnerCard">
                <strong>{partner.name}</strong>
                <p>{partner.body}</p>
                {partner.website ? (
                  <a href={partner.website} target="_blank" rel="noreferrer">
                    {isKo ? "웹사이트 보기" : "Visit website"}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CompanyDirectionsSection({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";

  return (
    <section className="companyDirectionsSection">
      <div className="container">
        <div className="companyDirectionsIntro">
          <span className="eyebrow">LOCATION</span>
          <h1 className="sectionTitle">{isKo ? "찾아오는길" : "Directions"}</h1>
        </div>
        <DirectionsContent locale={locale} />
      </div>
    </section>
  );
}
