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

const social = [
  {
    label: "YouTube",
    href: site.youtube,
    icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
  {
    label: "X",
    href: site.founderX,
    icon: "M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z",
  },
  {
    label: "LinkedIn",
    href: site.founderLinkedIn,
    icon: "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.3ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z",
  },
  {
    label: "GitHub",
    href: site.github,
    icon: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z",
  },
];

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
          <ul className="mt-6 flex gap-2" aria-label="Kriosity elsewhere">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener me"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full text-white/70 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
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
              <Link href="/guides" className="link-u hover:text-white">Guides</Link>
            </li>
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
