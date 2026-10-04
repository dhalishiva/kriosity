// Shared Open Graph artwork.
export const ogSize = { width: 1200, height: 630 };

export function Gem({ size = 360, highlight }: { size?: number; highlight?: string }) {
  const facets: [string, string][] = [
    ["250,28 112,148 176,176", "rgba(201,218,254,0.9)"],
    ["250,28 176,176 250,206", "rgba(201,218,254,0.75)"],
    ["250,28 250,206 324,176", "rgba(201,218,254,0.6)"],
    ["250,28 324,176 388,148", "rgba(201,218,254,0.45)"],
    ["112,148 38,250 148,266 176,176", "rgba(201,218,254,0.55)"],
    ["176,176 148,266 250,274 250,206", "#0377B5"],
    ["250,206 250,274 352,266 324,176", "rgba(201,218,254,0.95)"],
    ["324,176 352,266 462,250 388,148", "rgba(201,218,254,0.35)"],
    ["38,250 148,266 250,548", "#0F7B6C"],
    ["148,266 250,274 250,548", "#C2362B"],
    ["250,274 352,266 250,548", "#4A51DC"],
    ["352,266 462,250 250,548", "#2C64F0"],
  ];
  return (
    <svg width={size} height={(size * 580) / 500} viewBox="0 0 500 580">
      {facets.map(([pts, fill], i) => (
        <polygon key={i} points={pts} fill={highlight && fill.startsWith("#") && fill !== highlight ? "rgba(255,255,255,0.12)" : fill} stroke="#14203a" strokeWidth="3" />
      ))}
    </svg>
  );
}
