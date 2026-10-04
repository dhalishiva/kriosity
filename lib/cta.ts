import type { Product } from "./products";
import { site } from "./site";

export function ctaHref(p: Product) {
  if (p.url) return p.url;
  return `mailto:${site.email}?subject=${encodeURIComponent(`${p.name} early access`)}`;
}
