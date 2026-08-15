"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Heart,
  Leaf,
  ShieldCheck,
  Sprout,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Sprout,
    title: "Local Growers",
    text: "We connect families with growers and producers from the local community.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Checked",
    text: "Products are checked before listing and availability is confirmed before an order is processed.",
  },
  {
    icon: Leaf,
    title: "Real Availability",
    text: "We don't pretend to have endless warehouse stock. We work with what local growers genuinely have.",
  },
  {
    icon: Heart,
    title: "Community First",
    text: "Our goal is to create a trustworthy relationship between growers and nearby families.",
  },
];

const principles = [
  "Local growers and producers",
  "Traditional food systems",
  "Real daily availability",
  "Basic freshness checks",
  "Confirmation before payment",
  "Responsible local delivery",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#203328]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#286039] text-2xl"
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

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full border-[#376540] bg-transparent px-5 text-[#2e5b39] hover:bg-[#e9f0e5]"
              asChild
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button
              className="rounded-full bg-[#2d6339] px-5 hover:bg-[#214e2d]"
              asChild
            >
              <Link href="/cart">Cart</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#d9e7cf] blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-[#e9dfbd] blur-3xl"
        />

        <div className="relative mx-auto max-w-[1100px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="rounded-full border-0 bg-[#e7f0e1] px-5 py-2 text-[#35633d]">
              <Leaf className="mr-2 h-4 w-4" />
              An Ahaar Kutumbam Initiative
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="mt-8 text-5xl font-bold tracking-[-0.055em] sm:text-6xl lg:text-8xl"
          >
            About
            <span className="block text-[#70965b]">
              Amruta Dhaanya
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#64746a] sm:text-xl"
          >
            A local food network built around growers, traditional foods,
            genuine availability and trust between the people who grow food
            and the families who bring it home.
          </motion.p>
        </div>
      </section>

      {/* HARVEST PHRASE */}
      <section className="relative overflow-hidden border-y border-[#dce5d8] bg-[#eef3e9] py-14">
        <motion.div
          animate={{
            x: ["-15%", "115%"],
            opacity: [0, 0.35, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute left-0 top-1/2 h-40 w-96 -translate-y-1/2 rounded-full bg-[#d8ad50] blur-3xl"
        />

        <div className="relative mx-auto flex max-w-[1100px] items-center justify-center px-5">
          <div className="flex items-center gap-5">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.08, 1],
              }}
              transition={{
                rotate: {
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="text-4xl sm:text-5xl"
            >
              ☀️
            </motion.div>

            <motion.div
              animate={{
                opacity: [0.35, 1, 0.35],
                y: [8, 0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#78916e]">
                Our philosophy
              </p>

              <h2 className="mt-2 text-xl font-bold tracking-[0.08em] text-[#2e6139] sm:text-3xl">
                HARVESTED BY THE SUN,
              </h2>

              <h2 className="mt-1 text-xl font-bold tracking-[0.08em] text-[#9a8150] sm:text-3xl">
                BLESSED BY THE MOON
              </h2>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -7, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-4xl sm:text-5xl"
            >
              🌙
            </motion.div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Our story
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Selected,
              <br />
              <span className="text-[#70965b]">not just sold.</span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#66756b]">
              Amruta Dhaanya was created around a simple idea: food should
              have a connection to the people and places that produce it.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#66756b]">
              Instead of building another anonymous marketplace, we want to
              create a trusted local network where families can discover
              traditional foods and growers can find nearby households for
              their genuine harvests.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#66756b]">
              That means we don&apos;t promise unlimited stock. We don&apos;t rely on
              anonymous sellers. And we don&apos;t want customers paying for
              something before its availability is confirmed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-[40px] bg-[#234f32] p-8 text-white shadow-[0_30px_80px_rgba(35,79,50,.15)] sm:p-12">
              <div className="text-7xl">🌾</div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#b8d3ad]">
                Ahaar Kutumbam
              </p>

              <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
                From local harvests to nearby homes.
              </h3>

              <p className="mt-5 leading-7 text-[#c8d9c4]">
                A community-oriented initiative connecting growers,
                producers and families through a transparent local food
                network.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-2xl">🌱</div>
                  <div className="mt-2 text-sm font-semibold">
                    Growers
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-2xl">🏡</div>
                  <div className="mt-2 text-sm font-semibold">
                    Families
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="text-2xl">🌾</div>
                  <div className="mt-2 text-sm font-semibold">
                    Harvests
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="bg-[#eef3e9] px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              What we believe
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              A food network built on trust.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#66756b]">
              Every part of Amruta Dhaanya is designed around a simple
              principle: be honest about what is available and careful about
              what reaches a family&apos;s home.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -7 }}
                >
                  <Card className="h-full rounded-[28px] border-[#dce5d8] bg-white shadow-sm">
                    <CardContent className="p-7">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f0e1]">
                        <Icon className="h-6 w-6 text-[#47744b]" />
                      </div>

                      <h3 className="mt-6 text-xl font-bold">
                        {value.title}
                      </h3>

                      <p className="mt-3 leading-7 text-[#6b786f]">
                        {value.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR PRINCIPLES */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              How we work
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple.
              <br />
              Transparent.
              <br />
              Local.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#66756b]">
              We are intentionally different from a warehouse-driven
              quick-commerce model. Our focus is on real local supply and
              responsible connections between growers and families.
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((principle, index) => (
              <motion.div
                key={principle}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="flex items-center gap-4 rounded-2xl border border-[#dce5d8] bg-white p-5 shadow-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                  <Check className="h-4 w-4 text-[#47744b]" />
                </div>

                <span className="font-semibold">
                  {principle}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIRMATION */}
      <section className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="overflow-hidden rounded-[40px] bg-[#234f32] text-white">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8d3ad]">
                  Our promise
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  Nothing is promised until it is confirmed.
                </h2>

                <p className="mt-6 text-lg leading-8 text-[#c8d9c4]">
                  Before payment, we confirm availability, final price and
                  delivery. If something isn&apos;t available, we tell you
                  honestly instead of making a promise we cannot keep.
                </p>
              </div>

              <div className="flex items-center justify-center bg-[#2c5c38] p-10">
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[120px]"
                >
                  🌱
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY / LOCAL */}
      <section className="px-5 pb-28 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <Card className="overflow-hidden rounded-[38px] border-[#dce5d8] bg-[#e4eddd]">
            <CardContent className="grid p-0 lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3b6941]">
                  <Truck />
                </div>

                <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
                  Starting local.
                </h2>

                <p className="mt-5 leading-7 text-[#617268]">
                  Amruta Dhaanya is being built around local communities,
                  beginning with selected areas around Warangal, Hanamkonda,
                  Kazipet and nearby communities.
                </p>

                <Button
                  className="mt-7 rounded-full bg-[#2d6339] hover:bg-[#214e2d]"
                  asChild
                >
                  <Link href="/">
                    Explore Amruta Dhaanya
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </Button>
              </div>

              <div className="flex min-h-[320px] items-center justify-center bg-[#cadcbf]">
                <div className="text-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                    className="text-8xl"
                  >
                    📍
                  </motion.div>

                  <h3 className="mt-5 text-2xl font-bold text-[#345e3c]">
                    Local first
                  </h3>

                  <p className="mt-2 text-[#617968]">
                    Growers · Families · Community
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f0f4ec] px-5 py-24 text-center lg:px-8">
        <div className="mx-auto max-w-[800px]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
            Be part of it
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Every harvest has value.
            <br />
            Every home can participate.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#66756b]">
            Whether you are looking for traditional food or have a genuine
            local harvest to share, Amruta Dhaanya is being built to connect
            the two.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-[#2d6339] px-7 hover:bg-[#214e2d]"
              asChild
            >
              <Link href="/#products">
                Explore Products
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#376540] px-7 text-[#2e5b39]"
              asChild
            >
              <Link href="/#growers">
                Share Your Harvest
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#172c1d] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-bold text-lg">
              Amruta Dhaanya
            </div>

            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#9caf9d]">
              An Ahaar Kutumbam Initiative
            </div>
          </div>

          <div className="text-sm text-[#9caf9d]">
            HARVESTED BY THE SUN, BLESSED BY THE MOON
          </div>

          <Link
            href="/"
            className="text-sm text-[#b7c4b9] transition-colors hover:text-white"
          >
            Return to Home →
          </Link>
        </div>
      </footer>
    </main>
  );
}