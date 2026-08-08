"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
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
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <a
        href="/login"
        className="rounded-full border border-[#376540] px-6 py-2 text-sm font-medium text-[#2e5b39] transition hover:bg-[#e9f0e5]"
      >
        Login
      </a>
    );
  }

  const name =
    user.user_metadata?.user_name ||
    user.user_metadata?.full_name ||
    user.email ||
    "Account";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#344b3a]">
        {name}
      </span>

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