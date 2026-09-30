"use client";

import Link from "next/link";
import { useSyncExternalStore, type ReactNode } from "react";
import { readCatalogMemory } from "@/lib/catalogMemory";

interface CatalogLinkProps {
  brandId: string;
  className?: string;
  children: ReactNode;
}

const subscribe = () => () => {};

/** Enlace al catálogo que vuelve a la página/filtros donde estaba el usuario. */
export function CatalogLink({ brandId, className, children }: CatalogLinkProps) {
  const fallback = `/${brandId}`;
  // En el servidor devuelve la ruta base; en el cliente, la guardada (sin desajuste de hidratación).
  const href = useSyncExternalStore(
    subscribe,
    () => readCatalogMemory(brandId)?.href ?? fallback,
    () => fallback,
  );

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
