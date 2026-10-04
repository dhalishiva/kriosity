import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductsBrowser from "@/components/ProductsBrowser";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — B2B software for finance, operations and industry",
  description:
    "Every Kriosity product in one place: PaidTwice, SlotRecover, Aegistra, FlowSentinel and Gateway. Compare what each does, who it is for and what it costs.",
  alternates: { canonical: "/products" },
  openGraph: { url: `${site.url}/products`, title: "Kriosity products", description: "Focused B2B tools, priced so small teams can say yes." },
};

const listLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kriosity products",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/products/${p.slug}`,
    name: p.name,
  })),
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        intro="Five tools, each aimed at one specific leak in how businesses run. Filter by the kind of work you do, or compare prices below."
      />

      <section className="wrap pb-20">
        <ProductsBrowser />
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <Reveal>
            <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>Pricing at a glance</h2>
            <p className="measure mt-4 text-lg text-slate">Starting prices in US dollars. Each product page has the full plans.</p>
          </Reveal>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Starting price, free option and audience for each product</caption>
              <thead>
                <tr className="border-b-2 border-ink text-sm">
                  <th scope="col" className="py-3 pr-4 font-semibold">Product</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Starts at</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Try before paying</th>
                  <th scope="col" className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-b border-rule">
                    <th scope="row" className="py-4 pr-4">
                      <Link href={`/products/${p.slug}`} className="inline-flex items-center gap-2.5 font-display text-lg font-semibold">
                        <span className="h-3 w-3 rotate-45 rounded-[2px]" style={{ background: p.color }} />
                        <span className="link-u">{p.name}</span>
                      </Link>
                    </th>
                    <td className="py-4 pr-4">{p.fromPrice}</td>
                    <td className="py-4 pr-4 text-slate">
                      {p.slug === "paidtwice" && "Free scan, unlimited"}
                      {p.slug === "slotrecover" && "7-day free trial"}
                      {p.slug === "aegistra" && "Free plan, 3 systems"}
                      {p.slug === "flowsentinel" && "Pilot on request"}
                      {p.slug === "gateway" && "Early-access pilot"}
                    </td>
                    <td className="py-4 text-slate">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need something that isn't here yet?"
        body="Several of these started as one client's request. If your team keeps fixing the same thing by hand, it might be the next one."
      />
      <JsonLd data={listLd} />
    </>
  );
}
