export function RatingStars({
  rating,
  className = "size-3.5",
  muted = false,
}: {
  rating: number;
  className?: string;
  muted?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${className} ${
            i <= Math.round(rating)
              ? "fill-bronze"
              : muted
                ? "fill-linen"
                : "fill-linen"
          }`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
