"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { WHATSAPP_DISPLAY, buildWhatsAppUrl } from "@/lib/whatsapp";

const CLIENT_CARE = [
  { label: "Shop All Cloth", href: "/shop" },
  { label: "Heritage Edit", href: "/shop?collection=Heritage" },
  { label: "Celebration Yardage", href: "/shop?collection=Celebration" },
  { label: "Signature Noir", href: "/shop?collection=Signature" },
  { label: "Checkout", href: "/checkout" },
];

const MAISON = [
  { label: "Our Story", href: "/#maison" },
  { label: "The Atelier", href: "/#maison" },
  { label: "Client Words", href: "/#voices" },
  { label: "Bespoke Orders", href: "/#contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const onJoin = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim().includes("@")) {
      setJoined(true);
      setEmail("");
    }
  };

  return (
    <footer id="contact" className="mt-24 bg-ink text-porcelain">
      {/* Newsletter band */}
      <div className="border-b border-porcelain/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-champagne">
              The Private List
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium italic leading-tight md:text-4xl">
              First yards, before the world sees them.
            </h2>
          </div>
          {joined ? (
            <p className="animate-rise border border-champagne/40 px-6 py-4 text-sm font-light tracking-wide text-champagne">
              Welcome to the maison — your first dispatch arrives this week.
            </p>
          ) : (
            <form onSubmit={onJoin} className="flex w-full max-w-md items-end gap-4 md:w-auto">
              <div className="flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full border-b border-porcelain/30 bg-transparent pb-2 text-sm font-light outline-none transition-colors placeholder:text-porcelain/40 focus:border-champagne"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 border-b border-transparent pb-2 text-[11px] font-medium uppercase tracking-[0.26em] text-champagne transition-colors hover:text-porcelain"
              >
                Join →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-10">
        <div>
          <p className="font-display text-3xl font-semibold tracking-[0.08em]">DORBRAH</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.5em] text-champagne">
            Fabrics · Lagos
          </p>
          <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-porcelain/70">
            A Nigerian maison selling authentic Ankara wax print by the six-yard
            bundle — priced honestly in Naira, delivered from Lekki to every
            continent since 2016.
          </p>
          <a
            href={buildWhatsAppUrl("Hello Dorbrah Fabrics — I would like to place a bespoke order.")}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 border border-porcelain/25 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-porcelain transition-all duration-300 hover:border-champagne hover:text-champagne"
          >
            <svg viewBox="0 0 24 24" className="size-4 text-champagne" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2zm4.52 13.91c-.25.7-1.45 1.35-2 1.41-.52.06-1.01.27-3.4-.7-2.87-1.16-4.68-4.1-4.82-4.29-.14-.19-1.16-1.55-1.16-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35l.55.01c.18 0 .41-.07.65.5.24.58.83 2.02.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.29.48l-.44.51c-.14.14-.29.3-.13.59.17.29.74 1.23 1.6 1.99 1.1.98 2.03 1.29 2.32 1.43.29.15.46.13.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.15.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.18 1.4z" />
            </svg>
            {WHATSAPP_DISPLAY}
          </a>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-champagne">
            Boutique
          </p>
          <ul className="mt-5 space-y-3">
            {CLIENT_CARE.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="link-rule text-sm font-light text-porcelain/70 transition-colors hover:text-porcelain">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-champagne">
            Maison
          </p>
          <ul className="mt-5 space-y-3">
            {MAISON.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="link-rule text-sm font-light text-porcelain/70 transition-colors hover:text-porcelain">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-champagne">
            The Atelier
          </p>
          <address className="mt-5 space-y-1 text-sm font-light not-italic leading-relaxed text-porcelain/70">
            <p>14B Admiralty Way,</p>
            <p>Lekki Phase 1, Lagos, Nigeria</p>
            <p className="pt-2 text-porcelain/50">Mon – Sat · 9:00 – 19:00 WAT</p>
            <p>concierge@dorbrahfabrics.com</p>
          </address>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Visa", "Mastercard", "Verve", "Bank Transfer", "Pay on Delivery"].map((p) => (
              <span key={p} className="border border-porcelain/20 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-porcelain/60">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-porcelain/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-5 py-6 text-[10px] uppercase tracking-[0.22em] text-porcelain/40 md:flex-row md:px-10">
          <p>© 2026 Dorbrah Fabrics Ltd. · RC 1684220</p>
          <p>All prices in Nigerian Naira (₦)</p>
          <p>Lagos → The World</p>
        </div>
      </div>
    </footer>
  );
}
