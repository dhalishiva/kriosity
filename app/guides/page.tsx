import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import ProductGlyph from "@/components/ProductGlyph";
import { guides } from "@/lib/guides";
import { getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides — Fee collection, duplicate payments, no-shows and more",
  description:
    "Practical, step-by-step guides from Kriosity: collecting monthly fees on WhatsApp and UPI, finding duplicate payments in QuickBooks, Xero and NetSuite, reducing no-shows, answering AI security questionnaires and running several apps.",
  alternates: { canonical: "/guides" },
  openGraph: { url: `${site.url}/guides`, title: "Kriosity guides", description: "Step-by-step fixes for problems small teams run into." },
};

const ld = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Kriosity guides",
  url: `${site.url}/guides`,
  publisher: { "@id": `${site.url}/#org` },
  hasPart: guides.map((g) => ({ "@type": "Article", headline: g.title, url: `${site.url}/guides/${g.slug}` })),
};

export default function GuidesPage() {
  const groups = products
    .map((p) => ({ p, items: guides.filter((g) => g.product === p.slug) }))
    .filter((x) => x.items.length);

  return (
    <>
      <PageHeader
        title="Guides"
        intro="Step-by-step fixes for problems small teams run into: chasing fees, money paid twice, empty appointment slots, AI questions from customers and too many apps to keep track of."
      />

      <section className="wrap space-y-14 pb-20">
        {groups.map(({ p, items }) => (
          <Reveal key={p.slug}>
            <h2 className="flex items-center gap-3 font-sans text-sm font-semibold text-slate">
              <ProductGlyph slug={p.slug} size={22} />
              {getProduct(p.slug)!.category} · {p.name}
            </h2>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {items.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="group grid gap-2 py-6 md:grid-cols-[1fr_1.2fr] md:gap-10">
                    <span className="font-display text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-[var(--c)]" style={{ ["--c" as string]: p.color }}>
                      {g.title}
                    </span>
                    <span className="text-slate">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <CtaBand title="Stuck on something not covered here?" body="Tell me about it. If it keeps happening to other teams too, it may become the next guide, or the next product." />
      <JsonLd data={ld} />
    </>
  );
}
