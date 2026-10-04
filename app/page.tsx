import Link from "next/link";
import Hero from "@/components/Hero";
import ProductRows from "@/components/ProductRows";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { products } from "@/lib/products";

const principles = [
  {
    title: "Born on a client site",
    body: "Each product began as a problem I was paid to fix by hand: a duplicate invoice, a mailbox that went quiet, an expensive licence for a simple job.",
  },
  {
    title: "Your data stays where it should",
    body: "PaidTwice never uploads your payments. FlowSentinel isolates every tenant. Collecting less is a feature, not an afterthought.",
  },
  {
    title: "Priced so a small team can say yes",
    body: "Free tiers, one-time passes and single plans. No sales call needed to find out what something costs.",
  },
];

const domains = [
  { name: "Accounts payable automation", detail: "Invoice capture, approval workflows and the mailboxes that feed them." },
  { name: "Manufacturing quality systems", detail: "SPC platforms across dozens of plants, their databases and their archives." },
  { name: "Industrial connectivity", detail: "OPC servers, PLC data and node-locked licensing on air-gapped networks." },
  { name: "Product engineering", detail: "React, Node, Supabase and Postgres, shipped and run in production." },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="products" className="wrap scroll-mt-24 py-16 md:py-24">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-4xl md:text-6xl" style={{ fontVariationSettings: '"wdth" 85' }}>The catalogue</h2>
            <p className="measure mt-4 text-lg text-slate">
              {products.filter((p) => p.status === "Live").length} products live, one in the workshop. Each has its own home;
              this is where they meet.
            </p>
          </div>
          <Link href="/products" className="btn btn-ghost self-start md:self-auto">Compare all products</Link>
        </Reveal>
        <div className="mt-12">
          <ProductRows items={products} />
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="text-4xl md:text-[3.4rem]" style={{ fontVariationSettings: '"wdth" 85' }}>
              Small tools, chosen problems.
            </h2>
            <p className="measure mt-5 text-lg text-slate">
              Big platforms are good at the common case. The money leaks out at the edges: the near-duplicate, the silent failure,
              the slot nobody refilled. That edge is where Kriosity works.
            </p>
          </Reveal>
          <ul className="divide-y divide-rule border-y border-rule">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="grid gap-2 py-7 md:grid-cols-[14rem_1fr] md:gap-8">
                <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="text-slate">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Reveal>
            <p className="font-display text-[1.65rem] font-medium leading-snug tracking-[-0.02em] md:text-[2.2rem]">
              I&rsquo;m Shiva, a systems engineer in Noida. By day I work inside enterprise finance and manufacturing systems.
              Kriosity is where the fixes I keep rebuilding become products anyone can use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-primary">Read the story</Link>
              <Link href="/services" className="btn btn-ghost">Consulting services</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-sans text-sm font-semibold text-slate">Where the experience comes from</h2>
            <dl className="mt-4 space-y-5">
              {domains.map((d) => (
                <div key={d.name} className="border-l-2 border-glacier pl-4">
                  <dt className="font-semibold">{d.name}</dt>
                  <dd className="text-slate">{d.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
