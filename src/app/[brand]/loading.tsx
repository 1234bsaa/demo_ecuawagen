import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton";
import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-surface">
        <Container className="space-y-6 py-16 sm:py-24">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-16 w-full max-w-2xl" />
          <Skeleton className="h-4 w-full max-w-md" />
        </Container>
      </div>
      <CatalogSkeleton />
    </>
  );
}
