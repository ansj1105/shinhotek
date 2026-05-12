import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollTopButton } from "@/components/scroll-top-button";
import { VisitTracker } from "@/components/visit-tracker";
import { getProducts } from "@/lib/content";
import type { Locale } from "@/lib/site";

export async function PageShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const products = await getProducts();
  const productLinks = products.map((product) => ({
    label: locale === "ko" ? product.nameKo : product.nameEn,
    href: `/products/${product.slug}`,
  }));

  return (
    <div className={`shell ${locale === "en" ? "is-en" : "is-ko"}`} data-locale={locale}>
      <VisitTracker locale={locale} />
      <Header locale={locale} productLinks={productLinks} />
      <main>{children}</main>
      <ScrollTopButton />
      <Footer locale={locale} productLinks={productLinks} />
    </div>
  );
}
