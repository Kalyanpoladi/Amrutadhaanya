import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Verify logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 },
      );
    }

    // 2. Verify Super Admin
    const { data: requester, error: requesterError } =
      await supabase
        .from("admin_profiles")
        .select("id, auth_user_id, role, is_active")
        .eq("auth_user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (
      requesterError ||
      !requester ||
      requester.role !== "super_admin"
    ) {
      return NextResponse.json(
        {
          error:
            "Only the Super Admin can reset administrator passwords.",
        },
        { status: 403 },
      );
    }

    // 3. Read request
    const body = await request.json();

    const authUserId =
      typeof body.authUserId === "string"
        ? body.authUserId.trim()
        : "";

    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    if (!authUserId) {
      return NextResponse.json(
        { error: "Administrator ID is required." },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          error:
            "New password must contain at least 8 characters.",
        },
        { status: 400 },
      );
    }

    // 4. Prevent Super Admin from being reset through this route
    const { data: targetAdmin, error: targetError } =
      await supabase
        .from("admin_profiles")
        .select(
          "id, auth_user_id, full_name, email, role, is_active",
        )
        .eq("auth_user_id", authUserId)
        .maybeSingle();

    if (targetError || !targetAdmin) {
      return NextResponse.json(
        { error: "Administrator account not found." },
        { status: 404 },
      );
    }

    if (targetAdmin.role === "super_admin") {
      return NextResponse.json(
        {
          error:
            "The Super Admin account cannot be reset from administrator management.",
        },
        { status: 403 },
      );
    }

    // 5. Use service-role client
    const adminSupabase = createAdminClient();

    const { error: updateError } =
      await adminSupabase.auth.admin.updateUserById(
        authUserId,
        {
          password: newPassword,
        },
      );

    if (updateError) {
      return NextResponse.json(
        {
          error:
            updateError.message ||
            "Unable to reset administrator password.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: `Password reset successfully for ${targetAdmin.full_name}.`,
    });
  } catch (error) {
    console.error(
      "Reset administrator password error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to reset administrator password.",
      },
      { status: 500 },
    );
  }
}
