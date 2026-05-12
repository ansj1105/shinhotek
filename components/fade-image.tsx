"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FadeImageProps = ImageProps & {
  skeletonClassName?: string;
};

export function FadeImage({
  className,
  skeletonClassName,
  onLoad,
  ...props
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? <span aria-hidden="true" className={`imageLoadSkeleton ${skeletonClassName ?? ""}`} /> : null}
      <Image
        {...props}
        className={`fadeImage ${loaded ? "isLoaded" : ""} ${className ?? ""}`.trim()}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}
