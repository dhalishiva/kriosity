"use client";
import { motion } from "motion/react";

export default function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="wrap pb-12 pt-12 md:pb-16 md:pt-20">
      <h1
        className="max-w-4xl font-display font-semibold leading-[0.95] tracking-[-0.035em]"
        style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.4rem)", fontVariationSettings: '"wdth" 82' }}
      >
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            {title}
          </motion.span>
        </span>
      </h1>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="measure mt-6 text-lg text-slate md:text-xl"
        >
          {intro}
        </motion.p>
      )}
    </section>
  );
}
