"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AccountButton() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

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
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    const supabase = createClient();

    await supabase.auth.signOut();

    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-full bg-[#e7eee3]" />
    );
  }

  if (!email) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-full border border-[#376540] px-6 py-2.5 text-sm font-medium text-[#2e5b39] transition hover:bg-[#e9f0e5]"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 rounded-full border border-[#376540] bg-transparent px-5 py-2.5 text-sm font-medium text-[#2e5b39] transition hover:bg-[#e9f0e5]"
      >
        <User className="h-4 w-4" />
        <span>Account</span>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        className="inline-flex items-center gap-2 rounded-full bg-[#234f32] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1b3f27] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut className="h-4 w-4" />
        <span>{loggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
}