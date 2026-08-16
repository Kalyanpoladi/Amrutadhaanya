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
        { error: "You must be logged in." },
        { status: 401 },
      );
    }

    const { data: adminProfile, error: adminError } =
      await supabase
        .from("admin_profiles")
        .select("id, role, is_active")
        .eq("auth_user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (adminError) {
      console.error(adminError);

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
       !["admin", "super_admin"].includes(adminProfile.role) ||
       !adminProfile.is_active
    ) {
      return NextResponse.json(
        {
          error:
            "Administrator access required.",
        },
        { status: 403 },
      );
    }

    const { data, error } =
      await supabase
        .from("grower_registrations")
        .select(
          `
            id,
            full_name,
            phone,
            email,
            location,
            district,
            registration_status,
            match_status,
            verification_confirmed,
            grower_id,
            created_at,
            growers (
              grower_code,
              status
            )
          `,
        )
        .eq("registration_status", "pending")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Grower registrations query error:",
        error,
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "Unable to load registrations.",
        },
        { status: 500 },
      );
    }

    const registrations = (data ?? []).map(
      (registration) => {
        const grower = Array.isArray(
          registration.growers,
        )
          ? registration.growers[0]
          : registration.growers;

        return {
          id: registration.id,
          full_name: registration.full_name,
          phone: registration.phone,
          email: registration.email,
          location: registration.location,
          district: registration.district,
          registration_status:
            registration.registration_status,
          match_status:
            registration.match_status,
          verification_confirmed:
            registration.verification_confirmed,
          grower_id:
            registration.grower_id,
          created_at:
            registration.created_at,
          grower_code:
            grower?.grower_code ?? null,
          grower_status:
            grower?.status ?? null,
        };
      },
    );

    return NextResponse.json({
      success: true,
      registrations,
    });
  } catch (error) {
    console.error(
      "Grower registrations API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
