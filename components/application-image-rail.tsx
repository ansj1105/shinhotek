"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useEffect, useState } from "react";

import type { ApplicationGalleryItem } from "@/lib/application-gallery";
import type { Locale } from "@/lib/site";

const desktopVisibleCount = 3;
const mobileVisibleCount = 2;

export function ApplicationImageRail({
  images,
  title,
  locale,
}: {
  images: ApplicationGalleryItem[];
  title: string;
  locale: Locale;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(desktopVisibleCount);
  const maxStartIndex = Math.max(0, images.length - visibleCount);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;
  const visibleItems = images.slice(startIndex, startIndex + visibleCount);
  const isKo = locale === "ko";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const updateVisibleCount = () => {
      const nextVisibleCount = media.matches ? mobileVisibleCount : desktopVisibleCount;
      setVisibleCount(nextVisibleCount);
      setStartIndex((index) => Math.min(index, Math.max(0, images.length - nextVisibleCount)));
    };

    updateVisibleCount();
    media.addEventListener("change", updateVisibleCount);

    return () => media.removeEventListener("change", updateVisibleCount);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  function goPrev() {
    setStartIndex((index) => Math.max(0, index - visibleCount));
  }

  function goNext() {
    setStartIndex((index) => Math.min(maxStartIndex, index + visibleCount));
  }

  return (
    <div className="applicationImageRail" aria-label={`${title} application images`}>
      {canGoPrev ? (
        <button
          type="button"
          className="applicationImageRailButton isPrev"
          onClick={goPrev}
          aria-label="Previous application images"
        >
          <span aria-hidden="true">‹</span>
        </button>
      ) : null}

      <div className="applicationImageRailViewport">
        <div className="applicationImageRailTrack">
          {visibleItems.map((item) => (
            <article key={item.title} className="applicationImageRailItem">
              <div className="applicationImageRailCopy">
                <h3 className="applicationImageRailTitle">{isKo ? item.titleKo ?? item.title : item.title}</h3>
                <p className="applicationImageRailDescription">
                  {isKo ? item.descriptionKo ?? item.description : item.description}
                </p>
              </div>
              <div
                className={
                  item.images.length > 1
                    ? "applicationImageRailImageGroup hasMultiple"
                    : "applicationImageRailImageGroup"
                }
              >
                {item.images.map((image, index) => (
                  <Fragment key={image.src}>
                    {index > 0 ? (
                      <span
                        className="applicationImageRailArrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    ) : null}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={420}
                      height={280}
                      sizes="(max-width: 720px) 42vw, (max-width: 1100px) 150px, 180px"
                      className="applicationImageRailImage"
                    />
                  </Fragment>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {canGoNext ? (
        <button
          type="button"
          className="applicationImageRailButton isNext"
          onClick={goNext}
          aria-label="Next application images"
        >
          <span aria-hidden="true">›</span>
        </button>
      ) : null}
    </div>
  );
}
