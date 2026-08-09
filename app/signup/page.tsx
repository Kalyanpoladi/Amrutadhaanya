"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type AccountType = "customer" | "grower" | "both";

export default function SignupPage() {
  const supabase = createClient();

  const [accountType, setAccountType] =
    useState<AccountType | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Customer details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("Telangana");
  const [pincode, setPincode] = useState("");

  // Grower details
  const [location, setLocation] = useState("");

  // Login password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const needsCustomer =
    accountType === "customer" ||
    accountType === "both";

  const needsGrower =
    accountType === "grower" ||
    accountType === "both";

  function resetForm() {
    setAccountType(null);

    setFullName("");
    setPhone("");
    setEmail("");

    setAddress("");
    setCity("");
    setDistrict("");
    setState("Telangana");
    setPincode("");

    setLocation("");

    setPassword("");
    setConfirmPassword("");
  }

  async function handleSignup() {
    setErrorMessage("");
    setSuccessMessage("");

    // ----------------------------------------------------------
    // ACCOUNT TYPE
    // ----------------------------------------------------------

    if (!accountType) {
      setErrorMessage(
        "Please choose whether you are a Customer, Grower, or Both.",
      );
      return;
    }

    // ----------------------------------------------------------
    // BASIC DETAILS
    // ----------------------------------------------------------

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Please enter your contact number.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    // ----------------------------------------------------------
    // CUSTOMER DETAILS
    // ----------------------------------------------------------

    if (needsCustomer) {
      if (!address.trim()) {
        setErrorMessage("Please enter your address.");
        return;
      }

      if (!city.trim()) {
        setErrorMessage("Please enter your city.");
        return;
      }

      if (!district.trim()) {
        setErrorMessage("Please enter your district.");
        return;
      }

      if (!pincode.trim()) {
        setErrorMessage("Please enter your pincode.");
        return;
      }
    }

    // ----------------------------------------------------------
    // GROWER DETAILS
    // ----------------------------------------------------------

    if (needsGrower) {
      if (!location.trim()) {
        setErrorMessage(
          "Please enter your village, locality, or growing location.",
        );
        return;
      }

      if (!district.trim()) {
        setErrorMessage("Please enter your district.");
        return;
      }
    }

    // ----------------------------------------------------------
    // PASSWORD
    // ----------------------------------------------------------

    if (!password) {
      setErrorMessage("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Your password must contain at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // --------------------------------------------------------
      // CREATE AUTH USER
      //
      // IMPORTANT:
      //
      // We DO NOT insert into growers or customer_profiles here.
      //
      // The Supabase database trigger:
      //
      // public.handle_new_user()
      //
      // automatically creates those records.
      // --------------------------------------------------------

      const {
        data: { user },
        error: signupError,
      } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,

        options: {
          data: {
            // --------------------------------------------------
            // BASIC USER INFORMATION
            // --------------------------------------------------

            full_name: fullName.trim(),
            phone: phone.trim(),

            // --------------------------------------------------
            // ACCOUNT TYPE
            //
            // customer
            // grower
            // both
            // --------------------------------------------------

            account_type: accountType,

            // --------------------------------------------------
            // CUSTOMER INFORMATION
            // --------------------------------------------------

            address: needsCustomer
              ? address.trim()
              : "",

            city: needsCustomer
              ? city.trim()
              : "",

            pincode: needsCustomer
              ? pincode.trim()
              : "",

            // --------------------------------------------------
            // COMMON LOCATION INFORMATION
            // --------------------------------------------------

            district: district.trim(),

            state:
              state.trim() || "Telangana",

            // --------------------------------------------------
            // GROWER INFORMATION
            // --------------------------------------------------

            location: needsGrower
              ? location.trim()
              : "",
          },

          // ------------------------------------------------------
          // AFTER EMAIL CONFIRMATION
          // ------------------------------------------------------

          emailRedirectTo:
            `${window.location.origin}/auth/callback`,
        },
      });

      // --------------------------------------------------------
      // SUPABASE SIGNUP ERROR
      // --------------------------------------------------------

      if (signupError) {
        console.error(
          "Supabase signup error:",
          signupError,
        );

        setErrorMessage(signupError.message);
        setLoading(false);
        return;
      }

      // --------------------------------------------------------
      // SAFETY CHECK
      // --------------------------------------------------------

      if (!user) {
        setErrorMessage(
          "We could not create your account. Please try again.",
        );

        setLoading(false);
        return;
      }

      // --------------------------------------------------------
      // SUCCESS
      // --------------------------------------------------------

      resetForm();

      setSuccessMessage(
        "Your account has been created successfully. Please check your email and confirm your email address before logging in.",
      );

      setLoading(false);
    } catch (error) {
      console.error(
        "Unexpected signup error:",
        error,
      );

      setErrorMessage(
        "Something went wrong while creating your account. Please try again.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f8f2] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">

        {/* ================================================== */}
        {/* BACK LINK                                          */}
        {/* ================================================== */}

        <Link
          href="/"
          className="text-sm font-medium text-[#4c6652] transition hover:text-[#2d6339]"
        >
          ← Back to Amruta Dhaanya
        </Link>

        {/* ================================================== */}
        {/* HEADER                                             */}
        {/* ================================================== */}

        <div className="mt-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#286039] text-3xl">
            🌱
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#234f32]">
            Create your account
          </h1>

          <p className="mt-3 text-[#68766d]">
            Join Amruta Dhaanya and connect with local
            harvests.
          </p>
        </div>

        {/* ================================================== */}
        {/* MAIN CARD                                          */}
        {/* ================================================== */}

        <div className="mt-8 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-10">

          {/* ================================================= */}
          {/* SUCCESS MESSAGE                                   */}
          {/* ================================================= */}

          {successMessage && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm leading-6 text-green-800">

              <div className="font-bold">
                Account created successfully.
              </div>

              <p className="mt-1">
                {successMessage}
              </p>

              <div className="mt-5">
                <Link
                  href="/login"
                  className="inline-flex rounded-full bg-[#2d6339] px-5 py-2.5 font-semibold text-white transition hover:bg-[#214e2d]"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* ERROR MESSAGE                                     */}
          {/* ================================================= */}

          {errorMessage && !successMessage && (
            <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
              {errorMessage}
            </div>
          )}

          {/* ================================================= */}
          {/* FORM                                              */}
          {/* ================================================= */}

          {!successMessage && (
            <>
              {/* ============================================== */}
              {/* ACCOUNT TYPE                                    */}
              {/* ============================================== */}

              <div>
                <p className="text-sm font-semibold text-[#344b3a]">
                  How would you like to use Amruta Dhaanya?
                </p>

                <p className="mt-1 text-sm leading-6 text-[#68766d]">
                  You can choose both if you want to buy
                  products and supply your own harvest.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                {/* CUSTOMER */}

                <button
                  type="button"
                  onClick={() =>
                    setAccountType("customer")
                  }
                  className={`rounded-2xl border p-5 text-left transition ${
                    accountType === "customer"
                      ? "border-[#2d6339] bg-[#edf5e9] ring-2 ring-[#2d6339]/10"
                      : "border-[#d8e2d3] bg-white hover:bg-[#f7faf5]"
                  }`}
                >
                  <div className="text-3xl">
                    🛒
                  </div>

                  <div className="mt-3 font-bold text-[#234f32]">
                    Customer
                  </div>

                  <p className="mt-1 text-sm leading-5 text-[#68766d]">
                    Buy fresh local harvests.
                  </p>
                </button>

                {/* GROWER */}

                <button
                  type="button"
                  onClick={() =>
                    setAccountType("grower")
                  }
                  className={`rounded-2xl border p-5 text-left transition ${
                    accountType === "grower"
                      ? "border-[#2d6339] bg-[#edf5e9] ring-2 ring-[#2d6339]/10"
                      : "border-[#d8e2d3] bg-white hover:bg-[#f7faf5]"
                  }`}
                >
                  <div className="text-3xl">
                    🌾
                  </div>

                  <div className="mt-3 font-bold text-[#234f32]">
                    Grower
                  </div>

                  <p className="mt-1 text-sm leading-5 text-[#68766d]">
                    Share your local harvest.
                  </p>
                </button>

                {/* BOTH */}

                <button
                  type="button"
                  onClick={() =>
                    setAccountType("both")
                  }
                  className={`rounded-2xl border p-5 text-left transition ${
                    accountType === "both"
                      ? "border-[#2d6339] bg-[#edf5e9] ring-2 ring-[#2d6339]/10"
                      : "border-[#d8e2d3] bg-white hover:bg-[#f7faf5]"
                  }`}
                >
                  <div className="text-3xl">
                    🛒🌾
                  </div>

                  <div className="mt-3 font-bold text-[#234f32]">
                    Both
                  </div>

                  <p className="mt-1 text-sm leading-5 text-[#68766d]">
                    Buy and supply harvests.
                  </p>
                </button>
              </div>

              {/* ================================================= */}
              {/* FORM APPEARS AFTER ACCOUNT TYPE                  */}
              {/* ================================================= */}

              {accountType && (
                <div className="mt-8 space-y-5">

                  {/* =========================================== */}
                  {/* PERSONAL DETAILS                            */}
                  {/* =========================================== */}

                  <div className="border-t border-[#e2e9df] pt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                      Personal details
                    </p>
                  </div>

                  <Field
                    label="Full name"
                    value={fullName}
                    onChange={setFullName}
                    placeholder="Enter your full name"
                  />

                  <Field
                    label="Contact number"
                    value={phone}
                    onChange={setPhone}
                    placeholder="Enter your phone number"
                    type="tel"
                  />

                  <Field
                    label="Email address"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    type="email"
                  />

                  {/* =========================================== */}
                  {/* CUSTOMER DETAILS                            */}
                  {/* =========================================== */}

                  {needsCustomer && (
                    <>
                      <div className="border-t border-[#e2e9df] pt-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                          Delivery details
                        </p>
                      </div>

                      <Field
                        label="Address"
                        value={address}
                        onChange={setAddress}
                        placeholder="House number, street, locality"
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="City"
                          value={city}
                          onChange={setCity}
                          placeholder="City / town"
                        />

                        <Field
                          label="District"
                          value={district}
                          onChange={setDistrict}
                          placeholder="District"
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="State"
                          value={state}
                          onChange={setState}
                          placeholder="State"
                        />

                        <Field
                          label="Pincode"
                          value={pincode}
                          onChange={setPincode}
                          placeholder="Pincode"
                        />
                      </div>
                    </>
                  )}

                  {/* =========================================== */}
                  {/* GROWER DETAILS                              */}
                  {/* =========================================== */}

                  {needsGrower && (
                    <>
                      <div className="border-t border-[#e2e9df] pt-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                          Grower details
                        </p>

                        <p className="mt-2 text-sm leading-6 text-[#68766d]">
                          Your official Grower ID is assigned
                          only after our team verifies you.
                        </p>
                      </div>

                      <Field
                        label="Growing location"
                        value={location}
                        onChange={setLocation}
                        placeholder="Village / locality / growing area"
                      />

                      <Field
                        label="District"
                        value={district}
                        onChange={setDistrict}
                        placeholder="District"
                      />

                      <Field
                        label="State"
                        value={state}
                        onChange={setState}
                        placeholder="State"
                      />

                      {/* GROWER VERIFICATION INFORMATION */}

                      <div className="rounded-2xl bg-[#f1f6ed] p-5 text-sm leading-6 text-[#617268]">
                        <div className="font-bold text-[#234f32]">
                          Grower verification
                        </div>

                        <p className="mt-1">
                          After you register, our team will
                          contact you by phone to verify your
                          details and growing location.
                        </p>

                        <p className="mt-3">
                          Your account will initially be marked
                          as:
                        </p>

                        <div className="mt-2 inline-flex rounded-full bg-[#fff4d6] px-3 py-1 text-xs font-bold text-[#87651c]">
                          Pending verification
                        </div>

                        <p className="mt-4">
                          After successful verification, we
                          assign your official Grower ID based
                          on your location.
                        </p>

                        <p className="mt-3 font-bold text-[#35613e]">
                          Example: AD-WGL-G001
                        </p>
                      </div>
                    </>
                  )}

                  {/* =========================================== */}
                  {/* PASSWORD                                    */}
                  {/* =========================================== */}

                  <div className="border-t border-[#e2e9df] pt-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                      Login security
                    </p>
                  </div>

                  <Field
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    placeholder="At least 6 characters"
                    type="password"
                  />

                  <Field
                    label="Confirm password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="Enter your password again"
                    type="password"
                  />

                  {/* =========================================== */}
                  {/* CREATE ACCOUNT BUTTON                       */}
                  {/* =========================================== */}

                  <button
                    type="button"
                    onClick={handleSignup}
                    disabled={loading}
                    className="mt-3 h-12 w-full rounded-full bg-[#2d6339] px-6 font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Creating your account..."
                      : "Create account"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* ================================================= */}
          {/* LOGIN LINK                                        */}
          {/* ================================================= */}

          <div className="mt-8 text-center">
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

          {/* ================================================= */}
          {/* FOOTNOTE                                           */}
          {/* ================================================= */}

          <p className="mt-6 text-center text-xs leading-5 text-[#89948d]">
            By creating an account, you agree to use
            Amruta Dhaanya&apos;s services.
          </p>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// REUSABLE INPUT FIELD
// ============================================================

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-[#344b3a]"
      >
        {label}
      </label>

      <input
        id={label}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 text-[#344b3a] outline-none transition placeholder:text-[#9aa59d] focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10"
      />
    </div>
  );
}