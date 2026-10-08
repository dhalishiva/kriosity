"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { motion } from "motion/react";
import Crystal from "./Crystal";
import ProductGlyph from "./ProductGlyph";
import { products } from "@/lib/products";

const headline = "Focused software for the problems big systems leave behind.";
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid items-center gap-8 pb-14 pt-8 md:pt-14 lg:grid-cols-[1.45fr_1fr] lg:gap-10 lg:pb-20">
        <div>
          <h1
            className="font-display font-semibold leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.75rem)", fontVariationSettings: '"wdth" 88' }}
          >
            {headline.split(" ").map((word, i) => (
              <Fragment key={i}>
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.05 + i * 0.035 }}
                >
                  {word}
                </motion.span>
              </span>{" "}
              </Fragment>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            className="mt-6 max-w-[40rem] text-lg text-slate md:text-xl"
          >
            Five small tools from an independent studio: catch duplicate vendor payments, refill cancelled appointments,
            keep the AI register customers ask about, send files of any size, and get PLC data onto OPC UA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.68 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/products" className="btn btn-primary">See products</Link>
            <Link href="/contact" className="btn btn-ghost">Contact me</Link>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.85 } } }}
            className="mt-10 flex flex-wrap gap-x-2 gap-y-2"
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
                  className="inline-flex items-center gap-2 rounded-full bg-paper py-1.5 pl-1.5 pr-3.5 text-sm font-medium shadow-[0_0_0_1px_var(--color-rule)] transition-[box-shadow,color] duration-200"
                  style={active === p.slug ? { boxShadow: `0 0 0 1.5px ${p.color}`, color: p.color } : undefined}
                >
                  <ProductGlyph slug={p.slug} size={20} />
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
