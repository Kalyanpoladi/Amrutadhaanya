import { NextResponse } from "next/server";

import { getWebsiteProducts } from "@/lib/data/product";

export async function GET() {
  try {
    const products = await getWebsiteProducts();

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error("Failed to load website products:", error);

    return NextResponse.json(
      {
        error: "Failed to load products.",
      },
      {
        status: 500,
      },
    );
  }
}
