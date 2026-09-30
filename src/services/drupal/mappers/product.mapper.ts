import type { CurrencyCode, Product } from "@/domain/product";
import { slugify } from "@/lib/slug";
import type { JsonApiDocument, JsonApiResource } from "../types";

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);

/** Los campos de texto formateado de Drupal llegan como { value, format }. */
const text = (v: unknown) =>
  typeof v === "object" && v !== null ? str((v as { value?: unknown }).value) : str(v);

/** Convierte un nodo `product` de Drupal en el modelo de dominio (ver docs/drupal-contract.md). */
export function mapProduct(
  node: JsonApiResource,
  included: JsonApiResource[],
  brand: string,
  baseUrl: string,
): Product {
  const related = (rel: string) => {
    const ref = node.relationships?.[rel]?.data;
    return ref ? included.find((i) => i.id === ref.id && i.type === ref.type) : undefined;
  };
  const file = related("field_image");
  const category = related("field_category");
  const imageUrl = str((file?.attributes.uri as { url?: string } | undefined)?.url);
  const name = str(node.attributes.title);
  const stock = node.attributes.field_stock;

  return {
    id: node.id,
    slug: str(node.attributes.field_slug) || slugify(name),
    brand,
    name,
    description: text(node.attributes.field_description),
    price: {
      amount: Number(node.attributes.field_price ?? 0),
      currency: str(node.attributes.field_currency, "USD") as CurrencyCode,
    },
    image: { src: imageUrl ? `${baseUrl}${imageUrl}` : "/brands/placeholder.svg", alt: name },
    category: str(category?.attributes.name, "Accesorios"),
    stock: typeof stock === "number" ? stock : undefined,
  };
}

export function mapProducts(doc: JsonApiDocument, brand: string, baseUrl: string): Product[] {
  return doc.data.map((n) => mapProduct(n, doc.included ?? [], brand, baseUrl));
}
