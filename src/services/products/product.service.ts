import type { CategorySummary, Paginated, Product, ProductFilters } from "@/domain/product";
import { searchProducts, summarizeCategories } from "./catalog";
import type { ProductRepository } from "./product.repository";

/** Acceso a datos + lógica de catálogo (la lógica pura vive en ./catalog). */
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async search(brand: string, filters: ProductFilters = {}): Promise<Paginated<Product>> {
    return searchProducts(await this.repository.list(brand), filters);
  }

  async categories(brand: string): Promise<CategorySummary[]> {
    return summarizeCategories(await this.repository.list(brand));
  }

  getBySlug(brand: string, slug: string): Promise<Product | null> {
    return this.repository.getBySlug(brand, slug);
  }

  async related(product: Product, limit = 4): Promise<Product[]> {
    const all = await this.repository.list(product.brand);
    return all.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
  }

  listAll(brand: string): Promise<Product[]> {
    return this.repository.list(brand);
  }
}
