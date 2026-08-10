"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

      if (error) {
        console.error("Admin login error:", error);

        setErrorMessage("Invalid email or password.");
        return;
      }

      if (!data.user) {
        setErrorMessage("We could not sign you in.");
        return;
      }

      const {
        data: adminProfile,
        error: adminError,
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
        .eq("auth_user_id", data.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (adminError) {
        console.error(
          "Admin profile lookup error:",
          adminError,
        );

        await supabase.auth.signOut();

        setErrorMessage(
          "We could not verify administrator access.",
        );

        return;
      }

      if (
        !adminProfile ||
        !["admin", "super_admin"].includes(
          adminProfile.role,
        )
      ) {
        await supabase.auth.signOut();

        setErrorMessage(
          "This account does not have administrator access.",
        );

        return;
      }

      if (adminProfile.role === "super_admin") {
        router.replace("/admin/admins");
      } else {
        router.replace("/admin/growers");
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Unexpected admin login error:",
        error,
      );

      setErrorMessage(
        "Something went wrong while signing in.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    setErrorMessage("");
    setSuccessMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setErrorMessage(
        "Enter your administrator email first.",
      );
      return;
    }

    setResetting(true);

    try {
      const resetUrl =
         `${window.location.origin}` +
         "/auth/callback?next=/admin/reset-password";

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          normalizedEmail,
          {
            redirectTo: resetUrl,
          },
        );

      if (error) {
        console.error(
          "Admin password recovery error:",
          error,
        );

        setErrorMessage(
          error.message ||
            "Unable to send password reset email.",
        );

        return;
      }

      setSuccessMessage(
        "If this administrator account exists, a password reset link has been sent to the email address.",
      );
    } catch (error) {
      console.error(
        "Unexpected password recovery error:",
        error,
      );

      setErrorMessage(
        "Unable to send password reset email.",
      );
    } finally {
      setResetting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faf5]">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12">
        <div className="w-full rounded-3xl border border-[#dce5d8] bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="text-4xl">
              🔒
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Amruta Dhaanya
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#234f32]">
              Administrator Login
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#68766d]">
              Sign in to manage grower verification
              and approvals.
            </p>
          </div>

          {errorMessage && (
            <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-800">
              {successMessage}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#344b3a]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                required
                className="mt-2 w-full rounded-2xl border border-[#d5dfd1] bg-white px-4 py-3 text-sm text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
                placeholder="Administrator email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#344b3a]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-2xl border border-[#d5dfd1] bg-white px-4 py-3 text-sm text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading || resetting}
              className="w-full rounded-full bg-[#2d6339] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Verifying administrator..."
                : "Sign in as Administrator"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading || resetting}
              className="text-sm font-medium text-[#4c6652] hover:text-[#2d6339] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetting
                ? "Sending reset link..."
                : "Forgot password?"}
            </button>
          </div>

          <div className="mt-7 text-center">
            <a
              href="/login"
              className="text-sm font-medium text-[#4c6652] hover:text-[#2d6339]"
            >
              ← Back to customer login
            </a>
          </div>

          <div className="mt-8 rounded-2xl bg-[#f1f6ed] p-4 text-xs leading-5 text-[#617268]">
            Administrator access is restricted to
            approved admin accounts.
          </div>
        </div>
      </div>
    </main>
  );
}