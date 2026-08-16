import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ======================================================
// POST
// Create a new administrator
// ======================================================

export async function POST(request: Request) {
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
            "Only the Super Admin can create administrator accounts.",
        },
        { status: 403 },
      );
    }

    // --------------------------------------------------
    // 3. Read submitted information
    // --------------------------------------------------

    const body = await request.json();

    const fullName =
      typeof body.fullName === "string"
        ? body.fullName.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : null;

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!fullName) {
      return NextResponse.json(
        {
          error: "Full name is required.",
        },
        { status: 400 },
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "Password must contain at least 8 characters.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 4. Service-role client
    // --------------------------------------------------

    const adminSupabase = createAdminClient();

    // --------------------------------------------------
    // 5. Prevent duplicate admin profile by email
    // --------------------------------------------------

    const {
      data: existingAdmin,
      error: existingAdminError,
    } = await adminSupabase
      .from("admin_profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingAdminError) {
      console.error(
        "Existing administrator lookup error:",
        existingAdminError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to verify whether this administrator already exists.",
        },
        { status: 500 },
      );
    }

    if (existingAdmin) {
      return NextResponse.json(
        {
          error:
            "An administrator account with this email already exists.",
        },
        { status: 409 },
      );
    }

    // --------------------------------------------------
    // 6. Create Supabase Auth user
    // --------------------------------------------------

    const {
      data: authData,
      error: authError,
    } =
      await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          error:
            authError?.message ||
            "Unable to create administrator login.",
        },
        { status: 400 },
      );
    }

    // --------------------------------------------------
    // 7. Create admin profile
    // --------------------------------------------------

    const {
      data: adminProfile,
      error: profileError,
    } = await adminSupabase
      .from("admin_profiles")
      .insert({
        auth_user_id: authData.user.id,
        full_name: fullName,
        email,
        phone,
        role: "admin",
        is_active: true,
      })
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

    // --------------------------------------------------
    // 8. Roll back Auth user if profile creation fails
    // --------------------------------------------------

    if (profileError || !adminProfile) {
      await adminSupabase.auth.admin.deleteUser(
        authData.user.id,
      );

      return NextResponse.json(
        {
          error:
            profileError?.message ||
            "Unable to create administrator profile.",
        },
        { status: 500 },
      );
    }

    // --------------------------------------------------
    // 9. Success
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      admin: adminProfile,
    });
  } catch (error) {
    console.error(
      "Create administrator error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create administrator.",
      },
      { status: 500 },
    );
  }
}
