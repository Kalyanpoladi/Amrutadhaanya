import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ======================================================
// GET
// Load all administrator accounts
// ======================================================

export async function GET() {
  try {
    const supabase = await createClient();

    // --------------------------------------------------
    // 1. Verify logged-in user
    // --------------------------------------------------

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be signed in.",
        },
        { status: 401 },
      );
    }

    // --------------------------------------------------
    // 2. Verify Super Admin
    // --------------------------------------------------

    const {
      data: requester,
      error: requesterError,
    } = await supabase
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

    if (
      requesterError ||
      !requester ||
      requester.role !== "super_admin"
    ) {
      return NextResponse.json(
        {
          error:
            "Only the Super Admin can view administrator accounts.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 3. Service-role client
    // --------------------------------------------------

    const adminSupabase = createAdminClient();

    // --------------------------------------------------
    // 4. Load administrators
    // --------------------------------------------------

    const {
      data: admins,
      error: adminsError,
    } = await adminSupabase
      .from("admin_profiles")
      .select(`
        id,
        auth_user_id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      `)
      .in("role", ["admin", "super_admin"])
      .order("created_at", {
        ascending: false,
      });

    if (adminsError) {
      console.error(
        "Administrator list error:",
        adminsError,
      );

      return NextResponse.json(
        {
          error:
            adminsError.message ||
            "Unable to load administrator accounts.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      admins: admins ?? [],
    });
  } catch (error) {
    console.error(
      "Administrator GET API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load administrator accounts.",
      },
      { status: 500 },
    );
  }
}

// ======================================================
// PATCH
// Activate / deactivate an administrator
//
// Expected body:
//
// {
//   "id": "...",
//   "isActive": false
// }
// ======================================================

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    // --------------------------------------------------
    // 1. Verify logged-in user
    // --------------------------------------------------

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be signed in.",
        },
        { status: 401 },
      );
    }

    // --------------------------------------------------
    // 2. Verify Super Admin
    // --------------------------------------------------

    const {
      data: requester,
      error: requesterError,
    } = await supabase
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

    if (
      requesterError ||
      !requester ||
      requester.role !== "super_admin"
    ) {
      return NextResponse.json(
        {
          error:
            "Only the Super Admin can manage administrator accounts.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 3. Read request body
    // --------------------------------------------------

    const body = await request.json();

    const id =
      typeof body.id === "string"
        ? body.id.trim()
        : "";

    if (!id) {
      return NextResponse.json(
        {
          error: "Administrator ID is required.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 4. Validate active status
    // --------------------------------------------------

    if (typeof body.isActive !== "boolean") {
      return NextResponse.json(
        {
          error: "isActive must be true or false.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 5. Service-role client
    // --------------------------------------------------

    const adminSupabase = createAdminClient();

    // --------------------------------------------------
    // 6. Find target administrator
    // --------------------------------------------------

    const {
      data: targetAdmin,
      error: targetError,
    } = await adminSupabase
      .from("admin_profiles")
      .select(`
        id,
        auth_user_id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      `)
      .eq("id", id)
      .maybeSingle();

    if (targetError) {
      console.error(
        "Target administrator lookup error:",
        targetError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to find the administrator account.",
        },
        { status: 500 },
      );
    }

    if (!targetAdmin) {
      return NextResponse.json(
        {
          error:
            "Administrator account not found.",
        },
        { status: 404 },
      );
    }

    // --------------------------------------------------
    // 7. Never modify Super Admin
    // --------------------------------------------------

    if (targetAdmin.role === "super_admin") {
      return NextResponse.json(
        {
          error:
            "The Super Admin account cannot be activated or deactivated here.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 8. Never modify yourself
    // --------------------------------------------------

    if (targetAdmin.auth_user_id === user.id) {
      return NextResponse.json(
        {
          error:
            "You cannot modify your own administrator account.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 9. Update administrator status
    // --------------------------------------------------

    const {
      data: updatedAdmin,
      error: updateError,
    } = await adminSupabase
      .from("admin_profiles")
      .update({
        is_active: body.isActive,
      })
      .eq("id", id)
      .eq("role", "admin")
      .select(`
        id,
        auth_user_id,
        full_name,
        email,
        phone,
        role,
        is_active,
        created_at
      `)
      .single();

    if (updateError || !updatedAdmin) {
      console.error(
        "Administrator status update error:",
        updateError,
      );

      return NextResponse.json(
        {
          error:
            updateError?.message ||
            "Unable to update administrator status.",
        },
        { status: 500 },
      );
    }

    // --------------------------------------------------
    // 10. Success
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      admin: updatedAdmin,
    });
  } catch (error) {
    console.error(
      "Administrator PATCH API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update administrator.",
      },
      { status: 500 },
    );
  }
}
