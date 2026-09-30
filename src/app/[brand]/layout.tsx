import { notFound } from "next/navigation";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { getAllBrands, getBrand } from "@/config/brands";

export function generateStaticParams() {
  return getAllBrands().map((b) => ({ brand: b.id }));
}

export default async function BrandLayout({ children, params }: LayoutProps<"/[brand]">) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();

  return (
    <div data-brand={brand.id} className="flex min-h-screen flex-1 flex-col bg-bg text-fg">
      <ScrollProgress />
      <Header brandId={brand.id} brandName={brand.name} tagline={brand.tagline} />
      <main className="flex-1">{children}</main>
      <Footer brandName={`${brand.name} ${brand.tagline}`} />
      <BackToTop />
    </div>
  );
}
