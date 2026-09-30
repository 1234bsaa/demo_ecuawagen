import { env } from "@/config/env";
import type { JsonApiDocument } from "./types";

/** Descarga todas las páginas de una colección JSON:API (Drupal entrega 50 por página). */
export async function fetchCollection(url: string, tag: string): Promise<JsonApiDocument> {
  const merged: JsonApiDocument = { data: [], included: [] };
  let next: string | undefined = url;
  while (next) {
    const res: Response = await fetch(next, {
      headers: { Accept: "application/vnd.api+json" },
      next: { revalidate: env.revalidateSeconds, tags: [tag] },
    });
    if (!res.ok) throw new Error(`Drupal respondió ${res.status} en ${next}`);
    const page = (await res.json()) as JsonApiDocument;
    merged.data.push(...page.data);
    merged.included!.push(...(page.included ?? []));
    next = page.links?.next?.href;
  }
  return merged;
}
