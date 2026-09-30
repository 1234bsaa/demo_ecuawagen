import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

/** Marcador de posición del listado mientras se hidrata en el cliente. */
export function CatalogSkeleton() {
  return (
    <Container className="pt-10">
      <Skeleton className="h-12 w-full" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </Container>
  );
}
