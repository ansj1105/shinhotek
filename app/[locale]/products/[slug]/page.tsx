import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SubpageHero } from "@/components/subpage-hero";
import { getProductBySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";

type ProductDocumentView = {
  id?: number;
  kind: "DATASHEET" | "DRAWING" | string;
  titleKo: string;
  titleEn: string;
  fileName?: string | null;
  fileUrl: string;
};

function textArrayValue(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

function specRowsValue(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const row = item as { label?: unknown; value?: unknown };
      const label = typeof row.label === "string" ? row.label.trim() : "";
      const rowValue = typeof row.value === "string" ? row.value.trim() : "";

      return label && rowValue ? { label, value: rowValue } : null;
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));
}

function splitParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function renderLines(paragraph: string) {
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
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.published) {
    return buildPageMetadata({
      locale,
      path: `/products/${slug}`,
      title: locale === "ko" ? "제품 | 신호텍" : "Product | Shinhotek",
      description: locale === "ko" ? "신호텍 제품 상세 페이지입니다." : "Shinhotek product detail page.",
    });
  }

  const title = locale === "ko" ? product.seoTitleKo || `${product.nameKo} | 신호텍` : product.seoTitleEn || `${product.nameEn} | Shinhotek`;
  const description = locale === "ko" ? product.seoDescriptionKo || product.summaryKo : product.seoDescriptionEn || product.summaryEn;
  const image = product.imageUrl || product.heroBgImageUrl || "/product-placeholder.svg";

  return buildPageMetadata({
    locale,
    path: `/products/${slug}`,
    title,
    description,
    keywords: [product.nameKo, product.nameEn, "Shinhotek product", "industrial laser", "optical solution"],
    image,
    type: "article",
    category: "Product detail",
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.published) {
    notFound();
  }

  const localizedProductName = locale === "ko" ? product.nameKo : product.nameEn;
  const localizedSummary = locale === "ko" ? product.summaryKo : product.summaryEn;
  const localizedContent = locale === "ko" ? product.contentKo : product.contentEn;
  const features = textArrayValue(locale === "ko" ? product.featuresKo : product.featuresEn);
  const applications = textArrayValue(locale === "ko" ? product.applicationsKo : product.applicationsEn);
  const specs = specRowsValue(locale === "ko" ? product.specsKo : product.specsEn);
  const documents = "documents" in product && Array.isArray(product.documents) ? (product.documents as ProductDocumentView[]) : [];
  const heroTitle = locale === "ko" ? product.heroTitleKo || localizedProductName : product.heroTitleEn || localizedProductName;
  const heroLead = locale === "ko" ? product.heroLeadKo || localizedSummary : product.heroLeadEn || localizedSummary;
  const heroEyebrow = locale === "ko" ? product.heroEyebrowKo || "Product" : product.heroEyebrowEn || "Product";
  const heroBgImage = product.heroBgImageUrl || "/subpage-products-laser-bg.png";
  const imageUrl = product.imageUrl || "/product-placeholder.svg";

  return (
    <div className="productsPage">
      <SubpageHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroLead}
        tone="products"
        backgroundImageUrl={heroBgImage}
        backgroundOpacity={product.heroBgOpacity ?? 0.9}
      />

      <div className="productDetailHero">
        <div className="container productDetailHeroInner">
          <div className="productDetailCopy">
            <div className="productMetaLine">
              <span>{localizedProductName}</span>
              <strong>{localizedSummary}</strong>
            </div>
            {features.length ? (
              <div className="productDetailFeatureBlock">
                <div className="productDetailFeatureTitle">Feature</div>
                <div className="productDetailFeatureList">
                  {features.map((feature, index) => (
                    <div key={feature} className="productDetailFeatureItem">
                      {`${index + 1}. ${feature}`}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="productDetailVisual">
            <div className="productDetailVisualPanel">
              <Image
                src={imageUrl}
                alt={`${localizedProductName} image`}
                fill
                sizes="(max-width: 960px) 100vw, 44vw"
                className="productDetailVisualImage detailVisual-generic"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container subpageContent">
        <section className="productSection productCmsDetailSection">
          <div className="productCmsDetailGrid">
            <div className="productCmsDetailCopy">
              <h2>{localizedProductName}</h2>
              <div className="productCmsDetailText">
                {splitParagraphs(localizedContent || localizedSummary).map((paragraph, index) => (
                  <p key={`${slug}-content-${index}`}>{renderLines(paragraph)}</p>
                ))}
              </div>
            </div>

            {features.length || applications.length ? (
              <div className="productCmsDetailListPanel">
                {features.length ? (
                  <div className="productCmsDetailList">
                    <h3>Feature</h3>
                    <ul>
                      {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {applications.length ? (
                  <div className="productCmsDetailList">
                    <h3>Application</h3>
                    <ul>
                      {applications.map((application) => (
                        <li key={application}>{application}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          {specs.length ? (
            <div className="productSpecBlock productCmsSpecBlock">
              <table className="productTechTable">
                <tbody>
                  {specs.map((row) => (
                    <tr key={`${row.label}-${row.value}`}>
                      <th>{row.label}</th>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {documents.length ? (
            <div className="productDetailDocuments" aria-label={locale === "ko" ? "제품 자료" : "Product documents"}>
              {documents.map((document) => {
                const title = locale === "ko" ? document.titleKo : document.titleEn;
                const kind = document.kind.toLowerCase();
                return (
                  <a
                    key={`${document.kind}-${title}`}
                    className="productDocumentPreview"
                    href={`/api/products/${slug}/documents/${kind}/download`}
                  >
                    <span className="productDocumentKind">{document.kind}</span>
                    <strong>{title}</strong>
                    <span>{document.fileName || document.fileUrl}</span>
                  </a>
                );
              })}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
