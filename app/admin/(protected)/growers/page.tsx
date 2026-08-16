"use client";

import { useCallback, useEffect, useState } from "react";

type Registration = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  location: string | null;
  district: string | null;
  registration_status: string;
  match_status: string;
  verification_confirmed: boolean;
  grower_id: string | null;
  created_at: string;
  grower_code?: string | null;
  grower_status?: string | null;
};

type MatchResult = {
  registration_id: string;
  match_status: string;
  grower_id: string | null;
  grower_code: string | null;
  matched_full_name: string | null;
  matched_phone: string | null;
  matched_email: string | null;
};

export default function GrowerVerificationPage() {
  const [registrations, setRegistrations] =
    useState<Registration[]>([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [matchResults, setMatchResults] =
    useState<Record<string, MatchResult>>({});

  const [notes, setNotes] =
    useState<Record<string, string>>({});

  const [locationCodes, setLocationCodes] =
    useState<Record<string, string>>({});

  // ---------------------------------------------------------
  // LOAD REGISTRATIONS
  // ---------------------------------------------------------

  const loadRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/api/admin/growers/registrations",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load grower registrations.",
        );
      }

      setRegistrations(data.registrations ?? []);
    } catch (err) {
      console.error(
        "Load grower registrations error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load registrations.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  let cancelled = false;

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "/api/admin/growers/registrations",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to load grower registrations.",
        );
      }

      if (!cancelled) {
        setRegistrations(data.registrations ?? []);
      }
    } catch (err) {
      console.error(
        "Load grower registrations error:",
        err,
      );

      if (!cancelled) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load registrations.",
        );
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, []);

  // ---------------------------------------------------------
  // STEP 1: MATCH PHONE / EMAIL
  // ---------------------------------------------------------

  async function handleMatch(
    registrationId: string,
  ) {
    try {
      setActionLoading(registrationId);
      setError(null);

      const response = await fetch(
        "/api/admin/growers/match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to match registration.",
        );
      }

      setMatchResults((current) => ({
        ...current,
        [registrationId]: data.result,
      }));

      await loadRegistrations();
    } catch (err) {
      console.error(
        "Grower match error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to match registration.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ---------------------------------------------------------
  // STEP 2: CONFIRM FARMER VERIFICATION
  // ---------------------------------------------------------

  async function handleConfirmVerification(
    registrationId: string,
  ) {
    try {
      setActionLoading(registrationId);
      setError(null);

      const response = await fetch(
        "/api/admin/growers/confirm-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationId,
            verificationNotes:
              notes[registrationId] ?? "",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to confirm farmer verification.",
        );
      }

      await loadRegistrations();

      alert(
        "Farmer verification confirmed successfully.",
      );
    } catch (err) {
      console.error(
        "Confirm verification error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to confirm verification.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ---------------------------------------------------------
  // STEP 3: APPROVE / LINK GROWER
  // ---------------------------------------------------------

  async function handleApprove(
    registration: Registration,
  ) {
    const match =
      matchResults[registration.id];

    const matchStatus =
      match?.match_status ??
      registration.match_status;

    const isExistingGrower =
      matchStatus === "phone_and_email" ||
      matchStatus === "phone" ||
      matchStatus === "email";

    // -------------------------------------------------------
    // Location code is only required when creating
    // a completely new Grower.
    // -------------------------------------------------------

    const locationCode = (
      locationCodes[registration.id] ?? ""
    )
      .trim()
      .toUpperCase();

    if (
      !isExistingGrower &&
      !locationCode
    ) {
      setError(
        "Location code is required when creating a new Grower ID.",
      );
      return;
    }

    if (
      !isExistingGrower &&
      !/^[A-Z]{2,6}$/.test(locationCode)
    ) {
      setError(
        "Location code must contain 2-6 letters.",
      );
      return;
    }

    try {
      setActionLoading(registration.id);
      setError(null);

      const response = await fetch(
        "/api/admin/growers/approve-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registrationId: registration.id,
            locationCode:
              locationCode || null,
            verificationNotes:
              notes[registration.id] ?? "",
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to approve grower.",
        );
      }

      const approval = data.approval;

      alert(
        `Grower approved successfully.\n\nOfficial Grower ID: ${
          approval?.grower_code ??
          "Unavailable"
        }`,
      );

      await loadRegistrations();

      setMatchResults((current) => {
        const next = { ...current };
        delete next[registration.id];
        return next;
      });
    } catch (err) {
      console.error(
        "Approve grower error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to approve grower.",
      );
    } finally {
      setActionLoading(null);
    }
  }

  // ---------------------------------------------------------
  // PAGE
  // ---------------------------------------------------------

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* ---------------------------------------------------
          PAGE TITLE

          IMPORTANT:
          AdminHeader is NOT rendered here.

          It is already rendered by:
          app/admin/(protected)/layout.tsx
      --------------------------------------------------- */}

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#70915f]">
          Amruta Dhaanya Admin
        </p>

        <h1 className="mt-2 text-2xl font-bold text-[#234f32]">
          Grower Verification
        </h1>

        <p className="mt-2 max-w-3xl text-[#68766d]">
          Review website grower registrations,
          verify the farmer, and assign or link
          the official Grower ID.
        </p>
      </div>

      {/* ---------------------------------------------------
          ERROR
      --------------------------------------------------- */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}

      {/* ---------------------------------------------------
          PENDING REGISTRATIONS HEADER
      --------------------------------------------------- */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-[#234f32]">
          Pending registrations
        </h2>

        <button
          type="button"
          onClick={loadRegistrations}
          disabled={loading}
          className="rounded-full border border-[#cfdcc9] px-4 py-2 text-sm font-medium text-[#35543d] transition hover:bg-[#f1f6ed] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* ---------------------------------------------------
          LOADING
      --------------------------------------------------- */}

      {loading ? (
        <div className="rounded-xl border border-dashed border-[#cfdcc9] bg-white p-8 text-center text-sm text-[#68766d]">
          Loading grower registrations...
        </div>
      ) : registrations.length === 0 ? (
        /* -------------------------------------------------
           EMPTY
        ------------------------------------------------- */

        <div className="rounded-xl border border-dashed border-[#cfdcc9] bg-white p-8 text-center">
          <p className="text-lg font-medium text-[#234f32]">
            No pending registrations
          </p>

          <p className="mt-2 text-sm text-[#68766d]">
            New grower registrations will appear here.
          </p>
        </div>
      ) : (
        /* -------------------------------------------------
           REGISTRATION LIST
        ------------------------------------------------- */

        <div className="space-y-6">
          {registrations.map(
            (registration) => {
              const match =
                matchResults[registration.id];

              const busy =
                actionLoading ===
                registration.id;

              const matchStatus =
                match?.match_status ??
                registration.match_status;

              const isMismatch =
                matchStatus ===
                "possible_mismatch";

              const isExistingExact =
                matchStatus ===
                "phone_and_email";

              const verified =
                registration.verification_confirmed;

              return (
                <article
                  key={registration.id}
                  className="rounded-2xl border border-[#dce5d8] bg-white p-6 shadow-sm"
                >
                  {/* ------------------------------------------------
                      REGISTRATION INFORMATION
                  ------------------------------------------------ */}

                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#234f32]">
                        {registration.full_name}
                      </h3>

                      <p className="mt-2 text-[#45564a]">
                        📞 {registration.phone}
                      </p>

                      {registration.email && (
                        <p className="text-[#45564a]">
                          ✉️ {registration.email}
                        </p>
                      )}

                      <p className="mt-2 text-[#45564a]">
                        📍{" "}
                        {registration.location ||
                          "Location not provided"}

                        {registration.district
                          ? `, ${registration.district}`
                          : ""}
                      </p>

                      <p className="mt-2 text-sm text-[#8a978f]">
                        Registration ID:
                        <br />

                        <span className="font-mono text-xs">
                          {registration.id}
                        </span>
                      </p>

                      <p className="mt-2 text-sm text-[#8a978f]">
                        Registered{" "}
                        {new Date(
                          registration.created_at,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          verified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {verified
                          ? "Verification confirmed"
                          : "Verification pending"}
                      </span>
                    </div>
                  </div>

                  {/* ------------------------------------------------
                      MATCH INFORMATION
                  ------------------------------------------------ */}

                  <div className="mt-6 rounded-xl bg-[#f7faf5] p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <strong className="text-[#344b3a]">
                        Match status
                      </strong>

                      <span className="font-medium text-[#35543d]">
                        {matchStatus}
                      </span>
                    </div>

                    {match && (
                      <div className="mt-4 space-y-1 text-sm text-[#617268]">
                        {match.grower_code && (
                          <p>
                            <strong>
                              Existing Grower ID:
                            </strong>{" "}
                            {match.grower_code}
                          </p>
                        )}

                        {match.matched_full_name && (
                          <p>
                            <strong>
                              Matched name:
                            </strong>{" "}
                            {
                              match.matched_full_name
                            }
                          </p>
                        )}

                        {match.matched_phone && (
                          <p>
                            <strong>
                              Matched phone:
                            </strong>{" "}
                            {
                              match.matched_phone
                            }
                          </p>
                        )}

                        {match.matched_email && (
                          <p>
                            <strong>
                              Matched email:
                            </strong>{" "}
                            {
                              match.matched_email
                            }
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ------------------------------------------------
                      POSSIBLE MISMATCH
                  ------------------------------------------------ */}

                  {isMismatch && (
                    <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-700">
                      <strong>
                        Possible mismatch
                      </strong>

                      <p className="mt-1">
                        Phone and email appear to
                        belong to different growers.
                        Approval is blocked until
                        the administrator
                        investigates.
                      </p>
                    </div>
                  )}

                  {/* ------------------------------------------------
                      NEW GROWER LOCATION CODE
                  ------------------------------------------------ */}

                  {!isExistingExact &&
                    matchStatus ===
                      "no_match" && (
                      <div className="mt-6">
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium text-[#344b3a]">
                            Location code for new
                            Grower ID
                          </span>

                          <input
                            type="text"
                            value={
                              locationCodes[
                                registration.id
                              ] ?? ""
                            }
                            onChange={(event) =>
                              setLocationCodes(
                                (current) => ({
                                  ...current,
                                  [registration.id]:
                                    event.target.value.toUpperCase(),
                                }),
                              )
                            }
                            placeholder="WGL"
                            maxLength={6}
                            className="w-full rounded-xl border border-[#d5dfd1] px-3 py-2.5 text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
                          />
                        </label>
                      </div>
                    )}

                  {/* ------------------------------------------------
                      VERIFICATION NOTES
                  ------------------------------------------------ */}

                  {match &&
                    !isMismatch && (
                      <div className="mt-6">
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium text-[#344b3a]">
                            Verification notes
                          </span>

                          <textarea
                            value={
                              notes[
                                registration.id
                              ] ?? ""
                            }
                            onChange={(event) =>
                              setNotes(
                                (current) => ({
                                  ...current,
                                  [registration.id]:
                                    event.target.value,
                                }),
                              )
                            }
                            placeholder="Verified by phone"
                            rows={3}
                            className="w-full rounded-xl border border-[#d5dfd1] px-3 py-2.5 text-[#24382a] outline-none transition focus:border-[#376540] focus:ring-2 focus:ring-[#dcebd7]"
                          />
                        </label>
                      </div>
                    )}

                  {/* ------------------------------------------------
                      ACTION BUTTONS
                  ------------------------------------------------ */}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {/* STEP 1 */}

                    {!match &&
                      matchStatus ===
                        "not_checked" && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            handleMatch(
                              registration.id,
                            )
                          }
                          className="rounded-full bg-[#234f32] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#183d25] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {busy
                            ? "Checking..."
                            : "Check Phone & Email Match"}
                        </button>
                      )}

                    {/* STEP 2 */}

                    {match &&
                      !isMismatch &&
                      !verified && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            handleConfirmVerification(
                              registration.id,
                            )
                          }
                          className="rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {busy
                            ? "Confirming..."
                            : "Confirm Farmer Verification"}
                        </button>
                      )}

                    {/* STEP 3 */}

                    {match &&
                      !isMismatch &&
                      verified && (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            handleApprove(
                              registration,
                            )
                          }
                          className="rounded-full bg-[#2d6339] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214e2d] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {busy
                            ? "Processing..."
                            : isExistingExact
                              ? "Link Existing Grower"
                              : "Approve & Assign Grower ID"}
                        </button>
                      )}
                  </div>

                  {/* ------------------------------------------------
                      EXISTING GROWER EXPLANATION
                  ------------------------------------------------ */}

                  {isExistingExact && (
                    <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800">
                      <strong>
                        Existing grower found.
                      </strong>

                      <p className="mt-1">
                        Phone and email both
                        identify the same approved
                        grower. This registration
                        will be linked to the
                        existing Grower ID. A new
                        Grower ID will not be created.
                      </p>
                    </div>
                  )}

                  {/* ------------------------------------------------
                      NEW GROWER EXPLANATION
                  ------------------------------------------------ */}

                  {matchStatus ===
                    "no_match" && (
                    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                      <strong>
                        No existing grower found.
                      </strong>

                      <p className="mt-1">
                        After verification is
                        confirmed, approval will
                        create a new Grower record
                        and issue the next official
                        Grower ID for the selected
                        location.
                      </p>
                    </div>
                  )}
                </article>
              );
            },
          )}
        </div>
      )}
    </div>
  );
}
