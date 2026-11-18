import { createContext, useContext } from "react";

export type Storefront = {
  route: string;
  query: string;
  urls: Record<string, string>;
  products: Product[];
  selected?: Product;
  cartCount: number;
  heroImage: string;
  auth?: { canRegister: boolean; register: boolean };
  archive?: {
    title: string;
    category: string;
    brand: string;
    price: string;
    sort: string;
    usesVnd: boolean;
  };
  total: number;
  pagination: { label: number; url: string; current: boolean }[];
};

export type Product = {
  id: number;
  name: string;
  brand: string;
  category: "Điện thoại" | "Phụ kiện";
  subcategory?: string;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
  rating: number;
  specs: string[];
  url?: string;
  quickAdd?: boolean;
  priceHtml?: string;
  gallery?: string[];
  reviewCount?: number;
  attributes?: [string, string][];
};

export const StorefrontContext = createContext<Storefront | null>(null);
export const useStorefront = () => useContext(StorefrontContext);

export function filterArchive(name: string, values: Record<string, string> = {}) {
  const url = new URL(window.location.href);
  url.searchParams.delete("paged");
  url.pathname = url.pathname.replace(/\/page\/\d+\/?$/, "/");
  url.searchParams.delete(name);
  Object.entries(values).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });
  window.location.assign(url);
}
