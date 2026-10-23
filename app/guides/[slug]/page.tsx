import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import ProductGlyph from "@/components/ProductGlyph";
import { getGuide, guides } from "@/lib/guides";
import { getProduct } from "@/lib/products";
import { siteHost } from "@/lib/cta";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `${site.url}/guides/${g.slug}`;
  return {
    title: { absolute: g.seoTitle },
    description: g.description,
    keywords: g.keywords,
    authors: [{ name: site.founder, url: `${site.url}/about` }],
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      url,
      title: g.seoTitle,
      description: g.description,
      siteName: site.name,
      publishedTime: g.published,
      modifiedTime: g.updated,
      authors: [site.founder],
    },
    twitter: { card: "summary_large_image", site: site.xHandle, creator: site.xHandle, title: g.seoTitle, description: g.description },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const p = getProduct(g.product)!;
  const url = `${site.url}/guides/${g.slug}`;
  const related = guides.filter((o) => o.slug !== g.slug).sort((a, b) => Number(b.product === g.product) - Number(a.product === g.product)).slice(0, 3);

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: g.title,
        description: g.description,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        datePublished: g.published,
        dateModified: g.updated,
        inLanguage: "en",
        keywords: g.keywords.join(", "),
        author: { "@id": `${site.url}/about#founder` },
        publisher: { "@id": `${site.url}/#org` },
        about: { "@type": "SoftwareApplication", name: p.name, url: `${site.url}/products/${p.slug}` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
          { "@type": "ListItem", position: 3, name: g.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <article className="wrap pb-10 pt-10 md:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate">
          <Link href="/guides" className="link-u">Guides</Link>
          <span aria-hidden="true"> / </span>
          <Link href={`/products/${p.slug}`} className="link-u">{p.name}</Link>
        </nav>

        <header className="mt-6 max-w-4xl">
          <h1
            className="font-display font-semibold leading-[1] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontVariationSettings: '"wdth" 85' }}
          >
            {g.title}
          </h1>
          <p className="mt-6 text-sm text-slate">
            By <Link href="/about" className="link-u font-medium text-ink">{site.founder}</Link> · Updated{" "}
            <time dateTime={g.updated}>{fmt(g.updated)}</time>
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-16">
          <div className="text-[1.075rem] leading-[1.75]">
            <p className="text-lg leading-relaxed md:text-xl">{g.intro}</p>

            {g.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="mt-12 text-3xl md:text-[2.1rem]" style={{ fontVariationSettings: '"wdth" 88' }}>{s.heading}</h2>
                {s.paras?.map((t, i) => <p key={i} className="mt-4 text-slate">{t}</p>)}
                {s.list &&
                  (s.ordered ? (
                    <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate marker:font-semibold marker:text-ink">
                      {s.list.map((t) => <li key={t} className="pl-1">{t}</li>)}
                    </ol>
                  ) : (
                    <ul className="mt-4 space-y-2.5 text-slate">
                      {s.list.map((t) => (
                        <li key={t} className="flex gap-3">
                          <span className="mt-[0.7em] h-2 w-2 shrink-0 rotate-45 rounded-[2px]" style={{ background: p.color }} aria-hidden="true" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                {s.after?.map((t, i) => <p key={i} className="mt-4 text-slate">{t}</p>)}
              </section>
            ))}

            <aside className="mt-14 rounded-3xl p-7 md:p-9" style={{ background: p.tint }} aria-label={`About ${p.name}`}>
              <div className="flex items-center gap-3">
                <ProductGlyph slug={p.slug} size={40} />
                <p className="font-display text-2xl font-semibold" style={{ color: p.color }}>How {p.name} helps</p>
              </div>
              <p className="mt-4">{g.productPitch}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener" className="btn text-white hover:brightness-110" style={{ background: p.color }}>
                    {p.ctaLabel}
                    <span className="sr-only"> at {siteHost(p)} (opens in a new tab)</span>
                  </a>
                )}
                <Link href={`/products/${p.slug}`} className="btn btn-ghost">About {p.name}</Link>
              </div>
            </aside>

            <section id="faq" className="scroll-mt-24">
              <h2 className="mt-14 text-3xl md:text-[2.1rem]" style={{ fontVariationSettings: '"wdth" 88' }}>Common questions</h2>
              <dl className="mt-6 divide-y divide-rule border-y border-rule">
                {g.faq.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-display text-lg font-semibold">{f.q}</dt>
                    <dd className="mt-2 text-slate">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="hidden lg:block">
            <nav aria-label="In this guide" className="sticky top-28 text-sm">
              <p className="font-semibold">In this guide</p>
              <ul className="mt-3 space-y-2 border-l border-rule">
                {g.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="-ml-px block border-l border-transparent pl-4 text-slate hover:border-ink hover:text-ink">{s.heading}</a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="-ml-px block border-l border-transparent pl-4 text-slate hover:border-ink hover:text-ink">Common questions</a>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      </article>

      <section className="border-t border-rule bg-paper py-16 md:py-20">
        <div className="wrap">
          <h2 className="font-sans text-sm font-semibold text-slate">More guides</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/guides/${o.slug}`}
                  className="group flex h-full gap-4 rounded-2xl bg-frost p-5 shadow-[0_0_0_1px_var(--color-rule)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <ProductGlyph slug={o.product} size={36} />
                  <span className="font-display text-lg font-semibold leading-snug">{o.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`Try ${p.name}`}
        body={p.oneLiner}
        primary={p.url ? { href: p.url, label: `Visit ${siteHost(p)}` } : { href: "/contact", label: "Contact me" }}
        secondary={{ href: "/guides", label: "All guides" }}
      />
      <JsonLd data={ld} />
    </>
  );
}
