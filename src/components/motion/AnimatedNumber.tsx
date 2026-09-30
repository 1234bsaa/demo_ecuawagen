"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { CurrencyCode } from "@/domain/product";

interface AnimatedNumberProps {
  value: number;
  currency?: CurrencyCode;
  locale?: string;
  className?: string;
}

/** Contador que sube hasta `value` al entrar en pantalla (moneda o entero). */
export function AnimatedNumber({ value, currency, locale = "es-EC", className }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  const formatted = new Intl.NumberFormat(
    locale,
    currency
      ? { style: "currency", currency }
      : { maximumFractionDigits: 0 },
  ).format(reduce ? value : display);

  return (
    <span ref={ref} className={className} aria-label={String(value)}>
      {formatted}
    </span>
  );
}
