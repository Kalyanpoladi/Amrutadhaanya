"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AccountType =
  | "admin"
  | "super_admin"
  | "customer"
  | "grower"
  | "both"
  | "unknown";

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

type AdminProfile = {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: "admin" | "super_admin";
  is_active: boolean;
  created_at: string;
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

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const [customer, setCustomer] =
  useState<CustomerProfile | null>(null);

 const [admin, setAdmin] =
  useState<AdminProfile | null>(null);

 const [grower, setGrower] =
  useState<GrowerProfile | null>(null);

  const [verification, setVerification] =
    useState<GrowerVerification | null>(null);

  const [accountType, setAccountType] =
    useState<AccountType>("unknown");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email ?? "");

// --------------------------------------------------
// ADMIN
// --------------------------------------------------

const {
  data: adminData,
  error: adminError,
} = await supabase
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
  .eq("is_active", true)
  .maybeSingle();

if (adminError) {
  console.error(
    "Admin profile error:",
    adminError
  );
}

if (adminData) {
  setAdmin(adminData as AdminProfile);
}

// --------------------------------------------------
// CUSTOMER
// --------------------------------------------------
      const {
        data: customerData,
        error: customerError,
      } = await supabase
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
          "Customer profile error:",
          customerError
        );
      }

      if (customerData) {
        setCustomer(customerData as CustomerProfile);
      }

      // --------------------------------------------------
      // GROWER
      // --------------------------------------------------

      const {
        data: growerData,
        error: growerError,
      } = await supabase
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
          "Grower profile error:",
          growerError
        );
      }

      if (growerData) {
        setGrower(growerData as GrowerProfile);

        // ----------------------------------------------
        // GROWER VERIFICATION
        // ----------------------------------------------

        const {
          data: verificationData,
          error: verificationError,
        } = await supabase
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
            "Grower verification error:",
            verificationError
          );
        }

        if (verificationData) {
          setVerification(
            verificationData as GrowerVerification
          );
        }
      }

      // --------------------------------------------------
      // ACCOUNT TYPE
      // --------------------------------------------------

     if (adminData?.role === "super_admin") {
  setAccountType("super_admin");
} else if (adminData?.role === "admin") {
  setAccountType("admin");
} else if (customerData && growerData) {
  setAccountType("both");
} else if (customerData) {
  setAccountType("customer");
} else if (growerData) {
  setAccountType("grower");
} else {
  setAccountType("unknown");
}
    } catch (error) {
      console.error(
        "Account loading error:",
        error
      );

      setErrorMessage(
        "We could not load your account information."
      );
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------------------------
  // LOGOUT
  // ----------------------------------------------------

  async function logout() {
    setLoggingOut(true);
    setErrorMessage("");

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error
      );

      setErrorMessage(
        "Could not log out. Please try again."
      );

      setLoggingOut(false);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  // ----------------------------------------------------
  // VERIFICATION STATUS
  // ----------------------------------------------------

  function getVerificationStatus() {
    if (!grower) {
      return null;
    }

    const status =
      verification?.verification_status ||
      grower.status ||
      "pending";

    switch (status.toLowerCase()) {
      case "approved":
        return {
          title: "✓ Verified Grower",
          description:
            "Your grower account has been verified by Amruta Dhaanya.",
          className:
            "border-green-200 bg-green-50 text-green-800",
        };

      case "rejected":
        return {
          title:
            "Verification requires attention",
          description:
            verification?.verification_notes ||
            "Please contact Amruta Dhaanya for more information.",
          className:
            "border-red-200 bg-red-50 text-red-800",
        };

      default:
        return {
          title:
            "Verification pending",
          description:
            "Our team will contact you by phone to verify your grower details and location. Your official Grower ID will be assigned after successful verification.",
          className:
            "border-amber-200 bg-amber-50 text-amber-800",
        };
    }
  }

  // ----------------------------------------------------
  // LOADING
  // ----------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7faf4]">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f0e1] text-3xl">
              🌱
            </div>

            <p className="mt-5 text-sm text-[#68766d]">
              Loading your account...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const verificationStatus =
    getVerificationStatus();

  return (
    <main className="min-h-screen bg-[#f7faf4]">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:py-14">

        {/* ------------------------------------------------ */}
        {/* HEADER                                           */}
        {/* ------------------------------------------------ */}

        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-[#4c6652] hover:text-[#2d6339]"
            >
              ← Back to Amruta Dhaanya
            </Link>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#234f32]">
              My Account
            </h1>

            <p className="mt-2 text-[#68766d]">
              Manage your Amruta Dhaanya account.
            </p>
          </div>

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

        {/* ------------------------------------------------ */}
        {/* ERROR                                            */}
        {/* ------------------------------------------------ */}

        {errorMessage && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* ------------------------------------------------ */}
        {/* ACCOUNT SUMMARY                                  */}
        {/* ------------------------------------------------ */}

        <section className="mt-10 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1] text-4xl">
              {accountType === "grower"
                ? "🌾"
                : accountType === "both"
                  ? "🌱"
                  : "🛒"}
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                Account
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#234f32]">
                {admin?.full_name ||
                customer?.full_name ||
                grower?.full_name ||
  "Amruta Dhaanya Member"}
              </h2>

              <p className="mt-1 text-sm text-[#68766d]">
                {userEmail}
              </p>
            </div>

            <div className="rounded-full bg-[#edf4e9] px-5 py-2.5 text-sm font-semibold capitalize text-[#35613e]">
            {accountType === "super_admin"
            ? "Super Administrator Account"
            : accountType === "admin"
            ? "Administrator Account"
            : accountType === "both"
            ? "Customer + Grower"
            : accountType === "grower"
          ? "Grower Account"
          : accountType === "customer"
            ? "Customer Account"
            : "Account"}
          </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* GROWER ACCOUNT                                   */}
        {/* ------------------------------------------------ */}

        {grower && (
          <section className="mt-6 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#edf4e9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#35613e]">
                  🌾 Grower Account
                </div>

                <h2 className="mt-4 text-2xl font-bold text-[#234f32]">
                  Grower Profile
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68766d]">
                  Your grower registration is kept separate from your customer account.
                </p>
              </div>

              {/* OFFICIAL ID */}

              {grower.grower_code ? (
                <div className="rounded-2xl bg-[#234f32] px-6 py-4 text-white">
                  <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#b8d3ad]">
                    Official Grower ID
                  </div>

                  <div className="mt-1 text-xl font-bold tracking-wide">
                    {grower.grower_code}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#f3f5ef] px-6 py-4">
                  <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#829080]">
                    Official Grower ID
                  </div>

                  <div className="mt-1 font-semibold text-[#59695d]">
                    Assigned after verification
                  </div>
                </div>
              )}
            </div>

            {/* -------------------------------------------- */}
            {/* VERIFICATION STATUS                           */}
            {/* -------------------------------------------- */}

            {verificationStatus && (
              <div
                className={`mt-8 rounded-2xl border px-6 py-5 ${verificationStatus.className}`}
              >
                <div className="text-lg font-bold">
                  {verificationStatus.title}
                </div>

                <div className="mt-2 text-sm leading-6">
                  {verificationStatus.description}
                </div>
              </div>
            )}

            {/* -------------------------------------------- */}
            {/* PENDING EXPLANATION                           */}
            {/* -------------------------------------------- */}

            {!grower.grower_code &&
              grower.status.toLowerCase() !==
                "approved" && (
                <div className="mt-6 rounded-2xl bg-[#f1f6ed] p-6">

                  <h3 className="font-bold text-[#234f32]">
                    What happens next?
                  </h3>

                  <ol className="mt-4 space-y-3 text-sm leading-6 text-[#617268]">
                    <li>
                      <strong>1.</strong>{" "}
                      We review your grower registration.
                    </li>

                    <li>
                      <strong>2.</strong>{" "}
                      Our team contacts you by phone.
                    </li>

                    <li>
                      <strong>3.</strong>{" "}
                      We verify your growing details and location.
                    </li>

                    <li>
                      <strong>4.</strong>{" "}
                      Your official Grower ID is assigned based on your verified location.
                    </li>
                  </ol>

                  <div className="mt-5 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#35613e]">
                    Example official ID: AD-WGL-G001
                  </div>

                </div>
              )}

            {/* -------------------------------------------- */}
            {/* GROWER DETAILS                                */}
            {/* -------------------------------------------- */}

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
                  userEmail ||
                  "Not provided"
                }
              />

              <InfoItem
                label="Location"
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
                  grower.created_at
                )}
              />

              <InfoItem
                label="Approved"
                value={formatDate(
                  grower.approved_at
                )}
              />

            </div>

            {/* -------------------------------------------- */}
            {/* GROWER ACTION                                */}
            {/* -------------------------------------------- */}

            {grower.grower_code &&
              grower.status.toLowerCase() ===
                "approved" && (
                <div className="mt-8">
                  <Link
                    href="/share-your-harvest"
                    className="inline-flex rounded-full bg-[#2d6339] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#214e2d]"
                  >
                    Share Your Harvest
                  </Link>
                </div>
              )}

          </section>
        )}

        {/* ------------------------------------------------ */}
        {/* CUSTOMER ACCOUNT                                */}
        {/* ------------------------------------------------ */}

        {customer && !admin && (
          <section className="mt-6 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">

            <div className="flex items-center justify-between gap-4">

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#edf4e9] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#35613e]">
                  🛒 Customer Account
                </div>

                <h2 className="mt-4 text-2xl font-bold text-[#234f32]">
                  Customer Profile
                </h2>
              </div>

              <div className="rounded-full bg-[#edf4e9] px-4 py-2 text-xs font-semibold capitalize text-[#35613e]">
                {customer.status}
              </div>

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
                  "Not added yet"
                }
              />

              <InfoItem
                label="District"
                value={
                  customer.district ||
                  "Not added yet"
                }
              />

              <InfoItem
                label="Address"
                value={
                  customer.address ||
                  "Not added yet"
                }
              />

              <InfoItem
                label="Pincode"
                value={
                  customer.pincode ||
                  "Not added yet"
                }
              />

            </div>

            <div className="mt-7">
              <Link
                href="/account/addresses"
                className="inline-flex rounded-full bg-[#2d6339] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#214e2d]"
              >
                Manage Addresses
              </Link>
            </div>

          </section>
        )}

        {/* ------------------------------------------------ */}
        {/* QUICK ACTIONS                                   */}
        {/* ------------------------------------------------ */}

        <section className="mt-6 grid gap-5 sm:grid-cols-3">

          <QuickAction
            href="/"
            icon="🛒"
            title="Continue Shopping"
            text="Browse today's available products."
          />

          <QuickAction
            href="/cart"
            icon="🧺"
            title="My Cart"
            text="View the products you've selected."
          />

          {grower ? (
            <QuickAction
              href="/share-your-harvest"
              icon="🌾"
              title="Grower Area"
              text={
                grower.grower_code
                  ? "Manage your harvest and grower activity."
                  : "Check your grower verification status."
              }
            />
          ) : (
            <QuickAction
              href="/signup"
              icon="🌱"
              title="Become a Grower"
              text="Register to share your local harvest."
            />
          )}

        </section>

        {/* ------------------------------------------------ */}
        {/* FOOTER                                          */}
        {/* ------------------------------------------------ */}

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
    <div className="rounded-2xl bg-[#f8faf6] p-4">
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-[#829080]">
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
  date: string | null | undefined
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