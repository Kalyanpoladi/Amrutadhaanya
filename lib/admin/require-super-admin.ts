import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireSuperAdmin() {
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
    adminProfile.role !== "super_admin"
  ) {
    redirect("/admin/growers");
  }

  return {
    user,
    adminProfile,
  };
}