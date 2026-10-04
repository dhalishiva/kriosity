import type { Product } from "./products";
import { site } from "./site";

export function siteHost(p: Product) {
  return p.url ? new URL(p.url).host : null;
}

export function ctaHref(p: Product) {
  if (p.url) return p.url;
  return `mailto:${site.email}?subject=${encodeURIComponent(`${p.name} early access`)}`;
}
