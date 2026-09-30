"use client";

import { useEffect } from "react";
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
      const href = link?.getAttribute("href");
      if (!href?.startsWith(`/${brandId}/`)) return;
      writeCatalogMemory(brandId, {
        href: window.location.pathname + window.location.search,
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
    const current = window.location.pathname + window.location.search;
    if (!memory?.pending) return;
    writeCatalogMemory(brandId, { ...memory, pending: false });
    if (memory.href !== current) return;

    let tries = 0;
    const restore = () => {
      window.scrollTo({ top: memory.scrollY, behavior: "instant" });
      // Reintenta unos cuadros por si el contenido aún está midiéndose.
      if (Math.abs(window.scrollY - memory.scrollY) > 2 && ++tries < 12) requestAnimationFrame(restore);
    };
    requestAnimationFrame(restore);
  }, [brandId]);

  return null;
}
