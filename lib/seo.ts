import type { Metadata } from "next";

import { defaultLocale, locales, type Locale, siteUrl } from "@/lib/site";

type PageMetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  category?: string;
};

export const seoKeywords = [
  "Shinhotek",
  "신호텍",
  "laser",
  "industrial laser",
  "laser scanner",
  "laser metrology",
  "beam shaping",
  "optical components",
  "optical solution",
  "광학기기",
  "레이저",
  "레이저 스캐너",
  "레이저 계측",
  "빔 쉐이핑",
];

export function localizePath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function localeAlternates(path = "") {
  return {
    ko: absoluteUrl(localizePath("ko", path)),
    en: absoluteUrl(localizePath("en", path)),
    "x-default": absoluteUrl(localizePath(defaultLocale, path)),
  };
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords = [],
  image = "/opengraph-image",
  type = "website",
  category = "Industrial laser and optical solutions",
}: PageMetadataInput): Metadata {
  const localizedPath = localizePath(locale, path);
  const url = absoluteUrl(localizedPath);
  const imageUrl = absoluteUrl(image);

  return {
    applicationName: "Shinhotek",
    title,
    description,
    keywords: Array.from(new Set([...seoKeywords, ...keywords])),
    authors: [{ name: "Shinhotek" }],
    creator: "Shinhotek",
    publisher: "Shinhotek",
    category,
    classification: "Industrial laser and optical solution provider",
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: url,
      languages: localeAlternates(path),
    },
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: "Shinhotek",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Shinhotek laser and optical solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildStructuredData(locale: Locale) {
  const homeUrl = absoluteUrl(localizePath(locale));
  const logoUrl = absoluteUrl("/shinhotek-logo.svg");
  const address = {
    "@type": "PostalAddress",
    streetAddress: "1306 Daerung Techno Town-18, 19 Gasan digital 1-ro",
    addressLocality: "Geumcheon-gu",
    addressRegion: "Seoul",
    postalCode: "08594",
    addressCountry: "KR",
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Shinhotek",
      alternateName: ["신호텍", "ShinHoTek"],
      url: siteUrl,
      logo: logoUrl,
      email: "sales@shinhotek.com",
      telephone: "+82-2-852-0533",
      address,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+82-2-852-0533",
          contactType: "sales",
          email: "sales@shinhotek.com",
          areaServed: ["KR", "Global"],
          availableLanguage: ["Korean", "English"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Shinhotek",
      image: logoUrl,
      url: homeUrl,
      email: "sales@shinhotek.com",
      telephone: "+82-2-852-0533",
      address,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: locale === "ko" ? "신호텍" : "Shinhotek",
      alternateName: ["ShinHoTek", "신호텍"],
      url: siteUrl,
      inLanguage: locales.map((item) => (item === "ko" ? "ko-KR" : "en-US")),
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ];
}
