import type { Money } from "@/domain/product";

export function formatMoney({ amount, currency }: Money, locale = "es-EC"): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}
