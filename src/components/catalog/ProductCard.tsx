import Link from "next/link";
import { ViewTransition } from "react";
import { FadeImage } from "@/components/motion/FadeImage";
import type { Product } from "@/domain/product";
import { formatMoney } from "@/lib/format";

interface ProductCardProps {
  product: Product;
  locale: string;
  priority?: boolean;
}

export function ProductCard({ product, locale, priority }: ProductCardProps) {
  return (
    <Link href={`/${product.brand}/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-brand bg-surface transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]">
        <ViewTransition name={`product-${product.slug}`}>
          <div className="absolute inset-0">
            <FadeImage
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
              priority={priority}
              className="object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
          </div>
        </ViewTransition>
        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-accent py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent-fg transition-transform duration-500 ease-out group-hover:translate-y-0">
          Ver detalle
        </span>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">{product.category}</p>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] font-light leading-snug">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
            {product.name}
          </span>
        </h3>
        <p className="text-base font-semibold">{formatMoney(product.price, locale)}</p>
      </div>
    </Link>
  );
}
