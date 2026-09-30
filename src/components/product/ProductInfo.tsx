import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Reveal } from "@/components/motion/Reveal";
import { CatalogLink } from "@/components/product/CatalogLink";
import { buttonClasses } from "@/components/ui/Button";
import type { Product } from "@/domain/product";
import { parseDescription } from "@/lib/description";

interface ProductInfoProps {
  product: Product;
  brandName: string;
  locale: string;
}

export function ProductInfo({ product, brandName, locale }: ProductInfoProps) {
  const { paragraph, bullets } = parseDescription(product.description);
  return (
    <div className="flex flex-col">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {brandName} · {product.category}
        </p>
        <h1 className="mt-4 text-3xl font-light leading-tight tracking-tight sm:text-5xl">{product.name}</h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 text-3xl font-semibold">
          <AnimatedNumber value={product.price.amount} currency={product.price.currency} locale={locale} />
        </p>
        {product.stock !== undefined && (
          <p className="mt-2 text-sm text-muted">
            {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
          </p>
        )}
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-8 border-t border-line pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Descripción</h2>
          {paragraph && <p className="mt-4 max-w-prose font-light leading-relaxed">{paragraph}</p>}
          {bullets.length > 0 && (
            <ul className="mt-4 max-w-prose space-y-2 font-light leading-relaxed">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-fg" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-muted">Marca</dt>
            <dd className="mt-1">{brandName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.22em] text-muted">Categoría</dt>
            <dd className="mt-1">{product.category}</dd>
          </div>
        </dl>
        <div className="mt-10">
          <CatalogLink brandId={product.brand} className={buttonClasses("outline")}>
            ← Volver al catálogo
          </CatalogLink>
        </div>
      </Reveal>
    </div>
  );
}
