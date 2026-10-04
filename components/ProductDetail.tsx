"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import ProductGlyph from "./ProductGlyph";
import StatusPill from "./StatusPill";
import type { Product } from "@/lib/products";
import { ctaHref, siteHost } from "@/lib/cta";

export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M5 2.5h6.5V9M11.5 2.5 3 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export function ProductHero({ p }: { p: Product }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glyphY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glyphR = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: p.tint }}>
      <div className="wrap relative grid gap-10 pb-16 pt-8 md:grid-cols-[1.5fr_1fr] md:items-center md:pb-24 md:pt-12">
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-slate">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="link-u">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/products" className="link-u">Products</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-ink">{p.name}</li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-10 flex flex-wrap items-center gap-3">
            <StatusPill status={p.status} color={p.color} />
            <span className="text-sm font-medium text-slate">{p.category}</span>
          </motion.div>

          <h1
            className="mt-4 overflow-hidden pb-[0.05em] font-display font-bold leading-[0.95] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3.2rem, 10vw, 8rem)", fontVariationSettings: '"wdth" 84', color: p.color }}
          >
            <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
              {p.name}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            className="mt-5 max-w-2xl font-display text-2xl font-medium tracking-[-0.02em] md:text-[2.1rem] md:leading-tight"
          >
            {p.tagline}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="measure mt-4 text-lg text-slate"
          >
            {p.oneLiner}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={ctaHref(p)}
              {...(p.url ? { target: "_blank", rel: "noopener" } : {})}
              className="btn text-white hover:brightness-110"
              style={{ background: p.color, boxShadow: `0 12px 30px -12px ${p.color}` }}
            >
              {p.url ? `Visit ${siteHost(p)}` : p.ctaLabel}
              {p.url && <ExternalIcon />}
              {p.url && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
            <a href="#pricing" className="btn btn-ghost bg-paper/60">See pricing</a>
          </motion.div>
        </div>

        <motion.div style={{ y: glyphY, rotate: glyphR }} className="hidden justify-center md:flex">
          <motion.div
            initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.15 }}
            className="w-full max-w-[17rem]"
          >
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener" aria-label={`Visit ${p.name} (opens in a new tab)`} className="group relative block">
                <ProductGlyph slug={p.slug} size={272} className="h-auto w-full shadow-[0_40px_80px_-30px_rgba(20,32,58,0.45)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.03]" />
                <span className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-paper px-4 py-2 text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(20,32,58,0.4)]" style={{ color: p.color }}>
                  {siteHost(p)} <ExternalIcon />
                </span>
              </a>
            ) : (
              <ProductGlyph slug={p.slug} size={272} className="h-auto w-full shadow-[0_40px_80px_-30px_rgba(20,32,58,0.45)]" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function Steps({ p }: { p: Product }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <ol ref={ref} className="relative mt-12 space-y-10 pl-14 md:pl-20">
      <span aria-hidden="true" className="absolute bottom-2 left-[1.15rem] top-2 w-[2px] bg-rule md:left-[1.65rem]" />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-2 left-[1.15rem] top-2 w-[2px] origin-top md:left-[1.65rem]"
        style={{ scaleY, background: p.color }}
      />
      {p.steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 0.6, ease }}
          className="relative"
        >
          <span
            className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full bg-paper font-display text-lg font-semibold shadow-[0_0_0_2px_var(--color-rule)] md:-left-20 md:h-14 md:w-14 md:text-xl"
            style={{ color: p.color }}
          >
            {i + 1}
          </span>
          <h3 className="pt-1.5 font-display text-2xl font-semibold tracking-tight md:pt-3">{s.title}</h3>
          <p className="measure mt-2 text-slate">{s.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function Faq({ p }: { p: Product }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="border-t border-rule">
      {p.faq.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-b border-rule">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold tracking-tight"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-2xl font-normal leading-none"
                  style={{ background: p.tint, color: p.color }}
                >
                  +
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                >
                  <p className="measure pb-6 text-slate">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function StickyVisitBar({ p }: { p: Product }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const nearEnd = window.innerHeight + y > document.body.scrollHeight - 520;
    setShow(y > 520 && !nearEnd);
  });
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="flex items-center gap-3 rounded-full bg-paper/90 py-2 pl-2 pr-2 shadow-[0_20px_50px_-15px_rgba(20,32,58,0.45),0_0_0_1px_var(--color-rule)] backdrop-blur-xl sm:gap-4">
            <ProductGlyph slug={p.slug} size={36} />
            <div className="hidden leading-tight sm:block">
              <p className="font-display text-base font-semibold">{p.name}</p>
              <p className="text-xs text-slate">{p.fromPrice}</p>
            </div>
            <a href="#pricing" className="btn btn-ghost !px-4 !py-2.5 text-sm">Pricing</a>
            <a
              href={ctaHref(p)}
              {...(p.url ? { target: "_blank", rel: "noopener" } : {})}
              className="btn !px-4 !py-2.5 text-sm text-white hover:brightness-110"
              style={{ background: p.color }}
            >
              {p.url ? "Visit site" : p.ctaLabel}
              {p.url && <ExternalIcon />}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
