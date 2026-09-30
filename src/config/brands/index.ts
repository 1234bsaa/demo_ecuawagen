import { audi } from "./audi";
import type { BrandConfig } from "./types";

/** Para añadir una marca: crear su archivo de configuración y registrarla aquí. */
const brands: Record<string, BrandConfig> = {
  [audi.id]: audi,
};

export function getBrand(id: string): BrandConfig | undefined {
  return brands[id];
}

export function getAllBrands(): BrandConfig[] {
  return Object.values(brands);
}

export type { BrandConfig };
