import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog/CatalogBrowser";
import { CatalogHero } from "@/components/catalog/CatalogHero";
import { CatalogMemoryTracker } from "@/components/catalog/CatalogMemoryTracker";
import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton";
import { getBrand } from "@/config/brands";
import { slugify } from "@/lib/slug";
import { productService } from "@/services/products";

export async function generateMetadata({ params }: PageProps<"/[brand]">): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  return brand ? { title: `Catálogo ${brand.name}`, description: brand.hero.subtitle } : {};
}

/** Página estática: los filtros (?q, ?category, ?sort, ?page) se aplican en el navegador. */
export default async function CatalogPage({ params }: PageProps<"/[brand]">) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();

  const products = await productService.listAll(brand.id);
  const categoryCount = new Set(products.map((p) => slugify(p.category))).size;

  return (
    <>
      <CatalogMemoryTracker brandId={brand.id} />
      <CatalogHero brand={brand} productCount={products.length} categoryCount={categoryCount} />
      {/* useSearchParams exige Suspense en exportación estática. */}
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogBrowser brandId={brand.id} locale={brand.locale} products={products} />
      </Suspense>
    </>
  );
}
