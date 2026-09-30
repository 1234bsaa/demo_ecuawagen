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
    </>
  );
}
