import Link from "next/link";

import type { Locale } from "@/lib/site";

const solutionItems = {
  ko: [
    { title: "광학 설계", body: "레이저 파장, 출력, 빔 형상과 장비 구조를 고려해 공정 목적에 맞는 광학계를 검토합니다." },
    { title: "기구 설계", body: "스캐너, 렌즈, 미러, 계측 장비가 안정적으로 장착되는 모듈 구조와 인터페이스를 구성합니다." },
    { title: "SW 설계", body: "장비 제어, 측정 데이터, 운영 흐름이 연결되도록 소프트웨어 연동과 사용자 환경을 지원합니다." },
  ],
  en: [
    { title: "Optical Design", body: "Review optical systems around wavelength, power, beam shape, and process requirements." },
    { title: "Mechanical Design", body: "Configure stable module structures and interfaces for scanners, lenses, mirrors, and metrology systems." },
    { title: "Software Design", body: "Support software integration for equipment control, measurement data, and operating workflows." },
  ],
};

const makers = ["COHERENT", "TRUMPF", "ULO OPTICS", "DATARAY", "CORE RAY", "OPTICAL SOLUTION"];

export function HomeSolutionSection({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";
  const items = solutionItems[locale];

  return (
    <>
      <section className="homeSolutionSection">
        <div className="container homeSolutionInner">
          <div className="homeSolutionIntro">
            <span className="eyebrow">SHINHOTEK SOLUTION</span>
            <h2 className="sectionTitle">{isKo ? "공정에 맞는 광학 솔루션" : "Optical solutions for your process"}</h2>
            <p className="sectionLead">
              {isKo
                ? "제품 판매에 머물지 않고 선정, 설계 검토, 적용 지원까지 연결하는 산업용 레이저·광학 파트너를 지향합니다."
                : "Beyond product supply, Shinhotek connects selection, engineering review, and application support for industrial laser and optical systems."}
            </p>
          </div>

          <div className="homeSolutionGrid">
            {items.map((item, index) => (
              <article className="homeSolutionItem" key={item.title}>
                <span className="homeSolutionIndex">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homeContactSection">
        <div className="container">
          <div className="homeContactBand">
            <div>
              <span className="eyebrow">CONTACT US</span>
              <h2>{isKo ? "제품 상담과 테스트 요청을 남겨주세요" : "Discuss product selection and test requests"}</h2>
            </div>
            <Link href={`/${locale}/contact/quote`} className="button primary">
              {isKo ? "문의하기" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>

      <section className="homeMakerSection">
        <div className="container">
          <div className="makerMarquee" aria-label={isKo ? "제조사" : "Manufacturers"}>
            <div className="makerMarqueeTrack">
              {[...makers, ...makers].map((maker, index) => (
                <span key={`${maker}-${index}`}>{maker}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
