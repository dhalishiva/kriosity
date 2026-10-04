// Hand-drawn marks for each product, in the product's colour.
export default function ProductGlyph({ slug, color, size = 44 }: { slug: string; color: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 48 48", fill: "none", "aria-hidden": true } as const;
  const s = { stroke: color, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  switch (slug) {
    case "paidtwice":
      return (
        <svg {...common}>
          <rect x="7" y="6" width="22" height="30" rx="3" fill={color} opacity="0.18" />
          <rect x="17" y="12" width="22" height="30" rx="3" fill="#fff" {...s} />
          <path d="M22 21h12M22 27h12M22 33h7" {...s} />
        </svg>
      );
    case "slotrecover":
      return (
        <svg {...common}>
          <rect x="6" y="9" width="36" height="32" rx="4" {...s} />
          <path d="M6 17h36M15 5v7M33 5v7" {...s} />
          <rect x="14" y="23" width="9" height="8" rx="2" fill={color} />
          <rect x="26" y="23" width="9" height="8" rx="2" stroke={color} strokeWidth="2" strokeDasharray="3 2.5" />
        </svg>
      );
    case "aegistra":
      return (
        <svg {...common}>
          <path d="M24 4 40 10v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" fill={color} opacity="0.15" />
          <path d="M24 4 40 10v12c0 10-7 18-16 22C15 40 8 32 8 22V10z" {...s} />
          <circle cx="24" cy="18" r="3" fill={color} />
          <circle cx="17" cy="28" r="3" fill={color} />
          <circle cx="31" cy="28" r="3" fill={color} />
          <path d="M24 18 17 28h14z" {...s} strokeWidth={1.8} />
        </svg>
      );
    case "flowsentinel":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="38" height="26" rx="4" {...s} />
          <path d="m6 13 18 13 18-13" {...s} />
          <circle cx="39" cy="11" r="6" fill={color} />
          <path d="M37 11h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "gateway":
      return (
        <svg {...common}>
          <path d="M24 5 40 14v20l-16 9-16-9V14z" fill={color} opacity="0.15" />
          <path d="M24 5 40 14v20l-16 9-16-9V14z" {...s} />
          <circle cx="24" cy="24" r="4" fill={color} />
          <path d="M24 20v-8M24 28v8M20.5 22 14 18.5M27.5 26l6.5 3.5" {...s} />
        </svg>
      );
    default:
      return null;
  }
}
