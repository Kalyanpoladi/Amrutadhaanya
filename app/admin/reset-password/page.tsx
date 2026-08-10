"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminResetPasswordPage() {
 const router = useRouter();
 const [supabase] = useState(() => createClient());

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [checkingSession, setCheckingSession] =
    useState(true);
  const [updating, setUpdating] = useState(false);

  const [sessionReady, setSessionReady] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  // ======================================================
  // VERIFY SUPABASE PASSWORD-RECOVERY SESSION
  // ======================================================

  useEffect(() => {
    let mounted = true;

    async function verifyRecoverySession() {
      try {
        setCheckingSession(true);
        setErrorMessage("");

        // --------------------------------------------------
        // Get the current browser session.
        //
        // Supabase processes the recovery session when the
        // recovery link is opened in the browser.
        // --------------------------------------------------

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        if (error) {
          console.error(
            "Admin recovery session error:",
            error,
          );

          setErrorMessage(
            "Unable to verify the password reset session.",
          );

          setSessionReady(false);

          return;
        }

        if (!session) {
          setErrorMessage(
            "This password reset link is invalid or has expired. Please request a new reset link.",
          );

          setSessionReady(false);

          return;
        }

        // --------------------------------------------------
        // Make sure the recovered user is actually an
        // administrator.
        // --------------------------------------------------

        const {
          data: adminProfile,
          error: profileError,
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
          .eq("auth_user_id", session.user.id)
          .eq("is_active", true)
          .maybeSingle();

        if (!mounted) {
          return;
        }

        if (profileError) {
          console.error(
            "Admin recovery profile error:",
            profileError,
          );

          setErrorMessage(
            "Unable to verify administrator access.",
          );

          setSessionReady(false);

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
            "This password reset link does not belong to an administrator account.",
          );

          setSessionReady(false);

          return;
        }

        // --------------------------------------------------
        // Recovery session is valid.
        // --------------------------------------------------

        setSessionReady(true);
      } catch (error) {
        console.error(
          "Unexpected admin recovery error:",
          error,
        );

        if (mounted) {
          setErrorMessage(
            "Unable to verify the password reset session.",
          );

          setSessionReady(false);
        }
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    }

    verifyRecoverySession();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  // ======================================================
  // UPDATE PASSWORD
  // ======================================================

  async function handleUpdatePassword(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    // --------------------------------------------------
    // Validate password
    // --------------------------------------------------

    if (password.length < 8) {
      setErrorMessage(
        "Password must contain at least 8 characters.",
      );

      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "The passwords do not match.",
      );

      return;
    }

    if (!sessionReady) {
      setErrorMessage(
        "Your password reset session is no longer valid. Please request a new reset link.",
      );

      return;
    }

    setUpdating(true);

    try {
      // --------------------------------------------------
      // Verify session one more time before updating.
      // --------------------------------------------------

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !session
      ) {
        setErrorMessage(
          "Your password reset session has expired. Please request a new reset link.",
        );

        return;
      }

      // --------------------------------------------------
      // Update Supabase Auth password
      // --------------------------------------------------

      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        console.error(
          "Admin password update error:",
          error,
        );

        setErrorMessage(
          error.message ||
            "Unable to update your password.",
        );

        return;
      }

      // --------------------------------------------------
      // Success
      // --------------------------------------------------

      setSuccessMessage(
        "Your password has been updated successfully. Redirecting to administrator login...",
      );

      setPassword("");
      setConfirmPassword("");

      // --------------------------------------------------
      // Sign out the recovery session.
      //
      // The administrator must log in normally using
      // the new password.
      // --------------------------------------------------

      await supabase.auth.signOut();

      setTimeout(() => {
        router.replace("/admin/login");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error(
        "Unexpected admin password update error:",
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update your password.",
      );
    } finally {
      setUpdating(false);
    }
  }

  // ======================================================
  // LOADING
  // ======================================================

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#f7faf5] px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl border border-[#dce5d8] bg-white p-8 shadow-sm">
            <div className="text-4xl">
              🔐
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Amruta Dhaanya
            </p>

            <h1 className="mt-3 text-2xl font-bold text-[#234f32]">
              Verifying Reset Link
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#68766d]">
              Please wait while we verify your
              administrator password reset session.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ======================================================
  // INVALID SESSION
  // ======================================================

  if (!sessionReady) {
    return (
      <main className="min-h-screen bg-[#f7faf5] px-6 py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl border border-[#dce5d8] bg-white p-8 shadow-sm">
            <div className="text-4xl">
              🔐
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Amruta Dhaanya
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#234f32]">
              Reset Password
            </h1>

            {errorMessage && (
              <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="mt-7 text-center">
              <button
                type="button"
                onClick={() =>
                  router.replace("/admin/login")
                }
                className="text-sm font-medium text-[#4c6652] hover:text-[#2d6339]"
              >
                ← Return to administrator login
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ======================================================
  // RESET PASSWORD FORM
  // ======================================================

  return (
    <main className="min-h-screen bg-[#f7faf5] px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-[#dce5d8] bg-white p-8 shadow-sm">
          <div className="text-4xl">
            🔐
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
            Amruta Dhaanya
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#234f32]">
            Reset Password
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#68766d]">
            Create a new password for your
            administrator account.
          </p>

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

          {!successMessage && (
            <form
              onSubmit={handleUpdatePassword}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="new-password"
                  className="text-sm font-semibold text-[#344b3a]"
                >
                  New password
                </label>

                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={updating}
                  className="mt-2 w-full rounded-2xl border border-[#d5dfd1] bg-white px-4 py-3 text-sm text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7] disabled:bg-gray-50"
                  placeholder="Minimum 8 characters"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-semibold text-[#344b3a]"
                >
                  Confirm new password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value,
                    )
                  }
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled={updating}
                  className="mt-2 w-full rounded-2xl border border-[#d5dfd1] bg-white px-4 py-3 text-sm text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7] disabled:bg-gray-50"
                  placeholder="Enter the password again"
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="w-full rounded-full bg-[#2d6339] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updating
                  ? "Updating Password..."
                  : "Set New Password"}
              </button>
            </form>
          )}

          {successMessage && (
            <p className="mt-5 text-center text-xs text-[#68766d]">
              You will be returned to administrator
              login shortly.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}