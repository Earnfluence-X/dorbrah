"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/db/schema";
import { naira } from "@/lib/format";
import { useStore } from "@/components/StoreProvider";
import { RatingStars } from "@/components/RatingStars";

export function ProductCard({
  product,
  rating,
  index = 0,
}: {
  product: Product;
  rating?: number;
  index?: number;
}) {
  const { addItem } = useStore();

  return (
    <article className="group relative animate-rise" style={{ ["--rise-delay" as string]: `${(index % 4) * 90}ms` }}>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.colorway} Ankara, worn editorially`}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
            className="object-cover object-top transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            style={product.imageFilter ? { filter: product.imageFilter } : undefined}
          />
          {product.badge && (
            <span className="absolute left-3 top-3 bg-porcelain/90 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.26em] text-bronze-deep">
              {product.badge}
            </span>
          )}
          {product.compareAtNaira && (
            <span className="absolute right-3 top-3 bg-bordeaux px-3 py-1 text-[9px] font-medium uppercase tracking-[0.26em] text-porcelain">
              Save {naira(product.compareAtNaira - product.priceNaira)}
            </span>
          )}
          {/* Quick add — slides up on hover */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/95 py-3 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-porcelain transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:translate-y-0">
            View Piece
          </span>
        </div>
      </Link>

      {/* Quick add button */}
      <button
        onClick={() =>
          addItem({
            slug: product.slug,
            name: product.name,
            price: product.priceNaira,
            image: product.image,
            imageFilter: product.imageFilter,
            colorway: product.colorway,
            collection: product.collection,
          })
        }
        className="absolute -bottom-2 right-2 z-10 grid size-10 place-items-center border border-linen bg-porcelain text-ink shadow-[0_10px_30px_-12px_rgba(27,22,17,0.4)] transition-all duration-300 hover:border-ink hover:bg-ink hover:text-porcelain"
        aria-label={`Add ${product.name} to bag`}
        title="Add to bag"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <div className="mt-4 pr-12">
        <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.26em] text-ink-faint">
          <span>{product.collection}</span>
          {rating !== undefined && rating > 0 && (
            <span className="flex items-center gap-1.5">
              <RatingStars rating={rating} className="size-2.5" />
            </span>
          )}
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-bronze-deep">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs font-light text-ink-faint">{product.colorway}</p>
        <p className="mt-2 text-sm tracking-wide">
          <span className="font-medium">{naira(product.priceNaira)}</span>
          <span className="ml-1.5 text-[11px] font-light text-ink-faint">/ 6 yds</span>
          {product.compareAtNaira && (
            <span className="ml-2 text-xs font-light text-ink-faint line-through">
              {naira(product.compareAtNaira)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
