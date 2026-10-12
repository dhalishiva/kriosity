import Link from "next/link";
import NavLink from "@/components/NavLink";
import { Mark } from "./Logo";
import ProductGlyph from "./ProductGlyph";
import { products } from "@/lib/products";
import { nav, site } from "@/lib/site";

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
