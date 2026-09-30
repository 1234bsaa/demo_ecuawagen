"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

interface HeaderProps {
  brandId: string;
  brandName: string;
  tagline: string;
}

/** Cabecera fija que se compacta y gana borde/blur al hacer scroll. */
export function Header({ brandId, brandName, tagline }: HeaderProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-20",
        )}
      >
        <Link href={`/${brandId}`} className="group flex items-baseline gap-3" aria-label={`${brandName} ${tagline}`}>
          <span className="text-xl font-semibold uppercase tracking-[0.32em] sm:text-2xl">{brandName}</span>
          <span className="hidden text-xs font-light uppercase tracking-[0.3em] text-muted sm:inline">
            {tagline}
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-sm">
          <Link
            href={`/${brandId}`}
            className="relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Catálogo
          </Link>
          <Link
            href="/"
            className="relative py-1 text-muted transition-colors hover:text-fg after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Marcas
          </Link>
        </nav>
      </Container>
    </motion.header>
  );
}
