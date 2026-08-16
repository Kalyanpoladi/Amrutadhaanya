import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ConfirmVerificationBody = {
  registrationId: string;
  verificationNotes?: string;
};

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // ---------------------------------------------------------
    // 1. Authenticated user
    // ---------------------------------------------------------

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    // ---------------------------------------------------------
    // 2. Active admin
    // ---------------------------------------------------------

    const { data: adminProfile, error: adminError } =
      await supabase
        .from("admin_profiles")
        .select(`
          id,
          auth_user_id,
          role,
          is_active
        `)
        .eq("auth_user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (adminError) {
      console.error("Admin profile lookup error:", adminError);

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
    // 3. Request body
    // ---------------------------------------------------------

    const body =
      (await request.json()) as ConfirmVerificationBody;

    const registrationId =
      typeof body.registrationId === "string"
        ? body.registrationId.trim()
        : "";

    const verificationNotes =
      typeof body.verificationNotes === "string"
        ? body.verificationNotes.trim()
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
    // 4. Confirm verification
    // ---------------------------------------------------------

    const { data, error } = await supabase.rpc(
      "confirm_grower_verification",
      {
        p_registration_id: registrationId,
        p_reviewer_id: adminProfile.id,
        p_verification_notes:
          verificationNotes || null,
      },
    );

    if (error) {
      console.error(
        "Grower verification confirmation error:",
        error,
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "Unable to confirm grower verification.",
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
      "Grower verification API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while confirming verification.",
      },
      { status: 500 },
    );
  }
}
