"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const topics = [
  ...products.map((p) => ({ value: p.slug, label: `${p.name} question` })),
  { value: "support", label: "Support for an existing account" },
  { value: "consulting", label: "Consulting or a custom build" },
  { value: "partnership", label: "Partnership or reselling" },
  { value: "other", label: "Something else" },
];

const field =
  "mt-2 w-full rounded-xl bg-paper px-4 py-3 text-ink shadow-[0_0_0_1px_var(--color-rule)] outline-none transition-shadow placeholder:text-slate/60 focus:shadow-[0_0_0_2px_var(--color-glacier)]";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const params = useSearchParams();
  const initial = topics.some((t) => t.value === params.get("topic")) ? params.get("topic")! : "other";
  const [topic, setTopic] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || `The message didn't go through. Email ${site.email} directly.`);
      setStatus("sent");
      formRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : `The message didn't go through. Email ${site.email} directly.`);
      setStatus("idle");
    }
  };

  const replyTo = topic === "support" ? site.supportEmail : site.email;

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-[2rem] bg-paper p-10 text-center shadow-[0_0_0_1px_var(--color-rule)]"
            role="status"
          >
            <motion.svg width="72" height="72" viewBox="0 0 72 72" className="mx-auto" aria-hidden="true">
              <motion.circle cx="36" cy="36" r="32" fill="none" stroke="#2C64F0" strokeWidth="3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
              <motion.path d="m24 37 8 8 16-17" fill="none" stroke="#2C64F0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
            </motion.svg>
            <h2 className="mt-6 text-3xl">Message sent</h2>
            <p className="mx-auto mt-3 max-w-sm text-slate">
              Thanks for writing. You&rsquo;ll get a reply from <span className="font-medium text-ink">{replyTo}</span> within two working days.
            </p>
            <button
              type="button"
              onClick={() => {
                startedAt.current = Date.now();
                setStatus("idle");
              }}
              className="btn btn-ghost mt-8"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            ref={formRef}
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <label className="block text-sm font-semibold">
              Your name
              <input name="name" required maxLength={120} autoComplete="name" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Work email
              <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Company <span className="font-normal text-slate">(optional)</span>
              <input name="company" maxLength={160} autoComplete="organization" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              What it&rsquo;s about
              <select name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
                {topics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold sm:col-span-2">
              Message
              <textarea
                name="message"
                required
                rows={6}
                maxLength={5000}
                placeholder="What's happening, and what would a good outcome look like?"
                className={`${field} resize-y`}
              />
            </label>

            {/* Hidden from people; bots tend to fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl bg-[#FBE8E5] px-4 py-3 text-sm font-medium text-[#8F2219] sm:col-span-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
                {status === "sending" && (
                  <motion.span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                )}
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <p className="text-sm text-slate">
                Goes to <span className="font-medium text-ink">{replyTo}</span>
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
