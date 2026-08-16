import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return NextResponse.json({
      success: true,
      userExists: !!user,
      userId: user?.id ?? null,
      authError: error?.message ?? null,
    });
  } catch (error) {
    console.error("Supabase debug error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 },
    );
  }
}
