import type { Metadata } from "next";
import { getProducts, getReviewStats } from "@/lib/queries";
import { ShopClient } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Boutique — DORBRAH FABRICS",
  description:
    "All nine numbered Ankara cloths, filterable by collection and colour. Sold by the six-yard bundle in Nigerian Naira.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts();
  const stats = await getReviewStats();

  return (
    <ShopClient
      products={products}
      stats={stats}
      initialCollection={params.collection}
    />
  );
}
