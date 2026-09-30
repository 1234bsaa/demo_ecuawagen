import type { NextConfig } from "next";

/**
 * Exportación estática para GitHub Pages.
 * En Pages el sitio vive en https://<usuario>.github.io/<repo>, por lo que hay que definir
 * NEXT_PUBLIC_BASE_PATH=/<repo> al compilar (vacío en local o con dominio propio).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
