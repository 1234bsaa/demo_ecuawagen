export type CurrencyCode = "USD" | "EUR";

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  description: string;
  price: Money;
  image: ProductImage;
  category: string;
  stock?: number;
}

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name-asc";

export interface ProductFilters {
  query?: string;
  category?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface CategorySummary {
  name: string;
  slug: string;
  count: number;
}
