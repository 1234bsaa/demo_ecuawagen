import type { NextConfig } from "next";

/**
 * Un mismo repositorio, dos destinos:
 *
 * - GitHub Pages → exportación estática. Se activa con STATIC_EXPORT=true y, si el sitio vive en
 *   https://<usuario>.github.io/<repo>, NEXT_PUBLIC_BASE_PATH=/<repo> (lo define el workflow).
 * - Firebase App Hosting (u otro servidor Node) → sin variables: no se fija `output` y el adaptador
 *   de App Hosting aplica su propio build `standalone`. Forzar `output: "export"` ahí rompe el
 *   despliegue (no existe .next/standalone).
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath: basePath || undefined,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
