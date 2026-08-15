"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Crown,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  User,
  Users,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* ============================================================
   TYPES
============================================================ */

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

type VerificationStatus = {
  title: string;
  description: string;
  type: "success" | "error" | "pending";
};

/* ============================================================
   ACCOUNT PAGE
============================================================ */

export default function AccountPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [customer, setCustomer] =
    useState<CustomerProfile | null>(null);
  const [grower, setGrower] =
    useState<GrowerProfile | null>(null);
  const [verification, setVerification] =
    useState<GrowerVerification | null>(null);

  const [activeRole, setActiveRole] =
    useState<ActiveRole>("customer");

  const [errorMessage, setErrorMessage] = useState("");

  /* ============================================================
     LOAD ACCOUNT
  ============================================================ */

  const loadAccount = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    setAdmin(null);
    setCustomer(null);
    setGrower(null);
    setVerification(null);
    setActiveRole("customer");

    try {
      /* ----------------------------------------------------------
         AUTH USER
      ---------------------------------------------------------- */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Authentication error:", userError);
        router.replace("/login");
        return;
      }

      if (!user) {
        router.replace("/login");
        return;
      }

      setUserEmail(user.email ?? "");

      /* ----------------------------------------------------------
         ADMIN CHECK
         Administrators always have priority.
      ---------------------------------------------------------- */

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

      if (adminData) {
        setAdmin(adminData as AdminProfile);
        return;
      }

      /* ----------------------------------------------------------
         CUSTOMER PROFILE
      ---------------------------------------------------------- */

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
        setCustomer(
          customerData as CustomerProfile,
        );
      }

      /* ----------------------------------------------------------
         GROWER PROFILE
      ---------------------------------------------------------- */

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
        setGrower(
          growerData as GrowerProfile,
        );

        /* --------------------------------------------------------
           LATEST GROWER VERIFICATION
        -------------------------------------------------------- */

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

      /* ----------------------------------------------------------
         DETERMINE ACTIVE ROLE
      ---------------------------------------------------------- */

      if (customerData && growerData) {
        setActiveRole("customer");
      } else if (customerData) {
        setActiveRole("customer");
      } else if (growerData) {
        setActiveRole("grower");
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
  }, [router]);

  /* ============================================================
     INITIAL LOAD
  ============================================================ */

  useEffect(() => {
  const timer = window.setTimeout(() => {
    void loadAccount();
  }, 0);

  return () => {
    window.clearTimeout(timer);
  };
}, [loadAccount]);

  /* ============================================================
     LOGOUT
  ============================================================ */

  async function logout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);
    setErrorMessage("");

    try {
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
    } catch (error) {
      console.error(
        "Unexpected logout error:",
        error,
      );

      setErrorMessage(
        "Could not log out. Please try again.",
      );

      setLoggingOut(false);
    }
  }

  /* ============================================================
     VERIFICATION STATUS
  ============================================================ */

  function getVerificationStatus(): VerificationStatus | null {
    if (!grower) {
      return null;
    }

    if (grower.status === "approved") {
      return {
        title: "Verified Grower",
        description: `Your grower account is approved. Official ID: ${
          grower.grower_code || "Not assigned"
        }`,
        type: "success",
      };
    }

    if (grower.status === "rejected") {
      return {
        title: "Verification Rejected",
        description:
          verification?.verification_notes ||
          "Please contact Amruta Dhaanya support.",
        type: "error",
      };
    }

    return {
      title: "Verification Pending",
      description:
        "Our team will contact you by phone to verify your grower details.",
      type: "pending",
    };
  }

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <>
        <SiteHeader />

        <main className="min-h-[70vh]">
          <div className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e5f5d8] shadow-[0_0_45px_rgba(133,211,86,0.45)]">
                <Sprout
                  className="h-8 w-8 text-[#23833d]"
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-6 text-sm font-medium text-[#617266]">
                Loading your account...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  /* ============================================================
     DERIVED STATE
  ============================================================ */

  const verificationStatus =
    getVerificationStatus();

  const hasCustomer = customer !== null;
  const hasGrower = grower !== null;
  const isAdmin = admin !== null;

  /* ============================================================
     MAIN PAGE
  ============================================================ */

  return (
    <>
      <SiteHeader />

      <main className="relative min-h-screen overflow-hidden bg-[#fbfcf8]">
        {/* ------------------------------------------------------
           BACKGROUND
        ------------------------------------------------------ */}

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-[#c9f5a9]/35 blur-[100px]" />

          <div className="absolute right-[-120px] top-40 h-[500px] w-[500px] rounded-full bg-[#a8eb78]/25 blur-[120px]" />

          <div className="absolute bottom-[-180px] left-1/3 h-[500px] w-[500px] rounded-full bg-[#dff7bd]/40 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 pb-16 pt-10 sm:px-8 lg:px-10">
          {/* ----------------------------------------------------
             TOP AREA
          ---------------------------------------------------- */}

          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#27683a] transition hover:text-[#174f2a]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

                Back to Amruta Dhaanya
              </Link>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <h1 className="text-[42px] font-bold tracking-[-0.035em] text-[#174f2a] sm:text-[52px]">
                  My Account
                </h1>

                {isAdmin && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#c9e8bb] bg-[#e6f6dc] px-4 py-2 text-sm font-bold text-[#27683a] shadow-[0_4px_20px_rgba(93,175,67,0.12)]">
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </span>
                )}

                {!isAdmin &&
                  activeRole === "customer" &&
                  hasCustomer && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#c9e8bb] bg-[#e6f6dc] px-4 py-2 text-sm font-bold text-[#27683a]">
                      <ShoppingCart className="h-4 w-4" />
                      Customer
                    </span>
                  )}

                {!isAdmin &&
                  activeRole === "grower" &&
                  hasGrower && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#eadfbf] bg-[#faf5e5] px-4 py-2 text-sm font-bold text-[#806525]">
                      <Sprout className="h-4 w-4" />
                      Grower
                    </span>
                  )}
              </div>

              <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#647468]">
                {isAdmin
                  ? "Manage your Amruta Dhaanya administrator account."
                  : activeRole === "customer"
                    ? "Manage your customer account, addresses, and shopping."
                    : "Manage your grower profile, verification, and harvest."}
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              disabled={loggingOut}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#91c782] bg-white/80 px-7 text-sm font-bold text-[#27683a] shadow-[0_8px_25px_rgba(57,113,55,0.08)] backdrop-blur transition hover:border-[#4f9b55] hover:bg-[#f3faef] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />

              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </button>
          </div>

          {/* ----------------------------------------------------
             ERROR
          ---------------------------------------------------- */}

          {errorMessage && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* ====================================================
             ADMIN
          ==================================================== */}

          {isAdmin && admin && (
            <>
              {/* ADMIN HERO */}

              <section className="relative mt-9 overflow-hidden rounded-[34px] border border-[#d9ecd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(44,104,49,0.10)] backdrop-blur sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#d9f7c4]/70 blur-3xl" />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-[#e8f7df] shadow-[0_0_35px_rgba(133,211,86,0.25)]">
                    <ShieldCheck
                      className="h-10 w-10 text-[#2c7a3e]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#70915f]">
                      Administrator Account
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-[#174f2a] sm:text-3xl">
                      {admin.full_name}
                    </h2>

                    <p className="mt-1 text-sm text-[#69776c]">
                      {admin.email || userEmail}
                    </p>
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 self-start rounded-full px-5 py-3 text-sm font-bold sm:self-auto ${
                      admin.role === "super_admin"
                        ? "bg-[#174f2a] text-white shadow-[0_8px_25px_rgba(23,79,42,0.22)]"
                        : "bg-[#e9f7e1] text-[#2b703b]"
                    }`}
                  >
                    {admin.role === "super_admin" && (
                      <Crown className="h-4 w-4" />
                    )}

                    {admin.role === "super_admin"
                      ? "SUPER ADMIN"
                      : "ADMIN"}
                  </div>
                </div>
              </section>

              {/* ADMIN DETAILS */}

              <section className="mt-6 rounded-[34px] border border-[#dcebd6] bg-white/90 p-7 shadow-[0_18px_60px_rgba(44,104,49,0.08)] backdrop-blur sm:p-9">
                <SectionTitle
                  icon={<Users className="h-5 w-5" />}
                  eyebrow="Profile"
                  title="Administrator Details"
                />

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    icon={<User />}
                    label="Full name"
                    value={admin.full_name}
                  />

                  <InfoItem
                    icon={<Mail />}
                    label="Email"
                    value={
                      admin.email ||
                      userEmail ||
                      "Not provided"
                    }
                  />

                  <InfoItem
                    icon={<Phone />}
                    label="Contact number"
                    value={
                      admin.phone ||
                      "Not provided"
                    }
                  />

                  <InfoItem
                    icon={<ShieldCheck />}
                    label="Role"
                    value={
                      admin.role === "super_admin"
                        ? "Super Admin"
                        : "Administrator"
                    }
                  />

                  <InfoItem
                    icon={<CheckCircle2 />}
                    label="Account status"
                    value={
                      admin.is_active
                        ? "Active"
                        : "Inactive"
                    }
                    status={
                      admin.is_active
                        ? "active"
                        : undefined
                    }
                  />

                  <InfoItem
                    icon={<CalendarDays />}
                    label="Created"
                    value={formatDate(
                      admin.created_at,
                    )}
                  />
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <QuickAction
                    href="/admin"
                    icon={<ShieldCheck />}
                    title="Admin Dashboard"
                    text="Open the Amruta Dhaanya administrator area."
                  />

                  {admin.role === "super_admin" ? (
                    <QuickAction
                      href="/admin/admins"
                      icon={<Users />}
                      title="Manage Administrators"
                      text="Create, manage, activate, deactivate, and reset administrator accounts."
                    />
                  ) : (
                    <QuickAction
                      href="/"
                      icon={<ShoppingCart />}
                      title="Open Amruta Dhaanya"
                      text="Return to the main Amruta Dhaanya website."
                    />
                  )}
                </div>
              </section>

              {/* ADMIN NOTICE */}

              <section className="relative mt-6 overflow-hidden rounded-[30px] border border-[#d8edce] bg-gradient-to-r from-[#edf9e8] via-[#f6fcef] to-[#e7f6df] p-7 sm:p-9">
                <div className="relative flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                    <ShieldCheck className="h-7 w-7 text-[#398348]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#174f2a]">
                      Administrator Account
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[#617268]">
                      This account is managed through
                      the Amruta Dhaanya administrator
                      system. Administrator accounts
                      are separate from normal customer
                      and grower accounts.
                    </p>

                    {admin.role ===
                      "super_admin" && (
                      <p className="mt-3 text-sm font-bold leading-6 text-[#32703d]">
                        You are the Super Admin. You
                        can manage other administrator
                        accounts.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ====================================================
             CUSTOMER / GROWER SWITCHER
          ==================================================== */}

          {!isAdmin &&
            hasCustomer &&
            hasGrower && (
              <section className="mt-8 rounded-[22px] border border-[#dcebd6] bg-white/90 p-2 shadow-[0_12px_40px_rgba(44,104,49,0.08)]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveRole("customer")
                    }
                    className={`flex items-center justify-center gap-2 rounded-[17px] px-5 py-4 text-sm font-bold transition ${
                      activeRole === "customer"
                        ? "bg-gradient-to-r from-[#a9df8a] to-[#c8eeaa] text-[#174f2a] shadow-[0_8px_25px_rgba(108,183,73,0.18)]"
                        : "text-[#487050] hover:bg-[#f1f9ed]"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Customer
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveRole("grower")
                    }
                    className={`flex items-center justify-center gap-2 rounded-[17px] px-5 py-4 text-sm font-bold transition ${
                      activeRole === "grower"
                        ? "bg-[#f7f0dc] text-[#725a26] shadow-sm"
                        : "text-[#806525] hover:bg-[#faf7eb]"
                    }`}
                  >
                    <Sprout className="h-4 w-4" />
                    Grower
                  </button>
                </div>
              </section>
            )}

          {/* ====================================================
             CUSTOMER
          ==================================================== */}

          {!isAdmin &&
            activeRole === "customer" &&
            customer && (
              <>
                {/* CUSTOMER HERO */}

                <section className="relative mt-8 overflow-hidden rounded-[34px] border border-[#d9ecd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(44,104,49,0.10)] backdrop-blur sm:p-9">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#d5f7bd]/60 blur-3xl" />

                  <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-[#e8f7df] shadow-[0_0_35px_rgba(133,211,86,0.25)]">
                      <ShoppingCart
                        className="h-9 w-9 text-[#327b40]"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#70915f]">
                        Customer Account
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-[#174f2a] sm:text-3xl">
                        {customer.full_name}
                      </h2>

                      <p className="mt-1 text-sm text-[#68766d]">
                        {userEmail}
                      </p>
                    </div>

                    <span className="self-start rounded-full bg-[#e9f7e1] px-5 py-2.5 text-sm font-bold capitalize text-[#32723e]">
                      {customer.status}
                    </span>
                  </div>
                </section>

                {/* CUSTOMER DETAILS */}

                <section className="mt-6 rounded-[34px] border border-[#dcebd6] bg-white/90 p-7 shadow-[0_18px_60px_rgba(44,104,49,0.08)] backdrop-blur sm:p-9">
                  <SectionTitle
                    icon={<User className="h-5 w-5" />}
                    eyebrow="Profile"
                    title="Customer Details"
                  />

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoItem
                      icon={<User />}
                      label="Full name"
                      value={customer.full_name}
                    />

                    <InfoItem
                      icon={<Phone />}
                      label="Contact number"
                      value={customer.phone}
                    />

                    <InfoItem
                      icon={<Mail />}
                      label="Email"
                      value={customer.email}
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="State"
                      value={customer.state}
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="City"
                      value={
                        customer.city ||
                        "Not added"
                      }
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="District"
                      value={
                        customer.district ||
                        "Not added"
                      }
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="Address"
                      value={
                        customer.address ||
                        "Not added"
                      }
                    />

                    <InfoItem
                      icon={<MapPin />}
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
                      className="inline-flex items-center gap-2 rounded-full bg-[#28753a] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(40,117,58,0.20)] transition hover:bg-[#1e602e]"
                    >
                      Manage Addresses
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-2 rounded-full border border-[#9bc88e] bg-white px-6 py-3 text-sm font-bold text-[#2e6839] transition hover:bg-[#eff9eb]"
                    >
                      View Cart
                    </Link>
                  </div>
                </section>

                {/* CUSTOMER QUICK ACTIONS */}

                <section className="mt-6 grid gap-4 sm:grid-cols-3">
                  <QuickAction
                    href="/products"
                    icon={<ShoppingCart />}
                    title="Shop Fresh"
                    text="Browse today's available harvest."
                  />

                  <QuickAction
                    href="/cart"
                    icon={<ShoppingCart />}
                    title="My Cart"
                    text="View products you&apos;ve selected."
                  />

                  <QuickAction
                    href="/checkout"
                    icon={<ArrowRight />}
                    title="Checkout"
                    text="Complete your purchase."
                  />
                </section>
              </>
            )}

          {/* ====================================================
             GROWER
          ==================================================== */}

          {!isAdmin &&
            activeRole === "grower" &&
            grower && (
              <>
                {/* GROWER HERO */}

                <section className="relative mt-8 overflow-hidden rounded-[34px] border border-[#e7dec8] bg-white/90 p-7 shadow-[0_18px_60px_rgba(92,82,43,0.08)] backdrop-blur sm:p-9">
                  <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                    <div className="flex gap-5">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-[#f5efdd]">
                        <Sprout
                          className="h-10 w-10 text-[#806525]"
                          strokeWidth={1.8}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#947b47]">
                          Grower Account
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-[#174f2a] sm:text-3xl">
                          {grower.full_name}
                        </h2>

                        <p className="mt-1 text-sm text-[#68766d]">
                          {grower.email ||
                            userEmail}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#174f2a] px-6 py-4 text-white shadow-[0_10px_30px_rgba(23,79,42,0.18)]">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b9d9ad]">
                        Official Grower ID
                      </div>

                      <div className="mt-1 text-xl font-bold tracking-wide">
                        {grower.grower_code ||
                          "Not assigned yet"}
                      </div>
                    </div>
                  </div>
                </section>

                {/* VERIFICATION STATUS */}

                {verificationStatus && (
                  <section
                    className={`mt-6 rounded-[25px] border px-6 py-5 ${
                      verificationStatus.type ===
                      "success"
                        ? "border-[#bfe2b5] bg-[#effbea] text-[#27683a]"
                        : verificationStatus.type ===
                            "error"
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-[#e8d9a9] bg-[#fff9e8] text-[#806525]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {verificationStatus.type ===
                      "success" ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                      ) : (
                        <Sprout className="mt-0.5 h-5 w-5 shrink-0" />
                      )}

                      <div>
                        <div className="font-bold">
                          {verificationStatus.title}
                        </div>

                        <div className="mt-1 text-sm leading-6 opacity-90">
                          {
                            verificationStatus.description
                          }
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* GROWER DETAILS */}

                <section className="mt-6 rounded-[34px] border border-[#dcebd6] bg-white/90 p-7 shadow-[0_18px_60px_rgba(44,104,49,0.08)] backdrop-blur sm:p-9">
                  <SectionTitle
                    icon={<Sprout className="h-5 w-5" />}
                    eyebrow="Grower Profile"
                    title="Your Grower Details"
                  />

                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoItem
                      icon={<User />}
                      label="Full name"
                      value={grower.full_name}
                    />

                    <InfoItem
                      icon={<Phone />}
                      label="Contact number"
                      value={grower.phone}
                    />

                    <InfoItem
                      icon={<Mail />}
                      label="Email"
                      value={
                        grower.email ||
                        userEmail
                      }
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="Growing location"
                      value={
                        grower.location ||
                        "Not provided"
                      }
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="District"
                      value={
                        grower.district ||
                        "Not provided"
                      }
                    />

                    <InfoItem
                      icon={<MapPin />}
                      label="State"
                      value={
                        grower.state ||
                        "Telangana"
                      }
                    />

                    <InfoItem
                      icon={<Sprout />}
                      label="Registration status"
                      value={grower.status}
                    />

                    <InfoItem
                      icon={<User />}
                      label="Registration source"
                      value={grower.source}
                    />

                    <InfoItem
                      icon={<CalendarDays />}
                      label="Registered"
                      value={formatDate(
                        grower.created_at,
                      )}
                    />

                    <InfoItem
                      icon={<CalendarDays />}
                      label="Approved"
                      value={formatDate(
                        grower.approved_at,
                      )}
                    />
                  </div>
                </section>

                {/* WHAT HAPPENS NEXT */}

                {!grower.grower_code && (
                  <section className="relative mt-6 overflow-hidden rounded-[32px] border border-[#d8edce] bg-gradient-to-br from-[#edf9e8] to-[#f9fcf7] p-7 sm:p-9">
                    <h3 className="text-xl font-bold text-[#174f2a]">
                      What happens next?
                    </h3>

                    <ol className="mt-5 space-y-3 text-sm leading-6 text-[#617268]">
                      <li>
                        <strong className="text-[#28713b]">
                          1.
                        </strong>{" "}
                        Your registration is received.
                      </li>

                      <li>
                        <strong className="text-[#28713b]">
                          2.
                        </strong>{" "}
                        Our team contacts you by phone.
                      </li>

                      <li>
                        <strong className="text-[#28713b]">
                          3.
                        </strong>{" "}
                        We verify your grower details
                        and location.
                      </li>

                      <li>
                        <strong className="text-[#28713b]">
                          4.
                        </strong>{" "}
                        We assign your official Grower ID
                        based on your location.
                      </li>
                    </ol>

                    <div className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#356f40] shadow-sm">
                      Example: AD-WGL-G001
                    </div>
                  </section>
                )}

                {/* GROWER QUICK ACTIONS */}

                <section className="mt-6 grid gap-4 sm:grid-cols-2">
                  <QuickAction
                    href="/share-your-harvest"
                    icon={<Sprout />}
                    title="Share Your Harvest"
                    text="Submit and manage your available harvest."
                  />

                  <QuickAction
                    href="/products"
                    icon={<ShoppingCart />}
                    title="Shop as Customer"
                    text="Browse and purchase fresh local products."
                  />
                </section>
              </>
            )}

          {/* ====================================================
             NO PROFILE
          ==================================================== */}

          {!isAdmin &&
            !hasCustomer &&
            !hasGrower && (
              <section className="mt-8 rounded-[34px] border border-[#dcebd6] bg-white/90 p-9 text-center shadow-[0_18px_60px_rgba(44,104,49,0.08)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f7df]">
                  <Sprout className="h-8 w-8 text-[#327b40]" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#174f2a]">
                  Account profile not found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68766d]">
                  Your login exists, but your Amruta
                  Dhaanya profile has not been created yet.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    void loadAccount()
                  }
                  className="mt-6 rounded-full bg-[#28753a] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(40,117,58,0.20)] transition hover:bg-[#1e602e]"
                >
                  Refresh Account
                </button>
              </section>
            )}

          {/* ====================================================
             FOOTER
          ==================================================== */}

          <footer className="mt-16 pb-4 pt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#cce8c0] bg-white shadow-[0_0_30px_rgba(127,205,83,0.25)]">
              <Image
                src="/amruta-dhaanya-logo.png"
                alt="Amruta Dhaanya"
                width={55}
                height={55}
                className="h-12 w-12 object-contain"
              />
            </div>

            <p className="mt-5 text-sm font-bold text-[#214f2d]">
              Amruta Dhaanya
              <span className="mx-2 text-[#9bad9c]">
                ·
              </span>
              Ahaar Kutumbam Initiative
            </p>

            <p className="mx-auto mt-2 max-w-lg text-xs leading-6 text-[#89958c]">
              A trusted local harvest network built
              around real availability and community
              care.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

/* ============================================================
   SITE HEADER
============================================================ */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dcebd6] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[78px] w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        {/* LOGO */}

        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center">
            <Image
              src="/amruta-dhaanya-logo.png"
              alt="Amruta Dhaanya logo"
              width={58}
              height={58}
              priority
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="hidden sm:block">
            <div className="text-[18px] font-bold tracking-[-0.02em] text-[#174f2a]">
              Amruta Dhaanya
            </div>

            <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#718074]">
              Ahaar Kutumbam Initiative
            </div>
          </div>
        </Link>

        {/* NAVIGATION */}

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink href="/">
            Home
          </NavLink>

          <NavLink href="/about">
            About Us
          </NavLink>

          <NavLink href="/products">
            Products
          </NavLink>

          <NavLink href="/Participate">
            Participate
          </NavLink>

          <NavLink href="/share-your-harvest">
            Share Your Harvest
          </NavLink>

          <NavLink href="/contact-us">
            Contact Us
          </NavLink>
        </nav>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#cfe6c7] bg-white text-[#286d38] transition hover:bg-[#eff9eb]"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />

            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#5aa447] px-1 text-[10px] font-bold text-white">
              2
            </span>
          </Link>

          <Link
            href="/account"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#9dcd90] bg-[#f4faef] text-[#286d38] shadow-[0_0_20px_rgba(115,190,82,0.16)] transition hover:bg-[#e7f5df]"
            aria-label="My account"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   NAV LINK
============================================================ */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-[#42664b] transition hover:text-[#174f2a]"
    >
      {children}
    </Link>
  );
}

/* ============================================================
   SECTION TITLE
============================================================ */

function SectionTitle({
  icon,
  eyebrow,
  title,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7df] text-[#327b40]">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#78916f]">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-[#174f2a]">
          {title}
        </h2>
      </div>
    </div>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  icon,
  label,
  value,
  status,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  status?: "active";
}) {
  return (
    <div className="rounded-2xl border border-[#e3eee0] bg-[#fbfdf9] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#edf8e8] text-[#43814b]">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-[#728076]">
            {label}
          </div>

          <div className="mt-1.5 break-words text-sm font-bold text-[#294735]">
            {status === "active" && (
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#36ad49] shadow-[0_0_8px_rgba(54,173,73,0.65)]" />
            )}

            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-center gap-4 rounded-[24px] border border-[#dcebd7] bg-white/90 p-5 shadow-[0_10px_35px_rgba(44,104,49,0.06)] transition hover:border-[#b9dcae] hover:bg-[#f8fcf5] hover:shadow-[0_14px_40px_rgba(44,104,49,0.10)]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf8e9] text-[#43814b]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-[#194f2b]">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-6 text-[#68776d]">
          {text}
        </p>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dcebd7] text-[#43814b] transition group-hover:border-[#a9d69c] group-hover:bg-[#edf8e9]">
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

/* ============================================================
   DATE FORMATTER
============================================================ */

function formatDate(
  date: string | null | undefined,
): string {
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