import { ImageResponse } from "next/og";
import { Gem, ogSize } from "@/lib/og";
import { getGuide, guides } from "@/lib/guides";
import { getProduct } from "@/lib/products";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Kriosity guide";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug)!;
  const p = getProduct(g.product)!;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: p.tint, padding: "70px 80px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontSize: 30, color: "#56627a", fontWeight: 600 }}>kriosity / guides</div>
          <div style={{ fontSize: 66, color: "#17202e", fontWeight: 800, letterSpacing: -2, marginTop: 28, lineHeight: 1.05 }}>{g.title}</div>
          <div style={{ fontSize: 30, color: p.color, fontWeight: 700, marginTop: 32 }}>{`With ${p.name}`}</div>
        </div>
        <div style={{ display: "flex", background: "#14203a", borderRadius: 48, padding: 32 }}>
          <Gem size={180} />
        </div>
      </div>
    ),
    size,
  );
}
