import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { isAdmin: false },
        { status: 401 },
      );
    }

    const {
      data: adminProfile,
      error: profileError,
    } = await supabase
      .from("admin_profiles")
      .select("role, is_active")
      .eq("auth_user_id", user.id)
      .eq("is_active", true)
      .maybeSingle();

    if (profileError) {
      console.error(
        "Customer access profile check error:",
        profileError,
      );

      return NextResponse.json(
        {
          error:
            "Unable to check account access.",
        },
        { status: 500 },
      );
    }

    const isAdmin =
      adminProfile?.role === "admin" ||
      adminProfile?.role === "super_admin";

    return NextResponse.json({
      isAdmin,
      role: adminProfile?.role ?? null,
    });
  } catch (error) {
    console.error(
      "Customer access check error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to check account access.",
      },
      { status: 500 },
    );
  }
}
