import Image from "next/image";
import Link from "next/link";
import { getProducts, getReviewStats } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const COLLECTIONS = [
  {
    name: "Heritage",
    note: "Adire roots, sun motifs & twice-dyed indigo",
    image: "/images/products/adaeze-sunburst.jpg",
    tall: true,
  },
  {
    name: "Celebration",
    note: "Owambe-ready yardage for the season of gold",
    image: "/images/products/rosewood-ceremonial.jpg",
    tall: false,
  },
  {
    name: "Signature",
    note: "Numbered runs for the quietly dressed",
    image: "/images/products/onyx-regalia.jpg",
    tall: false,
  },
];

const RITUAL = [
  {
    step: "01",
    title: "Choose your cloth",
    body: "Every listing is a full six-yard bundle — enough for a two-piece, an agbada, or a gown with drama to spare.",
  },
  {
    step: "02",
    title: "Concierge confirms on WhatsApp",
    body: "We photograph your exact bolt, confirm the dye lot, and hold it while you decide. No faceless checkout.",
  },
  {
    step: "03",
    title: "Tailor it, or treasure it",
    body: "Fly it anywhere in the world, or pay on delivery when our rider reaches your door in Nigeria.",
  },
];

const VOICES = [
  {
    quote: "This is how our cloth should be sold to the world.",
    name: "Chief Okonkwo E.",
    place: "Awka, Nigeria",
    rotate: "-2deg",
  },
  {
    quote: "I was asked if it was European couture. It was Adaeze Sunburst.",
    name: "Danielle P.",
    place: "Atlanta, USA",
    rotate: "1.5deg",
  },
  {
    quote: "The restraint of this print is what makes it luxury.",
    name: "Halima D.",
    place: "Kano, Nigeria",
    rotate: "-1deg",
  },
];

function Diamond({ className = "size-2" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <path d="M5 0L10 5L5 10L0 5Z" className="fill-bronze" />
    </svg>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const stats = await getReviewStats();
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* ============ OPENING — editorial split ============ */}
      <section className="relative overflow-hidden">
        {/* faint giant wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap font-display text-[26vw] font-semibold leading-none text-ink/[0.045]"
        >
          DORBRAH
        </p>

        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-24 pt-12 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          {/* Left — type */}
          <div className="relative z-10 flex flex-col justify-center lg:col-span-5">
            <p className="animate-fade-in flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep" style={{ ["--fade-delay" as string]: "150ms" }}>
              <span className="inline-block h-px w-10 bg-bronze" />
              Maison de Wax Print · Lagos · Est. 2016
            </p>

            <h1 className="mt-7 font-display text-[15vw] font-medium leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.4rem]">
              <span className="line-mask">
                <span style={{ ["--line-delay" as string]: "200ms" }}>Ankara,</span>
              </span>
              <span className="line-mask">
                <span style={{ ["--line-delay" as string]: "340ms" }}>
                  worn like
                </span>
              </span>
              <span className="line-mask">
                <span className="italic text-bronze-deep" style={{ ["--line-delay" as string]: "480ms" }}>
                  couture.
                </span>
              </span>
            </h1>

            <p className="animate-rise mt-7 max-w-md text-[15px] font-light leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "600ms" }}>
              Maison-grade Nigerian wax print, sold by the six-yard bundle and
              priced honestly in Naira — flown from our Lekki atelier to
              wardrobes on every continent.
            </p>

            <div className="animate-rise mt-9 flex flex-wrap items-center gap-5" style={{ ["--rise-delay" as string]: "720ms" }}>
              <Link
                href="/shop"
                className="btn-sweep bg-ink px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-porcelain"
              >
                Enter the Boutique
              </Link>
              <a
                href={buildWhatsAppUrl("Hello Dorbrah — I would like a private viewing of the collection.")}
                target="_blank"
                rel="noreferrer"
                className="link-rule text-[11px] font-medium uppercase tracking-[0.26em] text-ink"
              >
                Private Viewing →
              </a>
            </div>

            <dl className="animate-rise mt-14 grid grid-cols-3 gap-4 border-t border-linen pt-6" style={{ ["--rise-delay" as string]: "840ms" }}>
              {[
                ["2016", "Maison founded"],
                ["40+", "Countries served"],
                ["4.9 ★", "Client rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-semibold">{v}</dd>
                  <dd className="mt-1 text-[9px] uppercase tracking-[0.24em] text-ink-faint">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — campaign image */}
          <div className="relative lg:col-span-7">
            <div className="relative ml-auto aspect-[4/5] max-h-[760px] w-full max-w-[640px] overflow-hidden bg-parchment lg:aspect-[5/6]">
              <Image
                src="/images/hero.jpg"
                alt="Model in a DORBRAH couture Ankara gown — Autumn/Winter campaign"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="animate-kenburns object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            </div>
            {/* Offset bronze frame */}
            <div aria-hidden="true" className="absolute -right-3 -top-3 -z-10 hidden h-full w-full border border-bronze/50 lg:block" />
            {/* Caption card */}
            <div className="animate-rise absolute bottom-5 left-0 bg-porcelain px-6 py-4 shadow-[0_20px_50px_-20px_rgba(27,22,17,0.35)] sm:-left-8" style={{ ["--rise-delay" as string]: "900ms" }}>
              <p className="text-[9px] uppercase tracking-[0.3em] text-bronze-deep">
                Autumn – Winter '26
              </p>
              <p className="mt-1 font-display text-lg font-medium italic">
                The Prestige Cloth Campaign
              </p>
            </div>
            {/* Vertical city line */}
            <p className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap text-[9px] uppercase tracking-[0.5em] text-ink-faint xl:block">
              Lagos — London — Houston — Dubai
            </p>
          </div>
        </div>
      </section>

      {/* ============ Serif marquee ============ */}
      <section className="marquee-hover overflow-hidden border-y border-ink/10 bg-parchment py-5">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap" style={{ ["animation-duration" as string]: "38s" }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {["Heritage", "Celebration", "Signature", "Six-Yard Bundles", "Priced in Naira", "Delivered Worldwide"].map((w) => (
                <span key={`${dup}-${w}`} className="flex items-center">
                  <span className="px-8 font-display text-3xl font-medium italic text-ink-soft md:text-4xl">
                    {w}
                  </span>
                  <Diamond className="size-2.5" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ Collections — asymmetric editorial ============ */}
      <section className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
              Chapter I
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">
              The Featured <em className="italic text-bronze-deep">Collections</em>
            </h2>
          </div>
          <Link href="/shop" className="link-rule text-[11px] font-medium uppercase tracking-[0.26em] text-ink">
            View all twenty-nine cloths →
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-12">
          <Reveal className="md:col-span-7" delay={80}>
            <Link
              href={`/shop?collection=${COLLECTIONS[0].name}`}
              className="group relative block aspect-[4/5] overflow-hidden bg-parchment sm:aspect-[16/11] md:aspect-auto md:h-full md:min-h-[560px]"
            >
              <Image
                src={COLLECTIONS[0].image}
                alt={`${COLLECTIONS[0].name} collection`}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover object-top transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7 text-porcelain md:p-9">
                <p className="text-[9px] uppercase tracking-[0.32em] text-champagne">
                  {products.filter((p) => p.collection === COLLECTIONS[0].name).length} cloths
                </p>
                <h3 className="mt-2 font-display text-4xl font-medium italic md:text-5xl">
                  {COLLECTIONS[0].name}
                </h3>
                <p className="mt-2 max-w-xs text-sm font-light text-porcelain/80">
                  {COLLECTIONS[0].note}
                </p>
                <span className="mt-5 inline-flex items-center gap-3 border-b border-champagne/60 pb-1 text-[10px] font-medium uppercase tracking-[0.28em] text-champagne transition-colors group-hover:border-porcelain group-hover:text-porcelain">
                  Explore the edit <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-5 md:col-span-5 md:grid-rows-2">
            {COLLECTIONS.slice(1).map((c, i) => (
              <Reveal key={c.name} delay={160 + i * 120}>
                <Link
                  href={`/shop?collection=${c.name}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-parchment md:aspect-auto md:h-full md:min-h-[268px]"
                >
                  <Image
                    src={c.image}
                    alt={`${c.name} collection`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-porcelain md:p-8">
                    <p className="text-[9px] uppercase tracking-[0.32em] text-champagne">
                      {products.filter((p) => p.collection === c.name).length} cloths
                    </p>
                    <h3 className="mt-1.5 font-display text-3xl font-medium italic">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 max-w-[260px] text-xs font-light text-porcelain/80">
                      {c.note}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Signature yardage ============ */}
      <section className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-linen pb-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
              Chapter II
            </p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">
              Signature <em className="italic text-bronze-deep">Yardage</em>
            </h2>
            <p className="mt-3 max-w-lg text-sm font-light text-ink-soft">
              The six cloths our clients return for — each a full bundle,
              numbered, waxed and rolled by hand in Lagos.
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl font-semibold">₦</p>
            <p className="text-[9px] uppercase tracking-[0.24em] text-ink-faint">
              Priced in Naira, always
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3">
          {featured.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 100}>
              <ProductCard
                product={product}
                rating={stats[product.slug]?.avg}
                index={i}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            href="/shop"
            className="btn-sweep inline-block border border-ink px-10 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-colors hover:text-porcelain"
          >
            Browse the Full Boutique
          </Link>
        </Reveal>
      </section>

      {/* ============ Maison ============ */}
      <section id="maison" className="mt-28 border-y border-linen bg-parchment/70">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
              Chapter III — The Maison
            </p>
            <blockquote className="mt-6 font-display text-3xl font-medium italic leading-snug md:text-[2.6rem] md:leading-[1.15]">
              “We do not sell fabric.
              <br />
              We sell the moment
              <br />
              a room turns to look.”
            </blockquote>
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-ink-faint">
              — Dolapo Akinlotan, Founder
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="divide-y divide-linen border-y border-linen">
              {RITUAL.map((r, i) => (
                <Reveal key={r.step} delay={i * 120}>
                  <div className="group grid gap-4 py-8 transition-colors duration-300 sm:grid-cols-[90px_240px_1fr] sm:items-baseline">
                    <span className="font-display text-3xl font-semibold text-bronze transition-transform duration-500 group-hover:translate-x-2">
                      {r.step}
                    </span>
                    <h3 className="font-display text-2xl font-medium">{r.title}</h3>
                    <p className="text-sm font-light leading-relaxed text-ink-soft">
                      {r.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={360}>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  ["12k+", "Bundles delivered"],
                  ["48 hr", "Lagos delivery"],
                  ["29", "Numbered cloths"],
                  ["₦0", "Hidden fees"],
                ].map(([v, l]) => (
                  <div key={l} className="border-l-2 border-bronze pl-4">
                    <p className="font-display text-3xl font-semibold">{v}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-ink-faint">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Voices ============ */}
      <section id="voices" className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10">
        <Reveal className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
            Chapter IV
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
            In Their <em className="italic text-bronze-deep">Words</em>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-start">
          {VOICES.map((v, i) => (
            <Reveal key={v.name} delay={i * 140} className="md:w-1/3">
              <figure
                className="h-full border border-linen bg-porcelain p-8 shadow-[0_24px_60px_-30px_rgba(27,22,17,0.3)] transition-transform duration-500 hover:rotate-0 hover:-translate-y-1.5"
                style={{ transform: `rotate(${v.rotate})` }}
              >
                <svg viewBox="0 0 24 24" className="size-5 fill-bronze" aria-hidden="true">
                  <path d="M4 12c0-4 2.5-7 6.5-8l.8 1.7C8.6 6.7 7.4 8.4 7.2 10H10v8H4v-6zm10 0c0-4 2.5-7 6.5-8l.8 1.7c-2.7 1-3.9 2.7-4.1 4.3H20v8h-6v-6z" />
                </svg>
                <blockquote className="mt-5 font-display text-xl font-medium italic leading-snug">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-linen pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">{v.name}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-faint">{v.place}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Closing banner ============ */}
      <section className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10">
        <Reveal>
          <div className="relative overflow-hidden bg-ink px-6 py-16 text-center text-porcelain md:py-20">
            <p aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[18vw] font-semibold italic text-porcelain/[0.05]">
              Ankara
            </p>
            <p className="relative text-[10px] uppercase tracking-[0.34em] text-champagne">
              The season is short · The cloth is numbered
            </p>
            <h2 className="relative mx-auto mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-6xl">
              Your next occasion deserves
              <em className="italic text-champagne"> better cloth.</em>
            </h2>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/shop"
                className="bg-porcelain px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-colors duration-300 hover:bg-champagne"
              >
                Shop the Boutique
              </Link>
              <a
                href={buildWhatsAppUrl("Hello Dorbrah — help me choose a cloth for an upcoming event.")}
                target="_blank"
                rel="noreferrer"
                className="link-rule text-[11px] font-medium uppercase tracking-[0.26em] text-champagne"
              >
                Ask the Concierge
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
