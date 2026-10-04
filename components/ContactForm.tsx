"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const topics = [
  ...products.map((p) => ({ value: p.slug, label: `${p.name} question` })),
  { value: "consulting", label: "Consulting or a custom build" },
  { value: "partnership", label: "Partnership or reselling" },
  { value: "other", label: "Something else" },
];

const field =
  "mt-2 w-full rounded-xl bg-paper px-4 py-3 text-ink shadow-[0_0_0_1px_var(--color-rule)] outline-none transition-shadow placeholder:text-slate/60 focus:shadow-[0_0_0_2px_var(--color-glacier)]";

export default function ContactForm() {
  const params = useSearchParams();
  const initial = topics.some((t) => t.value === params.get("topic")) ? params.get("topic")! : "other";
  const [topic, setTopic] = useState(initial);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const label = topics.find((t) => t.value === topic)?.label ?? "Enquiry";
    const subject = `${label} — from ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("company") || ""}\n${data.get("email")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
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
            <h2 className="mt-6 text-3xl">Your email is ready to send</h2>
            <p className="mx-auto mt-3 max-w-sm text-slate">
              Your mail app should have opened with the message filled in. If it didn&rsquo;t, write to{" "}
              <a className="link-u font-medium text-ink" href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
            <button type="button" onClick={() => setSent(false)} className="btn btn-ghost mt-8">Edit message</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              Your name
              <input name="name" required autoComplete="name" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Work email
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              Company <span className="font-normal text-slate">(optional)</span>
              <input name="company" autoComplete="organization" className={field} />
            </label>
            <label className="block text-sm font-semibold">
              What it&rsquo;s about
              <select name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
                {topics.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </label>
            <label className="block text-sm font-semibold sm:col-span-2">
              Message
              <textarea name="message" required rows={6} placeholder="What's happening, and what would a good outcome look like?" className={`${field} resize-y`} />
            </label>
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button type="submit" className="btn btn-primary">Send message</button>
              <p className="text-sm text-slate">Opens your email app with the message filled in.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
