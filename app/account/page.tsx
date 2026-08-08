"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadAccount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
      setLoading(false);
    }

    loadAccount();
  }, []);

  async function logout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f1]">
        <p className="text-[#617268]">Loading your account...</p>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f7f1] px-5">
        <Card className="w-full max-w-md rounded-[28px]">
          <CardHeader>
            <CardTitle>You are not logged in</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-[#68766d]">
              Please login to view your account.
            </p>

            <Button
              className="mt-6 rounded-full bg-[#2d6339]"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] px-5 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-semibold text-[#477047]"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-6 text-4xl font-bold tracking-tight">
            My Account
          </h1>

          <p className="mt-3 text-[#68766d]">
            Manage your Amruta Dhaanya account.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[28px] border-[#dce5d8]">
            <CardHeader>
              <CardTitle>Account details</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-[#718078]">
                Logged-in account
              </p>

              <p className="mt-2 break-all font-semibold text-[#2e5b39]">
                {email}
              </p>

              <p className="mt-4 text-sm text-[#68766d]">
                Your account is successfully connected through
                GitHub authentication.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-[#dce5d8]">
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-[#68766d]">
                Your orders will appear here once ordering and
                checkout are connected.
              </p>

              <Button
                variant="outline"
                className="mt-5 rounded-full"
                asChild
              >
                <Link href="/cart">View Cart</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 rounded-[28px] border-[#dce5d8]">
          <CardHeader>
            <CardTitle>Account actions</CardTitle>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={logout}
              className="rounded-full border-[#376540] text-[#2e5b39]"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}