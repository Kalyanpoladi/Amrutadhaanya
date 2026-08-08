"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Leaf,
  MapPin,
  Phone,
  Sprout,
  UserRound,
  Wheat,
} from "lucide-react";

export default function ShareYourHarvestPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [harvest, setHarvest] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = "919177751088";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = `
Hello Amruta Dhaanya,

I would like to share my harvest.

Name: ${name}
Phone: ${phone}
Location: ${location}
Harvest / Products: ${harvest}
Approximate Quantity: ${quantity}
Additional Details: ${description || "Not provided"}

Please let me know the next steps for becoming a grower partner.
`.trim();

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setSubmitted(true);
  };

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* TOP BAR                                                          */}
      {/* ---------------------------------------------------------------- */}

      <div className="bg-[#234f32] px-4 py-2.5 text-center text-sm font-medium text-white">
        🌱 Share your harvest with nearby families
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* HEADER                                                           */}
      {/* ---------------------------------------------------------------- */}

      <header className="sticky top-0 z-50 border-b border-[#dfe5d8] bg-[#f8f7f1]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#286039] text-2xl">
              🌱
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                Amruta Dhaanya
              </div>

              <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#71836e]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/share-your-harvest/join-as-a-grower"
              className="hidden items-center gap-2 rounded-full bg-[#2d6339] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#214e2d] sm:inline-flex"
            >
              <Sprout className="h-4 w-4" />
              Join as a Grower
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#376540] px-5 py-2.5 text-sm font-semibold text-[#2e5b39] transition hover:bg-[#e9f0e5]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                             */}
      {/* ---------------------------------------------------------------- */}

      <section className="relative overflow-hidden bg-[#e7f0e1]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9dfbf] blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#d6e7cd] blur-3xl" />

        <div className="relative mx-auto max-w-[1180px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#35633d] shadow-sm">
              <Sprout className="h-4 w-4" />
              For local growers
            </div>

            <h1 className="mt-7 text-5xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Share your harvest.
              <br />
              <span className="text-[#70965b]">
                Give it a home nearby.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#61716a] sm:text-xl">
              Have vegetables, fruits, grains, leafy greens, flowers or
              other genuine local produce to share? Tell us what you
              have. We&apos;ll understand your harvest and help connect
              it with nearby families.
            </p>

            {/* HERO ACTIONS */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/share-your-harvest/join-as-a-grower"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d6339] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2d6339]/15 transition hover:bg-[#214e2d]"
              >
                <Sprout className="h-4 w-4" />
                Join as a Grower
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#share-form"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#376540] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#2e5b39] transition hover:bg-white"
              >
                Share Today&apos;s Harvest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* MAIN                                                             */}
      {/* ---------------------------------------------------------------- */}

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* LEFT INFORMATION */}

          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e4efdf] text-[#35633d]">
              <Wheat className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Every harvest has value.
            </h2>

            <p className="mt-5 leading-7 text-[#68776d]">
              Your harvest does not need to be large. A few kilos from a
              home garden, terrace garden, backyard or small local farm
              can still be useful to families nearby.
            </p>

            {/* Benefits */}

            <div className="mt-9 space-y-4">
              <div className="flex gap-4 rounded-2xl border border-[#dce5d8] bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f0e3]">
                  <CheckCircle2 className="h-5 w-5 text-[#47744b]" />
                </div>

                <div>
                  <h3 className="font-bold">
                    Start with what you actually have
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#718078]">
                    Tell us your real current availability. There is no
                    need to maintain permanent stock.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-[#dce5d8] bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f0e3]">
                  <Leaf className="h-5 w-5 text-[#47744b]" />
                </div>

                <div>
                  <h3 className="font-bold">
                    Genuine local produce
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#718078]">
                    We are building a trusted network around real growers
                    and genuine local availability.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-[#dce5d8] bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f0e3]">
                  <MapPin className="h-5 w-5 text-[#47744b]" />
                </div>

                <div>
                  <h3 className="font-bold">
                    Nearby families first
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#718078]">
                    Our focus is connecting local harvests with households
                    in nearby communities.
                  </p>
                </div>
              </div>
            </div>

            {/* JOIN AS GROWER CARD */}

            <div className="mt-8 rounded-3xl border border-[#cddfc7] bg-[#eef5ea] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#35633d] shadow-sm">
                  <Sprout className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#2e5b39]">
                    Want to become a registered grower?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#68776d]">
                    Complete our grower registration form. Your information
                    will be reviewed by our team before you are accepted as
                    a grower partner.
                  </p>

                  <Link
                    href="/share-your-harvest/join-as-a-grower"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#35633d] hover:underline"
                  >
                    Join as a Grower
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact */}

            <div className="mt-8 rounded-3xl bg-[#234f32] p-6 text-white">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#c8ddc2]" />

                <div>
                  <div className="text-sm text-[#b9ceb5]">
                    Prefer to talk directly?
                  </div>

                  <a
                    href="tel:+919177751088"
                    className="mt-1 block font-semibold hover:underline"
                  >
                    +91 9177751088
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* FORM                                                             */}
          {/* ---------------------------------------------------------------- */}

          <div
            id="share-form"
            className="rounded-[32px] border border-[#dce5d8] bg-white p-6 shadow-[0_20px_70px_rgba(38,70,45,.08)] sm:p-9"
          >
            {!submitted ? (
              <>
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e3]">
                    <UserRound className="h-5 w-5 text-[#47744b]" />
                  </div>

                  <h2 className="mt-5 text-3xl font-bold tracking-tight">
                    Tell us about your harvest
                  </h2>

                  <p className="mt-3 leading-7 text-[#6c796f]">
                    Fill in the details below. When you submit, WhatsApp
                    will open with your information already prepared.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#344b3a]"
                    >
                      Your name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      placeholder="Enter your full name"
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-[#fbfcf8] px-4 text-sm outline-none transition focus:border-[#47744b] focus:ring-2 focus:ring-[#47744b]/10"
                    />
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-[#344b3a]"
                    >
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(event) =>
                        setPhone(event.target.value)
                      }
                      placeholder="e.g. 9177751088"
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-[#fbfcf8] px-4 text-sm outline-none transition focus:border-[#47744b] focus:ring-2 focus:ring-[#47744b]/10"
                    />
                  </div>

                  {/* LOCATION */}

                  <div>
                    <label
                      htmlFor="location"
                      className="mb-2 block text-sm font-semibold text-[#344b3a]"
                    >
                      Where are you located?
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={location}
                      onChange={(event) =>
                        setLocation(event.target.value)
                      }
                      placeholder="Village, town or area"
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-[#fbfcf8] px-4 text-sm outline-none transition focus:border-[#47744b] focus:ring-2 focus:ring-[#47744b]/10"
                    />
                  </div>

                  {/* HARVEST */}

                  <div>
                    <label
                      htmlFor="harvest"
                      className="mb-2 block text-sm font-semibold text-[#344b3a]"
                    >
                      What do you have to share?
                    </label>

                    <input
                      id="harvest"
                      name="harvest"
                      type="text"
                      required
                      value={harvest}
                      onChange={(event) =>
                        setHarvest(event.target.value)
                      }
                      placeholder="e.g. tomatoes, leafy greens, rice..."
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-[#fbfcf8] px-4 text-sm outline-none transition focus:border-[#47744b] focus:ring-2 focus:ring-[#47744b]/10"
                    />
                  </div>

                  {/* QUANTITY */}

                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-2 block text-sm font-semibold text-[#344b3a]"
                    >
                      Approximate quantity
                    </label>

                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      required
                      value={quantity}
                      onChange={(event) =>
                        setQuantity(event.target.value)
                      }
                      placeholder="e.g. 20 kg, 5 baskets, 10 litres..."
                      className="h-12 w-full rounded-xl border border-[#d8e2d3] bg-[#fbfcf8] px-4 text-sm outline-none transition focus:border-[#47744b] focus:ring-2 focus:ring-[#47744b]/10"
                    />
                  </div>

                  {/* DESCRIPTION */}

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-semibold text-[#344b3a]"
                    >
                      Anything else we should know?
                      <span className="ml-1 font-normal text-[#87928a]">
                        (optional)
                      </span>
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      value={description}
                      onChange={(event) =>
                        setDescription(event.target.value)
                      }
                      placeholder="Tell us about your harvest, growing method, expected availability, etc."
                      className="w-full resize-none rounded-xl border border-[#d8e2d3] bg-[#fbfcf8] px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#47744b] focus:ring-2 focus:ring-[#47744b]/10"
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#2d6339] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2d6339]/15 transition hover:bg-[#214e2d] active:scale-[0.99]"
                  >
                    Share My Harvest
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-xs leading-5 text-[#89948c]">
                    By submitting, your details will be prepared in
                    WhatsApp so our team can contact you.
                  </p>
                </form>
              </>
            ) : (
              /* ---------------------------------------------------------- */
              /* SUCCESS                                                      */
              /* ---------------------------------------------------------- */

              <div className="flex min-h-[600px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f0df]">
                  <CheckCircle2 className="h-10 w-10 text-[#3d7347]" />
                </div>

                <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
                  Your harvest details are ready.
                </h2>

                <p className="mt-4 max-w-md leading-7 text-[#68776d]">
                  WhatsApp should have opened with your details. Please
                  send the prepared message so our team can review your
                  harvest.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d6339] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#214e2d]"
                  >
                    Open WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-full border border-[#376540] px-7 py-3.5 text-sm font-semibold text-[#2e5b39] transition hover:bg-[#edf3e9]"
                  >
                    Submit another harvest
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* GROWER REGISTRATION CTA                                          */}
      {/* ---------------------------------------------------------------- */}

      <section className="border-t border-[#dce5d8] bg-[#f0f4ec] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e2eddd] text-[#35633d]">
            <Sprout className="h-7 w-7" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to become a registered grower?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#68776d]">
            If you would like to participate regularly as a grower partner,
            complete our grower registration form. Our team will review your
            information and contact you for confirmation.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/share-your-harvest/join-as-a-grower"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d6339] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2d6339]/10 transition hover:bg-[#214e2d]"
            >
              Join as a Grower
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#376540] px-6 py-3.5 text-sm font-semibold text-[#2e5b39] transition hover:bg-white"
            >
              Explore Amruta Dhaanya
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                           */}
      {/* ---------------------------------------------------------------- */}

      <footer className="bg-[#172c1d] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 md:grid-cols-3">
            {/* BRAND */}

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2d6339] text-2xl">
                  🌱
                </div>

                <div>
                  <div className="font-semibold">
                    Amruta Dhaanya
                  </div>

                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#899a8d]">
                    An Ahaar Kutumbam Initiative
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-[#b7c4b9]">
                Fresh, traditional food sourced directly from growers —
                selected carefully, handled honestly and shared through
                a trusted local network.
              </p>
            </div>

            {/* GROWER */}

            <div>
              <h3 className="font-semibold">
                Grow with us
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  href="/share-your-harvest/join-as-a-grower"
                  className="flex items-center gap-2 text-[#c8ddc2] transition hover:text-white"
                >
                  <Sprout className="h-4 w-4" />
                  Join as a Grower
                </Link>

                <Link
                  href="/share-your-harvest"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  Share Your Harvest
                </Link>

                <a
                  href="tel:+919177751088"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  +91 9177751088
                </a>
              </div>
            </div>

            {/* NAVIGATION */}

            <div>
              <h3 className="font-semibold">
                Explore
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  href="/"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  About Us
                </Link>

                <Link
                  href="/participate"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  Participate
                </Link>

                <Link
                  href="/contact-us"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  Contact Us
                </Link>

                <Link
                  href="/legal"
                  className="text-[#b7c4b9] transition hover:text-white"
                >
                  Legal &amp; Policies
                </Link>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[#899a8d]">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                © 2026 Amruta Dhaanya. All rights reserved.
              </div>

              <div>
                A trusted local harvest network built around real
                daily availability and community care.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}