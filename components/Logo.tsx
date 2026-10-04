export function Mark({ size = 28, className = "" }: { size?: number; className?: string }) {
  // A faceted crystal: each facet carries one product colour.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <polygon points="16,1 6,11 16,13" fill="#0377B5" />
      <polygon points="16,1 26,11 16,13" fill="#4A51DC" />
      <polygon points="6,11 16,13 16,31" fill="#C2362B" />
      <polygon points="26,11 16,13 16,31" fill="#0F7B6C" />
      <polygon points="6,11 16,31 3,14" fill="#9DB8F7" />
      <polygon points="26,11 16,31 29,14" fill="#2C64F0" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark />
      <span
        className={`font-display text-[1.45rem] font-semibold tracking-[-0.035em] leading-none ${light ? "text-white" : "text-ink"}`}
        style={{ fontVariationSettings: '"wdth" 90' }}
      >
        kriosity
      </span>
    </span>
  );
}
