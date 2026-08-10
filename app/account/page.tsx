"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AccountType =
  | "admin"
  | "customer"
  | "grower"
  | "both"
  | "unknown";

type AdminProfile = {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: "admin" | "super_admin" | string;
  is_active: boolean;
  created_at: string;
};

type CustomerProfile = {
  id: string;
  auth_user_id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string | null;
  state: string;
  pincode: string;
  status: string;
};

type GrowerProfile = {
  id: string;
  grower_code: string | null;
  full_name: string;
  phone: string;
  email: string | null;
  location: string | null;
  district: string | null;
  state: string | null;
  status: string;
  source: string;
  notes: string | null;
  created_at: string;
  approved_at: string | null;
  auth_user_id: string | null;
};

type GrowerVerification = {
  verification_status: string;
  submitted_at: string;
  reviewed_at: string | null;
  verification_notes: string | null;
};

type ActiveRole = "customer" | "grower";

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();

  // ==========================================================
  // STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const [admin, setAdmin] =
    useState<AdminProfile | null>(null);

  const [customer, setCustomer] =
    useState<CustomerProfile | null>(null);

  const [grower, setGrower] =
    useState<GrowerProfile | null>(null);

  const [verification, setVerification] =
    useState<GrowerVerification | null>(null);

  const [accountType, setAccountType] =
    useState<AccountType>("unknown");

  const [activeRole, setActiveRole] =
    useState<ActiveRole>("customer");

  const [errorMessage, setErrorMessage] =
    useState("");

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadAccount();
  }, []);

  // ==========================================================
  // LOAD ACCOUNT
  // ==========================================================

  async function loadAccount() {
    setLoading(true);
    setErrorMessage("");

    // Clear old state before reloading.
    setAdmin(null);
    setCustomer(null);
    setGrower(null);
    setVerification(null);
    setAccountType("unknown");

    try {
      // ========================================================
      // CURRENT AUTH USER
      // ========================================================

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email ?? "");

      // ========================================================
      // ADMIN PROFILE
      //
      // IMPORTANT:
      // We check admin_profiles FIRST.
      //
      // This is what prevents an administrator who also happens
      // to have a customer_profiles row from being displayed as
      // a Customer.
      // ========================================================

      const {
        data: adminData,
        error: adminError,
      } = await supabase
        .from("admin_profiles")
        .select(
          `
            id,
            auth_user_id,
            full_name,
            email,
            phone,
            role,
            is_active,
            created_at
          `,
        )
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (adminError) {
        console.error(
          "Admin profile error:",
          adminError,
        );
      }

      // ========================================================
      // IF ADMIN EXISTS
      //
      // ADMIN HAS PRIORITY.
      //
      // We deliberately do NOT use customer/grower profiles
      // to determine the visible account type for an admin.
      // ========================================================

      if (adminData) {
        setAdmin(adminData as AdminProfile);
        setAccountType("admin");

        // Stop here.
        //
        // We do not need to load customer/grower profiles for
        // the account page because this is an administrator
        // account.
        setLoading(false);
        return;
      }

      // ========================================================
      // CUSTOMER PROFILE
      //
      // This section is only reached if the user is NOT an admin.
      // ========================================================

      const {
        data: customerData,
        error: customerError,
      } = await supabase
        .from("customer_profiles")
        .select(
          `
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
          `,
        )
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (customerError) {
        console.error(
          "Customer profile error:",
          customerError,
        );
      }

      if (customerData) {
        setCustomer(customerData as CustomerProfile);
      }

      // ========================================================
      // GROWER PROFILE
      // ========================================================

      const {
        data: growerData,
        error: growerError,
      } = await supabase
        .from("growers")
        .select(
          `
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
          `,
        )
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (growerError) {
        console.error(
          "Grower profile error:",
          growerError,
        );
      }

      if (growerData) {
        setGrower(growerData as GrowerProfile);

        // ======================================================
        // GROWER VERIFICATION
        // ======================================================

        const {
          data: verificationData,
          error: verificationError,
        } = await supabase
          .from("grower_verification")
          .select(
            `
              verification_status,
              submitted_at,
              reviewed_at,
              verification_notes
            `,
          )
          .eq("grower_id", growerData.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        if (verificationError) {
          console.error(
            "Grower verification error:",
            verificationError,
          );
        }

        if (verificationData) {
          setVerification(
            verificationData as GrowerVerification,
          );
        }
      }

      // ========================================================
      // ACCOUNT TYPE
      // ========================================================

      if (customerData && growerData) {
        setAccountType("both");
        setActiveRole("customer");
      } else if (customerData) {
        setAccountType("customer");
        setActiveRole("customer");
      } else if (growerData) {
        setAccountType("grower");
        setActiveRole("grower");
      } else {
        setAccountType("unknown");
      }
    } catch (error) {
      console.error(
        "Account loading error:",
        error,
      );

      setErrorMessage(
        "We could not load your account information.",
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // LOGOUT
  // ==========================================================

  async function logout() {
    setLoggingOut(true);
    setErrorMessage("");

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error,
      );

      setErrorMessage(
        "Could not log out. Please try again.",
      );

      setLoggingOut(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  // ==========================================================
  // VERIFICATION STATUS
  // ==========================================================

  function getVerificationStatus() {
    if (!grower) {
      return null;
    }

    if (grower.status === "approved") {
      return {
        title: "✓ Verified Grower",
        description:
          `Your grower account is approved. Official ID: ${
            grower.grower_code ||
            "Not assigned"
          }`,
        className:
          "border-green-200 bg-green-50 text-green-800",
      };
    }

    if (grower.status === "rejected") {
      return {
        title: "Verification Rejected",
        description:
          verification?.verification_notes ||
          "Please contact Amruta Dhaanya support.",
        className:
          "border-red-200 bg-red-50 text-red-800",
      };
    }

    return {
      title: "⏳ Verification Pending",
      description:
        "Our team will contact you by phone to verify your grower details.",
      className:
        "border-yellow-200 bg-yellow-50 text-yellow-800",
    };
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f8f2] px-5">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#286039] text-3xl">
            🌱
          </div>

          <p className="mt-5 text-sm text-[#68766d]">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================================
  // DERIVED VALUES
  // ==========================================================

  const verificationStatus =
    getVerificationStatus();

  const hasCustomer = !!customer;
  const hasGrower = !!grower;
  const isAdmin = !!admin;

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="min-h-screen bg-[#f5f8f2] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ==================================================== */}
        {/* HEADER                                               */}
        {/* ==================================================== */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-[#4c6652] hover:text-[#2d6339]"
            >
              ← Back to Amruta Dhaanya
            </Link>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight text-[#234f32]">
                My Account
              </h1>

              {/* ADMIN BADGE */}

              {isAdmin && (
                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    admin?.role === "super_admin"
                      ? "bg-[#234f32] text-white"
                      : "bg-[#edf4e9] text-[#35613e]"
                  }`}
                >
                  {admin?.role === "super_admin"
                    ? "🛡️ Super Admin"
                    : "🛡️ Admin"}
                </span>
              )}

              {/* CUSTOMER BADGE */}

              {!isAdmin &&
                activeRole === "customer" &&
                hasCustomer && (
                  <span className="rounded-full bg-[#edf4e9] px-4 py-2 text-sm font-bold text-[#35613e]">
                    🛒 Customer
                  </span>
                )}

              {/* GROWER BADGE */}

              {!isAdmin &&
                activeRole === "grower" &&
                hasGrower && (
                  <span className="rounded-full bg-[#f1eadb] px-4 py-2 text-sm font-bold text-[#765d2b]">
                    🌾 Grower
                  </span>
                )}
            </div>

            <p className="mt-2 text-[#68766d]">
              {isAdmin
                ? "Manage your Amruta Dhaanya administrator account."
                : activeRole === "customer"
                  ? "Manage your customer account, addresses, and shopping."
                  : "Manage your grower profile, verification, and harvest."}
            </p>
          </div>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="rounded-full border border-[#376540] bg-white px-6 py-3 text-sm font-semibold text-[#2e5b39] transition hover:bg-[#e9f0e5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut
              ? "Logging out..."
              : "Logout"}
          </button>
        </div>

        {/* ==================================================== */}
        {/* ERROR                                                */}
        {/* ==================================================== */}

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* ==================================================== */}
        {/* ADMIN ACCOUNT                                        */}
        {/* ==================================================== */}

        {isAdmin && admin && (
          <>
            {/* ADMIN SUMMARY */}

            <section className="mt-8 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1] text-4xl">
                  🛡️
                </div>

                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                    Administrator Account
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                    {admin.full_name}
                  </h2>

                  <p className="mt-1 text-sm text-[#68766d]">
                    {admin.email || userEmail}
                  </p>
                </div>

                <div
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold ${
                    admin.role === "super_admin"
                      ? "bg-[#234f32] text-white"
                      : "bg-[#edf4e9] text-[#35613e]"
                  }`}
                >
                  {admin.role === "super_admin"
                    ? "SUPER ADMIN"
                    : "ADMIN"}
                </div>
              </div>
            </section>

            {/* ADMIN DETAILS */}

            <section className="mt-6 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                  Administrator Profile
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                  Administrator Details
                </h2>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <InfoItem
                  label="Full name"
                  value={admin.full_name}
                />

                <InfoItem
                  label="Email"
                  value={
                    admin.email ||
                    userEmail ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Contact number"
                  value={
                    admin.phone ||
                    "Not provided"
                  }
                />

                <InfoItem
                  label="Role"
                  value={
                    admin.role === "super_admin"
                      ? "Super Admin"
                      : "Administrator"
                  }
                />

                <InfoItem
                  label="Account status"
                  value={
                    admin.is_active
                      ? "Active"
                      : "Inactive"
                  }
                />

                <InfoItem
                  label="Created"
                  value={formatDate(
                    admin.created_at,
                  )}
                />
              </div>
            </section>

            {/* ADMIN ACTIONS */}

            <section className="mt-6 grid gap-5 sm:grid-cols-2">

              <QuickAction
                href="/admin"
                icon="🛡️"
                title="Admin Dashboard"
                text="Open the Amruta Dhaanya administrator area."
              />

              {admin.role === "super_admin" ? (
                <QuickAction
                  href="/admin/admins"
                  icon="👥"
                  title="Manage Administrators"
                  text="Create, manage, activate, deactivate, and reset administrator accounts."
                />
              ) : (
                <QuickAction
                  href="/"
                  icon="🛒"
                  title="Open Amruta Dhaanya"
                  text="Return to the main Amruta Dhaanya website."
                />
              )}
            </section>

            {/* ADMIN NOTE */}

            <section className="mt-6 rounded-[32px] bg-[#edf4e9] p-7 sm:p-9">
              <h3 className="text-xl font-bold text-[#234f32]">
                Administrator Account
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#617268]">
                This account is managed through the
                Amruta Dhaanya administrator system.
                Administrator accounts are separate
                from normal customer and grower
                accounts.
              </p>

              {admin.role === "super_admin" && (
                <p className="mt-3 text-sm font-semibold leading-6 text-[#35613e]">
                  You are the Super Admin. You can
                  manage other administrator accounts.
                </p>
              )}
            </section>
          </>
        )}

        {/* ==================================================== */}
        {/* ACCOUNT SWITCHER                                     */}
        {/* ==================================================== */}

        {!isAdmin &&
          hasCustomer &&
          hasGrower && (
            <section className="mt-8 rounded-2xl border border-[#dce5d8] bg-white p-2 shadow-sm">
              <div className="grid grid-cols-2 gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setActiveRole("customer")
                  }
                  className={`rounded-xl px-5 py-4 text-sm font-bold transition ${
                    activeRole === "customer"
                      ? "bg-[#2d6339] text-white shadow-sm"
                      : "text-[#35613e] hover:bg-[#edf4e9]"
                  }`}
                >
                  🛒 Customer
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveRole("grower")
                  }
                  className={`rounded-xl px-5 py-4 text-sm font-bold transition ${
                    activeRole === "grower"
                      ? "bg-[#765d2b] text-white shadow-sm"
                      : "text-[#765d2b] hover:bg-[#f5f0e4]"
                  }`}
                >
                  🌾 Grower
                </button>

              </div>
            </section>
          )}

        {/* ==================================================== */}
        {/* CUSTOMER ACCOUNT                                    */}
        {/* ==================================================== */}

        {!isAdmin &&
          activeRole === "customer" &&
          customer && (
            <>
              {/* CUSTOMER SUMMARY */}

              <section className="mt-8 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1] text-4xl">
                    🛒
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                      Customer Account
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                      {customer.full_name}
                    </h2>

                    <p className="mt-1 text-sm text-[#68766d]">
                      {userEmail}
                    </p>
                  </div>

                  <div className="rounded-full bg-[#edf4e9] px-4 py-2 text-sm font-semibold capitalize text-[#35613e]">
                    {customer.status}
                  </div>
                </div>
              </section>

              {/* CUSTOMER DETAILS */}

              <section className="mt-6 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                    Profile
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                    Customer Details
                  </h2>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">

                  <InfoItem
                    label="Full name"
                    value={customer.full_name}
                  />

                  <InfoItem
                    label="Contact number"
                    value={customer.phone}
                  />

                  <InfoItem
                    label="Email"
                    value={customer.email}
                  />

                  <InfoItem
                    label="State"
                    value={customer.state}
                  />

                  <InfoItem
                    label="City"
                    value={
                      customer.city ||
                      "Not added"
                    }
                  />

                  <InfoItem
                    label="District"
                    value={
                      customer.district ||
                      "Not added"
                    }
                  />

                  <InfoItem
                    label="Address"
                    value={
                      customer.address ||
                      "Not added"
                    }
                  />

                  <InfoItem
                    label="Pincode"
                    value={
                      customer.pincode ||
                      "Not added"
                    }
                  />

                </div>

                <div className="mt-7 flex flex-wrap gap-3">

                  <Link
                    href="/account/addresses"
                    className="rounded-full bg-[#2d6339] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#214e2d]"
                  >
                    Manage Addresses
                  </Link>

                  <Link
                    href="/cart"
                    className="rounded-full border border-[#376540] bg-white px-6 py-3 text-sm font-semibold text-[#2e5b39] transition hover:bg-[#e9f0e5]"
                  >
                    View Cart
                  </Link>

                </div>
              </section>

              {/* CUSTOMER ACTIONS */}

              <section className="mt-6 grid gap-5 sm:grid-cols-3">

                <QuickAction
                  href="/"
                  icon="🛍️"
                  title="Shop Fresh"
                  text="Browse today's available harvest."
                />

                <QuickAction
                  href="/cart"
                  icon="🧺"
                  title="My Cart"
                  text="View products you've selected."
                />

                <QuickAction
                  href="/checkout"
                  icon="📦"
                  title="Checkout"
                  text="Complete your purchase."
                />

              </section>
            </>
          )}

        {/* ==================================================== */}
        {/* GROWER ACCOUNT                                      */}
        {/* ==================================================== */}

        {!isAdmin &&
          activeRole === "grower" &&
          grower && (
            <>
              {/* GROWER SUMMARY */}

              <section className="mt-8 rounded-[32px] border border-[#ded6c3] bg-white p-7 shadow-sm sm:p-9">

                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">

                  <div className="flex gap-5">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#f1eadb] text-4xl">
                      🌾
                    </div>

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#947b47]">
                        Grower Account
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                        {grower.full_name}
                      </h2>

                      <p className="mt-1 text-sm text-[#68766d]">
                        {grower.email ||
                          userEmail}
                      </p>

                    </div>
                  </div>

                  {/* GROWER ID */}

                  <div className="rounded-2xl bg-[#234f32] px-5 py-4 text-white">

                    <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8d3ad]">
                      Official Grower ID
                    </div>

                    <div className="mt-1 text-xl font-bold tracking-wide">
                      {grower.grower_code ||
                        "Not assigned yet"}
                    </div>

                  </div>

                </div>
              </section>

              {/* VERIFICATION */}

              {verificationStatus && (
                <section
                  className={`mt-6 rounded-2xl border px-5 py-5 ${verificationStatus.className}`}
                >
                  <div className="font-bold">
                    {verificationStatus.title}
                  </div>

                  <div className="mt-1 text-sm leading-6">
                    {verificationStatus.description}
                  </div>
                </section>
              )}

              {/* GROWER DETAILS */}

              <section className="mt-6 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                  Grower Profile
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                  Your Grower Details
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">

                  <InfoItem
                    label="Full name"
                    value={grower.full_name}
                  />

                  <InfoItem
                    label="Contact number"
                    value={grower.phone}
                  />

                  <InfoItem
                    label="Email"
                    value={
                      grower.email ||
                      userEmail
                    }
                  />

                  <InfoItem
                    label="Growing location"
                    value={
                      grower.location ||
                      "Not provided"
                    }
                  />

                  <InfoItem
                    label="District"
                    value={
                      grower.district ||
                      "Not provided"
                    }
                  />

                  <InfoItem
                    label="State"
                    value={
                      grower.state ||
                      "Telangana"
                    }
                  />

                  <InfoItem
                    label="Registration status"
                    value={grower.status}
                  />

                  <InfoItem
                    label="Registration source"
                    value={grower.source}
                  />

                  <InfoItem
                    label="Registered"
                    value={formatDate(
                      grower.created_at,
                    )}
                  />

                  <InfoItem
                    label="Approved"
                    value={formatDate(
                      grower.approved_at,
                    )}
                  />

                </div>
              </section>

              {/* WHAT HAPPENS NEXT */}

              {!grower.grower_code && (
                <section className="mt-6 rounded-[32px] bg-[#f1f6ed] p-7 sm:p-9">

                  <h3 className="text-xl font-bold text-[#234f32]">
                    What happens next?
                  </h3>

                  <ol className="mt-5 space-y-3 text-sm leading-6 text-[#617268]">

                    <li>
                      <strong>1.</strong>{" "}
                      Your registration is received.
                    </li>

                    <li>
                      <strong>2.</strong>{" "}
                      Our team contacts you by phone.
                    </li>

                    <li>
                      <strong>3.</strong>{" "}
                      We verify your grower details
                      and location.
                    </li>

                    <li>
                      <strong>4.</strong>{" "}
                      We assign your official Grower ID
                      based on your location.
                    </li>

                  </ol>

                  <div className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#35613e]">
                    Example: AD-WGL-G001
                  </div>

                </section>
              )}

              {/* GROWER ACTIONS */}

              <section className="mt-6 grid gap-5 sm:grid-cols-2">

                <QuickAction
                  href="/share-your-harvest"
                  icon="🌾"
                  title="Share Your Harvest"
                  text="Submit and manage your available harvest."
                />

                <QuickAction
                  href="/"
                  icon="🛒"
                  title="Shop as Customer"
                  text="Browse and purchase fresh local products."
                />

              </section>
            </>
          )}

        {/* ==================================================== */}
        {/* NO PROFILE SAFETY                                   */}
        {/* ==================================================== */}

        {!isAdmin &&
          !hasCustomer &&
          !hasGrower && (
            <section className="mt-8 rounded-[32px] border border-[#dce5d8] bg-white p-8 text-center">

              <div className="text-4xl">
                🌱
              </div>

              <h2 className="mt-4 text-xl font-bold text-[#234f32]">
                Account profile not found
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#68766d]">
                Your login exists, but your Amruta
                Dhaanya profile has not been created yet.
              </p>

              <button
                type="button"
                onClick={loadAccount}
                className="mt-6 rounded-full bg-[#2d6339] px-6 py-3 text-sm font-semibold text-white hover:bg-[#214e2d]"
              >
                Refresh Account
              </button>

            </section>
          )}

        {/* ==================================================== */}
        {/* FOOTER                                               */}
        {/* ==================================================== */}

        <div className="py-10 text-center text-xs leading-5 text-[#89948d]">
          Amruta Dhaanya · An Ahaar Kutumbam Initiative
          <br />
          A trusted local harvest network built around
          real availability and community care.
        </div>

      </div>
    </main>
  );
}

// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#f7faf5] p-4">

      <div className="text-xs font-medium uppercase tracking-wide text-[#829080]">
        {label}
      </div>

      <div className="mt-2 break-words text-sm font-semibold text-[#344b3a]">
        {value}
      </div>

    </div>
  );
}

// ============================================================
// QUICK ACTION
// ============================================================

function QuickAction({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[28px] border border-[#dce5d8] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-[#234f32]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#68766d]">
        {text}
      </p>

    </Link>
  );
}

// ============================================================
// DATE FORMATTER
// ============================================================

function formatDate(
  date: string | null | undefined,
) {
  if (!date) {
    return "Not available";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Not available";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}