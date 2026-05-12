export const locales = ["ko", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const localeLabels: Record<Locale, string> = {
  ko: "KO",
  en: "EN",
};

export const productSlugs = [
  "laser",
  "laser-scanner",
  "laser-metrology",
  "beam-shaping",
  "optics",
  "beam-delivery",
  "optical-solution",
] as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shinhotek.com";
