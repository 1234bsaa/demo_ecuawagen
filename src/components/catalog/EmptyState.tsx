import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function EmptyState({ brandId }: { brandId: string }) {
  return (
    <Reveal className="flex flex-col items-center gap-5 py-24 text-center">
      <p className="text-2xl font-light">No encontramos productos con esos filtros</p>
      <p className="max-w-md text-sm text-muted">Prueba con otra palabra clave o quita la categoría seleccionada.</p>
      <ButtonLink href={`/${brandId}`} variant="outline">
        Limpiar filtros
      </ButtonLink>
    </Reveal>
  );
}
