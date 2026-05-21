export const defaultSiteConfig = {
  id: 1,
  heroTitleKo: `정밀 레이저 공정을 위한
광학 솔루션 파트너`,
  heroTitleEn: "Optical solutions for precision manufacturing",
  heroDescriptionKo:
    "신호텍은 산업용 레이저, 스캐너, 계측기, 광학 솔루션, 코팅 솔루션과 빔 딜리버리 제품군을 공급합니다.",
  heroDescriptionEn:
    "Shinhotek supplies industrial lasers, scanners, metrology systems, optical solutions, coating solutions, and beam delivery systems.",
  heroImageUrl: "/hero-main-laser.png",
  heroFontSize: 52,
  storyTitleKo: "신호텍 소개",
  storyTitleEn: "About Shinhotek",
  storyBodyKo:
    "신호텍은 레이저 공정과 광학 시스템 구축에 필요한 제품과 기술 지원을 제공하는 산업용 광학 솔루션 기업입니다. 고객의 공정 조건에 맞는 제품 선정, 기술 검토, 자료 제공, 사후 지원까지 하나의 흐름으로 관리합니다.",
  storyBodyEn:
    "Shinhotek is an industrial optical solution company supporting product selection, technical review, documentation, and after-sales support for laser processes and optical systems.",
  storyFontSize: 18,
  storyTitleFontSizeKo: 42,
  storyTitleFontSizeEn: 42,
  storyEyebrowFontSizeKo: 18,
  storyEyebrowFontSizeEn: 18,
  storyBodyFontSizeKo: 16,
  storyBodyFontSizeEn: 16,
  seriesTitleKo: "Product Categories",
  seriesTitleEn: "Product Categories",
  seriesLeadKo: "레이저 공정에 필요한 6개 핵심 제품군을 확인하고 관리자에서 직접 확장할 수 있습니다.",
  seriesLeadEn: "Review core product categories for laser processes and expand them directly from the admin page.",
  seoTitleKo: "신호텍 | 레이저·광학 솔루션 전문 기업",
  seoTitleEn: "Shinhotek | Laser and Optical Solution Provider",
  seoDescriptionKo:
    "신호텍은 산업용 레이저, 레이저 스캐너, 레이저 계측, 광학 솔루션, 코팅 솔루션, 빔 딜리버리 솔루션을 제공합니다.",
  seoDescriptionEn:
    "Shinhotek provides industrial lasers, laser scanners, laser metrology, optical solutions, coating solutions, and beam delivery systems.",
} as const;

export const defaultCompanyContent = {
  id: 1,
  historyTitleKo: "신호텍의 역사",
  historyTitleEn: "History of Shinhotek",
  historyBodyKo: `신호텍은 레이저 공정과 광학 시스템 분야에서 고객의 장비 구성과 생산 환경에 맞는 솔루션을 제공해 왔습니다.

산업용 레이저, 스캐너, 계측 장비, 광학 부품과 맞춤형 시스템을 연결하여 고객이 안정적인 생산 품질을 확보할 수 있도록 지원합니다.

본 영역은 관리자 페이지에서 인삿말, 회사 비전, 연혁, 주요 소개 문구를 직접 수정할 수 있도록 구성됩니다.`,
  historyBodyEn: `Shinhotek has provided laser process and optical system solutions tailored to customer equipment and production environments.

By connecting industrial lasers, scanners, metrology equipment, optical components, and custom systems, Shinhotek supports stable production quality.

This section is managed through the admin page, including greetings, vision, history, and corporate introduction text.`,
  brandTitleKo: "SHINHOTEK",
  brandTitleEn: "SHINHOTEK",
  brandLeadKo: "정밀 광학 솔루션 파트너",
  brandLeadEn: "Precision optical solution partner",
  visionTitleKo: "비전",
  visionTitleEn: "Vision",
  visionBodyKo: "고객의 레이저 공정 안정성과 생산 품질을 높이는 신뢰 가능한 광학 솔루션을 제공합니다.",
  visionBodyEn: "Deliver reliable optical solutions that improve laser process stability and production quality.",
  goalTitleKo: "목표",
  goalTitleEn: "Goal",
  goalBodyKo: "제품 공급, 기술 검토, 자료 관리, 사후 지원까지 연결되는 운영 가능한 B2B 솔루션 체계를 구축합니다.",
  goalBodyEn: "Build an operational B2B solution flow from product supply and technical review to documentation and after-sales support.",
} as const;

export const defaultApplications = [
  {
    slug: "semiconductor",
    titleKo: "반도체",
    titleEn: "Semiconductor",
    summaryKo:
      "반도체 제조 공정에서는 레이저 빔 품질, 광학 정렬, 공정 반복성이 수율과 직결됩니다. 신호텍은 레이저, 스캐너, 계측 장비와 광학 부품을 조합해 정밀 공정에 맞는 솔루션을 제공합니다.",
    summaryEn:
      "In semiconductor manufacturing, beam quality, optical alignment, and process repeatability are directly tied to yield. Shinhotek combines lasers, scanners, metrology systems, and optical components for precision processes.",
    imageUrl: "/applications/semiconductor.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "display",
    titleKo: "디스플레이",
    titleEn: "Display",
    summaryKo:
      "OLED, Micro LED, UTG, LLO 등 디스플레이 공정에는 정밀한 레이저 제어와 안정적인 광학 구성이 필요합니다. 공정 목적에 맞는 제품 선정과 기술 검토를 지원합니다.",
    summaryEn:
      "Display processes such as OLED, Micro LED, UTG, and LLO require precise laser control and stable optical configuration. Shinhotek supports product selection and technical review for each process goal.",
    imageUrl: "/applications/oled-display.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "secondary-battery",
    titleKo: "이차전지",
    titleEn: "Secondary Battery",
    summaryKo:
      "이차전지 제조 공정의 레이저 가공과 검사에는 안정적인 출력, 반복 정밀도, 공정 안전성이 중요합니다. 신호텍은 레이저 및 광학 시스템 구성에 필요한 제품군을 제공합니다.",
    summaryEn:
      "Laser processing and inspection in secondary-battery manufacturing require stable output, repeatable precision, and process safety. Shinhotek provides product groups for laser and optical system configuration.",
    imageUrl: "/applications/automotive-lidar.png",
    bulletsKo: [],
    bulletsEn: [],
  },
  {
    slug: "medical-bio",
    titleKo: "의료·바이오",
    titleEn: "Medical & Bio",
    summaryKo:
      "의료 및 바이오 광학 시스템에는 정밀한 광원 제어와 신뢰 가능한 광학 부품 구성이 필요합니다. 관련 제품 정보와 적용 가능성을 관리자에서 지속적으로 확장할 수 있습니다.",
    summaryEn:
      "Medical and bio optical systems require precise light-source control and reliable optical components. Product information and application coverage can be expanded continuously through the admin page.",
    imageUrl: "/applications/medical-bio.png",
    bulletsKo: [],
    bulletsEn: [],
  },
] as const;

export const defaultProducts = [
  {
    slug: "laser",
    nameKo: "Laser",
    nameEn: "Laser",
    summaryKo: "Nanosecond, Picosecond/Femtosecond, CO2, Excimer, Diode 등 산업용 레이저 소스 제품군을 관리합니다.",
    summaryEn: "Manage industrial laser sources including nanosecond, picosecond/femtosecond, CO2, excimer, and diode lasers.",
    imageUrl: "/hero-main-laser.png",
  },
  {
    slug: "laser-scanner",
    nameKo: "Laser Scanner",
    nameEn: "Laser Scanner",
    summaryKo: "2D/3D 스캔 시스템, 폴리곤 스캐너, 드릴링 헤드, 제어 보드와 소프트웨어 제품군을 관리합니다.",
    summaryEn: "Manage 2D/3D scan systems, polygon scanners, drilling heads, control boards, and scanner software.",
    imageUrl: "/subpage-products-laser-bg.png",
  },
  {
    slug: "laser-metrology",
    nameKo: "Laser Metrology",
    nameEn: "Laser Metrology",
    summaryKo: "Power/Energy Meter, 센서, 인터페이스, 디스플레이 모니터 등 레이저 계측 제품군을 관리합니다.",
    summaryEn: "Manage laser metrology products such as power/energy meters, sensors, interfaces, and display monitors.",
    imageUrl: "/hero-lab-bg.avif",
  },
  {
    slug: "optical-solution",
    nameKo: "Optical Solution",
    nameEn: "Optical Solution",
    summaryKo: "광학 설계, 기구 설계, 소프트웨어 연동, 맞춤형 광학 어셈블리와 공정별 솔루션을 관리합니다.",
    summaryEn: "Manage optical design, mechanical design, software integration, custom optical assemblies, and process-specific solutions.",
    imageUrl: "/subpage-software-bg.png",
  },
  {
    slug: "coating-solution",
    nameKo: "Coating Solution",
    nameEn: "Coating Solution",
    summaryKo: "고출력 레이저 공정과 특수 광학 부품에 필요한 코팅 솔루션과 관련 제품군을 관리합니다.",
    summaryEn: "Manage coating solutions and related products for high-power laser processes and specialty optical components.",
    imageUrl: "/story-origin-lab.png",
  },
  {
    slug: "beam-delivery",
    nameKo: "Beam Delivery",
    nameEn: "Beam Delivery",
    summaryKo: "공정 장비에 필요한 빔 전달 모듈, 광학 헤드, 경로 구성과 어셈블리 제품군을 관리합니다.",
    summaryEn: "Manage beam delivery modules, optical heads, path configuration, and assemblies for process equipment.",
    imageUrl: "/subpage-products-laser-bg.png",
  },
].map((item, index) => ({
  slug: item.slug,
  displayOrder: index + 1,
  nameKo: item.nameKo,
  nameEn: item.nameEn,
  heroEyebrowKo: null,
  heroEyebrowEn: null,
  heroTitleKo: null,
  heroTitleEn: null,
  heroLeadKo: null,
  heroLeadEn: null,
  heroBgImageUrl: null,
  heroBgOpacity: 0.9,
  summaryKo: item.summaryKo,
  summaryEn: item.summaryEn,
  contentKo: `${item.nameKo} 제품군은 관리자 페이지에서 제품 설명, 이미지, 스펙, 자료 파일을 직접 채워 운영할 수 있습니다.`,
  contentEn: `${item.nameEn} content can be managed from the admin page, including descriptions, images, specifications, and downloadable files.`,
  featuresKo: ["제품 정보 직접 관리", "이미지 및 자료 파일 등록", "국문/영문 콘텐츠 분리"],
  featuresEn: ["Direct product content management", "Image and document upload", "Separated Korean and English content"],
  applicationsKo: ["정밀 레이저 공정", "산업용 광학 시스템", "고객 맞춤형 장비 구성"],
  applicationsEn: ["Precision laser process", "Industrial optical system", "Customer-specific equipment configuration"],
  specsKo: [
    { label: "운영 방식", value: "관리자 직접 입력" },
    { label: "자료", value: "Datasheet / 카탈로그 / 도면 등록 가능" },
  ],
  specsEn: [
    { label: "Operation", value: "Managed directly from admin" },
    { label: "Documents", value: "Datasheet / catalog / drawing upload available" },
  ],
  imageUrl: item.imageUrl,
  seoTitleKo: `${item.nameKo} | 신호텍`,
  seoTitleEn: `${item.nameEn} | Shinhotek`,
  seoDescriptionKo: `${item.nameKo} 제품군 안내 페이지입니다.`,
  seoDescriptionEn: `Product category page for ${item.nameEn}.`,
})) as Array<{
  slug: string;
  displayOrder: number;
  nameKo: string;
  nameEn: string;
  heroEyebrowKo: string | null;
  heroEyebrowEn: string | null;
  heroTitleKo: string | null;
  heroTitleEn: string | null;
  heroLeadKo: string | null;
  heroLeadEn: string | null;
  heroBgImageUrl: string | null;
  heroBgOpacity: number;
  summaryKo: string;
  summaryEn: string;
  contentKo: string;
  contentEn: string;
  featuresKo: string[];
  featuresEn: string[];
  applicationsKo: string[];
  applicationsEn: string[];
  specsKo: Array<{ label: string; value: string }>;
  specsEn: Array<{ label: string; value: string }>;
  imageUrl: string | null;
  seoTitleKo: string;
  seoTitleEn: string;
  seoDescriptionKo: string;
  seoDescriptionEn: string;
}>;

export const defaultResources = [
  {
    slug: "company-profile",
    displayIndex: 1,
    titleKo: "회사 소개서",
    titleEn: "Company Profile",
    excerptKo: "신호텍 회사 소개 자료 예시입니다.",
    excerptEn: "Sample Shinhotek company introduction resource.",
    bodyKo: "자료실 상세 페이지는 문서 설명, 첨부 파일 링크, 게시 시점을 제공하도록 구현했습니다.",
    bodyEn: "The resource detail page provides document descriptions, file links, and publish timestamps.",
    fileUrl: null,
  },
  {
    slug: "patent-10-2932994-laser-optical-system",
    displayIndex: 2,
    titleKo: "[특허증] 10-2932994 레이저 광학 시스템",
    titleEn: "[Patent] 10-2932994 Laser Optical System",
    excerptKo: "레이저 광학 시스템 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser optical system.",
    bodyKo: "SHINHOTEK의 광학 설계 및 계측 시스템 역량과 연계된 레이저 광학 시스템 특허 문서입니다.",
    bodyEn: "This patent document covers a laser optical system related to the optical design and metrology capabilities behind SHINHOTEK.",
    fileUrl: "/uploads/resources/patent-10-2932994-laser-optical-system.pdf",
  },
  {
    slug: "patent-10-2946121-laser-beam-shaping-device",
    displayIndex: 3,
    titleKo: "[특허증] 10-2946121 레이저 빔 성형장치",
    titleEn: "[Patent] 10-2946121 Laser Beam Shaping Device",
    excerptKo: "레이저 빔 성형장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser beam shaping device.",
    bodyKo: "빔 프로파일 제어와 공정 정밀도 향상을 위한 레이저 빔 성형장치 특허 문서입니다.",
    bodyEn: "This patent document covers a laser beam shaping device for beam profile control and improved process precision.",
    fileUrl: "/uploads/resources/patent-10-2946121-laser-beam-shaping-device.pdf",
  },
  {
    slug: "patent-10-2948666-laser-optical-device",
    displayIndex: 4,
    titleKo: "[특허증] 10-2948666 레이저 광학장치",
    titleEn: "[Patent] 10-2948666 Laser Optical Device",
    excerptKo: "레이저 광학장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser optical device.",
    bodyKo: "광학 경로 구성과 계측 안정성 확보를 위한 레이저 광학장치 특허 문서입니다.",
    bodyEn: "This patent document covers a laser optical device for optical path configuration and measurement stability.",
    fileUrl: "/uploads/resources/patent-10-2948666-laser-optical-device.pdf",
  },
  {
    slug: "cert-10-2077732-10-2243189",
    displayIndex: 5,
    titleKo: "[기술인증증빙] 특허증 10-2077732호 10-2243189호",
    titleEn: "[Technical Certification] Patent 10-2077732 and 10-2243189",
    excerptKo: "관련 특허 인증 증빙 문서입니다.",
    excerptEn: "Supporting certification document for related patents.",
    bodyKo: "레이저 가공장치 및 진공빔 프로파일링장치 특허와 연계된 기술 인증 증빙 문서입니다.",
    bodyEn: "This certification document supports the related patents for the laser processing device and vacuum beam profiling device.",
    fileUrl: "/uploads/resources/cert-10-2077732-10-2243189.pdf",
  },
  {
    slug: "patent-10-2077732-laser-processing-device",
    displayIndex: 6,
    titleKo: "[특허증] 10-2077732호 레이저가공장치",
    titleEn: "[Patent] 10-2077732 Laser Processing Device",
    excerptKo: "레이저가공장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a laser processing device.",
    bodyKo: "레이저 기반 가공 공정과 장비 구현 구조를 다루는 레이저가공장치 특허 문서입니다.",
    bodyEn: "This patent document covers a laser processing device for laser-based manufacturing process and equipment implementation.",
    fileUrl: "/uploads/resources/patent-10-2077732-laser-processing-device.pdf",
  },
  {
    slug: "patent-10-2243189-vacuum-beam-profiling-device",
    displayIndex: 7,
    titleKo: "[특허증] 10-2243189호 진공빔프로파일링장치",
    titleEn: "[Patent] 10-2243189 Vacuum Beam Profiling Device",
    excerptKo: "진공빔프로파일링장치 관련 특허 문서입니다.",
    excerptEn: "Patent document for a vacuum beam profiling device.",
    bodyKo: "진공 환경에서의 빔 특성 측정과 프로파일 분석을 위한 특허 문서입니다.",
    bodyEn: "This patent document covers beam characteristic measurement and profile analysis in a vacuum environment.",
    fileUrl: "/uploads/resources/patent-10-2243189-vacuum-beam-profiling-device.pdf",
  },
] as const;
export const defaultDistributorSettings = {
  id: 1,
  mapImageUrl: "/contact/distributor-world-map.png",
};

export const defaultDistributorRegions = [
  {
    slug: "asia",
    nameKo: "Asia",
    nameEn: "Asia",
    descriptionKo: "SHINHOTEK 아시아 지역 대리점입니다.",
    descriptionEn: "SHINHOTEK distributor partners in Asia.",
    sortOrder: 1,
    enabled: true,
    partners: [
      {
        countryKo: "CHINA",
        countryEn: "CHINA",
        companyKo: "PulsePower",
        companyEn: "PulsePower",
        legalName: "脉动科技有限公司",
        addressKo: "北京市海淀区中关村东路84-8号\n84-8 Zhongguancun East Road, Haidian District, Beijing, P.R. China 100190",
        addressEn: "84-8 Zhongguancun East Road, Haidian District, Beijing, P.R. China 100190",
        telephone: "+86 10 6256 5117",
        email: "info@pulsepower.cn",
        website: "https://www.pulsepower.cn",
        logoUrl: "/contact/distributor-pulse.png",
        sortOrder: 1,
        published: true,
      },
    ],
  },
  { slug: "america", nameKo: "America", nameEn: "America", descriptionKo: "", descriptionEn: "", sortOrder: 2, enabled: false, partners: [] },
  { slug: "europe", nameKo: "Europe", nameEn: "Europe", descriptionKo: "", descriptionEn: "", sortOrder: 3, enabled: false, partners: [] },
  { slug: "middle-east", nameKo: "Middle East", nameEn: "Middle East", descriptionKo: "", descriptionEn: "", sortOrder: 4, enabled: false, partners: [] },
];

export const defaultPageHeroConfigs = [
  {
    pageKey: "applications",
    eyebrowKo: "APPLICATION",
    eyebrowEn: "APPLICATION",
    titleKo: "응용분야",
    titleEn: "Application",
    descriptionKo: "산업별 공정 환경에 맞는 광학 측정 및 검사 적용 분야를 소개합니다.",
    descriptionEn: "Explore optical measurement and inspection use cases across industrial workflows.",
    backgroundImageUrl: "/subpage-applications-bg.png",
    backgroundOpacity: 0.6,
  },
  {
    pageKey: "products",
    eyebrowKo: "제품",
    eyebrowEn: "Product",
    titleKo: "제품",
    titleEn: "Product",
    descriptionKo: "공정 조건과 검사 목적에 맞는 신호텍 제품군을 확인하실 수 있습니다.",
    descriptionEn: "Explore the Shinhotek product lineup for different inspection goals and process conditions.",
    backgroundImageUrl: "/subpage-products-laser-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-quote",
    eyebrowKo: "문의하기",
    eyebrowEn: "Contact",
    titleKo: "문의하기",
    titleEn: "Contact",
    descriptionKo: "적용 목적과 요청 내용을 남겨주시면 검토 후 적합한 담당자가 안내드립니다.",
    descriptionEn: "Share your application and request, and the right team will follow up with you.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-distributors",
    eyebrowKo: "대리점소개",
    eyebrowEn: "Distributors",
    titleKo: "대리점소개",
    titleEn: "Distributor Information",
    descriptionKo: "Shinhotek 제품의 국내외 공급 및 협력 파트너 구성을 안내드립니다.",
    descriptionEn: "Find information about Shinhotek distribution channels and partner expansion.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-directions",
    eyebrowKo: "찾아오시는 길",
    eyebrowEn: "Directions",
    titleKo: "찾아오시는 길",
    titleEn: "Directions",
    descriptionKo: "신호텍 방문을 위한 위치와 연락처를 안내드립니다.",
    descriptionEn: "Find our office location and contact information for your visit.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "contact-resources",
    eyebrowKo: "자료실",
    eyebrowEn: "Resources",
    titleKo: "자료실",
    titleEn: "Resource Library",
    descriptionKo: "자료실 게시물과 다운로드 자료를 제공합니다.",
    descriptionEn: "Browse resource posts and downloadable reference materials.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.9,
  },
  {
    pageKey: "legal-privacy",
    eyebrowKo: "Legal",
    eyebrowEn: "Legal",
    titleKo: "개인정보처리방침",
    titleEn: "Privacy Policy",
    descriptionKo: "Shinhotek 웹사이트 이용 과정에서 수집되는 기본 정보와 처리 기준을 안내합니다.",
    descriptionEn: "This page explains how Shinhotek handles basic information collected through the website.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.6,
  },
  {
    pageKey: "legal-terms",
    eyebrowKo: "Legal",
    eyebrowEn: "Legal",
    titleKo: "이용약관",
    titleEn: "Terms of Service",
    descriptionKo: "Shinhotek 웹사이트 이용에 관한 기본 조건과 책임 범위를 안내합니다.",
    descriptionEn: "This page outlines the basic terms and responsibilities for using the Shinhotek website.",
    backgroundImageUrl: "/subpage-contact-bg.png",
    backgroundOpacity: 0.6,
  },
] as const;

