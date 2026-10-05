# Kriosity

Portfolio and product marketplace for Kriosity — [kriosity.in](https://kriosity.in).

Next.js 16 (App Router, fully static), Tailwind CSS 4, Motion, Vercel Analytics and Speed Insights.

## Develop

```bash
npm install
npm run dev
```

## Where things live

- `lib/products.ts` — every product: copy, pricing, FAQ, SEO. Add a product here and it appears on the home page, catalogue, sitemap, footer and gets its own page and OG image.
- `lib/site.ts` — site name, URL and contact email.
- `components/Crystal.tsx` — the hero gem. Each coloured facet maps to a product slug.
- `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` — SEO.

## Contact form email

`app/api/contact/route.ts` sends form submissions through SMTP (Microsoft 365). Set the variables in `.env.example` in Vercel → Project → Settings → Environment Variables, then redeploy. Support requests go to `SUPPORT_TO`; everything else goes to `CONTACT_TO`. Replies go straight to the visitor.
