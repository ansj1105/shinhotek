"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/site";

type ProductNavItem = {
  slug: string;
  label: string;
};

export function ProductSubnav({
  locale,
  products,
  activeSlug,
}: {
  locale: Locale;
  products: ProductNavItem[];
  activeSlug?: string;
}) {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) {
      return;
    }

    function updateScrollState() {
      if (!nav) {
        return;
      }

      const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
      setCanScrollPrev(nav.scrollLeft > 4);
      setCanScrollNext(maxScrollLeft - nav.scrollLeft > 4);
    }

    updateScrollState();
    nav.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      nav.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products.length]);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) {
      return;
    }

    const activeLink = nav.querySelector<HTMLAnchorElement>(".productSubnavLink.isActive");

    if (!activeLink) {
      nav.scrollTo({ left: 0, behavior: "auto" });
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const activeRect = activeLink.getBoundingClientRect();
    const isOutOfView = activeRect.left < navRect.left || activeRect.right > navRect.right;

    if (isOutOfView) {
      activeLink.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSlug, locale, products]);

  function scrollNext() {
    navRef.current?.scrollBy({
      left: 180,
      behavior: "smooth",
    });
  }

  function scrollPrev() {
    navRef.current?.scrollBy({
      left: -180,
      behavior: "smooth",
    });
  }

  return (
    <div className="productSubnav">
      <div className="container productSubnavShell">
        <button
          type="button"
          className={`productSubnavMore isPrev ${canScrollPrev ? "isVisible" : ""}`}
          onClick={scrollPrev}
          aria-label={locale === "ko" ? "이전 제품 보기" : "Previous product"}
          aria-hidden={!canScrollPrev}
          tabIndex={canScrollPrev ? 0 : -1}
        >
          &lt;
        </button>
        <div ref={navRef} className="productSubnavInner">
          <Link href={`/${locale}/products`} className={`productSubnavLink ${!activeSlug ? "isActive" : ""}`}>
            {locale === "ko" ? "전체" : "All"}
          </Link>
          {products.map((product, index) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className={`productSubnavLink ${activeSlug === product.slug ? "isActive" : ""}`}
            >
              <span className="productSubnavIndex">{String(index + 1).padStart(2, "0")}</span>
              {product.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={`productSubnavMore isNext ${canScrollNext ? "isVisible" : ""}`}
          onClick={scrollNext}
          aria-label={locale === "ko" ? "다음 제품 보기" : "More product"}
          aria-hidden={!canScrollNext}
          tabIndex={canScrollNext ? 0 : -1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
