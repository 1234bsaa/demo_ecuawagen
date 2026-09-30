"use client";

import { useEffect } from "react";
import { stripBasePath } from "@/lib/basePath";
import { readCatalogMemory, writeCatalogMemory } from "@/lib/catalogMemory";

/**
 * Se monta en el catálogo. Al hacer clic en un producto guarda la URL actual y el scroll;
 * al volver, restaura la posición. No renderiza nada.
 */
export function CatalogMemoryTracker({ brandId }: { brandId: string }) {
  // Guardar al abrir un producto.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      const href = stripBasePath(link?.getAttribute("href") ?? "");
      if (!href.startsWith(`/${brandId}/`)) return;
      writeCatalogMemory(brandId, {
        href: stripBasePath(window.location.pathname) + window.location.search,
        scrollY: window.scrollY,
        pending: true,
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [brandId]);

  // Restaurar al volver.
  useEffect(() => {
    const memory = readCatalogMemory(brandId);
    const current = stripBasePath(window.location.pathname) + window.location.search;
    if (!memory?.pending) return;
    writeCatalogMemory(brandId, { ...memory, pending: false });
    if (memory.href !== current) return;

    let tries = 0;
    const restore = () => {
      window.scrollTo({ top: memory.scrollY, behavior: "instant" });
      // Reintenta (~2 s): el listado se monta en el cliente y puede tardar en tener altura.
      if (Math.abs(window.scrollY - memory.scrollY) > 2 && ++tries < 120) requestAnimationFrame(restore);
    };
    requestAnimationFrame(restore);
  }, [brandId]);

  return null;
}
