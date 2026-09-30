import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Error 404</p>
      <h1 className="text-4xl font-light tracking-tight sm:text-6xl">No encontramos esta página</h1>
      <p className="max-w-md text-muted">El producto o la marca que buscas no existe o fue movido.</p>
      <ButtonLink href="/">Ir al inicio</ButtonLink>
    </Container>
  );
}
