"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/StoreProvider";
import { naira } from "@/lib/format";
import { buildCartMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const FREE_SHIPPING_THRESHOLD = 200000;

export function CartDrawer() {
  const {
    items,
    hydrated,
    isCartOpen,
    closeCart,
    updateQty,
    removeItem,
    subtotal,
  } = useStore();
  const router = useRouter();

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[430px] flex-col bg-porcelain shadow-[-30px_0_80px_-30px_rgba(27,22,17,0.4)] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-linen px-6 py-5">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-wide">
              Your Bag
            </h2>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-ink-faint">
              Six-yard bundles · Priced in ₦
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-2xl font-light leading-none text-ink transition-transform duration-300 hover:rotate-90"
            aria-label="Close bag"
          >
            ×
          </button>
        </div>

        {/* Free shipping meter */}
        {hydrated && items.length > 0 && (
          <div className="border-b border-linen px-6 py-4">
            <p className="text-[11px] tracking-wide text-ink-soft">
              {remaining > 0 ? (
                <>
                  <span className="font-semibold text-bronze-deep">
                    {naira(remaining)}
                  </span>{" "}
                  away from complimentary worldwide shipping
                </>
              ) : (
                <span className="font-semibold text-bronze-deep">
                  ✓ Complimentary worldwide shipping unlocked
                </span>
              )}
            </p>
            <div className="mt-2 h-[3px] w-full bg-linen">
              <div
                className="h-full bg-bronze transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!hydrated || items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg viewBox="0 0 24 24" className="size-10 text-linen" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M5 8h14l-1.3 12.2a1.6 1.6 0 0 1-1.6 1.3H7.9a1.6 1.6 0 0 1-1.6-1.3L5 8z" />
                <path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10" />
              </svg>
              <p className="mt-5 font-display text-2xl font-medium italic text-ink">
                Your bag awaits its first cloth
              </p>
              <p className="mt-2 max-w-[240px] text-sm font-light text-ink-faint">
                Six yards of intention — explore the collection and find yours.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-sweep mt-7 border border-ink px-8 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-colors hover:text-porcelain"
              >
                Enter the Boutique
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 animate-rise">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="relative block size-24 shrink-0 overflow-hidden bg-parchment"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                      style={item.imageFilter ? { filter: item.imageFilter } : undefined}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-[15px] font-semibold leading-tight hover:text-bronze-deep"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                          {item.colorway} · 6 yds
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-lg leading-none text-ink-faint transition-colors hover:text-bordeaux"
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-linen">
                        <button
                          onClick={() => updateQty(item.slug, item.qty - 1)}
                          className="px-3 py-1 text-sm text-ink-soft hover:bg-parchment"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.slug, item.qty + 1)}
                          className="px-3 py-1 text-sm text-ink-soft hover:bg-parchment"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium tracking-wide">
                        {naira(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hydrated && items.length > 0 && (
          <div className="border-t border-linen bg-parchment/60 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">
                Subtotal
              </span>
              <span className="font-display text-2xl font-semibold">
                {naira(subtotal)}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-light text-ink-faint">
              Shipping & duties calculated at checkout · Pay on Delivery in Nigeria
            </p>
            <button
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
              className="btn-sweep mt-4 w-full bg-ink py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-porcelain transition-colors hover:text-porcelain"
            >
              Proceed to Checkout
            </button>
            <a
              href={buildWhatsAppUrl(
                buildCartMessage(
                  items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
                  subtotal
                )
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-center text-[11px] uppercase tracking-[0.2em] text-bronze-deep transition-colors hover:text-ink"
            >
              or order directly via WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}
