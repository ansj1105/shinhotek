"use client";

import { useEffect, useState } from "react";

type PatentCardItem = {
  type: string;
  title: string;
  summary: string;
  date: string;
  href?: string;
};

type PatentSectionProps = {
  title: string;
  lead: string;
  moreLabel: string;
  moreHref: string;
  cards: PatentCardItem[];
};

export function PatentSection({
  title,
  lead,
  moreLabel,
  moreHref,
  cards,
}: PatentSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const syncViewport = () => {
      if (window.matchMedia("(max-width: 720px)").matches) {
        setItemsPerPage(1);
        return;
      }

      if (window.matchMedia("(max-width: 1100px)").matches) {
        setItemsPerPage(2);
        return;
      }

      setItemsPerPage(4);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(cards.length / itemsPerPage) - 1);
    setCurrentPage((page) => Math.min(page, maxPage));
  }, [cards.length, itemsPerPage]);

  const pageCount = Math.ceil(cards.length / itemsPerPage);
  const pagedCards = cards.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const renderCard = (item: PatentCardItem, index: number) => {
    const isActive = index === activeIndex;

    return (
      <a
        key={`${item.type}-${item.title}`}
        href={item.href ?? moreHref}
        className={`patentCard ${isActive ? "isAccent" : ""}`}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        onFocus={() => setActiveIndex(index)}
        onBlur={() => setActiveIndex(null)}
      >
        <span className="patentCardType">{item.type}</span>
        <h3 className="patentCardTitle">{item.title}</h3>
        <p className="patentCardSummary">{item.summary}</p>
        <div className="patentCardFoot">
          <span className="patentCardDate">{item.date}</span>
          <span className="patentCardIcon" aria-hidden="true" />
        </div>
      </a>
    );
  };

  return (
    <section className="patentSection">
      <div className="container patentInner">
        <div className="patentHead">
          <div>
            <h2 className="sectionTitle patentTitle">{title}</h2>
            <p className="sectionLead patentLead">{lead}</p>
          </div>
          <a className="patentMoreLink" href={moreHref}>
            {moreLabel}
          </a>
        </div>

        <div
          className={`patentGrid ${itemsPerPage === 1 ? "isSingle" : ""}`}
          style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }}
        >
          {pagedCards.map((item, index) =>
            renderCard(item, currentPage * itemsPerPage + index),
          )}
        </div>
        {pageCount > 1 ? (
          <div className="patentPagination" aria-label="Patent pages">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`patentPageButton ${index === currentPage ? "isActive" : ""}`}
                onClick={() => setCurrentPage(index)}
                aria-pressed={index === currentPage}
                aria-label={`Page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
