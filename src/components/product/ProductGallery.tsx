"use client";

import { useState } from "react";
import { ViewTransition } from "react";
import { FadeImage } from "@/components/motion/FadeImage";
import type { Product } from "@/domain/product";

/** Imagen principal con zoom que sigue al cursor (solo en dispositivos con hover). */
export function ProductGallery({ product }: { product: Product }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  return (
    <div
      className="relative aspect-square cursor-zoom-in overflow-hidden rounded-brand bg-surface"
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      <ViewTransition name={`product-${product.slug}`}>
        <div className="absolute inset-0">
          <FadeImage
            src={product.image.src}
            alt={product.image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ transformOrigin: origin }}
            className={`object-contain p-10 mix-blend-multiply transition-transform duration-500 ease-out ${zoomed ? "scale-[1.7]" : "scale-100"}`}
          />
        </div>
      </ViewTransition>
    </div>
  );
}
