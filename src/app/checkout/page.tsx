"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useStore } from "@/components/StoreProvider";
import { naira } from "@/lib/format";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const FREE_SHIPPING_THRESHOLD = 200000;

const SHIPPING = [
  { id: "pickup", label: "Atelier Pickup", eta: "Ready in 24 hrs · Lekki Phase 1, Lagos", fee: 0 },
  { id: "lagos", label: "Lagos Same-Day Rider", eta: "Today, within Lagos", fee: 3500 },
  { id: "nigeria", label: "Nigeria Nationwide", eta: "2–4 working days", fee: 6500 },
  { id: "africa", label: "Africa Regional", eta: "4–8 working days", fee: 18000 },
  { id: "world", label: "Worldwide Express", eta: "5–9 working days · fully tracked", fee: 28000 },
];

const PAYMENTS = [
  {
    id: "pod",
    label: "Pay on Delivery",
    desc: "Cash or POS when the cloth reaches your door. Available across Nigeria.",
    badge: "Nigeria",
  },
  {
    id: "transfer",
    label: "Bank Transfer",
    desc: "Our NGN account details are shared on WhatsApp once you confirm.",
    badge: "Worldwide",
  },
  {
    id: "card",
    label: "Card via Payment Link",
    desc: "A secure Paystack link is sent to you in the WhatsApp chat.",
    badge: "Worldwide",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items, hydrated, subtotal, clearCart } = useStore();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [shippingId, setShippingId] = useState("nigeria");
  const [paymentId, setPaymentId] = useState("pod");
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState<{ reference: string; whatsappUrl: string } | null>(null);
  const [submitError, setSubmitError] = useState("");

  const shipping = SHIPPING.find((s) => s.id === shippingId) ?? SHIPPING[2];
  const payment = PAYMENTS.find((p) => p.id === paymentId) ?? PAYMENTS[0];

  const shippingFee = useMemo(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD && shipping.fee > 0) return 0;
    return shipping.fee;
  }, [shipping, subtotal]);

  const total = subtotal + shippingFee;

  const set = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Your full name, please.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "A valid email address.";
    if (form.phone.trim().length < 7) next.phone = "A reachable phone number.";
    if (form.address.trim().length < 6) next.address = "Street address for the rider or courier.";
    if (!form.city.trim()) next.city = "City.";
    if (!form.country.trim()) next.country = "Country.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            address: form.address.trim(),
            city: form.city.trim(),
            country: form.country.trim(),
            notes: form.notes.trim(),
          },
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            qty: i.qty,
            price: i.price,
          })),
          shippingMethod: shipping.label,
          shippingFee,
          paymentMethod: payment.label,
          subtotal,
          total,
        }),
      });
      const data = (await res.json()) as { reference: string; whatsappUrl: string };
      if (!res.ok || !data.whatsappUrl) throw new Error("failed");
      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      setPlaced({ reference: data.reference, whatsappUrl: data.whatsappUrl });
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        "We could not register the order. Please try again, or send your bag directly via WhatsApp from the cart."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Success ---------- */
  if (placed) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center">
        <span className="animate-pop grid size-20 place-items-center rounded-full border-2 border-bronze">
          <svg viewBox="0 0 24 24" className="size-9 fill-none stroke-bronze" strokeWidth="2" aria-hidden="true">
            <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="animate-rise mt-8 text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
          Order registered
        </p>
        <h1 className="animate-rise mt-4 font-display text-5xl font-medium md:text-6xl">
          The cloth is <em className="italic text-bronze-deep">yours.</em>
        </h1>
        <p className="animate-rise mt-3 font-display text-2xl font-semibold tracking-wide" style={{ ["--rise-delay" as string]: "150ms" }}>
          {placed.reference}
        </p>
        <p className="animate-rise mt-6 max-w-md text-sm font-light leading-relaxed text-ink-soft" style={{ ["--rise-delay" as string]: "250ms" }}>
          Your order and delivery details have been composed in a WhatsApp
          message to our concierge. A chat window should have opened — simply
          press <span className="font-medium text-ink">send</span> and we will
          confirm your bolt, dye lot and payment within minutes (9am–7pm WAT).
        </p>
        <div className="animate-rise mt-9 flex flex-wrap justify-center gap-4" style={{ ["--rise-delay" as string]: "350ms" }}>
          <a
            href={placed.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-sweep bg-ink px-9 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-porcelain"
          >
            Open WhatsApp Chat
          </a>
          <Link
            href="/shop"
            className="border border-ink px-9 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ink transition-colors hover:bg-parchment"
          >
            Return to Boutique
          </Link>
        </div>
        <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-ink-faint">
          If the chat did not open, the button above will take you there.
        </p>
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
        <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-deep">Checkout</p>
        <h1 className="mt-4 font-display text-5xl font-medium italic">
          Nothing to tailors yet.
        </h1>
        <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-ink-faint">
          Your bag is empty. Choose a six-yard bundle and return — the concierge
          is waiting.
        </p>
        <Link
          href="/shop"
          className="btn-sweep mt-9 bg-ink px-10 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-porcelain"
        >
          Enter the Boutique
        </Link>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-[10px] uppercase tracking-[0.34em] text-ink-faint">
          Preparing your bag…
        </p>
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-12 md:px-10">
      <p className="animate-fade-in text-[10px] font-medium uppercase tracking-[0.34em] text-bronze-deep">
        Final Fitting
      </p>
      <h1 className="animate-rise mt-3 font-display text-5xl font-medium leading-none md:text-6xl">
        Check<em className="italic text-bronze-deep">out</em>
      </h1>

      <form onSubmit={placeOrder} className="mt-12 grid gap-14 lg:grid-cols-12">
        {/* ===== Left: details ===== */}
        <div className="space-y-12 lg:col-span-7">
          {/* Contact */}
          <section className="animate-rise">
            <h2 className="flex items-baseline gap-4 font-display text-2xl font-medium">
              <span className="font-semibold text-bronze">01</span> Your details
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Full name *</label>
                <input id="name" className="field" value={form.name} onChange={set("name")} placeholder="Adaeze Okonkwo" />
                {errors.name && <p className="mt-1.5 text-xs text-bordeaux">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Phone / WhatsApp *</label>
                <input id="phone" className="field" value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" />
                {errors.phone && <p className="mt-1.5 text-xs text-bordeaux">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Email *</label>
                <input id="email" type="email" className="field" value={form.email} onChange={set("email")} placeholder="you@example.com" />
                {errors.email && <p className="mt-1.5 text-xs text-bordeaux">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="animate-rise" style={{ ["--rise-delay" as string]: "120ms" }}>
            <h2 className="flex items-baseline gap-4 font-display text-2xl font-medium">
              <span className="font-semibold text-bronze">02</span> Delivery address
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="address" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Street address *</label>
                <input id="address" className="field" value={form.address} onChange={set("address")} placeholder="12 Adeola Odeku Street" />
                {errors.address && <p className="mt-1.5 text-xs text-bordeaux">{errors.address}</p>}
              </div>
              <div>
                <label htmlFor="city" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">City *</label>
                <input id="city" className="field" value={form.city} onChange={set("city")} placeholder="Lagos" />
                {errors.city && <p className="mt-1.5 text-xs text-bordeaux">{errors.city}</p>}
              </div>
              <div>
                <label htmlFor="country" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Country *</label>
                <input id="country" className="field" value={form.country} onChange={set("country")} placeholder="Nigeria" />
                {errors.country && <p className="mt-1.5 text-xs text-bordeaux">{errors.country}</p>}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                  Notes for the atelier <span className="text-linen">(optional)</span>
                </label>
                <textarea id="notes" rows={2} className="field resize-none" value={form.notes} onChange={set("notes")} placeholder="Tailoring referral, dye-lot requests, gifting notes…" />
              </div>
            </div>
          </section>

          {/* Shipping method */}
          <section className="animate-rise" style={{ ["--rise-delay" as string]: "220ms" }}>
            <h2 className="flex items-baseline gap-4 font-display text-2xl font-medium">
              <span className="font-semibold text-bronze">03</span> Delivery method
            </h2>
            <div className="mt-6 divide-y divide-linen border-y border-linen">
              {SHIPPING.map((s) => {
                const free = s.fee > 0 && subtotal >= FREE_SHIPPING_THRESHOLD;
                return (
                  <label
                    key={s.id}
                    className={`flex cursor-pointer items-center gap-4 py-4 transition-colors ${
                      shippingId === s.id ? "bg-parchment/60" : "hover:bg-parchment/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      className="sr-only"
                      checked={shippingId === s.id}
                      onChange={() => setShippingId(s.id)}
                    />
                    <span
                      className={`grid size-4 shrink-0 place-items-center rounded-full border transition-all ${
                        shippingId === s.id ? "border-bronze" : "border-linen"
                      }`}
                    >
                      <span className={`size-2 rounded-full bg-bronze transition-transform ${shippingId === s.id ? "scale-100" : "scale-0"}`} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium tracking-wide">{s.label}</span>
                      <span className="block text-xs font-light text-ink-faint">{s.eta}</span>
                    </span>
                    <span className="text-sm font-medium">
                      {s.fee === 0 ? "Free" : free ? (
                        <span className="text-bronze-deep">Complimentary</span>
                      ) : (
                        naira(s.fee)
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Payment */}
          <section className="animate-rise" style={{ ["--rise-delay" as string]: "320ms" }}>
            <h2 className="flex items-baseline gap-4 font-display text-2xl font-medium">
              <span className="font-semibold text-bronze">04</span> Payment
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`relative cursor-pointer border p-5 transition-all duration-300 ${
                    paymentId === p.id
                      ? "border-ink bg-parchment/70 shadow-[0_16px_40px_-24px_rgba(27,22,17,0.5)]"
                      : "border-linen hover:border-ink-faint"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    className="sr-only"
                    checked={paymentId === p.id}
                    onChange={() => setPaymentId(p.id)}
                  />
                  <span className="absolute right-3 top-3 bg-ink px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] text-porcelain">
                    {p.badge}
                  </span>
                  <span className="block pr-12 font-display text-lg font-semibold">{p.label}</span>
                  <span className="mt-2 block text-xs font-light leading-relaxed text-ink-faint">{p.desc}</span>
                  {paymentId === p.id && (
                    <span className="absolute bottom-3 right-3 size-2 rounded-full bg-bronze" />
                  )}
                </label>
              ))}
            </div>
            {paymentId === "pod" && (
              <p className="animate-rise mt-4 border-l-2 border-bronze pl-4 text-xs font-light leading-relaxed text-ink-soft">
                Pay on Delivery: our rider or courier collects cash or card (POS)
                when your cloth arrives — across all 36 states and the FCT.
              </p>
            )}
          </section>
        </div>

        {/* ===== Right: summary ===== */}
        <aside className="lg:col-span-5">
          <div className="animate-rise sticky top-28 border border-linen bg-parchment/50 p-7" style={{ ["--rise-delay" as string]: "200ms" }}>
            <h2 className="font-display text-2xl font-medium">
              Order <em className="italic text-bronze-deep">Summary</em>
            </h2>
            <ul className="mt-6 max-h-72 space-y-5 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden bg-parchment">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                      style={item.imageFilter ? { filter: item.imageFilter } : undefined}
                    />
                    <span className="absolute -right-0 -top-0 grid size-5 place-items-center bg-ink text-[10px] text-porcelain">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-semibold leading-tight">{item.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      {item.colorway} · 6 yds
                    </p>
                  </div>
                  <span className="text-sm font-medium">{naira(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2.5 border-t border-linen pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="font-light text-ink-soft">Subtotal</dt>
                <dd className="font-medium">{naira(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-light text-ink-soft">{shipping.label}</dt>
                <dd className="font-medium">
                  {shippingFee === 0 ? <span className="text-bronze-deep">Free</span> : naira(shippingFee)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-linen pt-3">
                <dt className="text-[11px] font-medium uppercase tracking-[0.24em]">Total</dt>
                <dd className="font-display text-2xl font-semibold">{naira(total)}</dd>
              </div>
            </dl>

            {shippingFee > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mt-3 text-[11px] font-light text-ink-faint">
                Add {naira(FREE_SHIPPING_THRESHOLD - subtotal)} more for complimentary delivery.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-sweep mt-6 flex w-full items-center justify-center gap-3 bg-ink py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-porcelain disabled:cursor-wait disabled:opacity-60"
            >
              {submitting && (
                <span className="animate-spin-slow inline-block size-3.5 rounded-full border border-porcelain/40 border-t-porcelain" />
              )}
              {submitting ? "Registering order…" : `Place Order — ${naira(total)}`}
            </button>

            <p className="mt-4 text-center text-[11px] font-light leading-relaxed text-ink-faint">
              Placing your order opens WhatsApp with the full order & your
              details pre-composed for our concierge at{" "}
              <span className="font-medium text-bronze-deep">+234 805 421 7435</span>.
              Press send in the chat to confirm.
            </p>

            {submitError && (
              <p className="mt-4 border border-bordeaux/40 bg-bordeaux/5 px-4 py-3 text-xs text-bordeaux">
                {submitError}
              </p>
            )}

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["Visa", "Mastercard", "Verve", "Bank Transfer", "Pay on Delivery"].map((m) => (
                <span key={m} className="border border-linen px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-ink-faint">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
