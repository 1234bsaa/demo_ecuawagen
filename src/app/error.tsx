"use client";

import { Container } from "@/components/layout/Container";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center">
      <h1 className="text-4xl font-light tracking-tight">Algo salió mal</h1>
      <p className="max-w-md text-muted">No pudimos cargar el catálogo. Inténtalo de nuevo en unos segundos.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-brand bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent-fg transition-transform active:scale-[0.97]"
      >
        Reintentar
      </button>
    </Container>
  );
}
