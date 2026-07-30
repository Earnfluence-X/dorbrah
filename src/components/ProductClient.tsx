"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { Product, Review } from "@/db/schema";
import { naira } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useStore } from "@/components/StoreProvider";
import { RatingStars } from "@/components/RatingStars";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

const VIEWS = [
  { label: "The Look", cls: "object-cover object-top" },
  { label: "Portrait", cls: "object-cover object-[50%_15%] scale-[1.45]" },
  { label: "Print Detail", cls: "object-cover object-[50%_46%] scale-[2.3]" },
];

export function ProductClient({
  product,
  reviews,
  stat,
  related,
}: {
  product: Product;
  reviews: Review[];
  stat: { avg: number; count: number };
  related: Product[];
}) {
  const { addItem } = useStore();
  const [view, setView] = useState(0);
  const [qty, setQty] = useState(1);
  const [openPanel, setOpenPanel] = useState<number | null>(0);
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    author: "",
    location: "",
    rating: 5,
    title: "",
    body: "",
  });

  const liveStat = useMemo(() => {
    if (localReviews.length === 0) return { avg: 0, count: 0 };
    const sum = localReviews.reduce((s, r) => s + r.rating, 0);
    return { avg: sum / localReviews.length, count: localReviews.length };
  }, [localReviews]);

  const displayStat = liveStat.count >= stat.count ? liveStat : stat;

  const distribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0];
    localReviews.forEach((r) => {
      dist[Math.min(4, Math.max(0, r.rating - 1))] += 1;
    });
    return dist.reverse(); // index 0 = 5 stars
  }, [localReviews]);

  const accordion = [
    { title: "The Story", body: product.story },
    {
      title: "Composition & Care",
      body: `${product.composition}\n\n${product.care}`,
    },
    {
      title: "Shipping & Payment",
      body: "Lagos same-day rider · Nigeria nationwide in 2–4 working days · Africa regional 4–8 days · Worldwide express 5–9 days. Pay on Delivery is available across Nigeria; bank transfer and secure card links worldwide. All prices are in Nigerian Naira (₦) and include the wax certificate.",
    },
  ];

  const orderViaWhatsApp = () =>
    buildWhatsAppUrl(
      `Hello Dorbrah — I would like to order:\n\n*${product.name}* (${product.colorway})\n${qty} × six-yard bundle = ${naira(product.priceNaira * qty)}\n\nPlease confirm availability and delivery options.`
    );

  const submitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.title.trim() || !form.body.trim()) {
      setFormError("Please complete your name, headline and review.");
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: product.slug,
          author: form.author.trim(),
          location: form.location.trim() || "Verified Client",
          rating: form.rating,
          title: form.title.trim(),
          body: form.body.trim(),
        }),
      });
      if (!res.ok) throw new Error("failed");
      const saved = (await res.json()) as Review;
      setLocalReviews((prev) => [saved, ...prev]);
      setFormOpen(false);
      setForm({ author: "", location: "", rating: 5, title: "", body: "" });
    } catch {
      setFormError("We could not save your review — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-10 md:px-10">
      {/* Breadcrumb */}
      <nav className="animate-fade-in flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ink-faint">
        <Link href="/" className="transition-colors hover:text-ink">Maison</Link>
        <span>/</span>
        <Link href="/shop" className="transition-colors hover:text-ink">Boutique</Link>
        <span>/</span>
        <Link href={`/shop?collection=${product.collection}`} className="transition-colors hover:text-ink">
          {product.collection}
        </Link>
        <span>/</span>
        <span className="text-bronze-deep">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ===== Gallery ===== */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
            <Image
              key={view}
              src={product.image}
              alt={`${product.name} — ${VIEWS[view].label} view`}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={`${VIEWS[view].cls} animate-fade-in transition-transform duration-700`}
              style={product.imageFilter ? { filter: product.imageFilter } : undefined}
            />
            {product.badge && (
              <span className="absolute left-4 top-4 bg-porcelain/90 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.26em] text-bronze-deep">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-4 right-4 bg-ink/80 px-3 py-1.5 text-[9px] uppercase tracking-[0.26em] text-porcelain">
              {VIEWS[view].label}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            {VIEWS.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setView(i)}
                className={`relative aspect-[3/4] overflow-hidden border transition-all duration-300 ${
                  view === i
                    ? "border-ink opacity-100"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
                aria-label={`Show ${v.label} view`}
              >
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="150px"
                  className={`${v.cls} object-cover`}
                  style={product.imageFilter ? { filter: product.imageFilter } : undefined}
                />
                <span className="absolute bottom-1.5 left-2 text-[8px] uppercase tracking-[0.2em] text-porcelain [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== Details ===== */}
        <div className="lg:col-span-5">
          <div className="animate-rise lg:sticky lg:top-28">
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-bronze-deep">
              {product.collection} Collection · Nº {String(product.id).padStart(3, "0")}
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm font-light tracking-wide text-ink-soft">
              {product.colorway} · Six-yard bundle
            </p>

            {displayStat.count > 0 && (
              <a href="#reviews" className="mt-4 inline-flex items-center gap-3">
                <RatingStars rating={displayStat.avg} className="size-3.5" />
                <span className="text-xs font-medium">{displayStat.avg.toFixed(1)}</span>
                <span className="link-rule text-xs font-light text-ink-faint">
                  {displayStat.count} client {displayStat.count === 1 ? "word" : "words"}
                </span>
              </a>
            )}

            <div className="mt-6 flex items-baseline gap-3 border-y border-linen py-5">
              <span className="font-display text-4xl font-semibold">
                {naira(product.priceNaira)}
              </span>
              {product.compareAtNaira && (
                <span className="text-lg font-light text-ink-faint line-through">
                  {naira(product.compareAtNaira)}
                </span>
              )}
              <span className="ml-auto text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                ≈ {naira(Math.round(product.priceNaira / 6))} / yard
              </span>
            </div>

            <p className="mt-6 text-[15px] font-light leading-relaxed text-ink-soft">
              {product.description}
            </p>

            {/* Qty + add */}
            <div className="mt-8 flex items-stretch gap-4">
              <div className="flex items-center border border-linen">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-lg text-ink-soft transition-colors hover:bg-parchment"
                  aria-label="Decrease bundles"
                >
                  −
                </button>
                <span className="w-10 text-center font-display text-xl font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(12, q + 1))}
                  className="px-4 py-3 text-lg text-ink-soft transition-colors hover:bg-parchment"
                  aria-label="Increase bundles"
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  addItem(
                    {
                      slug: product.slug,
                      name: product.name,
                      price: product.priceNaira,
                      image: product.image,
                      imageFilter: product.imageFilter,
                      colorway: product.colorway,
                      collection: product.collection,
                    },
                    qty
                  )
                }
                className="btn-sweep flex-1 bg-ink py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-porcelain"
              >
                Add to Bag — {naira(product.priceNaira * qty)}
              </button>
            </div>

            <a
              href={orderViaWhatsApp()}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 border border-bronze/60 py-3.5 text-[11px] font-medium uppercase tracking-[0.26em] text-bronze-deep transition-colors duration-300 hover:border-bronze hover:bg-parchment"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2zm4.52 13.91c-.25.7-1.45 1.35-2 1.41-.52.06-1.01.27-3.4-.7-2.87-1.16-4.68-4.1-4.82-4.29-.14-.19-1.16-1.55-1.16-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .41-.07.65.5.24.58.83 2.02.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48l-.44.51c-.14.14-.29.3-.13.59.17.29.74 1.23 1.6 1.99 1.1.98 2.03 1.29 2.32 1.43.29.15.46.13.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.18 1.4z" />
              </svg>
              Reserve via WhatsApp Concierge
            </a>

            {/* Accordions */}
            <div className="mt-9 divide-y divide-linen border-y border-linen">
              {accordion.map((a, i) => (
                <div key={a.title}>
                  <button
                    onClick={() => setOpenPanel(openPanel === i ? null : i)}
                    className="flex w-full items-center justify-between py-4 text-left"
                    aria-expanded={openPanel === i}
                  >
                    <span className="font-display text-lg font-medium">{a.title}</span>
                    <span
                      className={`text-xl font-light text-bronze transition-transform duration-400 ${
                        openPanel === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
                      openPanel === i ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="overflow-hidden whitespace-pre-line text-sm font-light leading-relaxed text-ink-soft">
                      {a.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ink-faint">
              <span className="animate-pulse-dot inline-block size-1.5 rounded-full bg-bronze" />
              In the atelier now · photographed bolt-by-bolt before dispatch
            </p>
          </div>
        </div>
      </div>

      {/* ===== Reviews ===== */}
      <section id="reviews" className="mt-24 border-t border-linen pt-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
              Client Words
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
              Worn & <em className="italic text-bronze-deep">Reviewed</em>
            </h2>
          </div>
          <button
            onClick={() => setFormOpen((o) => !o)}
            className="btn-sweep border border-ink px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors hover:text-porcelain"
          >
            {formOpen ? "Close the pen" : "Write a review"}
          </button>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* Summary */}
          <Reveal className="lg:col-span-4">
            <div className="border border-linen bg-parchment/60 p-8">
              <p className="font-display text-7xl font-semibold leading-none">
                {displayStat.avg > 0 ? displayStat.avg.toFixed(1) : "—"}
              </p>
              <div className="mt-4">
                <RatingStars rating={displayStat.avg} className="size-4" />
              </div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                {displayStat.count} verified {displayStat.count === 1 ? "review" : "reviews"}
              </p>
              <div className="mt-7 space-y-2.5">
                {distribution.map((count, i) => {
                  const stars = 5 - i;
                  const pct = localReviews.length
                    ? (count / localReviews.length) * 100
                    : 0;
                  return (
                    <div key={stars} className="flex items-center gap-3 text-[11px] text-ink-faint">
                      <span className="w-3 text-right">{stars}</span>
                      <svg viewBox="0 0 20 20" className="size-3 fill-bronze" aria-hidden="true">
                        <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
                      </svg>
                      <div className="h-[3px] flex-1 bg-linen">
                        <div
                          className="h-full bg-bronze transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-5">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* List + form */}
          <div className="lg:col-span-8">
            {formOpen && (
              <form
                onSubmit={submitReview}
                className="animate-rise mb-10 border border-bronze/40 bg-porcelain p-7"
              >
                <p className="font-display text-2xl font-medium italic">Your word on the cloth</p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Name</label>
                    <input
                      className="field"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="Adaeze K."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">City, Country</label>
                    <input
                      className="field"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="Lagos, Nigeria"
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Rating</label>
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setForm({ ...form, rating: r })}
                        aria-label={`${r} star${r > 1 ? "s" : ""}`}
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className={`size-6 ${r <= form.rating ? "fill-bronze" : "fill-linen"}`}
                        >
                          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <label className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Headline</label>
                  <input
                    className="field"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Richer in person"
                  />
                </div>
                <div className="mt-5">
                  <label className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Review</label>
                  <textarea
                    className="field resize-none"
                    rows={4}
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    placeholder="How did the cloth wear, wash and photograph?"
                  />
                </div>
                {formError && (
                  <p className="mt-4 text-xs font-medium text-bordeaux">{formError}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-sweep mt-6 bg-ink px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.26em] text-porcelain disabled:opacity-50"
                >
                  {submitting ? "Sealing…" : "Publish review"}
                </button>
              </form>
            )}

            <ul className="divide-y divide-linen border-y border-linen">
              {localReviews.length === 0 && (
                <li className="py-10 text-center font-display text-xl italic text-ink-faint">
                  Be the first to put this cloth in words.
                </li>
              )}
              {localReviews.map((r) => (
                <li key={r.id} className="py-7 animate-rise">
                  <div className="flex flex-wrap items-center gap-3">
                    <RatingStars rating={r.rating} className="size-3" />
                    <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                    {r.verified && (
                      <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-bronze-deep">
                        <svg viewBox="0 0 20 20" className="size-3 fill-bronze" aria-hidden="true">
                          <path d="M10 0l2.4 2 3.1-.3 1.1 2.9 2.9 1.1-.3 3.1 2 2.4-2 2.4.3 3.1-2.9 1.1-1.1 2.9-3.1-.3-2.4 2-2.4-2-3.1.3-1.1-2.9L.5 15.6l.3-3.1-2-2.4 2-2.4-.3-3.1 2.9-1.1L4.5 1l3.1.3L10 0z" opacity="0" />
                          <path d="M8.2 13.6L4.6 10l-1.4 1.4 5 5 9-9-1.4-1.4-7.6 7.6z" />
                        </svg>
                        Verified purchase
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">{r.body}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    {r.author} · {r.location} ·{" "}
                    {new Date(r.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Related ===== */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-linen pt-16">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-medium md:text-4xl">
              Also from the <em className="italic text-bronze-deep">Maison</em>
            </h2>
            <Link href="/shop" className="link-rule text-[11px] font-medium uppercase tracking-[0.24em] text-ink">
              View all →
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
