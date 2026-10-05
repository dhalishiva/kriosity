import { ImageResponse } from "next/og";
import { Gem, ogSize } from "@/lib/og";

export const alt = "Kriosity — Focused software for the problems big systems leave behind.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#14203a", padding: "70px 80px", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 40, color: "#c9dafe", fontWeight: 700, letterSpacing: -1 }}>kriosity</div>
          <div style={{ fontSize: 70, color: "#fff", fontWeight: 800, lineHeight: 1.02, letterSpacing: -2.5, marginTop: 36 }}>
            Focused software for the problems big systems leave behind.
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.65)", marginTop: 30 }}>PaidTwice · SlotRecover · Aegistra · BeamDrop · Gateway</div>
        </div>
        <Gem size={340} />
      </div>
    ),
    size,
  );
}
