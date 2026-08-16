import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_auth_code", requestUrl.origin)
    );
  }

  const supabase = await createClient();

  /*
   * Exchange the email-confirmation / OAuth code
   * for a real Supabase session.
   */
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    console.error("Auth callback error:", exchangeError);

    return NextResponse.redirect(
      new URL(
        `/login?error=${encodeURIComponent(
          "Unable to complete authentication."
        )}`,
        requestUrl.origin
      )
    );
  }
// ------------------------------------------------------
// PASSWORD RECOVERY
// ------------------------------------------------------
//
// Password recovery uses the same Supabase auth callback,
// but it must NOT create customer/grower business records.
//
// After the recovery code is exchanged for a session,
// send the user directly to the admin password reset page.
//

if (next === "/admin/reset-password") {
  return NextResponse.redirect(
    new URL("/admin/reset-password", requestUrl.origin)
  );
}
  /*
   * Get the authenticated user.
   */
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Unable to get authenticated user:", userError);

    return NextResponse.redirect(
      new URL(
        "/login?error=unable_to_get_user",
        requestUrl.origin
      )
    );
  }

  /*
   * User metadata was stored during signup.
   */
  const metadata = user.user_metadata ?? {};

  const fullName =
    typeof metadata.full_name === "string"
      ? metadata.full_name.trim()
      : "";

  const phone =
    typeof metadata.phone === "string"
      ? metadata.phone.trim()
      : "";

  const accountType =
    typeof metadata.account_type === "string"
      ? metadata.account_type
      : "customer";

  const address =
    typeof metadata.address === "string"
      ? metadata.address.trim()
      : "";

  const city =
    typeof metadata.city === "string"
      ? metadata.city.trim()
      : "";

  const district =
    typeof metadata.district === "string"
      ? metadata.district.trim()
      : "";

  const state =
    typeof metadata.state === "string"
      ? metadata.state.trim()
      : "Telangana";

  const pincode =
    typeof metadata.pincode === "string"
      ? metadata.pincode.trim()
      : "";

  /*
   * ------------------------------------------------------------
   * CUSTOMER
   * ------------------------------------------------------------
   *
   * Create the customer profile only when the user selected:
   *
   * Customer
   * OR
   * Customer + Grower
   */
  if (accountType === "customer" || accountType === "both") {
    const { data: existingCustomer, error: customerLookupError } =
      await supabase
        .from("customer_profiles")
        .select("id")
        .eq("auth_user_id", user.id)
        .maybeSingle();

    if (customerLookupError) {
      console.error(
        "Customer lookup error:",
        customerLookupError
      );

      return NextResponse.redirect(
        new URL(
          "/login?error=customer_lookup_failed",
          requestUrl.origin
        )
      );
    }

    /*
     * Prevent duplicate customer profiles if the callback
     * is accidentally opened more than once.
     */
    if (!existingCustomer) {
      const { data: customerProfile, error: customerError } =
        await supabase
          .from("customer_profiles")
          .insert({
            auth_user_id: user.id,
            full_name: fullName,
            phone,
            email: user.email ?? "",
            address,
            city,
            district: district || null,
            state: state || "Telangana",
            pincode,
            status: "active",
          })
          .select("id")
          .single();

      if (customerError || !customerProfile) {
        console.error(
          "Customer profile creation error:",
          customerError
        );

        return NextResponse.redirect(
          new URL(
            "/login?error=customer_profile_creation_failed",
            requestUrl.origin
          )
        );
      }

      /*
       * Create the customer's default address.
       */
      const { error: addressError } = await supabase
        .from("customer_addresses")
        .insert({
          customer_id: customerProfile.id,
          address_label: "Home",
          full_name: fullName,
          phone,
          address_line: address,
          city,
          district: district || null,
          state: state || "Telangana",
          pincode,
          is_default: true,
        });

      if (addressError) {
        console.error(
          "Customer address creation error:",
          addressError
        );

        return NextResponse.redirect(
          new URL(
            "/login?error=customer_address_creation_failed",
            requestUrl.origin
          )
        );
      }
    }
  }

  /*
   * ------------------------------------------------------------
   * GROWER
   * ------------------------------------------------------------
   *
   * Create a completely separate grower record when the user
   * selected:
   *
   * Grower
   * OR
   * Customer + Grower
   */
  if (accountType === "grower" || accountType === "both") {
    const { data: existingGrower, error: growerLookupError } =
      await supabase
        .from("growers")
        .select("id")
        .eq("auth_user_id", user.id)
        .maybeSingle();

    if (growerLookupError) {
      console.error(
        "Grower lookup error:",
        growerLookupError
      );

      return NextResponse.redirect(
        new URL(
          "/login?error=grower_lookup_failed",
          requestUrl.origin
        )
      );
    }

    /*
     * Prevent duplicate grower records.
     */
    if (!existingGrower) {
      /*
       * Ask the database to generate:
       *
       * GRW-000001
       * GRW-000002
       * GRW-000003
       * ...
       *
       * This uses your existing generate_grower_code()
       * mechanism.
       */
      const { data: generatedCode, error: codeError } =
        await supabase.rpc("generate_grower_code");

      if (codeError || !generatedCode) {
        console.error(
          "Grower code generation error:",
          codeError
        );

        return NextResponse.redirect(
          new URL(
            "/login?error=grower_code_generation_failed",
            requestUrl.origin
          )
        );
      }

      const { data: grower, error: growerError } =
        await supabase
          .from("growers")
          .insert({
            grower_code: generatedCode,
            full_name: fullName,
            phone,
            email: user.email ?? "",
            location: address || null,
            district: district || null,
            state: state || "Telangana",
            status: "pending",
            source: "website_signup",
            auth_user_id: user.id,
          })
          .select("id")
          .single();

      if (growerError || !grower) {
        console.error(
          "Grower creation error:",
          growerError
        );

        return NextResponse.redirect(
          new URL(
            "/login?error=grower_creation_failed",
            requestUrl.origin
          )
        );
      }

      /*
       * Every new grower starts as pending verification.
       */
      const { error: verificationError } =
        await supabase
          .from("grower_verification")
          .insert({
            grower_id: grower.id,
            verification_status: "pending",
          });

      if (verificationError) {
        console.error(
          "Grower verification creation error:",
          verificationError
        );

        return NextResponse.redirect(
          new URL(
            "/login?error=grower_verification_creation_failed",
            requestUrl.origin
          )
        );
      }
    }
  }

  /*
   * Everything succeeded.
   *
   * The user now has their Supabase session and
   * their appropriate business records.
   */
  return NextResponse.redirect(
    new URL("/", requestUrl.origin)
  );
}
