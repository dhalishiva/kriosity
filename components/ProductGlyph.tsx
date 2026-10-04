import { getProduct } from "@/lib/products";

// The product's own app icon, served from /public/logos.
export default function ProductGlyph({
  slug,
  size = 44,
  className = "",
}: {
  slug: string;
  color?: string;
  size?: number;
  className?: string;
}) {
  const p = getProduct(slug);
  if (!p) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.logo}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 rounded-[23%] ${className}`}
      decoding="async"
    />
  );
}
