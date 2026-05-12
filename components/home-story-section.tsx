"use client";

import { useEffect, useRef } from "react";

export function HomeStorySection({
  brandOriginTitle,
  storyDisplayLines,
  storyParagraphs,
  storyTitleFontSize,
  storyEyebrowFontSize,
  storyBodyFontSize,
}: {
  brandOriginTitle: string;
  storyDisplayLines: [string, string] | string[];
  storyParagraphs: string[];
  storyTitleFontSize?: number | null;
  storyEyebrowFontSize?: number | null;
  storyBodyFontSize?: number | null;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const revealTargets = Array.from(sectionElement.querySelectorAll<HTMLElement>(".storyReveal"));
    const backgroundObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          sectionElement.classList.add("isBackgroundVisible");
          backgroundObserver.unobserve(sectionElement);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    backgroundObserver.observe(sectionElement);

    if (revealTargets.length === 0) {
      return () => backgroundObserver.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("isRevealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      backgroundObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="storySection" className="storySection">
      <div className="container storyInner">
        <div className="storyTopPanel storyReveal" style={{ ["--story-reveal-delay" as string]: "0ms" }}>
          <div className="storyLeadBlock">
            <h2
              className="storyDisplayTitle"
              style={storyTitleFontSize ? { fontSize: `${storyTitleFontSize}px` } : undefined}
            >
              <span className="storyDisplayTitleLine">{storyDisplayLines[0]}</span>
              {storyDisplayLines[1] ? (
                <span className="storyDisplayTitleLine storyDisplayTitleLineAccent">
                  {storyDisplayLines[1]}
                </span>
              ) : null}
            </h2>
          </div>
          <div className="storyContent">
            <span
              className="storyEyebrow"
              style={storyEyebrowFontSize ? { fontSize: `${storyEyebrowFontSize}px` } : undefined}
            >
              {brandOriginTitle}
            </span>
            <div className="storyParagraphs">
              {storyParagraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className="storyParagraph"
                  style={storyBodyFontSize ? { fontSize: `${storyBodyFontSize}px` } : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
