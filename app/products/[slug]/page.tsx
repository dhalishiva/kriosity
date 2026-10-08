import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq, ProductHero, Steps } from "@/components/ProductDetail";
import ProductGlyph from "@/components/ProductGlyph";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { getProduct, products } from "@/lib/products";
import { ctaHref, siteHost } from "@/lib/cta";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const url = `${site.url}/products/${p.slug}`;
  return {
    title: { absolute: p.seo.title },
    description: p.seo.description,
    keywords: p.seo.keywords,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { type: "website", url, title: p.seo.title, description: p.seo.description },
    twitter: { card: "summary_large_image", title: p.seo.title, description: p.seo.description },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const others = products.filter((o) => o.slug !== p.slug);
  const url = `${site.url}/products/${p.slug}`;

  const offers = p.tiers
    .filter((t) => /^\$\d/.test(t.price) || t.price === "Free")
    .map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: t.price === "Free" ? "0" : t.price.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      url: p.url ?? url,
      availability: p.status === "Live" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    }));

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.oneLiner,
        applicationCategory: p.seo.appCategory,
        operatingSystem: p.slug === "gateway" ? "Windows Server 2019 or later" : "Web",
        url,
        sameAs: p.url ? [p.url] : undefined,
        publisher: { "@id": `${site.url}/#org` },
        featureList: p.features.map((f) => f.title),
        ...(offers.length ? { offers } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <ProductHero p={p} />

      {/* Problem */}
      <section className="wrap grid gap-8 py-20 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>{p.problem.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl leading-relaxed text-slate md:pt-2">{p.problem.body}</p>
        </Reveal>
      </section>

      {/* How it works */}
      <section className="bg-paper py-20 md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>How it works</h2>
            <p className="measure mt-4 text-lg text-slate">{p.steps.length} steps from first use to result.</p>
          </Reveal>
          <Steps p={p} />
        </div>
      </section>

      {/* Features */}
      <section className="wrap py-20 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>What you get</h2>
        </Reveal>
        <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <dt className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight">
                <span className="h-2.5 w-2.5 shrink-0 rotate-45 rounded-[2px]" style={{ background: p.color }} />
                {f.title}
              </dt>
              <dd className="mt-2 pl-[1.4rem] text-slate">{f.body}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-20 py-20 md:py-28" style={{ background: p.tint }}>
        <div className="wrap">
          <Reveal>
            <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>Pricing</h2>
            <p className="measure mt-4 text-lg text-slate">
              {p.tiers.every((t) => t.price === "Free")
                ? "Free to use. No account or card needed."
                : p.status === "Live"
                  ? "Prices in US dollars. Taxes may apply."
                  : "Planned pricing. Early-access sites get it locked in."}
            </p>
          </Reveal>
          <div
            className={`mt-12 grid gap-5 ${
              p.tiers.length >= 4 ? "md:grid-cols-2 xl:grid-cols-4" : p.tiers.length === 3 ? "md:grid-cols-3" : "max-w-md"
            }`}
          >
            {p.tiers.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 0.07}
                className={`flex flex-col rounded-3xl bg-paper p-7 ${t.highlight ? "shadow-[0_30px_60px_-30px_rgba(20,32,58,0.35)]" : ""}`}
              >
                <div style={t.highlight ? { boxShadow: `inset 0 3px 0 ${p.color}` } : undefined} className="-mx-7 -mt-7 rounded-t-3xl px-7 pt-7">
                  <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm text-slate">{t.blurb}</p>
                </div>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-semibold tracking-tight" style={{ color: t.highlight ? p.color : undefined }}>
                    {t.price}
                  </span>
                  {t.cadence && <span className="text-sm text-slate">{t.cadence}</span>}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-[0.95rem]">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <svg width="18" height="18" viewBox="0 0 18 18" className="mt-1 shrink-0" aria-hidden="true">
                        <path d="m4 9.5 3 3 7-7" fill="none" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={ctaHref(p)}
                  {...(p.url ? { target: "_blank", rel: "noopener" } : {})}
                  className={`btn mt-8 justify-center ${t.highlight ? "text-white hover:brightness-110" : "btn-ghost"}`}
                  style={t.highlight ? { background: p.color } : undefined}
                >
                  {t.price === "Custom" || t.price === "Annual licence"
                    ? `Contact about ${t.name}`
                    : t.price === "$0" || p.tiers.length === 1
                      ? p.ctaLabel
                      : `Get ${t.name}`}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who + FAQ */}
      <section className="wrap grid gap-16 py-20 md:py-28 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <h2 className="text-3xl md:text-4xl" style={{ fontVariationSettings: '"wdth" 85' }}>Built for</h2>
          <ul className="mt-6 space-y-3">
            {p.forWho.map((w) => (
              <li key={w} className="flex items-center gap-3 text-lg">
                <span className="h-px w-6" style={{ background: p.color }} />
                {w}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-6 text-3xl md:text-4xl" style={{ fontVariationSettings: '"wdth" 85' }}>Questions</h2>
          <Faq p={p} />
        </Reveal>
      </section>

      {/* More products */}
      <section className="border-t border-rule bg-paper py-16 md:py-20">
        <div className="wrap">
          <h2 className="font-sans text-sm font-semibold text-slate">More from Kriosity</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/products/${o.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl bg-frost p-5 shadow-[0_0_0_1px_var(--color-rule)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1"
                  style={{ ["--c" as string]: o.color }}
                >
                  <ProductGlyph slug={o.slug} size={40} />
                  <span>
                    <span className="block font-display text-xl font-semibold transition-colors group-hover:text-[var(--c)]">{o.name}</span>
                    <span className="mt-1 block text-sm text-slate">{o.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={p.status === "Live" ? `Ready to try ${p.name}?` : `Want ${p.name} at your site?`}
        body={p.status === "Live" ? p.oneLiner : "Early-access pilots are open. Tell me about your plant, your PLCs and how many sites you run."}
        primary={p.url ? { href: p.url, label: `Visit ${siteHost(p)}` } : { href: "/contact?topic=gateway", label: "Request early access" }}
        secondary={{ href: `/contact?topic=${p.slug}`, label: "Contact me" }}
      />
      <JsonLd data={ld} />
    </>
  );
}
