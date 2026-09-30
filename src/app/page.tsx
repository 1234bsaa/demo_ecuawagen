import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getAllBrands } from "@/config/brands";

export default function Home() {
  return (
    <main className="flex-1">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Catálogos</p>
          <h1 className="mt-5 text-5xl font-light tracking-tight sm:text-7xl">Elige una marca</h1>
        </Reveal>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getAllBrands().map((brand, i) => (
            <li key={brand.id}>
              <Reveal delay={i * 0.1}>
                <Link
                  href={`/${brand.id}`}
                  className="group flex aspect-[4/3] flex-col justify-between rounded-brand border border-line bg-surface p-8 transition-all duration-500 hover:-translate-y-1 hover:border-fg hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.3)]"
                >
                  <span className="text-3xl font-semibold uppercase tracking-[0.3em]">{brand.name}</span>
                  <span className="flex items-center justify-between text-sm text-muted">
                    {brand.tagline}
                    <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
