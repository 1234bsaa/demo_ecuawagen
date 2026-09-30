import type {
  CategorySummary,
  Paginated,
  Product,
  ProductFilters,
  ProductSort,
} from "@/domain/product";
import { slugify } from "@/lib/slug";
import type { ProductRepository } from "./product.repository";

export const DEFAULT_PAGE_SIZE = 24;

export const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre A–Z" },
];

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const sorters: Record<ProductSort, ((a: Product, b: Product) => number) | null> = {
  featured: null,
  "price-asc": (a, b) => a.price.amount - b.price.amount,
  "price-desc": (a, b) => b.price.amount - a.price.amount,
  "name-asc": (a, b) => a.name.localeCompare(b.name, "es"),
};

/** Lógica de catálogo independiente del origen de datos. */
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async search(brand: string, filters: ProductFilters = {}): Promise<Paginated<Product>> {
    const { query, category, sort = "featured", page = 1, pageSize = DEFAULT_PAGE_SIZE } = filters;
    let items = await this.repository.list(brand);

    if (category) items = items.filter((p) => slugify(p.category) === category);
    if (query?.trim()) {
      const q = normalize(query.trim());
      items = items.filter((p) => normalize(`${p.name} ${p.description} ${p.category}`).includes(q));
    }
    const compare = sorters[sort];
    if (compare) items = [...items].sort(compare);

    const total = items.length;
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const current = Math.min(Math.max(1, page), pageCount);
    return {
      items: items.slice((current - 1) * pageSize, current * pageSize),
      total,
      page: current,
      pageSize,
      pageCount,
    };
  }

  async categories(brand: string): Promise<CategorySummary[]> {
    const counts = new Map<string, number>();
    for (const p of await this.repository.list(brand)) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return [...counts]
      .map(([name, count]) => ({ name, slug: slugify(name), count }))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
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
