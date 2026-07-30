"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/db/schema";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const COLOR_FAMILIES: { name: string; hex: string }[] = [
  { name: "Gold", hex: "#c39a3b" },
  { name: "Red", hex: "#a34434" },
  { name: "Green", hex: "#2f6b4f" },
  { name: "Blue", hex: "#2c4a78" },
  { name: "Earth", hex: "#a9713f" },
  { name: "Noir", hex: "#23201d" },
  { name: "Neutral", hex: "#cbbfa5" },
];

const COLLECTIONS = ["All", "Heritage", "Celebration", "Signature"] as const;

export function ShopClient({
  products,
  stats,
  initialCollection,
}: {
  products: Product[];
  stats: Record<string, { avg: number; count: number }>;
  initialCollection?: string;
}) {
  const [collection, setCollection] = useState<string>(
    initialCollection && COLLECTIONS.includes(initialCollection as (typeof COLLECTIONS)[number])
      ? initialCollection
      : "All"
  );
  const [color, setColor] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    let list = products.slice();
    if (collection !== "All") list = list.filter((p) => p.collection === collection);
    if (color) list = list.filter((p) => p.colorFamily === color);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.priceNaira - b.priceNaira);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceNaira - a.priceNaira);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
    }
    return list;
  }, [products, collection, color, sort]);

  const hasFilters = collection !== "All" || color !== null;

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-12 md:px-10">
      {/* Page head */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-linen pb-8">
        <div>
          <p className="animate-fade-in text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
            The Boutique
          </p>
          <h1 className="animate-rise mt-3 font-display text-5xl font-medium leading-none md:text-6xl">
            All the <em className="italic text-bronze-deep">Cloth</em>
          </h1>
        </div>
        <p className="animate-rise max-w-sm text-sm font-light leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "150ms" }}>
          Twenty-nine numbered wax prints, each a full six-yard bundle. Every
          order is photographed bolt-by-bolt and confirmed on WhatsApp before
          dispatch.
        </p>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[73px] z-30 -mx-5 mt-8 border-y border-linen bg-porcelain/95 px-5 py-4 backdrop-blur-sm md:-mx-10 md:px-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Collections */}
          <div className="flex flex-wrap items-center gap-5">
            {COLLECTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCollection(c)}
                className={`link-rule text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${
                  collection === c ? "is-active text-ink" : "text-ink-faint hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <span className="hidden h-4 w-px bg-linen sm:block" />

          {/* Colour swatches */}
          <div className="flex items-center gap-2.5">
            <span className="mr-1 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              Hue
            </span>
            {COLOR_FAMILIES.map((cf) => (
              <button
                key={cf.name}
                onClick={() => setColor(color === cf.name ? null : cf.name)}
                aria-label={`Filter by ${cf.name}`}
                title={cf.name}
                className={`size-5 rounded-full border transition-all duration-300 ${
                  color === cf.name
                    ? "scale-110 border-ink ring-2 ring-ink/15 ring-offset-2 ring-offset-porcelain"
                    : "border-ink/15 hover:scale-110"
                }`}
                style={{ backgroundColor: cf.hex }}
              />
            ))}
          </div>

          <span className="hidden h-4 w-px bg-linen sm:block" />

          {/* Sort */}
          <label className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Order by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer border-b border-linen bg-transparent pb-0.5 text-[11px] uppercase tracking-[0.18em] text-ink outline-none transition-colors focus:border-ink"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · Low to High</option>
              <option value="price-desc">Price · High to Low</option>
              <option value="name">Name · A to Z</option>
            </select>
          </label>

          <div className="ml-auto flex items-center gap-4">
            {hasFilters && (
              <button
                onClick={() => {
                  setCollection("All");
                  setColor(null);
                }}
                className="text-[10px] uppercase tracking-[0.2em] text-bordeaux underline-offset-4 hover:underline"
              >
                Clear
              </button>
            )}
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {visible.length} {visible.length === 1 ? "cloth" : "cloths"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center py-28 text-center">
          <p className="font-display text-3xl font-medium italic text-ink">
            Nothing in this hue — yet.
          </p>
          <p className="mt-3 max-w-sm text-sm font-light text-ink-faint">
            Our runs are numbered and sell quickly. Clear the filters or ask the
            concierge to reserve your colourway.
          </p>
          <button
            onClick={() => {
              setCollection("All");
              setColor(null);
            }}
            className="btn-sweep mt-8 border border-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:text-porcelain"
          >
            View everything
          </button>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 xl:grid-cols-4">
          {visible.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 80}>
              <ProductCard
                product={product}
                rating={stats[product.slug]?.avg}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      )}

      {/* Footnote */}
      <Reveal className="mt-20 border-t border-linen pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          <p>All prices include the six-yard bundle & wax certificate</p>
          <Link href="/checkout" className="link-rule text-bronze-deep">
            Ready? Proceed to checkout →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
