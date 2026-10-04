"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import ProductGlyph from "./ProductGlyph";
import StatusPill from "./StatusPill";
import type { Product } from "@/lib/products";

export default function ProductRows({ items }: { items: Product[] }) {
  return (
    <ul className="border-t border-rule">
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((p) => (
          <motion.li
            key={p.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-rule"
          >
            <Link href={`/products/${p.slug}`} className="group relative block overflow-hidden rounded-none focus-visible:rounded-xl">
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                style={{ background: p.tint }}
              />
              <div className="relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 px-1 py-7 md:grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)_10rem_auto] md:gap-x-8 md:px-4 md:py-9">
                <div className="transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-6 group-hover:scale-110">
                  <ProductGlyph slug={p.slug} color={p.color} />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3
                      className="font-display text-[1.9rem] font-semibold tracking-[-0.03em] md:text-[2.4rem]"
                      style={{ fontVariationSettings: '"wdth" 85' }}
                    >
                      {p.name}
                    </h3>
                    <StatusPill status={p.status} color={p.color} />
                  </div>
                  <p className="mt-1 text-slate">{p.tagline}</p>
                </div>

                <p className="col-span-3 col-start-1 text-[0.95rem] text-slate md:col-span-1 md:col-start-auto">
                  {p.audience}
                </p>

                <p className="col-span-2 col-start-1 font-medium md:col-span-1 md:col-start-auto">{p.fromPrice}</p>

                <span
                  aria-hidden="true"
                  className="col-start-3 row-start-1 grid h-11 w-11 place-items-center rounded-full bg-paper shadow-[0_0_0_1px_var(--color-rule)] transition-all duration-300 group-hover:shadow-none md:col-start-auto md:row-start-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:-rotate-45" style={{ color: p.color }}>
                    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
