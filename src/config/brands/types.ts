export interface BrandConfig {
  /** Identificador usado en la URL y en el atributo data-brand del tema. */
  id: string;
  name: string;
  /** Texto corto junto al nombre de la marca. */
  tagline: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    /** Imagen de fondo del banner (ruta en /public). */
    image: string;
  };
  locale: string;
  /** Valores para el futuro origen Drupal (no se usan en modo mock). */
  drupal: {
    contentType: string;
    brandTerm: string;
  };
}
