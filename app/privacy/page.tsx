import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Prose from "@/components/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How kriosity.in handles visitor data: privacy-friendly analytics, no advertising, and no data sold.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <PageHeader title="Privacy policy" intro="Last updated 11 October 2026. This covers kriosity.in. Each product has its own policy on its own site." />
      <Prose>
        <h2>What this site collects</h2>
        <p>
          kriosity.in uses Vercel Web Analytics and Speed Insights to count page views and measure performance. They do not use
          cookies and do not identify you personally. We also use Google Analytics, which sets first-party cookies to tell new
          visitors from returning ones and to understand which pages people use. We see totals such as page views, referrers,
          country and device type, and we do not use this data for advertising. You can block these cookies in your browser
          settings or with Google&rsquo;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">opt-out add-on</a>.
        </p>
        <h2>When you contact us</h2>
        <p>
          Messages sent through the contact form are delivered to our Microsoft 365 mailbox and are not stored by this website.
          We keep the message and your address to reply and for our records, and never sell or share them for marketing.
        </p>
        <h2>Product data</h2>
        <p>
          Data you put into a Kriosity product is governed by that product&rsquo;s privacy policy, linked from its own website.
        </p>
        <h2>Your rights</h2>
        <p>
          You can ask what we hold about you, ask us to correct it or ask us to delete it. Write to{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Prose>
    </>
  );
}
