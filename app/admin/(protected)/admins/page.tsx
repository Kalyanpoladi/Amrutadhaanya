"use client";

import { FormEvent, useEffect, useState } from "react";

type AdminAccount = {
  id: string;
  auth_user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
};

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminAccount[]>([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------
  // CREATE ADMIN FORM
  // --------------------------------------------------

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // --------------------------------------------------
  // LOAD ADMINISTRATORS
  // --------------------------------------------------

  async function loadAdmins() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/admins", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load administrator accounts.",
        );
      }

      setAdmins(data.admins ?? []);
    } catch (err) {
      console.error("Load administrators error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load administrator accounts.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdmins();
  }, []);

  // --------------------------------------------------
  // CREATE ADMINISTRATOR
  // --------------------------------------------------

  async function handleCreateAdmin(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setCreating(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "/api/admin/administrators/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim() || null,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to create administrator.",
        );
      }

      setSuccess(
        `Administrator ${
          data.admin?.full_name ?? fullName
        } was created successfully.`,
      );

      // --------------------------------------------------
      // CLEAR FORM AFTER SUCCESS
      // --------------------------------------------------

      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");

      // --------------------------------------------------
      // REFRESH ADMIN LIST
      // --------------------------------------------------

      await loadAdmins();
    } catch (err) {
      console.error(
        "Create administrator error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create administrator.",
      );
    } finally {
      setCreating(false);
    }
  }

  // --------------------------------------------------
  // ACTIVATE / DEACTIVATE ADMINISTRATOR
  // --------------------------------------------------

  async function handleToggleAdmin(
    admin: AdminAccount,
  ) {
    setError("");
    setSuccess("");

    const nextStatus = !admin.is_active;

    try {
      const response = await fetch(
        `/api/admin/admins/${admin.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: nextStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to update administrator status.",
        );
      }

      setSuccess(
        `${admin.full_name} was ${
          nextStatus
            ? "activated"
            : "deactivated"
        } successfully.`,
      );

      await loadAdmins();
    } catch (err) {
      console.error(
        "Administrator status update error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update administrator status.",
      );
    }
  }

  // --------------------------------------------------
  // FORMAT CREATED DATE
  // --------------------------------------------------

  function formatDate(dateString: string) {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  }

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="mx-auto max-w-7xl px-6 pb-12">
      {/* ------------------------------------------------
          PAGE HEADER
      ------------------------------------------------ */}

      <div className="py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
          Amruta Dhaanya
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#234f32]">
          Admin Management
        </h2>

        <p className="mt-2 max-w-3xl text-[#68766d]">
          Create and manage administrator accounts.
          Only the Super Admin can access this page.
        </p>
      </div>

      {/* ------------------------------------------------
          ERROR MESSAGE
      ------------------------------------------------ */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}

      {/* ------------------------------------------------
          SUCCESS MESSAGE
      ------------------------------------------------ */}

      {success && (
        <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-sm leading-6 text-green-800">
          {success}
        </div>
      )}

      {/* =================================================
          CREATE ADMINISTRATOR
      ================================================= */}

      <section className="rounded-2xl border border-[#dce5d8] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#234f32]">
          Create New Administrator
        </h3>

        <p className="mt-1 text-sm leading-6 text-[#68766d]">
          The new account will receive the normal{" "}
          <strong>admin</strong> role. It will not
          have Super Admin privileges.
        </p>

        <form
          onSubmit={handleCreateAdmin}
          autoComplete="off"
          className="mt-6 grid gap-5 md:grid-cols-2"
        >
          {/* FULL NAME */}

          <div>
            <label
              htmlFor="admin-full-name"
              className="block text-sm font-semibold text-[#344b3a]"
            >
              Full name
            </label>

            <input
              id="admin-full-name"
              name="admin-full-name"
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              autoComplete="off"
              required
              placeholder="Administrator full name"
              className="mt-2 w-full rounded-xl border border-[#d5dfd1] bg-white px-4 py-3 text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
            />
          </div>

          {/* EMAIL */}

          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-semibold text-[#344b3a]"
            >
              Email
            </label>

            <input
              id="admin-email"
              name="admin-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="off"
              required
              placeholder="admin@example.com"
              className="mt-2 w-full rounded-xl border border-[#d5dfd1] bg-white px-4 py-3 text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
            />
          </div>

          {/* PHONE */}

          <div>
            <label
              htmlFor="admin-phone"
              className="block text-sm font-semibold text-[#344b3a]"
            >
              Phone
            </label>

            <input
              id="admin-phone"
              name="admin-phone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              autoComplete="off"
              placeholder="Phone number"
              className="mt-2 w-full rounded-xl border border-[#d5dfd1] bg-white px-4 py-3 text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold text-[#344b3a]"
            >
              Password
            </label>

            <input
              id="admin-password"
              name="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="mt-2 w-full rounded-xl border border-[#d5dfd1] bg-white px-4 py-3 text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
            />
          </div>

          {/* CREATE BUTTON */}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={creating}
              className="rounded-full bg-[#2d6339] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating
                ? "Creating Administrator..."
                : "Create Administrator"}
            </button>
          </div>
        </form>
      </section>

      {/* =================================================
          EXISTING ADMINISTRATORS
      ================================================= */}

      <section className="mt-8 rounded-2xl border border-[#dce5d8] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#234f32]">
              Administrator Accounts
            </h3>

            <p className="mt-1 text-sm leading-6 text-[#68766d]">
              Accounts currently registered as
              administrators.
            </p>
          </div>

          <button
            type="button"
            onClick={loadAdmins}
            disabled={loading}
            className="rounded-full border border-[#cfdcc9] px-4 py-2 text-sm font-medium text-[#35543d] transition hover:bg-[#f1f6ed] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="mt-6">
          {/* LOADING */}

          {loading ? (
            <div className="rounded-xl border border-dashed border-[#cfdcc9] p-8 text-center text-sm text-[#68766d]">
              Loading administrator accounts...
            </div>
          ) : admins.length === 0 ? (
            /* EMPTY */

            <div className="rounded-xl border border-dashed border-[#cfdcc9] p-8 text-center text-sm text-[#68766d]">
              No administrator accounts found.
            </div>
          ) : (
            /* ADMIN LIST */

            <div className="space-y-4">
              {admins.map((admin) => {
                const isSuperAdmin =
                  admin.role === "super_admin";

                return (
                  <article
                    key={admin.id}
                    className="rounded-xl border border-[#dce5d8] p-5"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      {/* ADMIN INFORMATION */}

                      <div>
                        <h4 className="font-semibold text-[#234f32]">
                          {admin.full_name}
                        </h4>

                        <p className="mt-1 text-sm text-[#68766d]">
                          {admin.email}
                        </p>

                        {admin.phone && (
                          <p className="text-sm text-[#68766d]">
                            {admin.phone}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-[#8a978f]">
                          Created{" "}
                          {formatDate(
                            admin.created_at,
                          )}
                        </p>
                      </div>

                      {/* ADMIN STATUS / ACTIONS */}

                      <div className="flex flex-wrap items-center gap-2">
                        {/* ROLE */}

                        <span className="rounded-full bg-[#eaf3e5] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#35633f]">
                          {admin.role}
                        </span>

                        {/* ACTIVE STATUS */}

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            admin.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {admin.is_active
                            ? "Active"
                            : "Inactive"}
                        </span>

                        {/* --------------------------------
                            NORMAL ADMIN ACTIONS ONLY
                        --------------------------------- */}

                        {!isSuperAdmin && (
                          <>
                            {/* ACTIVATE / DEACTIVATE */}

                            <button
                              type="button"
                              onClick={() =>
                                handleToggleAdmin(
                                  admin,
                                )
                              }
                              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                                admin.is_active
                                  ? "border-red-200 text-red-700 hover:bg-red-50"
                                  : "border-green-200 text-green-700 hover:bg-green-50"
                              }`}
                            >
                              {admin.is_active
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            {/* RESET PASSWORD */}

                            <button
                              type="button"
                              className="rounded-full border border-[#cfdcc9] px-4 py-2 text-xs font-semibold text-[#35543d] transition hover:bg-[#f1f6ed]"
                            >
                              Reset Password
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ------------------------------------
                        SUPER ADMIN PROTECTION MESSAGE
                    ------------------------------------- */}

                    {isSuperAdmin && (
                      <div className="mt-5 rounded-xl border border-[#dce5d8] bg-[#f7faf5] px-4 py-3 text-sm leading-6 text-[#617268]">
                        This is the protected Super Admin
                        account. Administrator management
                        actions are not available for this
                        account.
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}