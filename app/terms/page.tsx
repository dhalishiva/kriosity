import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms for using the kriosity.in website.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <>
      <PageHeader title="Terms of use" intro="Last updated 4 October 2026. These terms cover this website. Each product has its own terms of service." />
      <Prose>
        <h2>Using this site</h2>
        <p>You may browse and share this site freely. Don&rsquo;t attempt to disrupt it, scrape it at volume or misrepresent it.</p>
        <h2>Products and prices</h2>
        <p>
          Descriptions and prices here are a summary. The product&rsquo;s own website and checkout state the binding price and
          terms at the time you buy. Planned features and planned prices for products in development may change.
        </p>
        <h2>Names and marks</h2>
        <p>
          Kriosity, the crystal mark and the product names belong to their owner. Other product and company names mentioned
          belong to their respective owners and are used only to describe compatibility or experience.
        </p>
        <h2>Liability</h2>
        <p>This site is provided as is. To the extent allowed by law, we are not liable for losses arising from its use.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </Prose>
    </>
  );
}
