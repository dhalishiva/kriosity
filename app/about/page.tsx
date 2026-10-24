import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { Mark } from "@/components/Logo";
import { CoffeeIcon, social } from "@/components/Footer";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — The engineer behind Kriosity",
  description:
    "Kriosity is the independent software studio of Shiva, a systems engineer in Noida working across AP automation, manufacturing quality systems and industrial connectivity.",
  alternates: { canonical: "/about" },
  openGraph: { url: `${site.url}/about`, title: "About Kriosity", description: "Why a systems engineer started building small, focused products." },
};

const toolbox = [
  "React", "Next.js", "TypeScript", "Node.js", "Deno", "Supabase", "Postgres", "SQL Server",
  "Python", "FastAPI", ".NET", "OPC UA", "Microsoft 365", "Azure AD", "Razorpay", "Vercel",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="One engineer, a habit of fixing the same thing twice" />

      <section className="wrap grid gap-14 pb-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal className="space-y-6 text-lg leading-relaxed md:text-xl md:leading-relaxed">
          <p>
            I&rsquo;m Shiva. I work inside the systems that big companies run on: invoice capture and approval platforms,
            statistical process control across manufacturing plants, OPC servers pulling data off factory floors.
          </p>
          <p className="text-slate">
            That work has a pattern. A platform handles the common case well, and then something at the edge goes wrong in
            exactly the same way at the next client. A customer asks which AI tools you use and nobody has the list. A vendor gets
            paid twice because the invoice number had a dash in it. A plant pays a heavyweight licence to read a few hundred tags.
          </p>
          <p className="text-slate">
            I kept writing scripts to catch these things. Kriosity is what happens when those scripts grow up: each one becomes
            a small, finished product with a clear price, so the next team doesn&rsquo;t need a consultant to get the fix.
          </p>
          <p className="text-slate">
            The name comes from curiosity and crystal. The mark is a gem cut into facets, one for each product, and it grows a
            facet whenever a new one ships.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:pt-2">
          <div className="rounded-[2rem] bg-paper p-8 shadow-[0_0_0_1px_var(--color-rule)]">
            <Mark size={56} />
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-sm text-slate">Founder and proprietor</dt>
                <dd className="font-display text-xl font-semibold">{site.founder}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Registered as</dt>
                <dd className="font-display text-xl font-semibold">MSME sole proprietorship</dd>
                <dd className="text-sm text-slate">Udyam {site.udyam}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Based in</dt>
                <dd className="font-display text-xl font-semibold">{site.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Products shipped</dt>
                <dd className="font-display text-xl font-semibold">
                  {products.filter((p) => p.status === "Live").length} live, {products.filter((p) => p.status !== "Live").length} in development
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Selling to</dt>
                <dd className="font-display text-xl font-semibold">India, the US and Europe</dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Write to</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="link-u font-display text-xl font-semibold">{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate">Find me on</dt>
                <dd className="mt-3 grid max-w-sm grid-cols-2 gap-2">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel={s.label === "YouTube" ? "noopener" : "noopener me"}
                      className="flex min-h-11 items-center gap-2.5 rounded-full bg-frost py-2 pl-3 pr-4 text-sm font-semibold shadow-[0_0_0_1px_var(--color-rule)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_1.5px_var(--color-ink)]"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                        <path d={s.icon} />
                      </svg>
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
              {site.buyMeACoffee && (
                <div>
                  <dt className="text-sm text-slate">Like what I build?</dt>
                  <dd className="mt-2">
                    <a
                      href={site.buyMeACoffee}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#FFDD00] py-2 pl-3 pr-4 text-sm font-semibold text-[#0D0C22] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <CoffeeIcon />
                      Buy me a coffee
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </Reveal>
      </section>

      <section className="bg-paper py-20 md:py-24">
        <div className="wrap">
          <Reveal>
            <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>The toolbox</h2>
            <p className="measure mt-4 text-lg text-slate">
              What the products and client work are built with. Chosen for being boring in production.
            </p>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {toolbox.map((t) => (
              <li key={t} className="rounded-full bg-frost px-4 py-2 font-medium shadow-[0_0_0_1px_var(--color-rule)]">{t}</li>
            ))}
          </ul>
          <p className="mt-10 text-slate">
            Want the products rather than the stack? <Link href="/products" className="link-u font-medium text-ink">See products</Link>.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
