import type { Product } from "@/domain/product";
import { getBrand } from "@/config/brands";
import type { ProductRepository } from "@/services/products/product.repository";
import { fetchCollection } from "./client";
import { mapProducts } from "./mappers/product.mapper";

/** Adaptador opcional para Drupal JSON:API. No se usa mientras DATA_SOURCE sea "mock". */
export class DrupalProductRepository implements ProductRepository {
  constructor(private readonly baseUrl: string) {}

  async list(brand: string): Promise<Product[]> {
    const cfg = getBrand(brand)?.drupal ?? { contentType: "product", brandTerm: brand };
    const params = new URLSearchParams({
      "filter[status]": "1",
      "filter[field_brand.name]": cfg.brandTerm,
      include: "field_image,field_category",
      "page[limit]": "50",
    });
    const url = `${this.baseUrl}/jsonapi/node/${cfg.contentType}?${params}`;
    return mapProducts(await fetchCollection(url, `products:${brand}`), brand, this.baseUrl);
  }

  async getBySlug(brand: string, slug: string): Promise<Product | null> {
    return (await this.list(brand)).find((p) => p.slug === slug) ?? null;
  }
}
