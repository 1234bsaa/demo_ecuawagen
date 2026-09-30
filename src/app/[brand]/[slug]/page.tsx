import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { getAllBrands, getBrand } from "@/config/brands";
import { productService } from "@/services/products";

export async function generateStaticParams() {
  const lists = await Promise.all(
    getAllBrands().map(async (b) => (await productService.listAll(b.id)).map((p) => ({ brand: b.id, slug: p.slug }))),
  );
  return lists.flat();
}

export async function generateMetadata({ params }: PageProps<"/[brand]/[slug]">): Promise<Metadata> {
  const { brand, slug } = await params;
  const product = await productService.getBySlug(brand, slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description || `${product.name} – ${getBrand(brand)?.name ?? ""}`,
    openGraph: { images: [product.image.src] },
  };
}

export default async function ProductPage({ params }: PageProps<"/[brand]/[slug]">) {
  const { brand: brandId, slug } = await params;
  const brand = getBrand(brandId);
  const product = brand ? await productService.getBySlug(brandId, slug) : null;
  if (!brand || !product) notFound();

  const related = await productService.related(product);

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: brand.name, catalogOf: brand.id },
          { label: product.category, catalogOf: brand.id },
          { label: product.name },
        ]}
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-20">
        <ProductGallery product={product} />
        <ProductInfo product={product} brandName={brand.name} locale={brand.locale} />
      </div>
      {related.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <h2 className="mb-8 text-2xl font-light tracking-tight">También te puede interesar</h2>
          </Reveal>
          <ProductGrid products={related} locale={brand.locale} />
        </section>
      )}
    </Container>
  );
}
