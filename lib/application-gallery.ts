export type ApplicationGalleryAsset = {
  src: string;
  alt: string;
};

export type ApplicationGalleryItem = {
  title: string;
  titleKo?: string;
  description: string;
  descriptionKo?: string;
  images: ApplicationGalleryAsset[];
};

export const applicationGalleryImages: Record<string, ApplicationGalleryItem[]> = {
  semiconductor: [
    {
      title: "Laser Soldering",
      titleKo: "레이저 솔더링 (Laser Soldering)",
      description: "Validating the raw laser mode and output stability prior to fiber coupling for high-precision soldering.",
      descriptionKo: "고정밀 솔더링을 위한 광섬유 결합(Fiber coupling) 전, 원본 레이저 빔 모드와 출력 안정성을 검증합니다.",
      images: [
        { src: "/applications/gallery/semiconductor/laser-soldering.jpg", alt: "Semiconductor laser soldering" },
        { src: "/applications/gallery/semiconductor/optics-measurement.png", alt: "Laser soldering beam measurement" },
      ],
    },
    {
      title: "Wafer Annealing",
      titleKo: "웨이퍼 어닐링 (Wafer Annealing)",
      description: "Eliminates hot spots and cold spots, reducing thermal defects on the wafer and ensuring uniform chip quality.",
      descriptionKo: "핫 스팟(Hot spot)과 콜드 스팟(Cold spot)을 제거하여 웨이퍼의 열적 결함을 최소화하고 균일한 칩 품질을 보장합니다.",
      images: [
        { src: "/applications/gallery/semiconductor/wafer-process.jpg", alt: "Wafer annealing process" },
        { src: "/applications/gallery/semiconductor/cmos-measurement.png", alt: "Wafer annealing beam analysis" },
      ],
    },
    {
      title: "TGV",
      titleKo: "TGV (Through Glass Via)",
      description: "Tuning focal precision for localized glass modification to create flawless micro-vias in next-generation substrates.",
      descriptionKo: "차세대 기판에 결점 없는 마이크로 비아(Micro-via)를 형성할 수 있도록, 국부적 유리 개질(Modification)을 위한 초점 정밀도를 미세 조정합니다.",
      images: [
        { src: "/applications/gallery/semiconductor/tgv-process.png", alt: "TGV process" },
        { src: "/applications/gallery/semiconductor/beam-profile.png", alt: "TGV beam profile" },
      ],
    },
    {
      title: "Wafer Grooving & Dicing",
      titleKo: "웨이퍼 그루빙 및 다이싱 (Wafer Grooving & Dicing)",
      description: "Ensuring perfect beam symmetry and focal spot size to minimize chipping during semiconductor wafer separation.",
      descriptionKo: "반도체 웨이퍼 절단 시 치핑(Chipping) 현상을 최소화하기 위해 완벽한 빔 대칭성과 정확한 초점 크기(Focal spot size)를 보장합니다.",
      images: [
        { src: "/applications/gallery/semiconductor/stealth-dicing.png", alt: "Wafer grooving and dicing" },
        { src: "/applications/gallery/semiconductor/micro-processing.png", alt: "Wafer micro processing" },
      ],
    },
  ],
  "automotive-lidar": [
    {
      title: "VCSEL for Lidar",
      titleKo: "라이다용 VCSEL (VCSEL for LiDAR)",
      description: "Evaluating the radiation pattern and overall beam quality of diffused light sources for 3D sensing and autonomous driving.",
      descriptionKo: "3D 센싱 및 자율주행을 위한 확산 광원(Diffused light source)의 방사 패턴과 전반적인 빔 품질을 평가합니다.",
      images: [
        { src: "/applications/gallery/automotive-lidar/vcsel-1.png", alt: "VCSEL beam pattern" },
        { src: "/applications/gallery/automotive-lidar/vcsel-2.jpg", alt: "VCSEL inspection setup" },
      ],
    },
  ],
  "oled-display": [
    {
      title: "High-Speed Beam Splitting",
      titleKo: "고속 빔 분할 (High-Speed Beam Splitting)",
      description: "Verifying the symmetry and quality of the raw laser beam before splitting for simultaneous high-speed glass cutting.",
      descriptionKo: "고속 동시 유리 절단 공정을 위한 빔 분할 전, 원본 레이저 빔의 대칭성과 품질을 정밀하게 검증합니다.",
      images: [
        { src: "/applications/gallery/oled-display/high-speed-beam-splitting-1.jpg", alt: "High-speed beam splitting process" },
        { src: "/applications/gallery/oled-display/high-speed-beam-splitting-2.jpg", alt: "High-speed beam splitting beam result" },
      ],
    },
    {
      title: "Laser Hole Drilling",
      titleKo: "레이저 홀 드릴링 (Laser Hole Drilling)",
      description: "A high-precision, non-contact laser machining solution utilizing focused beams to create highly accurate micro-holes across various materials.",
      descriptionKo: "집속 빔(Focused beam)을 활용하여 다양한 소재에 초정밀 마이크로 홀을 가공하는 비접촉식 고정밀 레이저 가공 솔루션입니다.",
      images: [
        { src: "/applications/gallery/oled-display/laser-hole-drilling-1.png", alt: "Laser hole drilling process" },
        { src: "/applications/gallery/oled-display/laser-hole-drilling-2.png", alt: "Laser hole drilling result" },
      ],
    },
    {
      title: "Laser Lift-Off",
      titleKo: "레이저 리프트 오프 (Laser Lift-Off)",
      description: "An efficient DPSS laser system that reliably separates flexible display panels from carrier glass while minimizing maintenance costs.",
      descriptionKo: "유지보수 비용을 최소화하면서 캐리어 글라스(Carrier glass)로부터 플렉시블 디스플레이 패널을 안정적으로 분리하는 고효율 DPSS 레이저 시스템입니다.",
      images: [
        { src: "/applications/gallery/oled-display/laser-lift-off-1.jpg", alt: "Laser lift-off process" },
        { src: "/applications/gallery/oled-display/laser-lift-off-2.png", alt: "Laser lift-off beam result" },
      ],
    },
    {
      title: "Micro LED",
      titleKo: "마이크로 LED (Micro LED)",
      description: "Verifying the energy profile of large surface light sources for the flawless mass transfer of micro-LED chips.",
      descriptionKo: "마이크로 LED 칩의 결함 없는 대량 전사(Mass transfer)를 위해 대면적 광원의 에너지 프로파일을 정밀하게 검증합니다.",
      images: [
        { src: "/applications/gallery/oled-display/micro-led-1.jpg", alt: "Micro LED process" },
        { src: "/applications/gallery/oled-display/micro-led-2.png", alt: "Micro LED beam measurement" },
      ],
    },
    {
      title: "UTG Cutting",
      titleKo: "UTG 커팅 (UTG Cutting)",
      description: "Measuring micro-scale focal spot size and shape to prevent micro-cracks in ultra-thin glass processing.",
      descriptionKo: "초박막 유리(Ultra-Thin Glass) 가공 시 미세 크랙(Micro-crack) 발생을 방지하기 위해 마이크로 단위의 초점 크기 및 형상을 측정합니다.",
      images: [
        { src: "/applications/gallery/oled-display/utg-cutting-1.png", alt: "UTG cutting process" },
        { src: "/applications/gallery/oled-display/utg-cutting-2.png", alt: "UTG cutting beam result" },
      ],
    },
  ],
  aoi: [
    {
      title: "Laser Source QA & R&D",
      titleKo: "레이저 소스 품질보증 및 연구개발 (Laser Source QA & R&D)",
      description: "Assessing the fundamental beam specifications and energy distribution of laser oscillators for R&D and quality assurance.",
      descriptionKo: "연구개발(R&D) 및 품질 보증(QA)을 목적으로 레이저 발진기(Oscillator)의 핵심 빔 사양 및 에너지 분포를 평가합니다.",
      images: [
        { src: "/applications/gallery/aoi/laser-source-qa-rd-1.jpg", alt: "Laser source QA and R&D setup" },
        { src: "/applications/gallery/aoi/laser-source-qa-rd-2.jpg", alt: "Laser source QA beam analysis" },
      ],
    },
    {
      title: "Initial Laser Alignment",
      titleKo: "초기 레이저 정렬 (Initial Laser Alignment)",
      description: "Establishing the absolute reference axis and straightness of the raw beam for accurate optical system setup.",
      descriptionKo: "정확한 광학 시스템 셋업을 위해 원본 빔(Raw beam)의 절대 기준축과 진직도(Straightness)를 확립합니다.",
      images: [
        { src: "/applications/gallery/aoi/initial-laser-alignment-1.jpg", alt: "Initial laser alignment setup" },
        { src: "/applications/gallery/aoi/initial-laser-alignment-2.png", alt: "Initial laser alignment beam result" },
      ],
    },
  ],
};
