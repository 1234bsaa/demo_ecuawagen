# Catálogo de marcas (Next.js 16)

Catálogo de productos multi‑marca. Hoy incluye **Audi** con datos locales; está preparado para leer de un **Drupal headless** más adelante sin tocar la UI.

## Ejecutar
```bash
npm install
npm run dev      # http://localhost:3000  → /audi
npm run build && npm start
```
No requiere variables de entorno (ver `.env.example`).

## Arquitectura
```
src/
  app/                 rutas: / (marcas), /[brand] (catálogo), /[brand]/[slug] (detalle), /api/revalidate
  config/brands/       una configuración por marca (textos, locale, mapeo Drupal)
  domain/              tipos del dominio (Product, Money, Paginated…)
  services/products/   ProductRepository (contrato), ProductService (lógica), mock, fallback, factory
  services/drupal/     adaptador opcional JSON:API + mapper
  components/
    ui/ layout/ catalog/ product/   componentes reutilizables y agnósticos de marca
    motion/                          animaciones reutilizables (Reveal, FadeImage, AnimatedNumber, ScrollProgress)
  data/mock/           <marca>.products.json (datos locales)
  app/globals.css      tokens de tema por marca ([data-brand="audi"])
public/brands/<marca>/products/   imágenes
scripts/excel-to-json.py          convierte el Excel en el JSON mock
docs/drupal-contract.md           contrato para conectar Drupal
```
La UI solo importa `@/services/products`; el origen (mock o Drupal) se decide allí.

## Añadir una marca nueva (p. ej. VW)
1. Copiar imágenes a `public/brands/vw/products/`.
2. Generar datos: `python scripts/excel-to-json.py <excel.xlsx> vw` → `src/data/mock/vw.products.json`.
3. Crear `src/config/brands/vw.ts` y registrarla en `src/config/brands/index.ts`.
4. Registrar el loader en `src/services/products/mock.repository.ts`.
5. Añadir el bloque de tokens `[data-brand="vw"]` en `src/app/globals.css` (colores, radios).

## Conectar Drupal (más adelante)
Ver [docs/drupal-contract.md](docs/drupal-contract.md). Resumen: `DATA_SOURCE=drupal` + `DRUPAL_BASE_URL`; si el CMS falla se usan los datos locales.

## Animaciones
Motion + CSS; respetan `prefers-reduced-motion`. Transiciones de vista entre catálogo y detalle vía `<ViewTransition>` de React.
