"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sprout,
  Truck,
  Users,
} from "lucide-react";

const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSf4ODMvMywn3s7xDqriTxXpmoFl5LHFcuXYoBtgkby3zlC7fg/viewform?usp=header";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit your details",
    text: "Complete our grower registration form with your basic details, location, produce and approximate availability.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "We review your application",
    text: "Our team reviews the information you submit and checks whether your supply fits our local harvest network.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "We contact you",
    text: "We may contact you through WhatsApp or phone to clarify your information, availability and pickup preferences.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Verification & confirmation",
    text: "If everything is suitable, we confirm your participation as a grower or local seller in the Amruta Dhaanya network.",
  },
  {
    number: "05",
    icon: Users,
    title: "Receive your private seller code",
    text: "Approved growers may receive a private service code. Your personal details are not publicly shown to customers.",
  },
  {
    number: "06",
    icon: Truck,
    title: "Share your availability",
    text: "Once accepted, you can tell us what is available, how much you have and when it can be supplied or collected.",
  },
];

const eligibleItems = [
  "Vegetables",
  "Leafy greens",
  "Flowers",
  "Fruits",
  "Grains",
  "Milk",
  "Traditional foods",
  "Other genuine local produce",
];

const importantPoints = [
  "Registration does not guarantee that every quantity will be purchased.",
  "Amruta Dhaanya collects only quantities that can realistically be sold.",
  "Availability, freshness, demand and delivery feasibility are considered before accepting supply.",
  "Payment is based on the accepted quantity and agreed daily price.",
  "Unsold products may be returned, discounted with your permission, or handled as mutually discussed.",
  "Your name, phone number and address are not publicly shared with customers.",
  "Customers may see a private seller code instead of your personal details.",
];

export default function JoinAsGrowerPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#26372b]">
      {/* ANNOUNCEMENT */}
      <div className="bg-[#234f32] px-4 py-2.5 text-center text-sm font-medium text-white">
        🌱 Grow with Amruta Dhaanya · Share your local harvest
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#286039] text-2xl shadow-sm"
            >
              🌱
            </motion.div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                Amruta Dhaanya
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#71836e]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-[#344b3a] hover:text-[#477d45]"
            >
              Home
            </Link>

            <Link
              href="/share-your-harvest"
              className="text-sm font-medium text-[#344b3a] hover:text-[#477d45]"
            >
              Share Your Harvest
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-[#344b3a] hover:text-[#477d45]"
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              className="text-sm font-medium text-[#344b3a] hover:text-[#477d45]"
            >
              Contact Us
            </Link>
          </nav>

          <Link
            href="/"
            className="hidden rounded-full border border-[#376540] px-5 py-2.5 text-sm font-semibold text-[#2e5b39] transition-colors hover:bg-[#e9f0e5] sm:block"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#dcebd4] opacity-60 blur-3xl" />
        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#e7edd8] opacity-70 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1280px] gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:py-28">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e7f0e1] px-4 py-2 text-sm font-semibold text-[#32633c]">
              <Sprout className="h-4 w-4" />
              Join our local grower network
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-[70px]">
              Your harvest
              <br />
              can reach
              <br />
              <span className="text-[#70965b]">
                nearby homes.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#61716a]">
              If you grow vegetables, leafy greens, flowers, fruits,
              grains, milk or other genuine local produce, you can
              register to become part of the Amruta Dhaanya grower
              and seller network.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2d6339] px-7 text-sm font-semibold text-white shadow-lg shadow-[#2d6339]/15 transition-colors hover:bg-[#214e2d]"
              >
                Start Grower Registration
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/share-your-harvest"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#376540] bg-transparent px-7 text-sm font-semibold text-[#2e5b39] transition-colors hover:bg-[#e9f0e5]"
              >
                Learn About Sharing Your Harvest
              </Link>
            </div>

            <p className="mt-4 text-xs text-[#78857d]">
              Your registration will open in Google Forms.
            </p>
          </motion.div>

          {/* HERO CARD */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              rotate: 2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.9,
              type: "spring",
              stiffness: 90,
            }}
            className="relative"
          >
            <div className="rounded-[40px] bg-[#e1ebda] p-5 shadow-[0_30px_80px_rgba(44,76,49,.12)]">
              <div className="overflow-hidden rounded-[30px] bg-[#d5e3ce] p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#35613e]">
                    Grower Network
                  </span>

                  <span className="text-3xl">🌾</span>
                </div>

                <div className="flex min-h-[330px] flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-8xl"
                  >
                    🌱
                  </motion.div>

                  <h2 className="mt-7 text-4xl font-bold tracking-tight text-[#2e6139]">
                    Every harvest
                    <br />
                    has value.
                  </h2>

                  <p className="mt-4 max-w-sm leading-7 text-[#66806b]">
                    Connect genuine local supply with families
                    looking for fresh food nearby.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["01", "Register"],
                    ["02", "Verify"],
                    ["03", "Supply"],
                  ].map(([number, label]) => (
                    <div
                      key={number}
                      className="rounded-2xl bg-white/80 p-4 text-center"
                    >
                      <div className="text-sm font-bold text-[#35613e]">
                        {number}
                      </div>

                      <div className="mt-1 text-xs text-[#64756a]">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section className="border-y border-[#dce5d8] bg-white/60 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Who can register?
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Local growers, households and genuine small suppliers.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#66756b]">
              You don&apos;t need to be a large commercial farm. If you
              genuinely grow or supply useful local produce and
              sometimes have surplus after your own household needs,
              you can submit your details for consideration.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {eligibleItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="flex items-center gap-3 rounded-2xl border border-[#dce5d8] bg-white p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                  <Check className="h-4 w-4 text-[#47744b]" />
                </div>

                <span className="text-sm font-semibold">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Simple and transparent
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              What happens after you register?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#68766d]">
              Submitting the form starts the process. It does not
              automatically make you an approved seller.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f0e1]">
                      <Icon className="h-6 w-6 text-[#35633d]" />
                    </div>

                    <span className="text-sm font-bold text-[#78916e]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#6b786f]">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REGISTRATION CTA */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <motion.div
            whileHover={{
              scale: 1.005,
            }}
            className="overflow-hidden rounded-[38px] bg-[#234f32] text-white"
          >
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:p-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#c8ddc2]">
                  <Sprout className="h-4 w-4" />
                  Ready to join?
                </div>

                <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                  Tell us about what you grow.
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#c9d9c5]">
                  Complete the grower registration form. Your
                  information will be reviewed by the Amruta
                  Dhaanya team before confirmation.
                </p>

                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#234f32] transition-colors hover:bg-[#edf4e9]"
                >
                  Open Grower Registration Form
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-40 w-40 items-center justify-center rounded-full bg-white/10 text-7xl"
              >
                🌾
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* IMPORTANT INFORMATION */}
      <section className="bg-[#f0f4ec] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                Please understand
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Registration is the beginning, not a purchase promise.
              </h2>

              <p className="mt-5 leading-7 text-[#66756b]">
                Amruta Dhaanya is designed around real local
                availability. We don&apos;t operate like a warehouse
                that guarantees every quantity from every seller.
              </p>
            </div>

            <div className="rounded-[30px] border border-[#dce5d8] bg-white p-7 sm:p-9">
              <div className="space-y-5">
                {importantPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                      <Check className="h-4 w-4 text-[#47744b]" />
                    </div>

                    <p className="leading-7 text-[#5f6f65]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f0e1]">
            <ShieldCheck className="h-7 w-7 text-[#35633d]" />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Your personal information stays private.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#68766d]">
            Your name, WhatsApp number, address and other personal
            details are collected for grower registration,
            availability planning, pickup coordination, payment
            communication and internal records. They are not
            publicly shared with customers.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#7a867e]">
            For source transparency, Amruta Dhaanya may identify
            an approved seller using a private service code such
            as AD-101 rather than displaying personal details.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/legal-and-policies/privacy-policy"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#376540] px-6 py-3 text-sm font-semibold text-[#2e5b39] hover:bg-[#e9f0e5]"
            >
              Privacy Policy
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/legal-and-policies/terms-of-service"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#376540] px-6 py-3 text-sm font-semibold text-[#2e5b39] hover:bg-[#e9f0e5]"
            >
              Terms of Service
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-[#dce5d8] bg-[#e8f0e3] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="text-5xl">🌱</div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Have a harvest to share?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#617268]">
            Start by telling us what you grow and what you may
            have available. Our team will take it from there.
          </p>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#2d6339] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2d6339]/15 transition-colors hover:bg-[#214e2d]"
          >
            Register as a Grower
            <ArrowRight className="h-4 w-4" />
          </a>

          <div className="mt-5">
            <Link
              href="/share-your-harvest"
              className="text-sm font-semibold text-[#477047] hover:underline"
            >
              ← Back to Share Your Harvest
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#172c1d] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_.7fr_.7fr]">
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2d6339] text-2xl">
                  🌱
                </div>

                <div>
                  <div className="text-xl font-bold">
                    Amruta Dhaanya
                  </div>

                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#9caf9d]">
                    An Ahaar Kutumbam Initiative
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-lg leading-7 text-[#b7c4b9]">
                Fresh, traditional food sourced directly from
                growers — selected carefully, handled honestly and
                shared through a trusted local network.
              </p>

              <div className="mt-7 space-y-2 text-sm text-[#b7c4b9]">
                <div>Phone: +91 9177751088</div>
                <div>Email: amrutadhaanya@gmail.com</div>
                <div>
                  Location: Vangapahad, Warangal, Telangana 506006
                </div>
              </div>
            </div>

            {/* EXPLORE */}
            <div>
              <h3 className="font-semibold">Explore</h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#b7c4b9]">
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/#fresh"
                  className="transition-colors hover:text-white"
                >
                  Today&apos;sFresh List
                </Link>

                <Link
                  href="/#baskets"
                  className="transition-colors hover:text-white"
                >
                  Fresh Baskets
                </Link>

                <Link
                  href="/share-your-harvest"
                  className="transition-colors hover:text-white"
                >
                  Share Your Harvest
                </Link>

                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* TRUST */}
            <div>
              <h3 className="font-semibold">Trust</h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#b7c4b9]">
                <Link
                  href="/share-your-harvest/join-as-a-grower"
                  className="transition-colors hover:text-white"
                >
                  Become a Grower
                </Link>

                <Link
                  href="/Participate"
                  className="transition-colors hover:text-white"
                >
                  Participate
                </Link>

                <Link
                  href="/#faq"
                  className="transition-colors hover:text-white"
                >
                  FAQs
                </Link>

                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>

                <Link
                  href="/legal-and-policies"
                  className="transition-colors hover:text-white"
                >
                  Legal & Policies
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/10 pt-7 text-sm text-[#899a8d]">
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
    </main>
  );
}
