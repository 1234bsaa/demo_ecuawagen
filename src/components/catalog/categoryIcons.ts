import {
  BaseballCap,
  Backpack,
  Car,
  Coffee,
  Key,
  PenNib,
  Sparkle,
  SquaresFour,
  Sunglasses,
  TShirt,
  Umbrella,
  Watch,
  type Icon,
} from "@phosphor-icons/react";

/**
 * Íconos (Phosphor) por slug de categoría. Las categorías que no estén aquí
 * usan `FALLBACK_ICON`, así una categoría nueva del CMS nunca rompe la interfaz.
 */
const CATEGORY_ICONS: Record<string, Icon> = {
  "": SquaresFour, // "Todos"
  relojes: Watch,
  gafas: Sunglasses,
  gorras: BaseballCap,
  paraguas: Umbrella,
  llaveros: Key,
  ropa: TShirt,
  "bolsos-y-viaje": Backpack,
  escritura: PenNib,
  "bebidas-y-hogar": Coffee,
  coleccionables: Car,
};

export const FALLBACK_ICON: Icon = Sparkle;

export function getCategoryIcon(slug: string): Icon {
  return CATEGORY_ICONS[slug] ?? FALLBACK_ICON;
}
