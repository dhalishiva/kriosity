import { ImageResponse } from "next/og";
import { Gem, ogSize } from "@/lib/og";
import { getProduct, products } from "@/lib/products";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kriosity product";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug)!;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: p.tint, padding: "70px 80px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 30, color: "#56627a", fontWeight: 600 }}>kriosity / products</div>
          <div style={{ fontSize: 124, color: p.color, fontWeight: 800, letterSpacing: -5, marginTop: 24, lineHeight: 1 }}>{p.name}</div>
          <div style={{ fontSize: 46, color: "#17202e", fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, marginTop: 24 }}>{p.tagline}</div>
          <div style={{ fontSize: 28, color: "#56627a", marginTop: 26 }}>{p.fromPrice}</div>
        </div>
        <div style={{ display: "flex", background: "#14203a", borderRadius: 48, padding: 36 }}>
          <Gem size={220} highlight={p.color} />
        </div>
      </div>
    ),
    size,
  );
}
