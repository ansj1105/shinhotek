"use client";

import { useEffect, useRef, useState } from "react";

type ProductVideoPanelProps = {
  src: string;
  className?: string;
};

export function ProductVideoPanel({ src, className }: ProductVideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // Browser autoplay policies may still defer playback until the media is ready.
      }
    };

    void tryPlay();
  }, [src]);

  return (
    <div className={`productFeatureVisualPanel isVideo ${className ?? ""}`.trim()}>
      {!isReady ? (
        <div className="productFeatureVisualSpinner" aria-hidden="true">
          <span className="productFeatureVisualSpinnerRing" />
        </div>
      ) : null}
      <video
        ref={videoRef}
        className="productFeatureVisualVideo"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="auto"
        onCanPlay={() => {
          const video = videoRef.current;
          setIsReady(true);
          void video?.play().catch(() => {});
        }}
        onLoadedData={() => setIsReady(true)}
        onWaiting={() => setIsReady(false)}
        onPlaying={() => setIsReady(true)}
      />
    </div>
  );
}
