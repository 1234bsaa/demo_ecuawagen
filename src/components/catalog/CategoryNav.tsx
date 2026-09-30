"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CategorySummary } from "@/domain/product";
import { cn } from "@/lib/cn";
import { getCategoryIcon } from "./categoryIcons";

interface CategoryNavProps {
  categories: CategorySummary[];
  total: number;
  active: string;
  onSelect: (slug: string) => void;
}

/** Pestañas con ícono, indicador animado y flechas laterales en lugar de scroll visible. */
export function CategoryNav({ categories, total, active, onSelect }: CategoryNavProps) {
  const items = [{ name: "Todos", slug: "", count: total }, ...categories];
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, items.length]);

  // Mantiene visible la pestaña activa (p. ej. al abrir la URL con ?category=…).
  useEffect(() => {
    scroller.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const scrollBy = (dir: -1 | 1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const arrow =
    "grid size-10 shrink-0 place-items-center rounded-full border border-line bg-bg text-fg transition-all duration-300 hover:border-fg hover:bg-fg hover:text-bg disabled:pointer-events-none disabled:opacity-25";

  return (
    <div className="flex items-center gap-2 border-b border-line">
      <button type="button" aria-label="Categorías anteriores" disabled={edges.start} onClick={() => scrollBy(-1)} className={arrow}>
        <CaretLeft size={18} weight="bold" />
      </button>
      <div
        ref={scroller}
        onScroll={measure}
        role="tablist"
        aria-label="Categorías"
        className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((c) => {
          const isActive = c.slug === active;
          const Icon = getCategoryIcon(c.slug);
          return (
            <button
              key={c.slug || "all"}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(c.slug)}
              className={cn(
                "group relative flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3.5 text-sm transition-colors duration-300",
                isActive ? "font-semibold text-fg" : "text-muted hover:text-fg",
              )}
            >
              <Icon
                size={20}
                weight={isActive ? "fill" : "light"}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
              />
              {c.name}
              <span className="text-xs font-light text-muted">{c.count}</span>
              {isActive && (
                <motion.span
                  layoutId="category-underline"
                  className="absolute inset-x-3 -bottom-px h-0.5 bg-fg"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <button type="button" aria-label="Categorías siguientes" disabled={edges.end} onClick={() => scrollBy(1)} className={arrow}>
        <CaretRight size={18} weight="bold" />
      </button>
    </div>
  );
}
