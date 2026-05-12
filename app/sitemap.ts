import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { localeAlternates } from "@/lib/seo";
import { locales, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, resources] = await Promise.all([
    prisma.product.findMany({ where: { published: true } }),
    prisma.resource.findMany({ where: { published: true } }),
  ]);

  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/company", priority: 0.8 },
    { path: "/applications", priority: 0.85 },
    { path: "/products", priority: 0.9 },
    { path: "/contact/quote", priority: 0.75 },
    { path: "/contact/distributors", priority: 0.7 },
    { path: "/contact/directions", priority: 0.75 },
    { path: "/contact/resources", priority: 0.65 },
    { path: "/legal/privacy", priority: 0.25 },
    { path: "/legal/terms", priority: 0.25 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const { path, priority } of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path ? "monthly" : "weekly",
        priority,
        alternates: {
          languages: localeAlternates(path),
        },
      });
    }

    for (const product of products) {
      entries.push({
        url: `${siteUrl}/${locale}/products/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: {
          languages: localeAlternates(`/products/${product.slug}`),
        },
      });
    }

    for (const resource of resources) {
      entries.push({
        url: `${siteUrl}/${locale}/contact/resources/${resource.slug}`,
        lastModified: resource.updatedAt,
        changeFrequency: "monthly",
        priority: 0.55,
        alternates: {
          languages: localeAlternates(`/contact/resources/${resource.slug}`),
        },
      });
    }
  }

  return entries;
}
