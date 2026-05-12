"use client";

import Link from "next/link";

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/site";

export function ContactSubnav({
  locale,
  activeHref,
}: {
  locale: Locale;
  activeHref: string;
}) {
  const dict = getDictionary(locale);
  const contactNav = dict.nav.find((item) => item.href === "/contact");

  if (!contactNav) {
    return null;
  }

  return (
    <section className="contactSubnav">
      <div className="container contactSubnavInner">
        {contactNav.children?.map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className={`contactSubnavLink ${activeHref === item.href ? "isActive" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
