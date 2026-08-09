import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminHeader from "@/components/admin/admin-header";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: adminProfile, error } = await supabase
    .from("admin_profiles")
    .select(`
      id,
      auth_user_id,
      full_name,
      email,
      role,
      is_active
    `)
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  if (
    error ||
    !adminProfile ||
    !["admin", "super_admin"].includes(adminProfile.role)
  ) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen">
      <AdminHeader
        fullName={adminProfile.full_name}
        email={adminProfile.email || user.email || null}
        role={adminProfile.role}
      />

      <div className="mt-8">
        {children}
      </div>
    </main>
  );
}