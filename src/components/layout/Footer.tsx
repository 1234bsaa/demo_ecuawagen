import { Container } from "./Container";

export function Footer({ brandName }: { brandName: string }) {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container className="flex flex-col gap-2 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold uppercase tracking-[0.3em] text-fg">{brandName}</p>
        <p>Catálogo de productos de colección. Precios en USD.</p>
      </Container>
    </footer>
  );
}
