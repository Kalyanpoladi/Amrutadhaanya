import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ApproveGrowerBody = {
  registrationId: string;
  locationCode: string;
  verificationNotes?: string;
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
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    // ---------------------------------------------------------
    // 2. Get active admin profile
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
        { error: "Unable to verify administrator access." },
        { status: 500 },
      );
    }

    if (
      !adminProfile ||
      adminProfile.role !== "admin" ||
      adminProfile.is_active !== true
    ) {
      return NextResponse.json(
        { error: "Administrator access required." },
        { status: 403 },
      );
    }

    // ---------------------------------------------------------
    // 3. Read request
    // ---------------------------------------------------------

    const body = (await request.json()) as ApproveGrowerBody;

    const registrationId =
      typeof body.registrationId === "string"
        ? body.registrationId.trim()
        : "";

    const locationCode =
      typeof body.locationCode === "string"
        ? body.locationCode.trim().toUpperCase()
        : "";

    const verificationNotes =
      typeof body.verificationNotes === "string"
        ? body.verificationNotes.trim()
        : "";

    // ---------------------------------------------------------
    // 4. Validate
    // ---------------------------------------------------------

    if (!registrationId) {
      return NextResponse.json(
        { error: "Registration ID is required." },
        { status: 400 },
      );
    }

    if (!locationCode) {
      return NextResponse.json(
        { error: "Location code is required." },
        { status: 400 },
      );
    }

    if (!/^[A-Z]{2,6}$/.test(locationCode)) {
      return NextResponse.json(
        {
          error: "Invalid location code. Use 2-6 letters.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 5. Approve registration
    //
    // Database function handles:
    // - matching
    // - mismatch protection
    // - verification confirmation
    // - existing-grower linking
    // - new Grower creation
    // - Grower ID generation
    // - final approval
    // ---------------------------------------------------------

    const { data, error } = await supabase.rpc(
      "approve_grower_registration",
      {
        p_registration_id: registrationId,
        p_reviewer_id: adminProfile.id,
        p_location_code: locationCode,
        p_verification_notes:
          verificationNotes || null,
      },
    );

    if (error) {
      console.error(
        "Grower registration approval error:",
        error,
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "Unable to approve grower registration.",
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
      "Grower approval API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while approving the grower.",
      },
      { status: 500 },
    );
  }
}