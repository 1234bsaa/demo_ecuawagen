/**
 * Recuerda en qué punto del catálogo estaba el usuario (página, filtros y scroll)
 * al abrir un producto, para devolverlo exactamente ahí. Vive en sessionStorage.
 */
export interface CatalogMemory {
  /** Ruta + query del catálogo, p. ej. "/audi?category=gafas&page=2". */
  href: string;
  scrollY: number;
  /** true mientras falta restaurar el scroll al volver. */
  pending: boolean;
}

const key = (brand: string) => `catalog-memory:${brand}`;

export function readCatalogMemory(brand: string): CatalogMemory | null {
  try {
    const raw = sessionStorage.getItem(key(brand));
    return raw ? (JSON.parse(raw) as CatalogMemory) : null;
  } catch {
    return null;
  }
}

export function writeCatalogMemory(brand: string, memory: CatalogMemory): void {
  try {
    sessionStorage.setItem(key(brand), JSON.stringify(memory));
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}
