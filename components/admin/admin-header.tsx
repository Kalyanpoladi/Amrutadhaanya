"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type AdminHeaderProps = {
  fullName: string;
  email: string | null;
  role: string;
};

export default function AdminHeader({
  fullName,
  email,
  role,
}: AdminHeaderProps) {
  const router = useRouter();
  const supabase = createClient();

  const isSuperAdmin = role === "super_admin";

  async function handleSignOut() {
    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-[#dce5d8] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand + identity */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Amruta Dhaanya Admin
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-[#234f32]">
                {fullName}
              </h1>

              <span className="rounded-full bg-[#eaf3e5] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#35633f]">
                {isSuperAdmin ? "Super Admin" : "Administrator"}
              </span>
            </div>

            {email && (
              <p className="mt-1 text-sm text-[#68766d]">
                {email}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-[#cfdcc9] px-4 py-2 text-sm font-medium text-[#35543d] transition hover:bg-[#f1f6ed]"
            >
              ← Home
            </Link>

            <Link
              href="/admin/growers"
              className="rounded-full border border-[#cfdcc9] px-4 py-2 text-sm font-medium text-[#35543d] transition hover:bg-[#f1f6ed]"
            >
              Grower Verification
            </Link>

            {isSuperAdmin && (
              <Link
                href="/admin/admins"
                className="rounded-full border border-[#cfdcc9] px-4 py-2 text-sm font-medium text-[#35543d] transition hover:bg-[#f1f6ed]"
              >
                Admin Management
              </Link>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-[#cfdcc9] px-4 py-2 text-sm font-semibold text-[#35543d] transition hover:bg-[#f1f6ed]"
            >
              Sign out
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}