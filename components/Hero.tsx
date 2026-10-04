"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import Crystal from "./Crystal";
import { products } from "@/lib/products";

const lines = ["Focused software", "for the problems", "big systems leave", "behind."];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid items-center gap-10 pb-16 pt-10 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-24">
        <div>
          <h1
            className="font-display font-semibold leading-[0.95] tracking-[-0.045em]"
            style={{ fontSize: "clamp(2.9rem, 7.4vw, 6.1rem)", fontVariationSettings: '"wdth" 82' }}
          >
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.05 + i * 0.09 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="measure mt-7 text-lg text-slate md:text-xl"
          >
            Kriosity is an independent software studio. Every product here started as a real problem in enterprise finance,
            operations or industry, and each one does a single job well.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.68 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/products" className="btn btn-primary">Browse products</Link>
            <Link href="/services" className="btn btn-ghost">Work with me</Link>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.85 } } }}
            className="mt-12 flex flex-wrap gap-x-2 gap-y-2"
            aria-label="Products"
          >
            {products.map((p) => (
              <motion.li key={p.slug} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
                <Link
                  href={`/products/${p.slug}`}
                  onPointerEnter={() => setActive(p.slug)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(p.slug)}
                  onBlur={() => setActive(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-sm font-medium shadow-[0_0_0_1px_var(--color-rule)] transition-[box-shadow,color] duration-200"
                  style={active === p.slug ? { boxShadow: `0 0 0 1.5px ${p.color}`, color: p.color } : undefined}
                >
                  <span className="h-2.5 w-2.5 rotate-45 rounded-[2px]" style={{ background: p.color }} />
                  {p.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Crystal active={active} setActive={setActive} />
      </div>
    </section>
  );
}
