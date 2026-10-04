"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

export default function CtaBand({
  title = "Have a workflow that keeps breaking quietly?",
  body = "Tell me about it. Some of the best products here started as a single message like that.",
  primary = { href: "/contact", label: "Start a conversation" },
  secondary = { href: "/products", label: "See the products" },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  const x = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const y = useSpring(useMotionValue(40), { stiffness: 80, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(520px circle at ${x}% ${y}%, rgba(44,100,240,0.55), transparent 65%)`;

  return (
    <section className="wrap py-20 md:py-28">
      <div
        className="relative overflow-hidden rounded-[2rem] bg-deep px-6 py-16 text-white md:px-16 md:py-24"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(((e.clientX - r.left) / r.width) * 100);
          y.set(((e.clientY - r.top) / r.height) * 100);
        }}
      >
        <motion.div aria-hidden="true" className="absolute inset-0" style={{ background: bg }} />
        <div className="grain" />
        <div className="relative max-w-2xl">
          <h2 className="text-4xl md:text-6xl" style={{ fontVariationSettings: '"wdth" 85' }}>{title}</h2>
          <p className="mt-5 max-w-xl text-lg text-white/75">{body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn btn-light">{primary.label}</Link>
            <Link href={secondary.href} className="btn text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.3)] hover:shadow-[inset_0_0_0_1.5px_#fff]">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
