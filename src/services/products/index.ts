import { env } from "@/config/env";
import { DrupalProductRepository } from "@/services/drupal/drupal.repository";
import { FallbackProductRepository } from "./fallback.repository";
import { MockProductRepository } from "./mock.repository";
import { ProductService } from "./product.service";
import type { ProductRepository } from "./product.repository";

export { SORT_OPTIONS, DEFAULT_PAGE_SIZE } from "./product.service";

/**
 * Único punto de acceso para la UI. Por defecto usa datos locales (mock).
 * Con DATA_SOURCE=drupal + DRUPAL_BASE_URL usa el CMS y, si falla, vuelve al mock.
 */
function createRepository(): ProductRepository {
  const mock = new MockProductRepository();
  if (env.dataSource === "drupal") {
    if (!env.drupalBaseUrl) {
      console.warn("[products] DATA_SOURCE=drupal sin DRUPAL_BASE_URL; usando datos locales.");
      return mock;
    }
    return new FallbackProductRepository(new DrupalProductRepository(env.drupalBaseUrl), mock);
  }
  return mock;
}

export const productService = new ProductService(createRepository());
