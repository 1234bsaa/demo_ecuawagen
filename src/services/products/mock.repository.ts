import type { Product } from "@/domain/product";
import type { ProductRepository } from "./product.repository";

/** Un loader por marca; se añade una línea al incorporar un catálogo nuevo. */
const loaders: Record<string, () => Promise<{ default: unknown }>> = {
  audi: () => import("@/data/mock/audi.products.json"),
};

export class MockProductRepository implements ProductRepository {
  async list(brand: string): Promise<Product[]> {
    const load = loaders[brand];
    if (!load) return [];
    return (await load()).default as Product[];
  }

  async getBySlug(brand: string, slug: string): Promise<Product | null> {
    return (await this.list(brand)).find((p) => p.slug === slug) ?? null;
  }
}
