import { NextResponse } from "next/server";
import { insertReview } from "@/lib/queries";

interface ReviewBody {
  productSlug?: string;
  author?: string;
  location?: string;
  rating?: number;
  title?: string;
  body?: string;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ReviewBody;

    if (
      !data.productSlug ||
      !data.author?.trim() ||
      !data.title?.trim() ||
      !data.body?.trim() ||
      typeof data.rating !== "number" ||
      data.rating < 1 ||
      data.rating > 5
    ) {
      return NextResponse.json(
        { error: "Incomplete review." },
        { status: 400 }
      );
    }

    const review = await insertReview({
      productSlug: data.productSlug,
      author: data.author.trim().slice(0, 60),
      location: (data.location?.trim() || "Verified Client").slice(0, 80),
      rating: Math.round(data.rating),
      title: data.title.trim().slice(0, 120),
      body: data.body.trim().slice(0, 1200),
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    console.error("Review route error:", err);
    return NextResponse.json(
      { error: "Could not save the review." },
      { status: 500 }
    );
  }
}
