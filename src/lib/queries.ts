import { db } from "@/db";
import { products, reviews, orders } from "@/db/schema";
import type { Product, Review } from "@/db/schema";
import { seedProducts, seedReviews } from "@/lib/seed";
import { desc, eq, sql } from "drizzle-orm";

let seeded: Promise<void> | null = null;

export function ensureSeeded(): Promise<void> {
  if (!seeded) {
    seeded = (async () => {
      try {
        const existingProducts = await db
          .select({ slug: products.slug })
          .from(products);
        const haveSlugs = new Set(existingProducts.map((r) => r.slug));
        const missingProducts = seedProducts.filter(
          (p) => !haveSlugs.has(p.slug)
        );
        if (missingProducts.length > 0) {
          await db.insert(products).values(missingProducts);
        }

        const existingReviews = await db
          .select({ slug: reviews.productSlug, title: reviews.title })
          .from(reviews);
        const haveReviews = new Set(
          existingReviews.map((r) => `${r.slug}::${r.title}`)
        );
        const missingReviews = seedReviews.filter(
          (r) => !haveReviews.has(`${r.productSlug}::${r.title}`)
        );
        if (missingReviews.length > 0) {
          await db.insert(reviews).values(missingReviews);
        }
      } catch (err) {
        console.error("Seeding check failed:", err);
        seeded = null; // allow retry on next request
      }
    })();
  }
  return seeded;
}

export async function getProducts(): Promise<Product[]> {
  await ensureSeeded();
  return db
    .select()
    .from(products)
    .orderBy(desc(products.featured), products.id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await ensureSeeded();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows[0];
}

export async function getReviewsForSlug(slug: string): Promise<Review[]> {
  await ensureSeeded();
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.productSlug, slug))
    .orderBy(desc(reviews.createdAt), desc(reviews.id));
}

export async function getReviewStats(): Promise<
  Record<string, { avg: number; count: number }>
> {
  await ensureSeeded();
  const rows = await db
    .select({
      slug: reviews.productSlug,
      avg: sql<number>`avg(${reviews.rating})::float`,
      count: sql<number>`count(*)::int`,
    })
    .from(reviews)
    .groupBy(reviews.productSlug);
  const map: Record<string, { avg: number; count: number }> = {};
  for (const row of rows) {
    map[row.slug] = { avg: Number(row.avg), count: Number(row.count) };
  }
  return map;
}

export async function insertOrder(data: {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  country: string;
  notes: string | null;
  itemsJson: string;
  subtotalNaira: number;
  shippingNaira: number;
  totalNaira: number;
  shippingMethod: string;
  paymentMethod: string;
}) {
  const [order] = await db.insert(orders).values(data).returning();
  return order;
}

export async function insertReview(data: {
  productSlug: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
}): Promise<Review> {
  const [review] = await db.insert(reviews).values(data).returning();
  return review;
}
