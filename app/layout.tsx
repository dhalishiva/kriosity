import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/components/Providers";
import "./globals.css";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FloatingActions from "@/components/FloatingActions";

const bricolage = localFont({
  src: "./fonts/bricolage.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const instrument = localFont({
  src: "./fonts/instrument-sans.woff2",
  variable: "--font-instrument",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.founder, url: site.url }],
  creator: site.founder,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f2f5f7",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      email: site.email,
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["English", "Hindi"] },
        { "@type": "ContactPoint", contactType: "customer support", email: site.supportEmail, availableLanguage: ["English", "Hindi"] },
      ],
      founder: { "@type": "Person", name: site.founder },
      address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      sameAs: [site.github],
      makesOffer: products.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "SoftwareApplication", name: p.name, url: `${site.url}/products/${p.slug}` } })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#org` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-primary">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
        </Providers>
        <JsonLd data={orgLd} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
