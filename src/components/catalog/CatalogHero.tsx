"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Container } from "@/components/layout/Container";
import type { BrandConfig } from "@/config/brands";

const ease = [0.22, 1, 0.36, 1] as const;

interface CatalogHeroProps {
  brand: BrandConfig;
  productCount: number;
  categoryCount: number;
}

/** Banner con imagen de fondo, título revelado palabra por palabra y contadores. */
export function CatalogHero({ brand, productCount, categoryCount }: CatalogHeroProps) {
  const words = brand.hero.title.split(" ");
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* Imagen espejada para que las personas queden a la derecha y el texto sobre el agua. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20 -scale-x-100"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <Image
          src={brand.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/5 max-md:bg-black/55"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black/50 to-transparent" />

      <Container className="relative py-20 sm:py-28 lg:py-36">
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {brand.hero.eyebrow}
        </motion.p>
        <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          aria-hidden
          className="mt-8 h-px w-24 origin-left bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease }}
        />
        <motion.p
          className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease }}
        >
          {brand.hero.subtitle}
        </motion.p>
        <motion.dl
          className="mt-10 flex gap-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease }}
        >
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-white/70">Productos</dt>
            <dd className="mt-1 text-3xl font-light">
              <AnimatedNumber value={productCount} locale={brand.locale} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-white/70">Categorías</dt>
            <dd className="mt-1 text-3xl font-light">
              <AnimatedNumber value={categoryCount} locale={brand.locale} />
            </dd>
          </div>
        </motion.dl>
      </Container>
    </section>
  );
}
