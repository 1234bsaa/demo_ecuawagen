"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { assetPath } from "@/lib/basePath";
import { cn } from "@/lib/cn";

/** next/image con fade-in al terminar de cargar. */
export function FadeImage({ className, onLoad, alt, src, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      src={typeof src === "string" ? assetPath(src) : src}
      alt={alt}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn(
        "transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
