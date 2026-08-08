"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Leaf,
  Users,
} from "lucide-react";

export default function ParticipatePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#24352a]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#286039] text-2xl">
              🌱
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight">
                Amruta Dhaanya
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#71836e]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#35613e] hover:text-[#214e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f0e1] text-3xl">
              🌱
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-[#70915f]">
              Ahaar Kutumbam
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
              Participate in the{" "}
              <span className="text-[#70965b]">
                local harvest network.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#66756b]">
              Amruta Dhaanya is more than an online store. It is a
              community network connecting growers, families and local
              people who want better food and a more responsible way of
              sourcing it.
            </p>
          </motion.div>

          {/* Participation cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: "Share Your Harvest",
                text: "If you grow vegetables, fruits, greens, grains or other useful products, you can share your harvest with nearby families.",
                href: "/share-your-harvest",
                button: "Become a Grower",
              },
              {
                icon: Heart,
                title: "Support Local Food",
                text: "Order from local growers and help keep more of the value of food within the local community.",
                href: "/#products",
                button: "Explore Products",
              },
              {
                icon: Users,
                title: "Join the Community",
                text: "Participate by connecting people, sharing information and helping build a trustworthy local food network.",
                href: "/contact-us",
                button: "Contact Us",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[30px] border border-[#dce5d8] bg-white p-8 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0e3]">
                    <Icon className="h-7 w-7 text-[#3d6d43]" />
                  </div>

                  <h2 className="mt-6 text-2xl font-bold">
                    {item.title}
                  </h2>

                  <p className="mt-4 min-h-[110px] leading-7 text-[#6b786f]">
                    {item.text}
                  </p>

                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-[#35613e] hover:text-[#214e2d]"
                  >
                    {item.button}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why participate */}
      <section className="bg-[#eef3e9] px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Why participate?
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Every person can strengthen the local food chain.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#66756b]">
              A healthy local food system needs more than growers. It
              needs families who value local food, people who help connect
              communities, and participants who believe transparency and
              trust matter.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Help local growers find nearby customers.",
              "Support responsible and transparent sourcing.",
              "Reduce unnecessary dependence on warehouse-based supply.",
              "Create stronger relationships between growers and families.",
              "Help useful local harvests reach homes instead of being wasted.",
            ].map((text) => (
              <div
                key={text}
                className="flex items-start gap-4 rounded-2xl border border-[#dce5d8] bg-white p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#47744b]" />

                <p className="text-[#526258]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to participate */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Simple participation
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Start where you are.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              [
                "01",
                "Tell us how you want to participate",
                "Grow food, buy local food, connect people or simply support the initiative.",
              ],
              [
                "02",
                "We understand your role",
                "We'll learn what you can offer and how it can fit into the local network.",
              ],
              [
                "03",
                "Grow together",
                "Participate at a practical pace while helping build a more trustworthy local food system.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-[28px] border border-[#dce5d8] bg-white p-7"
              >
                <div className="text-sm font-bold text-[#70915f]">
                  {number}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-[#6b786f]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-[38px] bg-[#234f32] px-8 py-14 text-white sm:px-12 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8d3ad]">
                Be part of it
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Your participation can make a local harvest matter.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-[#c9d9c5]">
                Whether you are a grower, a family looking for better
                food, or someone who wants to support the community,
                there is a place for you in Ahaar Kutumbam.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/share-your-harvest"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#234f32] hover:bg-[#edf4e9]"
              >
                Share Your Harvest
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#172c1d] px-5 py-10 text-center text-sm text-[#9aaa9d]">
        <p>
          © 2026 Amruta Dhaanya · An Ahaar Kutumbam Initiative
        </p>

        <Link
          href="/"
          className="mt-3 inline-block text-[#c8d9c4] hover:text-white"
        >
          Return to Home
        </Link>
      </footer>
    </main>
  );
}