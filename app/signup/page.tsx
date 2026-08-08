"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AccountType = "customer" | "grower";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();

  const [accountType, setAccountType] =
    useState<AccountType>("customer");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Grower-specific information
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Telangana");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // ------------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------------

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Please enter your phone number.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Grower-specific validation
    if (accountType === "grower") {
      if (!location.trim()) {
        setErrorMessage("Please enter your location.");
        return;
      }

      if (!district.trim()) {
        setErrorMessage("Please enter your district.");
        return;
      }

      if (!state.trim()) {
        setErrorMessage("Please enter your state.");
        return;
      }
    }

    setLoading(true);

    try {
      // ----------------------------------------------------------
      // CREATE SUPABASE AUTH USER
      // ----------------------------------------------------------

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
            account_type: accountType,
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
          "Account could not be created. Please try again.",
        );
        setLoading(false);
        return;
      }

      // ----------------------------------------------------------
      // CUSTOMER
      // ----------------------------------------------------------

      if (accountType === "customer") {
        const { error: profileError } = await supabase
          .from("customer_profiles")
          .insert({
            auth_user_id: authData.user.id,
            full_name: fullName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            address: "",
            city: "",
            district: null,
            state: "Telangana",
            pincode: "",
            status: "active",
          });

        if (profileError) {
          console.error(
            "Customer profile creation error:",
            profileError,
          );

          setErrorMessage(
            "Your login account was created, but your customer profile could not be created. Please contact support.",
          );

          setLoading(false);
          return;
        }
      }

      // ----------------------------------------------------------
      // GROWER
      // ----------------------------------------------------------

      if (accountType === "grower") {
        const { error: growerError } = await supabase.rpc(
          "register_grower",
          {
            p_full_name: fullName.trim(),
            p_phone: phone.trim(),
            p_email: email.trim().toLowerCase(),
            p_location: location.trim(),
            p_district: district.trim(),
            p_state: state.trim(),
          },
        );

        if (growerError) {
          console.error(
            "Grower registration error:",
            growerError,
          );

          setErrorMessage(
            growerError.message ||
              "Your account was created, but grower registration could not be completed.",
          );

          setLoading(false);
          return;
        }
      }

      // ----------------------------------------------------------
      // IMPORTANT:
      // Clear the form immediately after successful signup.
      // ----------------------------------------------------------

      setFullName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLocation("");
      setDistrict("");
      setState("Telangana");

      // ----------------------------------------------------------
      // SUPABASE EMAIL CONFIRMATION
      // ----------------------------------------------------------

      if (!authData.session) {
        setSuccessMessage(
          accountType === "grower"
            ? "Your grower registration has been submitted. Please check your email and confirm your account. Your grower ID will be assigned after verification."
            : "Your account has been created. Please check your email and confirm your account before logging in.",
        );

        setLoading(false);
        return;
      }

      // ----------------------------------------------------------
      // If email confirmation is disabled, user already has a
      // session. Send them to the homepage.
      // ----------------------------------------------------------

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        "Something went wrong while creating your account. Please try again.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] px-5 py-10">
      <div className="mx-auto w-full max-w-xl">
        {/* BACK */}
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-[#4c6652] hover:text-[#2d6339]"
        >
          ← Back to Amruta Dhaanya
        </Link>

        <div className="mt-8 rounded-[32px] border border-[#dce5d8] bg-white p-8 shadow-sm sm:p-10">
          {/* HEADER */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#286039] text-3xl">
              🌱
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#234f32]">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#68766d]">
              Join the Amruta Dhaanya community
            </p>
          </div>

          {/* ACCOUNT TYPE */}
          <div className="mt-8">
            <label className="mb-3 block text-sm font-semibold text-[#344b3a]">
              How will you use Amruta Dhaanya?
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType("customer")}
                className={`rounded-2xl border p-4 text-left transition ${
                  accountType === "customer"
                    ? "border-[#2d6339] bg-[#edf4e9] ring-2 ring-[#2d6339]/10"
                    : "border-[#d8e2d3] bg-white hover:bg-[#f7faf5]"
                }`}
              >
                <div className="text-2xl">🛒</div>

                <div className="mt-2 font-bold text-[#234f32]">
                  Customer
                </div>

                <div className="mt-1 text-xs leading-5 text-[#718078]">
                  Buy fresh products from local growers.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType("grower")}
                className={`rounded-2xl border p-4 text-left transition ${
                  accountType === "grower"
                    ? "border-[#2d6339] bg-[#edf4e9] ring-2 ring-[#2d6339]/10"
                    : "border-[#d8e2d3] bg-white hover:bg-[#f7faf5]"
                }`}
              >
                <div className="text-2xl">🌾</div>

                <div className="mt-2 font-bold text-[#234f32]">
                  Grower
                </div>

                <div className="mt-1 text-xs leading-5 text-[#718078]">
                  Share your harvest with nearby families.
                </div>
              </button>
            </div>

            {accountType === "grower" && (
              <div className="mt-3 rounded-2xl bg-[#f1f6ed] px-4 py-3 text-xs leading-5 text-[#617268]">
                Your grower registration will first remain
                <strong> pending</strong>. We will verify your
                details by phone. Your official Grower ID such as
                <strong> AD-WGL-G001</strong> is assigned only
                after verification.
              </div>
            )}
          </div>

          {/* MESSAGES */}

          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 text-sm leading-6 text-green-800">
              <div className="font-semibold">
                Registration successful
              </div>

              <div className="mt-1">
                {successMessage}
              </div>
            </div>
          )}

          {/* FORM */}
          {!successMessage && (
            <form
              onSubmit={handleSignup}
              className="mt-8 space-y-5"
            >
              {/* FULL NAME */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  Full name
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

              {/* PHONE */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  Contact number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  Email address
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

              {/* GROWER FIELDS */}
              {accountType === "grower" && (
                <div className="space-y-5 rounded-2xl border border-[#dce5d8] bg-[#f8faf6] p-5">
                  <div>
                    <h2 className="font-semibold text-[#234f32]">
                      Grower information
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-[#718078]">
                      These details help us understand where your
                      harvest comes from. Your official Grower ID
                      will be assigned after verification.
                    </p>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 block text-sm font-medium text-[#344b3a]"
                    >
                      Location / Village
                    </label>

                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(event) =>
                        setLocation(event.target.value)
                      }
                      placeholder="Example: Vangapahad"
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                    />
                  </div>

                  {/* DISTRICT */}
                  <div>
                    <label
                      htmlFor="district"
                      className="mb-2 block text-sm font-medium text-[#344b3a]"
                    >
                      District
                    </label>

                    <input
                      id="district"
                      type="text"
                      value={district}
                      onChange={(event) =>
                        setDistrict(event.target.value)
                      }
                      placeholder="Example: Warangal"
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                    />
                  </div>

                  {/* STATE */}
                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-sm font-medium text-[#344b3a]"
                    >
                      State
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
                </div>
              )}

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  Password
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
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#344b3a]"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Enter your password again"
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-full bg-[#2d6339] px-6 font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : accountType === "grower"
                    ? "Register as Grower"
                    : "Create Customer Account"}
              </button>
            </form>
          )}

          {/* LOGIN LINK */}
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
            By creating an account, you agree to use Amruta
            Dhaanya&apos;s services.
          </p>
        </div>
      </div>
    </main>
  );
}