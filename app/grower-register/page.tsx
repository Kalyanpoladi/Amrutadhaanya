"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function GrowerRegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Telangana");
  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setMessage("");

    if (
      !fullName ||
      !phone ||
      !email ||
      !password ||
      !address ||
      !city ||
      !district ||
      !state ||
      !pincode
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must be at least 6 characters long.",
      );
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      setErrorMessage(
        "Please enter a valid 10-digit phone number.",
      );
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setErrorMessage("Please enter a valid 6-digit pincode.");
      return;
    }

    setLoading(true);

    try {
      /*
       * STEP 1
       * Create the Supabase Auth account.
       *
       * We deliberately do NOT create a Grower ID here.
       * The official ID will be assigned only after verification.
       */
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
              account_type: "grower",
            },
          },
        });

      if (authError) {
        setErrorMessage(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setErrorMessage(
          "We could not create your account. Please try again.",
        );
        setLoading(false);
        return;
      }

      /*
       * STEP 2
       * Create the grower profile.
       *
       * grower_code remains NULL because the official
       * Amruta Dhaanya Grower ID is assigned only after
       * your team verifies the grower.
       */
      const { data: growerData, error: growerError } =
        await supabase
          .from("growers")
          .insert({
            grower_code: null,
            full_name: fullName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            location: address.trim(),
            district: district.trim(),
            state: state.trim(),
            status: "pending",
            source: "website",
            notes: `City: ${city.trim()}, Pincode: ${pincode.trim()}`,
            auth_user_id: authData.user.id,
          })
          .select("id")
          .single();

      if (growerError) {
        console.error("Grower profile error:", growerError);

        setErrorMessage(
          "Your account was created, but we could not complete your grower registration. Please contact us.",
        );

        setLoading(false);
        return;
      }

      /*
       * STEP 3
       * Create the verification record.
       */
      const { error: verificationError } = await supabase
        .from("grower_verification")
        .insert({
          grower_id: growerData.id,
          verification_status: "pending",
        });

      if (verificationError) {
        console.error(
          "Grower verification error:",
          verificationError,
        );

        /*
         * We don't delete the account here.
         * The grower profile already exists and can be
         * repaired/admin-managed later.
         */
      }

      /*
       * STEP 4
       * Supabase may require email confirmation.
       *
       * If email confirmation is enabled, the user should
       * verify their email before logging in.
       */
      if (!authData.session) {
        setMessage(
          "Registration successful. Please check your email and confirm your email address. After confirmation, you can log in.",
        );

        setLoading(false);

        /*
         * Clear the form so the entered registration
         * information does not remain visible.
         */
        setFullName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setAddress("");
        setCity("");
        setDistrict("");
        setState("Telangana");
        setPincode("");

        return;
      }

      /*
       * If email confirmation is disabled and a session
       * was created immediately, send the user to login.
       */
      router.push("/login");
    } catch (error) {
      console.error("Grower registration error:", error);

      setErrorMessage(
        "Something went wrong while creating your account. Please try again.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-[#477047] hover:underline"
        >
          ← Back to Amruta Dhaanya
        </Link>

        {/* Header */}
        <div className="mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#286039] text-3xl">
            🌱
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#234f32] sm:text-4xl">
            Become a Grower Partner
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#68766d]">
            Share your harvest with nearby families through
            Amruta Dhaanya. Your registration will be reviewed
            by our team before you receive your official Grower ID.
          </p>
        </div>

        {/* Main card */}
        <div className="mt-8 rounded-[32px] border border-[#dce5d8] bg-white p-6 shadow-sm sm:p-10">
          {/* Success */}
          {message && (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm leading-6 text-green-800">
              <div className="font-semibold">
                Registration successful
              </div>

              <div className="mt-1">{message}</div>

              <div className="mt-3">
                <Link
                  href="/login"
                  className="font-semibold text-[#2d6339] hover:underline"
                >
                  Go to Login →
                </Link>
              </div>
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Personal details */}
            <div>
              <h2 className="text-lg font-bold text-[#234f32]">
                Personal details
              </h2>

              <p className="mt-1 text-sm text-[#7a857d]">
                Tell us who will be supplying the harvest.
              </p>
            </div>

            {/* Full name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Full name *
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="Enter your full name"
                autoComplete="name"
                className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Contact number *
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="10-digit mobile number"
                autoComplete="tel"
                className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Email address *
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                autoComplete="email"
                className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Password *
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="At least 6 characters"
                autoComplete="new-password"
                className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
              />

              <p className="mt-2 text-xs text-[#89948d]">
                Use at least 6 characters.
              </p>
            </div>

            {/* Location */}
            <div className="border-t border-[#e3e9df] pt-6">
              <h2 className="text-lg font-bold text-[#234f32]">
                Location details
              </h2>

              <p className="mt-1 text-sm text-[#7a857d]">
                Your location helps us understand where your
                harvest is available.
              </p>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Address / locality *
              </label>

              <textarea
                id="address"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                placeholder="House number, street, village or locality"
                rows={3}
                className="w-full rounded-xl border border-[#d8e2d3] bg-white px-4 py-3 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
              />
            </div>

            {/* City + District */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  City / town *
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                  placeholder="e.g. Warangal"
                  className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  District *
                </label>

                <input
                  id="district"
                  type="text"
                  value={district}
                  onChange={(event) =>
                    setDistrict(event.target.value)
                  }
                  placeholder="e.g. Warangal"
                  className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                />
              </div>
            </div>

            {/* State + Pincode */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  State *
                </label>

                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(event) =>
                    setState(event.target.value)
                  }
                  className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  Pincode *
                </label>

                <input
                  id="pincode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={(event) =>
                    setPincode(
                      event.target.value.replace(/\D/g, ""),
                    )
                  }
                  placeholder="6-digit pincode"
                  autoComplete="postal-code"
                  className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                />
              </div>
            </div>

            {/* Verification notice */}
            <div className="rounded-2xl border border-[#dce8d7] bg-[#f1f6ee] p-5">
              <div className="font-semibold text-[#315b3a]">
                🌱 What happens after registration?
              </div>

              <ol className="mt-3 space-y-2 text-sm leading-6 text-[#65756a]">
                <li>1. Your account is created securely.</li>
                <li>
                  2. Your grower application is marked as pending.
                </li>
                <li>
                  3. Our team contacts you by phone for verification.
                </li>
                <li>
                  4. After approval, we assign your official
                  location-based Grower ID.
                </li>
              </ol>

              <p className="mt-4 text-xs leading-5 text-[#7a857d]">
                Example: AD-WGL-G001. This ID is assigned by
                Amruta Dhaanya after verification and is separate
                from any existing Google Form grower codes.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-13 w-full rounded-full bg-[#2d6339] px-6 py-3 font-semibold text-white shadow-lg shadow-[#2d6339]/10 transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating your account..."
                : "Register as a Grower"}
            </button>
          </form>

          {/* Existing account */}
          <div className="mt-7 text-center">
            <span className="text-sm text-[#68766d]">
              Already have an account?{" "}
            </span>

            <Link
              href="/login"
              className="text-sm font-semibold text-[#2d6339] hover:underline"
            >
              Login
            </Link>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-[#89948d]">
            By registering, you agree to use Amruta Dhaanya&apos;s
            grower services and allow our team to contact you for
            verification.
          </p>
        </div>
      </div>
    </main>
  );
}