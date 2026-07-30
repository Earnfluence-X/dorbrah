"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/StoreProvider";
import { WHATSAPP_DISPLAY, buildWhatsAppUrl } from "@/lib/whatsapp";

const NAV = [
  { label: "Shop All", href: "/shop" },
  { label: "Heritage", href: "/shop?collection=Heritage" },
  { label: "Celebration", href: "/shop?collection=Celebration" },
  { label: "Signature", href: "/shop?collection=Signature" },
  { label: "Maison", href: "/#maison" },
];

const TICKER = [
  "Worldwide delivery from Lagos",
  "Prices in Nigerian Naira (₦)",
  "Pay on Delivery available in Nigeria",
  "Complimentary shipping over ₦200,000",
  `Concierge ${WHATSAPP_DISPLAY}`,
  "Authentic wax prints · Six-yard bundles",
];

function WhatsAppGlyph({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.86 9.86 0 0 0 12.04 2zm0 18.03a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.25c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}

export function Header() {
  const { count, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Announcement ticker */}
      <div className="marquee-hover overflow-hidden border-b border-linen bg-ink text-porcelain">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap py-2">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {TICKER.map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="flex items-center text-[10px] font-light uppercase tracking-[0.28em]"
                >
                  <span className="px-6">{t}</span>
                  <span className="size-1 rounded-full bg-bronze" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-linen bg-porcelain/95 shadow-[0_10px_40px_-20px_rgba(27,22,17,0.25)] backdrop-blur-sm"
            : "border-b border-transparent bg-porcelain"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          {/* Left: nav / burger */}
          <div className="flex flex-1 items-center gap-7">
            <button
              className="flex flex-col gap-[5px] p-1 md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="h-px w-6 bg-ink" />
              <span className="h-px w-6 bg-ink" />
              <span className="h-px w-4 bg-ink" />
            </button>
            <nav className="hidden items-center gap-7 md:flex">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="link-rule text-[11px] font-medium uppercase tracking-[0.24em] text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre: wordmark */}
          <Link href="/" className="group text-center leading-none">
            <span className="font-display text-[26px] font-semibold tracking-[0.08em] md:text-[30px]">
              DORBRAH
            </span>
            <span className="mt-1 block text-[8px] font-medium uppercase tracking-[0.52em] text-bronze transition-colors group-hover:text-bronze-deep md:text-[9px]">
              Fabrics · Lagos
            </span>
          </Link>

          {/* Right: whatsapp + cart */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <a
              href={buildWhatsAppUrl(
                "Hello Dorbrah Fabrics — I would like to make an enquiry."
              )}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-bronze-deep sm:flex"
            >
              <WhatsAppGlyph className="size-4 text-bronze" />
              Concierge
            </a>
            <button
              onClick={openCart}
              className="group relative flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.24em] text-ink"
              aria-label="Open cart"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                <path d="M5 8h14l-1.3 12.2a1.6 1.6 0 0 1-1.6 1.3H7.9a1.6 1.6 0 0 1-1.6-1.3L5 8z" />
                <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
              </svg>
              <span className="hidden lg:inline">Cart</span>
              <span
                key={count}
                className={`grid size-5 place-items-center rounded-full text-[10px] font-semibold transition-colors ${
                  count > 0 ? "animate-pop bg-bronze text-porcelain" : "bg-linen text-ink-soft"
                }`}
              >
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-porcelain transition-all duration-500 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-display text-2xl font-semibold tracking-[0.08em]">DORBRAH</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 text-3xl font-light leading-none text-ink"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-7">
          {NAV.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`font-display text-4xl font-medium italic text-ink transition-all duration-700 hover:text-bronze ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-linen px-5 py-6 text-center">
          <a
            href={buildWhatsAppUrl("Hello Dorbrah Fabrics — I would like to make an enquiry.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-bronze-deep"
          >
            <WhatsAppGlyph className="size-4" /> WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </>
  );
}
