"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loginWithEmail() {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Login successful
    window.location.href = "/";
  }

  async function loginWithGitHub() {
    setErrorMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("GitHub login error:", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] px-5 py-10">
      <div className="mx-auto max-w-md">
        {/* Back to homepage */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-[#477047] hover:underline"
        >
          ← Back to Amruta Dhaanya
        </Link>

        <div className="rounded-[32px] border border-[#dce5d8] bg-white p-8 shadow-sm sm:p-10">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#286039] text-3xl">
              🌱
            </div>

            <h1 className="mt-6 text-3xl font-bold text-[#234f32]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#68766d]">
              Login to your Amruta Dhaanya account
            </p>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Email login */}
          <div className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10 disabled:bg-gray-50"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#344b3a]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    loginWithEmail();
                  }
                }}
                className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-white px-4 outline-none transition focus:border-[#477047] focus:ring-2 focus:ring-[#477047]/10 disabled:bg-gray-50"
              />
            </div>

            {/* Login button */}
            <button
              type="button"
              onClick={loginWithEmail}
              disabled={loading}
              className="h-12 w-full rounded-full bg-[#2d6339] px-6 font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dce5d8]" />

            <span className="text-xs text-[#89948d]">OR</span>

            <div className="h-px flex-1 bg-[#dce5d8]" />
          </div>

          {/* GitHub login */}
          <button
            type="button"
            onClick={loginWithGitHub}
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#24292f] px-6 font-medium text-white transition hover:bg-[#1f2328] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue with GitHub
          </button>

          {/* Signup */}
          <div className="mt-7 text-center">
            <span className="text-sm text-[#68766d]">
              First time here?{" "}
            </span>

            <Link
              href="/signup"
              className="text-sm font-semibold text-[#2d6339] hover:underline"
            >
              Create an account
            </Link>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs leading-5 text-[#89948d]">
            By continuing, you agree to use Amruta Dhaanya&apos;s services.
          </p>
        </div>
      </div>
    </main>
  );
}