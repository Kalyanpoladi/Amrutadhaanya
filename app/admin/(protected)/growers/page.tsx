"use client";

import { useCallback, useEffect, useState } from "react";
import AdminHeader from "@/components/admin/admin-header";

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
  // Load registrations
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

      setRegistrations(
        data.registrations ?? [],
      );
    } catch (err) {
      console.error(err);

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
    loadRegistrations();
  }, [loadRegistrations]);

  // ---------------------------------------------------------
  // STEP 1: Match
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
      console.error(err);

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
  // STEP 2: Confirm verification
  // ---------------------------------------------------------

  async function handleConfirmVerification(
    registrationId: string,
  ) {
    try {
      setActionLoading(registrationId);
      setError(null);
``
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
      console.error(err);

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
  // STEP 3: Approve / Link
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

    // Location code is only needed when creating
    // a completely new Grower.
    const locationCode =
      (
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
            registrationId:
              registration.id,
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

      const approval =
        data.approval;

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
      console.error(err);

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
  // UI
  // ---------------------------------------------------------

 return (
  <main className="mx-auto max-w-6xl px-4 py-8">

    <AdminHeader
      fullName="Administrator"
      email={null}
      role="super_admin"
    />

    <div className="mt-8">
      <p>Amruta Dhaanya Admin</p>

      <h1 className="mt-2 text-2xl font-bold">
        Grower Verification
      </h1>

      <p className="mt-2 text-gray-600">
        Review website grower registrations,
        verify the farmer, and assign or link
        the official Grower ID.
      </p>
    </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Pending registrations
        </h2>

        <button
          type="button"
          onClick={loadRegistrations}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {registrations.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-lg font-medium">
            No pending registrations
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {registrations.map(
            (registration) => {
              const match =
                matchResults[
                  registration.id
                ];

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

              const isMatched =
                matchStatus ===
                  "phone" ||
                matchStatus ===
                  "email" ||
                matchStatus ===
                  "phone_and_email";

              const verified =
                registration.verification_confirmed;

              return (
                <article
                  key={registration.id}
                  className="rounded-xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {registration.full_name}
                      </h3>

                      <p className="mt-2">
                        📞 {registration.phone}
                      </p>

                      {registration.email && (
                        <p>
                          ✉️{" "}
                          {registration.email}
                        </p>
                      )}

                      <p className="mt-2">
                        📍{" "}
                        {registration.location ||
                          "Location not provided"}

                        {registration.district
                          ? `, ${registration.district}`
                          : ""}
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Registration ID:
                        <br />
                        <span className="font-mono">
                          {registration.id}
                        </span>
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Registered{" "}
                        {new Date(
                          registration.created_at,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                        {verified
                          ? "Verification confirmed"
                          : "Verification pending"}
                      </span>
                    </div>
                  </div>

                  {/* Match information */}
                  <div className="mt-6 rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <strong>
                        Match status
                      </strong>

                      <span>
                        {matchStatus}
                      </span>
                    </div>

                    {match && (
                      <div className="mt-4 space-y-1 text-sm">
                        {match.grower_code && (
                          <p>
                            <strong>
                              Existing Grower ID:
                            </strong>{" "}
                            {
                              match.grower_code
                            }
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

                  {/* Mismatch */}
                  {isMismatch && (
                    <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
                      <strong>
                        Possible mismatch
                      </strong>

                      <p className="mt-1">
                        Phone and email appear
                        to belong to different
                        growers. Approval is
                        blocked until the
                        administrator investigates.
                      </p>
                    </div>
                  )}

                  {/* New Grower location */}
                  {!isExistingExact &&
                    matchStatus ===
                      "no_match" && (
                      <div className="mt-6">
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium">
                            Location code for new Grower ID
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
                            className="w-full rounded-lg border px-3 py-2"
                          />
                        </label>
                      </div>
                    )}

                  {/* Notes */}
                  {match &&
                    !isMismatch && (
                      <div className="mt-6">
                        <label className="block">
                          <span className="mb-1 block text-sm font-medium">
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
                            className="w-full rounded-lg border px-3 py-2"
                          />
                        </label>
                      </div>
                    )}

                  {/* Buttons */}
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
                          className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
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
                          className="rounded-lg bg-blue-700 px-5 py-2 text-white disabled:opacity-50"
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
                          className="rounded-lg bg-green-700 px-5 py-2 text-white disabled:opacity-50"
                        >
                          {busy
                            ? "Processing..."
                            : isExistingExact
                              ? "Link Existing Grower"
                              : "Approve & Assign Grower ID"}
                        </button>
                      )}
                  </div>

                  {/* Existing grower explanation */}
                  {isExistingExact && (
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
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

                  {/* New grower explanation */}
                  {matchStatus ===
                    "no_match" && (
                    <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
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
    </main>
  );
}