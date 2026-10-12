import Link from "next/link";
import type { ComponentProps } from "react";

// /blog is a separate app (repo dhalishiva/kriosityblog) served through a rewrite
// in next.config.ts, so it needs a full page load rather than client-side routing.
export const isExternalApp = (href: string) => href === "/blog" || href.startsWith("/blog/");

export default function NavLink({ href, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  if (isExternalApp(href)) {
    const { prefetch: _p, replace: _r, scroll: _s, shallow: _sh, passHref: _ph, legacyBehavior: _l, locale: _lo, onNavigate: _n, ...anchor } = rest as Record<string, unknown>;
    return <a href={href} {...(anchor as ComponentProps<"a">)} />;
  }
  return <Link href={href} {...rest} />;
}
