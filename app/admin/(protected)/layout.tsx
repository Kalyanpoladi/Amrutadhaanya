import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/components/admin/admin-header";

type AdminRole = "admin" | "super_admin";

type AdminProfile = {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string | null;
  role: AdminRole;
  is_active: boolean;
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // ======================================================
  // 1. GET AUTHENTICATED USER
  // ======================================================

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  // ======================================================
  // 2. LOAD THE PROFILE BELONGING TO THIS AUTH USER
  //
  // IMPORTANT:
  // The role comes from admin_profiles.auth_user_id.
  //
  // We do NOT determine Super Admin using:
  // - email
  // - name
  // - browser state
  // - localStorage
  // - cookies created by the frontend
  //
  // Supabase Auth user ID is the source of the relationship.
  // ======================================================

  const {
    data: adminProfile,
    error: profileError,
  } = await supabase
    .from("admin_profiles")
    .select(
      `
        id,
        auth_user_id,
        full_name,
        email,
        role,
        is_active
      `,
    )
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  // ======================================================
  // 3. FAIL CLOSED
  //
  // User must:
  // - have an admin_profiles record
  // - be active
  // - have role admin OR super_admin
  // ======================================================

  if (
    profileError ||
    !adminProfile ||
    !["admin", "super_admin"].includes(
      adminProfile.role,
    )
  ) {
    redirect("/admin/login");
  }

  // ======================================================
  // 4. NORMALIZE ROLE
  //
  // This makes the role explicit and prevents accidental
  // truthy/falsy handling elsewhere.
  // ======================================================

  const role: AdminRole =
    adminProfile.role === "super_admin"
      ? "super_admin"
      : "admin";

  // ======================================================
  // 5. RENDER PROTECTED ADMIN AREA
  //
  // AdminHeader receives the role directly from the
  // authenticated user's database profile.
  //
  // Therefore:
  //
  // Kalyan Reddy:
  //   role = super_admin
  //   Header = Super Admin
  //
  // Test Admin:
  //   role = admin
  //   Header = Administrator
  // ======================================================

  return (
    <main className="min-h-screen bg-[#f7faf5]">
      <AdminHeader
        fullName={adminProfile.full_name}
        email={
          adminProfile.email ||
          user.email ||
          null
        }
        role={role}
      />

      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mt-8">
          {children}
        </div>
      </div>
    </main>
  );
}