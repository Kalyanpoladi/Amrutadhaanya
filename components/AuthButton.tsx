"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function logout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    setUser(null);
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full border border-[#376540] px-6 py-2 text-sm font-medium text-[#2e5b39] transition hover:bg-[#e9f0e5]"
      >
        Login
      </Link>
    );
  }

  const name =
    user.user_metadata?.user_name ||
    user.user_metadata?.full_name ||
    user.email ||
    "Account";

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/account"
        className="max-w-[220px] truncate text-sm font-medium text-[#344b3a] transition hover:text-[#183F2A] hover:underline"
      >
        {name}
      </Link>

      <button
        type="button"
        onClick={logout}
        className="rounded-full border border-[#376540] px-5 py-2 text-sm font-medium text-[#2e5b39] transition hover:bg-[#e9f0e5]"
      >
        Logout
      </button>
    </div>
  );
}