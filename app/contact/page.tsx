import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Talk to Kriosity",
  description: "Questions about a Kriosity product, consulting, partnerships or early access to Gateway. Replies within two working days.",
  alternates: { canonical: "/contact" },
  openGraph: { url: `${site.url}/contact`, title: "Contact Kriosity", description: "Questions, consulting, partnerships and early access." },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Let's talk" intro="Product questions, consulting, partnerships or early access. You'll get a reply from a person within two working days." />
      <section className="wrap grid gap-14 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
        <aside className="space-y-8 lg:pt-7">
          <div>
            <h2 className="font-sans text-sm font-semibold text-slate">Email</h2>
            <a href={`mailto:${site.email}`} className="link-u mt-1 inline-block font-display text-2xl font-semibold">{site.email}</a>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-slate">Based in</h2>
            <p className="mt-1 font-display text-2xl font-semibold">{site.location}</p>
            <p className="text-slate">Working with teams in India, the US and Europe. IST, with overlap for both.</p>
          </div>
          <div>
            <h2 className="font-sans text-sm font-semibold text-slate">Already a customer?</h2>
            <a href={`mailto:${site.supportEmail}`} className="link-u mt-1 inline-block font-display text-2xl font-semibold">{site.supportEmail}</a>
            <p className="text-slate">Or choose &ldquo;Support for an existing account&rdquo; in the form. Include the email you signed up with.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
