"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AccountMenu() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
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
      alert(error.message);
      return;
    }

    window.location.href = "/";
  }

  if (loading) {
    return null;
  }

  if (!email) {
    return (
      <Button
        variant="outline"
        className="rounded-full border-[#376540] bg-transparent px-6 text-[#2e5b39] hover:bg-[#e9f0e5]"
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        Login
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <div className="text-xs text-[#71836e]">Logged in as</div>
        <Link
        href="/account"
        className="max-w-[220px] truncate text-sm font-semibold text-[#2e5b39] hover:underline"
        >
        {email}
      </Link>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={logout}
        className="rounded-full border-[#376540] bg-transparent px-6 text-[#2e5b39] hover:bg-[#e9f0e5]"
      >
        Logout
      </Button>
    </div>
  );
}