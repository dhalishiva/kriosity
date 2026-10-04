import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/products", 0.9, "weekly"],
    ["/services", 0.7, "monthly"],
    ["/about", 0.6, "monthly"],
    ["/contact", 0.6, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
  ];
  return [
    ...pages.map(([path, priority, changeFrequency]) => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 })),
  ];
}
