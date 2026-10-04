"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { products } from "@/lib/products";

type P = [number, number];
const T: P = [250, 28];
const UL: P = [112, 148];
const UR: P = [388, 148];
const IL: P = [176, 176];
const IR: P = [324, 176];
const CM: P = [250, 206];
const ML: P = [38, 250];
const MR: P = [462, 250];
const G1: P = [148, 266];
const G2: P = [250, 274];
const G3: P = [352, 266];
const B: P = [250, 548];
const CENTER: P = [250, 270];

type Facet = { pts: P[]; slug?: string; fill?: string; shade?: number };

const facets: Facet[] = [
  { pts: [T, UL, IL], shade: 0.9 },
  { pts: [T, IL, CM], shade: 0.75 },
  { pts: [T, CM, IR], shade: 0.6 },
  { pts: [T, IR, UR], shade: 0.45 },
  { pts: [UL, ML, G1, IL], shade: 0.55 },
  { pts: [IL, G1, G2, CM], slug: "aegistra" },
  { pts: [CM, G2, G3, IR], slug: "flowsentinel" },
  { pts: [IR, G3, MR, UR], shade: 0.35 },
  { pts: [ML, G1, B], slug: "gateway" },
  { pts: [G1, G2, B], slug: "paidtwice" },
  { pts: [G2, G3, B], slug: "slotrecover" },
  { pts: [G3, MR, B], fill: "#2C64F0" },
];

const centroid = (pts: P[]): P => [
  pts.reduce((s, p) => s + p[0], 0) / pts.length,
  pts.reduce((s, p) => s + p[1], 0) / pts.length,
];
const str = (pts: P[]) => pts.map((p) => p.join(",")).join(" ");

export default function Crystal({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (slug: string | null) => void;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setActive(null);
  };

  const activeProduct = products.find((p) => p.slug === active);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[30rem] [perspective:1100px]"
    >
      {/* soft halo behind the gem */}
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-[44%] -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{ background: activeProduct ? activeProduct.tint : "#dfe8fb", scale: activeProduct ? 1.08 : 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div style={{ rotateX: rx, rotateY: ry }} className="[transform-style:preserve-3d]">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg viewBox="0 0 500 580" className="h-auto w-full overflow-visible" role="img" aria-labelledby="crystal-title">
            <title id="crystal-title">The Kriosity crystal. Each coloured facet is one product.</title>
            <defs>
              <linearGradient id="glint" x1="0" x2="1" y1="0" y2="0.3">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <clipPath id="gem-clip">
                <polygon points={str([T, UR, MR, B, ML, UL])} />
              </clipPath>
            </defs>

            {facets.map((f, i) => {
              const c = centroid(f.pts);
              const dx = c[0] - CENTER[0];
              const dy = c[1] - CENTER[1];
              const product = f.slug ? products.find((p) => p.slug === f.slug) : undefined;
              const isActive = product && active === product.slug;
              const dimmed = active && !isActive;
              const fill = product?.color ?? f.fill ?? `rgba(201, 218, 254, ${f.shade})`;
              return (
                <motion.polygon
                  key={i}
                  points={str(f.pts)}
                  fill={fill}
                  stroke="#ffffff"
                  strokeWidth={1.6}
                  strokeLinejoin="round"
                  initial={{ opacity: 0, x: dx * 1.4, y: dy * 1.4 - 40, rotate: (i % 2 ? 1 : -1) * 18 }}
                  animate={{
                    opacity: dimmed ? 0.35 : 1,
                    x: isActive ? dx * 0.16 : 0,
                    y: isActive ? dy * 0.16 : 0,
                    rotate: 0,
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: ready ? 0 : 0.25 + i * 0.06 },
                    default: { type: "spring", stiffness: 90, damping: 16, delay: ready ? 0 : 0.25 + i * 0.06 },
                  }}
                  style={{ transformBox: "fill-box", transformOrigin: "center", cursor: product ? "pointer" : "default" }}
                  onPointerEnter={() => setActive(product ? product.slug : null)}
                  onClick={() => product && router.push(`/products/${product.slug}`)}
                  aria-hidden="true"
                />
              );
            })}

            {/* a glint of light that crosses the gem now and then */}
            <g clipPath="url(#gem-clip)" pointerEvents="none">
              <motion.rect
                width="160"
                height="700"
                y="-60"
                fill="url(#glint)"
                initial={{ x: -260, skewX: -18 }}
                animate={{ x: 620 }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 1.6, repeat: Infinity, repeatDelay: 5.5 }}
              />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      <div className="mt-2 h-14 text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {activeProduct ? (
            <motion.div
              key={activeProduct.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/products/${activeProduct.slug}`} className="font-display text-xl font-semibold" style={{ color: activeProduct.color }}>
                {activeProduct.name}
              </Link>
              <p className="text-sm text-slate">{activeProduct.tagline}</p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4 }}
              className="pt-3 text-sm text-slate"
            >
              Each coloured facet is a product. Point at one.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
