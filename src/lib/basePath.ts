/**
 * Prefijo de despliegue (p. ej. "/mi-repo" en GitHub Pages). Vacío en local.
 * Se define con NEXT_PUBLIC_BASE_PATH y debe coincidir con `basePath` de next.config.ts.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Antepone el prefijo a rutas de /public (next/image sin optimizar no lo hace solo). */
export function assetPath(src: string): string {
  return /^(https?:)?\/\//.test(src) || src.startsWith("data:") ? src : `${BASE_PATH}${src}`;
}

/** Quita el prefijo de una ruta absoluta del navegador para usarla con <Link>. */
export function stripBasePath(path: string): string {
  return BASE_PATH && path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) || "/" : path;
}
