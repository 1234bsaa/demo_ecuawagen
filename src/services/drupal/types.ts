/** Subconjunto mínimo de JSON:API que usamos. */
export interface JsonApiResource {
  id: string;
  type: string;
  attributes: Record<string, unknown>;
  relationships?: Record<string, { data: { id: string; type: string } | null }>;
}

export interface JsonApiDocument {
  data: JsonApiResource[];
  included?: JsonApiResource[];
  links?: { next?: { href: string } };
}
