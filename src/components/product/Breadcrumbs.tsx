import Link from "next/link";
import { CatalogLink } from "./CatalogLink";

interface Crumb {
  label: string;
  href?: string;
  /** Si se indica, el enlace vuelve al catálogo recordando página y filtros. */
  catalogOf?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {c.catalogOf ? (
              <CatalogLink brandId={c.catalogOf} className="transition-colors hover:text-fg">
                {c.label}
              </CatalogLink>
            ) : c.href ? (
              <Link href={c.href} className="transition-colors hover:text-fg">
                {c.label}
              </Link>
            ) : (
              <span className="text-fg" aria-current="page">
                {c.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
