"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Pagination } from "@/components/ui/Pagination";
import type { Product } from "@/domain/product";
import { SORT_OPTIONS, isProductSort, searchProducts, summarizeCategories } from "@/services/products/catalog";
import { CatalogToolbar } from "./CatalogToolbar";
import { EmptyState } from "./EmptyState";
import { ProductGrid } from "./ProductGrid";

interface CatalogBrowserProps {
  brandId: string;
  locale: string;
  products: Product[];
}

/**
 * Listado interactivo: filtra, ordena y pagina en el navegador a partir de la URL (?q, ?category, ?sort, ?page).
 * Así la página es 100 % estática y compatible con `output: "export"` (GitHub Pages).
 */
export function CatalogBrowser({ brandId, locale, products }: CatalogBrowserProps) {
  const sp = useSearchParams();
  const q = sp.get("q") ?? undefined;
  const category = sp.get("category") ?? undefined;
  const sortParam = sp.get("sort");
  const sort = isProductSort(sortParam) ? sortParam : "featured";
  const page = Number(sp.get("page")) || 1;

  const categories = useMemo(() => summarizeCategories(products), [products]);
  const result = useMemo(
    () => searchProducts(products, { query: q, category, sort, page }),
    [products, q, category, sort, page],
  );

  return (
    <Container className="pt-10">
      <CatalogToolbar
        categories={categories}
        totalProducts={products.length}
        resultCount={result.total}
        sortOptions={SORT_OPTIONS}
      />
      <div className="mt-10">
        {result.items.length > 0 ? (
          <ProductGrid products={result.items} locale={locale} />
        ) : (
          <EmptyState brandId={brandId} />
        )}
      </div>
      <Pagination
        basePath={`/${brandId}`}
        page={result.page}
        pageCount={result.pageCount}
        params={{ q, category, sort: sort === "featured" ? undefined : sort }}
      />
    </Container>
  );
}
