import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { SubpageHero } from "@/components/subpage-hero";
import { getResourceBySlug } from "@/lib/content";
import { resourceBodyToHtml } from "@/lib/resource-rich-text";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {};
  }

  const title = locale === "ko" ? resource.titleKo : resource.titleEn;
  const description = locale === "ko" ? resource.excerptKo : resource.excerptEn;

  return buildPageMetadata({
    locale,
    path: `/contact/resources/${slug}`,
    title,
    description:
      description?.trim() ||
      (locale === "ko"
        ? "SHINHOTEK 자료실의 제품 자료, 데이터시트, 다운로드 정보를 확인하세요."
        : "Browse SHINHOTEK product resources, datasheets, and download information."),
    keywords: [title, "SHINHOTEK resource", "자료실"],
    image: "/subpage-contact-bg.png",
    type: "article",
    category: "Resource",
  });
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const resource = await getResourceBySlug(slug);
  const isKo = locale === "ko";

  if (!resource || !resource.published) {
    notFound();
  }

  const title = isKo ? resource.titleKo : resource.titleEn;
  const excerpt = isKo ? resource.excerptKo : resource.excerptEn;
  const body = isKo ? resource.bodyKo : resource.bodyEn;
  const bodyHtml = resourceBodyToHtml(body);
  const createdAtLabel = new Date(resource.createdAt).toLocaleDateString(isKo ? "ko-KR" : "en-US");
  const authorLabel = isKo ? "SHINHOTEK" : "SHINHOTEK";
  const attachmentName = resource.fileUrl
    ? decodeURIComponent(resource.fileUrl.split("/").pop() ?? resource.fileUrl)
    : null;
  const contentImageAlt =
    (isKo ? resource.contentImageAltKo : resource.contentImageAltEn) ||
    (isKo ? resource.contentImageAltEn : resource.contentImageAltKo) ||
    title;
  const contentImageWidth = resource.contentImageWidth ?? 720;
  const contentImagePlacement = resource.contentImagePlacement === "before" ? "before" : "after";
  const contentImage = resource.contentImageUrl ? (
    <figure
      className="resourceContentImageFigure"
      style={{ "--resource-content-image-width": `${contentImageWidth}px` } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={resource.contentImageUrl} alt={contentImageAlt} className="resourceContentImage" />
    </figure>
  ) : null;

  return (
    <div className="resourcesPage">
      <SubpageHero
        eyebrow={isKo ? "자료 상세" : "Resource Detail"}
        title={isKo ? "자료실" : "Resources"}
        description={excerpt}
        tone="resources"
        backgroundImageUrl="/subpage-contact-bg.png"
        lightText
      />
      {/* <ContactSubnav locale={locale} activeHref="/contact/resources" /> */}
      <div className="container subpageContent">
        <div className="resourceDetailLayout pageBody">
          <section className="resourceDetailSummary">
            <div className="resourceDetailTitleBlock">
              <strong>{isKo ? "제목" : "Title"}</strong>
              <h2 className="resourceDetailTitle">{title}</h2>
            </div>
            <div className="resourceDetailMetaLine">
              <div className="resourceMetaInline">
                <strong>{isKo ? "작성자" : "Author"}</strong>
                <span>{authorLabel}</span>
              </div>
              <div className="resourceMetaInline">
                <strong>{isKo ? "작성일시" : "Published"}</strong>
                <span>{createdAtLabel}</span>
              </div>
            </div>
          </section>

          <section className="resourceDetailContentCard resourceDetailContentMain">
            <div className="resourceDetailSectionHead">
              <strong>{isKo ? "내용" : "Content"}</strong>
            </div>
            <div className="resourceDetailBody">
              {contentImagePlacement === "before" ? contentImage : null}
              <div className="resourceRichBody" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              {contentImagePlacement === "after" ? contentImage : null}
            </div>
          </section>

          <section className="resourceDetailContentCard">
            <div className="resourceDetailSectionHead">
              <strong>{isKo ? "첨부파일" : "Attachment"}</strong>
            </div>
            <div className="resourceAttachmentBox">
              {resource.fileUrl ? (
                <>
                  <strong className="resourceAttachmentName">{attachmentName}</strong>
                  <a href={resource.fileUrl} target="_blank" rel="noreferrer" className="button secondary">
                    {isKo ? "파일 다운로드" : "Download File"}
                  </a>
                </>
              ) : (
                <span>{isKo ? "첨부된 파일이 없습니다." : "No file attached."}</span>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
