import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ApproveRegistrationBody = {
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
    // 2. Verify active administrator
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
          error: "Unable to verify administrator access.",
        },
        { status: 500 },
      );
    }

    if (
  !adminProfile ||
  !["admin", "super_admin"].includes(adminProfile.role) ||
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
    // 3. Read request body
    // ---------------------------------------------------------

    const body =
      (await request.json()) as ApproveRegistrationBody;

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
        {
          error: "Registration ID is required.",
        },
        { status: 400 },
      );
    }

    if (!locationCode) {
      return NextResponse.json(
        {
          error: "Location code is required.",
        },
        { status: 400 },
      );
    }

    if (!/^[A-Z]{2,6}$/.test(locationCode)) {
      return NextResponse.json(
        {
          error:
            "Invalid location code. Use 2-6 letters.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 5. Confirm farmer verification
    // ---------------------------------------------------------

    const { data: verificationData, error: verificationError } =
      await supabase.rpc(
        "confirm_grower_verification",
        {
          p_registration_id: registrationId,
          p_reviewer_id: adminProfile.id,
          p_verification_notes:
            verificationNotes || null,
        },
      );

    if (verificationError) {
      console.error(
        "Grower verification error:",
        verificationError,
      );

      return NextResponse.json(
        {
          error:
            verificationError.message ||
            "Unable to confirm grower verification.",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------------------------
    // 6. Approve registration + issue Grower ID
    // ---------------------------------------------------------

    const { data: approvalData, error: approvalError } =
      await supabase.rpc(
        "approve_grower_registration",
        {
          p_registration_id: registrationId,
          p_reviewer_id: adminProfile.id,
          p_location_code: locationCode,
          p_verification_notes:
            verificationNotes || null,
        },
      );

    if (approvalError) {
      console.error(
        "Grower registration approval error:",
        approvalError,
      );

      return NextResponse.json(
        {
          error:
            approvalError.message ||
            "Unable to approve grower registration.",
        },
        { status: 400 },
      );
    }

    const approvalResult = Array.isArray(approvalData)
      ? approvalData[0]
      : approvalData;

    return NextResponse.json(
      {
        success: true,
        verification:
          Array.isArray(verificationData)
            ? verificationData[0]
            : verificationData,
        approval: approvalResult ?? null,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Grower registration approval API error:",
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