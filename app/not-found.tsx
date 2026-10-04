import Link from "next/link";
import { Mark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
      <Mark size={48} />
      <h1 className="mt-8 text-5xl md:text-7xl" style={{ fontVariationSettings: '"wdth" 80' }}>This page isn&rsquo;t here.</h1>
      <p className="measure mt-5 text-lg text-slate">The link may be old, or the page may have moved. The products and the home page are a good place to start again.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/products" className="btn btn-primary">Browse products</Link>
        <Link href="/" className="btn btn-ghost">Go to the home page</Link>
      </div>
    </section>
  );
}
