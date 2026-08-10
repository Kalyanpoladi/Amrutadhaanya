import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    // --------------------------------------------------
    // 1. Get logged-in user
    // --------------------------------------------------

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "You must be signed in.",
        },
        { status: 401 },
      );
    }

    // --------------------------------------------------
    // 2. Use service-role client
    //
    // This is important because account type must not
    // depend on browser-side RLS visibility.
    // --------------------------------------------------

    const adminSupabase = createAdminClient();

    // --------------------------------------------------
    // 3. ADMIN PROFILE
    // --------------------------------------------------

    const {
      data: adminData,
      error: adminError,
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
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error(
        "Account admin lookup error:",
        adminError,
      );
    }

    // --------------------------------------------------
    // 4. CUSTOMER PROFILE
    // --------------------------------------------------

    const {
      data: customerData,
      error: customerError,
    } = await adminSupabase
      .from("customer_profiles")
      .select(`
        id,
        auth_user_id,
        full_name,
        phone,
        email,
        address,
        city,
        district,
        state,
        pincode,
        status
      `)
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (customerError) {
      console.error(
        "Account customer lookup error:",
        customerError,
      );
    }

    // --------------------------------------------------
    // 5. GROWER PROFILE
    // --------------------------------------------------

    const {
      data: growerData,
      error: growerError,
    } = await adminSupabase
      .from("growers")
      .select(`
        id,
        grower_code,
        full_name,
        phone,
        email,
        location,
        district,
        state,
        status,
        source,
        notes,
        created_at,
        approved_at,
        auth_user_id
      `)
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (growerError) {
      console.error(
        "Account grower lookup error:",
        growerError,
      );
    }

    // --------------------------------------------------
    // 6. GROWER VERIFICATION
    // --------------------------------------------------

    let verificationData = null;

    if (growerData) {
      const {
        data,
        error: verificationError,
      } = await adminSupabase
        .from("grower_verification")
        .select(`
          verification_status,
          submitted_at,
          reviewed_at,
          verification_notes
        `)
        .eq("grower_id", growerData.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

      if (verificationError) {
        console.error(
          "Account grower verification lookup error:",
          verificationError,
        );
      }

      verificationData = data;
    }

    // --------------------------------------------------
    // 7. DETERMINE ACCOUNT TYPE
    // --------------------------------------------------

    let accountType:
      | "admin"
      | "super_admin"
      | "customer"
      | "grower"
      | "both"
      | "unknown" = "unknown";

    if (adminData?.role === "super_admin") {
      accountType = "super_admin";
    } else if (adminData?.role === "admin") {
      accountType = "admin";
    } else if (customerData && growerData) {
      accountType = "both";
    } else if (customerData) {
      accountType = "customer";
    } else if (growerData) {
      accountType = "grower";
    }

    // --------------------------------------------------
    // 8. Return account information
    // --------------------------------------------------

    return NextResponse.json({
      success: true,

      user: {
        id: user.id,
        email: user.email ?? "",
      },

      accountType,

      admin: adminData ?? null,

      customer: customerData ?? null,

      grower: growerData ?? null,

      verification: verificationData ?? null,
    });
  } catch (error) {
    console.error(
      "Account API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load account information.",
      },
      { status: 500 },
    );
  }
}