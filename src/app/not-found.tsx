import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.34em] text-bronze-deep">
        Lost thread
      </p>
      <h1 className="mt-4 font-display text-7xl font-medium italic md:text-8xl">404</h1>
      <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-ink-soft">
        This page has been cut from the bolt. The boutique, however, is very
        much open.
      </p>
      <Link
        href="/shop"
        className="btn-sweep mt-9 border border-ink px-9 py-4 text-[11px] font-medium uppercase tracking-[0.3em] text-ink transition-colors hover:text-porcelain"
      >
        Return to the Boutique
      </Link>
    </div>
  );
}
