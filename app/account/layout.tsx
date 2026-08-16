import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AdminRole = "admin" | "super_admin";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // =========================================================
  // 1. GET AUTHENTICATED USER
  // =========================================================

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // =========================================================
  // 2. CHECK WHETHER THIS USER IS AN ADMINISTRATOR
  // =========================================================

  const {
    data: adminProfile,
    error: adminError,
  } = await supabase
    .from("admin_profiles")
    .select("role, is_active")
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .maybeSingle();

  // =========================================================
  // 3. IF ADMIN, DO NOT ALLOW CUSTOMER ACCOUNT ACCESS
  // =========================================================

  if (!adminError && adminProfile) {
    const role = adminProfile.role as AdminRole;

    if (
      role === "admin" ||
      role === "super_admin"
    ) {
      if (role === "super_admin") {
        redirect("/admin/admins");
      }

      redirect("/admin/growers");
    }
  }

  // =========================================================
  // 4. NORMAL CUSTOMER ACCOUNT
  // =========================================================

  return (
    <main className="min-h-screen bg-[#f7faf5]">
      {children}
    </main>
  );
}
