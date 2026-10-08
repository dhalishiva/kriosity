"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { getProduct, type Product } from "@/lib/products";
import { site } from "@/lib/site";
import { Mark } from "./Logo";

const WA_GREEN = "#25D366";

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.4c-2.1 0-4.1-.6-5.9-1.6l-.4-.3-3.8 1.2 1.2-3.7-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C5 9.9 9.9 5.1 16 5.1s11 4.8 11 10.7-4.9 10.6-11 10.6Zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2l-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2.1-.4 0-.6l-1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.4 3.7 5.9 5.1 2.9 1.1 3.5.9 4.1.8.6-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.3-.6-.4Z"
      />
    </svg>
  );
}

type Topic = { label: string; message: string };

function topicsFor(product?: Product): Topic[] {
  const page = product ? ` (from the ${product.name} page)` : "";
  const about = product ? product.name : "your products";
  return [
    {
      label: product ? `Tell me about ${product.name}` : "Which product fits my team?",
      message: product
        ? `Hi Shiva, I'm looking at ${product.name} on kriosity.in and would like to know if it fits our team.\n\nOur company: \nWhat we need: `
        : `Hi Shiva, I found Kriosity and I'm trying to work out which product fits our team.\n\nOur company: \nWhat we need: `,
    },
    {
      label: "Pricing or a demo",
      message: `Hi Shiva, I'd like to discuss pricing or see a demo of ${about}${page}.\n\nOur company: \nTeam size: `,
    },
    {
      label: "Help with my account",
      message: `Hi Shiva, I'm an existing customer and need help${product ? ` with ${product.name}` : ""}.\n\nEmail I signed up with: \nWhat's happening: `,
    },
    {
      label: "Consulting or a custom build",
      message: `Hi Shiva, I'm interested in consulting or a custom build${page}.\n\nOur company: \nWhat we're trying to do: `,
    },
  ];
}

const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

function istStatus() {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()),
  );
  return hour >= 10 && hour < 20
    ? { online: true, text: "Usually replies within an hour" }
    : { online: false, text: "Replies from 10am IST" };
}

function WhatsAppWidget({ product }: { product?: Product }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ online: true, text: "Usually replies within an hour" });
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const topics = topicsFor(product);

  useEffect(() => setStatus(istStatus()), [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="relative">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="wa-panel"
            role="dialog"
            aria-label="Chat with Kriosity on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            style={{ transformOrigin: "bottom right" }}
            className="absolute bottom-16 right-0 w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl bg-paper shadow-[0_30px_70px_-20px_rgba(20,32,58,0.5),0_0_0_1px_var(--color-rule)]"
          >
            <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4 text-white">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white">
                <Mark size={26} />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-display text-lg font-semibold">Shiva at Kriosity</p>
                <p className="flex items-center gap-1.5 text-sm text-white/80">
                  <span className={`h-2 w-2 rounded-full ${status.online ? "bg-[#25D366]" : "bg-white/50"}`} />
                  {status.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                aria-label="Close chat"
                className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="m2 2 10 10M12 2 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="bg-[#EFEAE2] px-4 pb-4 pt-5">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="relative max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[0.95rem] leading-snug text-ink shadow-sm"
              >
                <p>Hi there 👋</p>
                <p className="mt-1.5">
                  {product
                    ? `Have a question about ${product.name}? I built it, so ask me anything.`
                    : "I'm Shiva, the engineer behind Kriosity. Ask me anything about the products or a project you have in mind."}
                </p>
                <p className="mt-1.5 text-slate">Pick a topic and I&rsquo;ll reply on WhatsApp.</p>
                <span className="mt-1 block text-right text-[0.7rem] text-slate/70">Kriosity</span>
              </motion.div>

              <ul className="mt-4 space-y-2">
                {topics.map((t, i) => (
                  <motion.li
                    key={t.label}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                  >
                    <a
                      href={waLink(t.message)}
                      target="_blank"
                      rel="noopener"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-2.5 text-left text-[0.92rem] font-medium text-[#075E54] shadow-sm transition-colors hover:bg-[#DCF8C6]"
                    >
                      {t.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
                        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={waLink(topics[0].message)}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold text-white transition-[filter] hover:brightness-105"
                style={{ background: WA_GREEN }}
              >
                <WhatsAppIcon size={20} />
                Start chat
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
              </a>
              <p className="mt-2.5 text-center text-xs text-slate">
                Prefer email? <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="wa-panel"
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="relative grid h-12 w-12 place-items-center rounded-full text-white shadow-[0_10px_24px_-10px_rgba(20,32,58,0.5)]"
        style={{ background: WA_GREEN }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "wa"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative grid place-items-center"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 14 14" aria-hidden="true">
                <path d="m2 2 10 10M12 2 2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <WhatsAppIcon size={24} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default function FloatingActions() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [showTop, setShowTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 600));

  const product = pathname.startsWith("/products/") ? getProduct(pathname.split("/")[2]) : undefined;

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="relative grid h-12 w-12 place-items-center rounded-full bg-paper text-ink shadow-[0_12px_30px_-12px_rgba(20,32,58,0.45),0_0_0_1px_var(--color-rule)]"
          >
            <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <motion.circle cx="24" cy="24" r="22.5" fill="none" stroke="var(--color-glacier)" strokeWidth="2" style={{ pathLength: progress }} />
            </svg>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M9 14.5v-11M4 8l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {site.whatsapp && <WhatsAppWidget product={product} />}
    </div>
  );
}
