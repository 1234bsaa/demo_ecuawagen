# Contrato con Drupal headless (preparación futura)

La app **no necesita Drupal** para funcionar: por defecto usa `src/data/mock/*.products.json`.
Este documento define lo que el CMS debe exponer para activar `DATA_SOURCE=drupal`.

## Activación
```
DATA_SOURCE=drupal
DRUPAL_BASE_URL=https://cms.ejemplo.com
DRUPAL_REVALIDATE_SECONDS=300          # opcional
```
Si Drupal no responde, la app registra un aviso y sirve los datos locales (`FallbackProductRepository`).

## Módulos
Core **JSON:API** habilitado (solo lectura para anónimos sobre contenido publicado).

## Content type `product`
| Campo Drupal | Tipo | Modelo `Product` |
|---|---|---|
| `title` | Texto | `name` |
| `field_slug` (opcional; si falta se genera del título) | Texto | `slug` |
| `field_description` | Texto largo (plano o formateado) | `description` |
| `field_price` | Decimal | `price.amount` |
| `field_currency` | Lista (USD/EUR) | `price.currency` |
| `field_image` | Referencia a archivo/media | `image.src` (se antepone `DRUPAL_BASE_URL`) |
| `field_category` | Taxonomía `category` | `category` (nombre del término) |
| `field_brand` | Taxonomía `brand` | filtro por marca (`brandTerm` en `src/config/brands/*.ts`) |
| `field_stock` | Entero (opcional) | `stock` |

## Consulta que ejecuta la app
```
GET {BASE}/jsonapi/node/product
  ?filter[status]=1
  &filter[field_brand.name]=audi
  &include=field_image,field_category
  &page[limit]=50
```
Sigue `links.next` hasta agotar la paginación. Cada respuesta se cachea con la etiqueta `products:<marca>`.

## Actualización del contenido
El sitio se publica como exportación estática (GitHub Pages): el contenido de Drupal se lee **al compilar**.
Para reflejar un cambio, dispara de nuevo el workflow `.github/workflows/pages.yml` (p. ej. con un webhook de Drupal que llame a `workflow_dispatch` de GitHub).
Si algún día se despliega en un servidor Node (sin `output: "export"`), se puede añadir una ruta `/api/revalidate` con `revalidateTag("products:<marca>")`; el cliente ya etiqueta sus peticiones con esa clave.

## Imágenes remotas
Al usar Drupal añadir el host del CMS a `images.remotePatterns` en `next.config.ts`.

## Dónde está el código
- Adaptador: `src/services/drupal/` (`client.ts`, `drupal.repository.ts`, `mappers/product.mapper.ts`)
- Contrato de la UI: `src/services/products/product.repository.ts`
- Selección de origen: `src/services/products/index.ts`
