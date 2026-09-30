import type { Product } from "@/domain/product";
import type { ProductRepository } from "./product.repository";

/** Si el origen principal falla, responde con el secundario para no romper la web. */
export class FallbackProductRepository implements ProductRepository {
  constructor(
    private readonly primary: ProductRepository,
    private readonly fallback: ProductRepository,
  ) {}

  private async run<T>(op: string, fn: (r: ProductRepository) => Promise<T>): Promise<T> {
    try {
      return await fn(this.primary);
    } catch (error) {
      console.warn(`[products] ${op} falló en el origen principal; usando datos locales.`, error);
      return fn(this.fallback);
    }
  }

  list(brand: string): Promise<Product[]> {
    return this.run("list", (r) => r.list(brand));
  }

  getBySlug(brand: string, slug: string): Promise<Product | null> {
    return this.run("getBySlug", (r) => r.getBySlug(brand, slug));
  }
}
