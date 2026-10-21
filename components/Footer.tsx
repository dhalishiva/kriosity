import Link from "next/link";
import NavLink from "@/components/NavLink";
import { Mark } from "./Logo";
import ProductGlyph from "./ProductGlyph";
import { products } from "@/lib/products";
import { nav, site } from "@/lib/site";

export function CoffeeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="transition-transform duration-300 group-hover:-rotate-12">
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M8 3.5c-.6.8.6 1.4 0 2.3M12 3.5c-.6.8.6 1.4 0 2.3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-white/80">
      <div className="grain" />
      <div className="wrap relative grid gap-12 pb-10 pt-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Mark size={36} />
          <p className="mt-5 text-white/70">
            An independent software studio from {site.location}. Small tools for specific problems, built by someone who has
            fixed them by hand.
          </p>
          <a href={`mailto:${site.email}`} className="link-u mt-6 inline-block font-medium text-white">
            {site.email}
          </a>
          {site.buyMeACoffee && (
            <a
              href={site.buyMeACoffee}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex w-fit items-center gap-2.5 rounded-full bg-[#FFDD00] py-2 pl-3 pr-4 text-sm font-semibold text-[#0D0C22] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <CoffeeIcon />
              Buy me a coffee
            </a>
          )}
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Products</h2>
          <ul className="mt-4 space-y-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="group inline-flex items-center gap-2.5 hover:text-white">
                  <ProductGlyph slug={p.slug} size={20} />
                  <span className="link-u">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Studio</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <NavLink href={n.href} className="link-u hover:text-white">
                  {n.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="link-u hover:text-white">Privacy</Link>
            </li>
            <li>
              <Link href="/terms" className="link-u hover:text-white">Terms</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap relative" aria-hidden="true">
        <p
          className="select-none pb-[0.12em] font-display font-bold leading-[0.85] tracking-[-0.03em] text-white/[0.07]"
          style={{ fontSize: "clamp(5rem, 21vw, 18rem)", fontVariationSettings: '"wdth" 88' }}
        >
          kriosity
        </p>
      </div>

      <div className="wrap relative border-t border-white/10 py-6 text-sm text-white/50">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Kriosity. Created by {site.founder}.</p>
          <p>Made in Noida, India</p>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/40">{site.legalLine}</p>
      </div>
    </footer>
  );
}
