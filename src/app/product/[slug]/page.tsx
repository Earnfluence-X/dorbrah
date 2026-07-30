import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProducts,
  getReviewStats,
  getReviewsForSlug,
} from "@/lib/queries";
import { ProductClient } from "@/components/ProductClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece not found — DORBRAH FABRICS" };
  return {
    title: `${product.name} (${product.colorway}) — DORBRAH FABRICS`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, reviews, stats, all] = await Promise.all([
    getProductBySlug(slug),
    getReviewsForSlug(slug),
    getReviewStats(),
    getProducts(),
  ]);

  if (!product) notFound();

  const related = [
    ...all.filter((p) => p.slug !== slug && p.collection === product.collection),
    ...all.filter((p) => p.slug !== slug && p.collection !== product.collection),
  ].slice(0, 4);

  return (
    <ProductClient
      product={product}
      reviews={reviews}
      stat={stats[slug] ?? { avg: 0, count: 0 }}
      related={related}
    />
  );
}
