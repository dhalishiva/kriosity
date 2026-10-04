"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ProductRows from "./ProductRows";
import { categories, products } from "@/lib/products";

export default function ProductsBrowser() {
  const [filter, setFilter] = useState<string>("All");
  const options = ["All", ...categories];
  const items = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-1 flex gap-1 overflow-x-auto pb-2">
        {options.map((o) => {
          const on = filter === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => setFilter(o)}
              aria-pressed={on}
              className={`relative isolate shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${on ? "text-white" : "text-slate hover:text-ink"}`}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {o}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <ProductRows items={items} />
      </div>
    </div>
  );
}
