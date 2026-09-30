"use client";

import type { CategorySummary, ProductSort } from "@/domain/product";
import { CategoryNav } from "./CategoryNav";
import { SearchBar } from "./SearchBar";
import { SortSelect } from "./SortSelect";
import { useCatalogQuery } from "./useCatalogQuery";

interface CatalogToolbarProps {
  categories: CategorySummary[];
  totalProducts: number;
  resultCount: number;
  sortOptions: Array<{ value: ProductSort; label: string }>;
}

export function CatalogToolbar({ categories, totalProducts, resultCount, sortOptions }: CatalogToolbarProps) {
  const { query, category, sort, update, pending } = useCatalogQuery();

  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute inset-x-0 -top-px h-0.5 overflow-hidden transition-opacity duration-300 ${pending ? "opacity-100" : "opacity-0"}`}
      >
        <div className="loading-bar h-full w-full bg-fg" />
      </div>
      <CategoryNav
        categories={categories}
        total={totalProducts}
        active={category}
        onSelect={(slug) => update({ category: slug || undefined })}
      />
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={(q) => update({ q: q || undefined })} />
        <div className="flex items-center justify-between gap-6 sm:justify-end">
          <p className="text-sm text-muted" aria-live="polite">
            {resultCount} {resultCount === 1 ? "producto" : "productos"}
          </p>
          <SortSelect
            value={sort}
            options={sortOptions}
            onChange={(s) => update({ sort: s === "featured" ? undefined : s })}
          />
        </div>
      </div>
    </div>
  );
}
