import { FadeImage } from "@/components/fade-image";

export function SubpageHero({
  eyebrow,
  title,
  description,
  tone = "default",
  backgroundImageUrl,
  desktopBackgroundImageUrl,
  backgroundOpacity,
  lightText = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "contact" | "applications" | "products" | "resources" | "directions";
  backgroundImageUrl?: string | null;
  desktopBackgroundImageUrl?: string | null;
  backgroundOpacity?: number;
  lightText?: boolean;
}) {
  const resolvedOpacity =
    backgroundOpacity ?? (tone === "contact" || tone === "resources" || tone === "directions" ? 0.9 : 0.48);

  return (
    <section className={`subpageHero subpageHero-${tone}`}>
      <div className="subpageHeroBg">
        {backgroundImageUrl ? (
          <>
            <FadeImage
              src={backgroundImageUrl}
              alt=""
              fill
              sizes="100vw"
              className={`subpageHeroBgImage ${desktopBackgroundImageUrl ? "isMobileSource" : ""}`}
              skeletonClassName="subpageHeroBgSkeleton"
              style={{ opacity: resolvedOpacity }}
            />
            {desktopBackgroundImageUrl ? (
              <FadeImage
                src={desktopBackgroundImageUrl}
                alt=""
                fill
                sizes="100vw"
                className="subpageHeroBgImage isDesktopSource"
                skeletonClassName="subpageHeroBgSkeleton"
                style={{ opacity: resolvedOpacity }}
              />
            ) : null}
          </>
        ) : null}
        <div className={`subpageHeroBgOverlay is-${tone}`} />
      </div>
      <div className="container subpageHeroInner">
        <div className={`subpageHeroCopy ${lightText ? "isLightText" : ""}`}>
          <h1 className="sectionTitle">{title}</h1>
        </div>
      </div>
    </section>
  );
}
