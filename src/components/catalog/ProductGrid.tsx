"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Product } from "@/domain/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  locale: string;
  /** Anima la entrada al hacer scroll; en listados cortos (relacionados) también aplica. */
  className?: string;
}

/** Cuadrícula con entrada escalonada y reordenamiento animado al filtrar u ordenar. */
export function ProductGrid({ products, locale, className }: ProductGridProps) {
  return (
    <ul
      className={
        className ?? "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4"
      }
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product, i) => (
          <motion.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: Math.min(i % 4, 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard product={product} locale={locale} priority={i < 4} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
