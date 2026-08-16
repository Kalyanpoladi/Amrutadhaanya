import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type MatchBody = {
  registrationId: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // ---------------------------------------------------------
    // 1. Get authenticated user
    // ---------------------------------------------------------

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "You must be logged in.",
        },
        { status: 401 },
      );
    }

    // ---------------------------------------------------------
    // 2. Verify active admin
    // ---------------------------------------------------------

    const { data: adminProfile, error: adminError } =
      await supabase
        .from("admin_profiles")
        .select(
          `
            id,
            auth_user_id,
            role,
            is_active
          `,
        )
        .eq("auth_user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (adminError) {
      console.error(
        "Admin profile lookup error:",
        adminError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify administrator access.",
        },
        { status: 500 },
      );
    }

    if (
      !adminProfile ||
      adminProfile.role !== "admin" ||
      adminProfile.is_active !== true
    ) {
      return NextResponse.json(
        {
          error: "Administrator access required.",
        },
        { status: 403 },
      );
    }

    // ---------------------------------------------------------
    // 3. Read body
    // ---------------------------------------------------------

    const body = (await request.json()) as MatchBody;

    const registrationId =
      typeof body.registrationId === "string"
        ? body.registrationId.trim()
        : "";

    if (!registrationId) {
      return NextResponse.json(
        {
          error: "Registration ID is required.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 4. Run authoritative database matching function
    // ---------------------------------------------------------

    const { data, error: matchError } =
      await supabase.rpc(
        "match_grower_registration",
        {
          p_registration_id: registrationId,
        },
      );

    if (matchError) {
      console.error(
        "Grower matching error:",
        matchError,
      );

      return NextResponse.json(
        {
          error:
            matchError.message ||
            "Unable to match grower registration.",
        },
        { status: 400 },
      );
    }

    const result =
      Array.isArray(data) ? data[0] : data;

    return NextResponse.json(
      {
        success: true,
        result: result ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Grower match API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while matching the grower.",
      },
      { status: 500 },
    );
  }
}
