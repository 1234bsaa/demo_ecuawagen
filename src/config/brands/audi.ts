import type { BrandConfig } from "./types";

export const audi: BrandConfig = {
  id: "audi",
  name: "Audi",
  tagline: "Collection",
  hero: {
    eyebrow: "Audi Collection",
    title: "Detalles que definen tu esencia",
    image: "/brands/audi/audi_front_1920x1920.jpg",
    subtitle:
      "Relojes, gafas, accesorios y ropa con el diseño y la precisión de Audi. Descubre la colección disponible.",
  },
  locale: "es-EC",
  drupal: { contentType: "product", brandTerm: "audi" },
};
