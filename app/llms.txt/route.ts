// llms.txt: a plain-language summary of Kriosity for AI assistants and AI search
// (format: https://llmstxt.org). Built from the same data as the site, so it stays current.
import { products } from "@/lib/products";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const productLines = products
    .map((p) => {
      const where = p.url ? ` Website: ${p.url}.` : "";
      return `- [${p.name}](${site.url}/products/${p.slug}): ${p.oneLiner} Built for: ${p.audience}. Status: ${p.status}. Price: ${p.fromPrice}.${where}`;
    })
    .join("\n");

  const guideLines = guides.map((g) => `- [${g.title}](${site.url}/guides/${g.slug}): ${g.description}`).join("\n");

  const body = `# ${site.name}

> ${site.description}

${site.name} is an independent software studio in ${site.location}, founded and run by ${site.founder}. ${site.legalLine} Each product is a small, focused tool with clear public pricing.

## Products

${productLines}

## Guides

${guideLines}

## Company

- [About](${site.url}/about): who builds Kriosity and why.
- [Services](${site.url}/services): consulting on Tungsten (Kofax) ReadSoft and AP automation, InfinityQS, industrial OPC connectivity and custom SaaS builds.
- [Contact](${site.url}/contact): sales and partnerships at ${site.email}; customer support at ${site.supportEmail}.
- [Blog](${site.url}/blog): notes on AI model releases, pricing changes and retirements.

## Optional

- [Terms](${site.url}/terms)
- [Privacy](${site.url}/privacy)
- YouTube: ${site.youtube}
- Founder on X: ${site.founderX}
- Founder on LinkedIn: ${site.founderLinkedIn}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
