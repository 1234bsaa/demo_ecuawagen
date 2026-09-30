import Link from "next/link";
import { cn } from "@/lib/cn";

interface PaginationProps {
  basePath: string;
  page: number;
  pageCount: number;
  /** Parámetros actuales (q, category, sort…) que se conservan al cambiar de página. */
  params: Record<string, string | undefined>;
}

function hrefFor(basePath: string, params: PaginationProps["params"], page: number) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) qs.set(k, v);
  if (page > 1) qs.set("page", String(page));
  const s = qs.toString();
  return s ? `${basePath}?${s}` : basePath;
}

export function Pagination({ basePath, page, pageCount, params }: PaginationProps) {
  if (pageCount <= 1) return null;
  const item =
    "grid h-11 min-w-11 place-items-center rounded-brand border px-3 text-sm transition-colors duration-300";
  return (
    <nav aria-label="Paginación" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={hrefFor(basePath, params, page - 1)} className={cn(item, "border-line hover:border-fg")}>
          ← Anterior
        </Link>
      )}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={hrefFor(basePath, params, n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            item,
            n === page ? "border-fg bg-fg text-bg" : "border-line hover:border-fg",
          )}
        >
          {n}
        </Link>
      ))}
      {page < pageCount && (
        <Link href={hrefFor(basePath, params, page + 1)} className={cn(item, "border-line hover:border-fg")}>
          Siguiente →
        </Link>
      )}
    </nav>
  );
}
