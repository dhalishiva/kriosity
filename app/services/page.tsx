import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — AP automation, manufacturing quality systems and custom SaaS",
  description:
    "Consulting from Kriosity: Tungsten (Kofax) ReadSoft and AP automation, InfinityQS administration and archival, industrial OPC connectivity, and custom SaaS builds.",
  alternates: { canonical: "/services" },
  openGraph: { url: `${site.url}/services`, title: "Kriosity services", description: "Hands-on help with the systems behind finance and manufacturing." },
};

const services = [
  {
    name: "AP automation",
    color: "#C2362B",
    summary: "Invoice capture and approval platforms, kept running and connected.",
    items: [
      "Tungsten (Kofax) ReadSoft Process Director, Mobile Approval and AP Essentials",
      "Approval-mailbox setup with Microsoft 365, IMAP and OAuth2",
      "SSO with SAML and Azure AD, and SAP connectivity troubleshooting",
      "Duplicate-payment audits with PaidTwice",
    ],
  },
  {
    name: "Manufacturing quality systems",
    color: "#C9820F",
    summary: "SPC platforms across many plants, and the data they pile up.",
    items: [
      "InfinityQS ProFicient installation, silent deployment and upgrades",
      "SQL Server and ODBC performance across multi-plant estates",
      "Archiving and consolidating plant databases",
      "Exports to Parquet and reporting in Power BI",
    ],
  },
  {
    name: "Industrial connectivity",
    color: "#0F7B6C",
    summary: "Getting plant data out of PLCs reliably, even on air-gapped networks.",
    items: [
      "OPC server deployment and tunnelling",
      "Node-locked licence migrations between Windows Server versions",
      "PLC-to-OPC UA connectivity, and early access to Gateway",
      "Windows service hardening and event logging",
    ],
  },
  {
    name: "Custom SaaS builds",
    color: "#2C64F0",
    summary: "From idea to a paid product, the way the Kriosity products were built.",
    items: [
      "React and Next.js front ends with real attention to design",
      "Supabase and Postgres back ends with row-level security",
      "Razorpay billing, transactional email and multi-tenant isolation",
      "Launch work: SEO, analytics and search console",
    ],
  },
];

const process = [
  { title: "A short call", body: "Tell me what's breaking and what it's costing. No charge for this part." },
  { title: "A written scope", body: "A fixed scope and price, or a daily rate when the problem isn't clear yet." },
  { title: "The work", body: "Done remotely, with regular updates and access only to what's needed." },
  { title: "Handover", body: "Documentation and a walkthrough, so your team can own it afterwards." },
];

const ld = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kriosity",
  url: `${site.url}/services`,
  areaServed: "Worldwide",
  provider: { "@id": `${site.url}/#org` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Consulting services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.summary } })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Hands-on help with the systems behind the work"
        intro="Before the products, there was consulting. I still take a few engagements a year in the areas where I have the most mileage."
      />

      <section className="wrap pb-20">
        <ul className="border-t border-ink">
          {services.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.05} className="grid gap-6 border-b border-rule py-10 md:grid-cols-[1fr_1.3fr] md:gap-16 md:py-14">
              <div>
                <h2 className="flex items-center gap-4 text-3xl md:text-[2.6rem]" style={{ fontVariationSettings: '"wdth" 85' }}>
                  <span className="h-4 w-4 shrink-0 rotate-45 rounded-[3px]" style={{ background: s.color }} />
                  {s.name}
                </h2>
                <p className="mt-3 text-lg text-slate md:pl-8">{s.summary}</p>
              </div>
              <ul className="space-y-3 md:pt-2">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-4 shrink-0" style={{ background: s.color }} />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <h2 className="text-4xl md:text-5xl" style={{ fontVariationSettings: '"wdth" 85' }}>How an engagement runs</h2>
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            {process.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="relative border-t-2 border-ink pt-5">
                <span className="font-display text-sm font-semibold text-glacier">Step {i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-slate">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        title="Describe the problem. I'll tell you if I can help."
        body="Most first conversations take twenty minutes and end with a clear next step, even if that step isn't me."
        primary={{ href: "/contact?topic=consulting", label: "Book a first call" }}
      />
      <JsonLd data={ld} />
    </>
  );
}
