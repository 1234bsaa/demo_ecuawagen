import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogMemoryTracker } from "@/components/catalog/CatalogMemoryTracker";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { CatalogToolbar } from "@/components/catalog/CatalogToolbar";
import { EmptyState } from "@/components/catalog/EmptyState";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Container } from "@/components/layout/Container";
import { Pagination } from "@/components/ui/Pagination";
import { getBrand } from "@/config/brands";
import type { ProductSort } from "@/domain/product";
import { SORT_OPTIONS, productService } from "@/services/products";

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const isSort = (v?: string): v is ProductSort => SORT_OPTIONS.some((o) => o.value === v);

export async function generateMetadata({ params }: PageProps<"/[brand]">): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  return brand
    ? { title: `Catálogo ${brand.name}`, description: brand.hero.subtitle }
    : {};
}

export default async function CatalogPage({ params, searchParams }: PageProps<"/[brand]">) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();

  const sp = await searchParams;
  const q = first(sp.q);
  const category = first(sp.category);
  const sortParam = first(sp.sort);
  const sort = isSort(sortParam) ? sortParam : "featured";
  const page = Number(first(sp.page)) || 1;

  const [result, categories, all] = await Promise.all([
    productService.search(brand.id, { query: q, category, sort, page }),
    productService.categories(brand.id),
    productService.listAll(brand.id),
  ]);

  return (
    <>
      <CatalogMemoryTracker brandId={brand.id} />
      <CatalogHero brand={brand} productCount={all.length} categoryCount={categories.length} />
      <Container className="pt-10">
        <CatalogToolbar
          categories={categories}
          totalProducts={all.length}
          resultCount={result.total}
          sortOptions={SORT_OPTIONS}
        />
        <div className="mt-10">
          {result.items.length > 0 ? (
            <ProductGrid products={result.items} locale={brand.locale} />
          ) : (
            <EmptyState brandId={brand.id} />
          )}
        </div>
        <Pagination
          basePath={`/${brand.id}`}
          page={result.page}
          pageCount={result.pageCount}
          params={{ q, category, sort: sort === "featured" ? undefined : sort }}
        />
      </Container>
    </>
  );
}
