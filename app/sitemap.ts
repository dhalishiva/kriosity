import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

// Real "last changed" dates, so search engines can trust them.
// Update the date when a page's own content changes (not for site-wide header or footer tweaks).
const pageUpdated: Record<string, string> = {
  "": "2026-10-08",
  "/products": "2026-10-10",
  "/guides": "2026-10-24",
  "/services": "2026-10-08",
  "/about": "2026-10-23",
  "/contact": "2026-10-05",
  "/privacy": "2026-10-11",
  "/terms": "2026-10-24",
};

// Product pages: content last changed in lib/products.ts, or when guides were linked from them.
const productUpdated: Record<string, string> = {
  paidtwice: "2026-10-23",
  slotrecover: "2026-10-23",
  mahina: "2026-10-23",
  aegistra: "2026-10-23",
  kriosityops: "2026-10-23",
  beamdrop: "2026-10-24",
  gateway: "2026-10-10",
};

const fallback = "2026-10-10";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/products", 0.9, "weekly"],
    ["/guides", 0.8, "weekly"],
    ["/services", 0.7, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.6, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${site.url}${path}`,
      lastModified: pageUpdated[path] ?? fallback,
      changeFrequency,
      priority,
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: productUpdated[p.slug] ?? fallback,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: g.updated,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
