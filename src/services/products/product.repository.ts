import type { Product } from "@/domain/product";

/**
 * Contrato que debe cumplir cualquier origen de datos (JSON local, Drupal, etc.).
 * La UI nunca depende de una implementación concreta.
 */
export interface ProductRepository {
  list(brand: string): Promise<Product[]>;
  getBySlug(brand: string, slug: string): Promise<Product | null>;
}
