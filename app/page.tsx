"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Truck,
  X,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { AccountMenu } from "@/components/auth/account-menu";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* -------------------------------------------------------------------------- */
/* BRAND                                                                      */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const categories = [
  { name: "Vegetables", icon: "🥬" },
  { name: "Fruits", icon: "🍎" },
  { name: "Leafy Greens", icon: "🌿" },
  { name: "Flowers", icon: "🌼" },
  { name: "Sacred Greens", icon: "🌱" },
  { name: "Grains", icon: "🌾" },
  { name: "Pulses", icon: "🫘" },
  { name: "Dairy", icon: "🥛" },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Verified growers",
    text: "Real local sellers",
  },
  {
    icon: Check,
    title: "Checked before listing",
    text: "Basic freshness check",
  },
  {
    icon: Heart,
    title: "Confirmed before payment",
    text: "No unwanted surprises",
  },
  {
    icon: Leaf,
    title: "No warehouse stock",
    text: "Genuinely available",
  },
];

const products = [
  {
    slug: "traditional-rice",
    name: "Traditional Rice",
    description:
      "Naturally grown, hand-selected rice sourced directly from growers we work with regularly.",
    price: "₹120",
    unit: "/ kg",
    emoji: "🌾",
    accent: "gold",
  },
  {
    slug: "traditional-millets",
    name: "Traditional Millets",
    description:
      "Traditional grains grown with care and brought to nearby families through our local network.",
    price: "₹150",
    unit: "/ kg",
    emoji: "🌾",
    accent: "sage",
  },
  {
    slug: "cold-pressed-oils",
    name: "Cold-Pressed Oils",
    description:
      "Slow-extracted using traditional methods — no heat, no chemicals, no shortcuts.",
    price: "₹280",
    unit: "/ litre",
    emoji: "🫒",
    accent: "terracotta",
  },
];

const faqs = [
  {
    question:
      "What is Ahaar Kutumbam and how is it different from Amruta Dhaanya?",
    answer:
      "Ahaar Kutumbam is the wider community initiative connecting growers, local agents and families. Amruta Dhaanya is the customer-facing marketplace built within that initiative.",
  },
  {
    question:
      "How do I know the products are genuinely traditional?",
    answer:
      "We work with registered local growers and sellers, check products before listing and confirm actual availability before an order is processed.",
  },
  {
    question: "Where do you currently deliver?",
    answer:
      "We are currently testing delivery and pickup support in selected areas of Warangal, Hanamkonda, Kazipet and nearby local communities.",
  },
  {
    question: "How fresh is the stock?",
    answer:
      "We don't operate like a warehouse-based quick-commerce service. Availability is based on what local growers genuinely have available.",
  },
  {
    question: "How do I become a grower partner?",
    answer:
      "Use the Share Your Harvest section and submit your details. Our team will contact you, understand what you grow and guide you through registration.",
  },
  {
    question: "What if a product I ordered isn't available?",
    answer:
      "We confirm availability, final price and delivery before processing. If something isn't available, we tell you before payment rather than after.",
  },
];

/* -------------------------------------------------------------------------- */
/* BUTTON STYLES                                                              */
/* -------------------------------------------------------------------------- */

const lightGreenButton =
  "bg-[#D5E2D0] text-[#183F2A] border border-[#BFD0BA] shadow-[0_10px_28px_rgba(24,63,42,.10)] transition-all hover:bg-[#C7D8C1] hover:text-[#183F2A] hover:shadow-[0_14px_35px_rgba(24,63,42,.16)]";

const softGreenButton =
  "bg-[#E7EEE3] text-[#183F2A] border border-[#C9D9C4] shadow-none transition-all hover:bg-[#D5E2D0] hover:text-[#183F2A]";

const darkGreenButton =
  "bg-[#183F2A] text-white shadow-[0_8px_25px_rgba(24,63,42,.15)] transition-all hover:bg-[#10301F] hover:text-white hover:shadow-[0_10px_30px_rgba(24,63,42,.22)]";

/* -------------------------------------------------------------------------- */
/* HARVEST MARQUEE                                                            */
/* -------------------------------------------------------------------------- */

function HarvestMarquee() {
  const words = [
    ["☀", "HARVESTED BY THE SUN"],
    ["☾", "BLESSED BY THE MOON"],
    ["🌱", "GROWN WITH CARE"],
    ["♡", "SHARED WITH TRUST"],
  ];

  return (
    <section className="overflow-hidden border-y border-[#DCE4D8] bg-[#FCFAF4] py-5">
      <motion.div
        className="flex w-max items-center"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(4)].flatMap((_, repeatIndex) =>
          words.map(([icon, word]) => (
            <div
              key={`${repeatIndex}-${word}`}
              className="flex items-center"
            >
              <span className="mr-3 text-sm text-[#A76545]">
                {icon}
              </span>

              <span className="whitespace-nowrap text-[11px] font-semibold tracking-[0.28em] text-[#28583B] sm:text-xs">
                {word}
              </span>

              <span className="mx-7 text-[#C6A15B] sm:mx-10">
                ✦
              </span>
            </div>
          )),
        )}
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION LABEL                                                              */
/* -------------------------------------------------------------------------- */

function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`text-xs font-semibold uppercase tracking-[0.24em] ${
        light ? "text-[#C9D9C4]" : "text-[#A76545]"
      }`}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [area, setArea] = useState("");

  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 70],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 0.78],
  );

  const navItems = [
    ["Home", "#home"],
    ["Today's Fresh List", "#fresh"],
    ["Fresh Baskets", "#products"],
    ["Share Your Harvest", "/share-your-harvest"],
    ["About Us", "/about"],
  ];

  return (
    <main className="min-h-screen bg-[#F8F5EC] text-[#203128]">
      {/* ------------------------------------------------------------------ */}
      {/* ACCESSIBILITY                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="sr-only focus-within:not-sr-only">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 shadow-xl"
        >
          Skip to Main Content
        </a>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ANNOUNCEMENT                                                        */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial={{
          y: -40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="bg-[#183F2A] px-4 py-2.5 text-center text-[11px] font-medium tracking-wide text-[#F5F1E6]"
      >
        Fresh availability is updated every morning · Local harvests only
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* NAVBAR                                                              */}
      {/* ------------------------------------------------------------------ */}

      <header className="sticky top-0 z-50 border-b border-[#DCE4D8]/80 bg-[#F8F5EC]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between px-5 lg:px-8">
          {/* LOGO */}

          <Link
            href="/"
            className="group flex items-center gap-3.5"
          >
            <motion.div
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#D8E6D5]"
            >
              <Image
            src="/amruta-dhaanya-logo.png"
            alt="Amruta Dhaanya"
            width={48}
            height={48}
            className="h-full w-full object-contain p-1"
            />
            </motion.div>

            <div>
              <div className="text-[17px] font-bold tracking-[-0.02em] text-[#183F2A]">
                AMRUTA DHAANYA™
              </div>

              <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.23em] text-[#738B72]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="relative text-[13px] font-medium text-[#34483B] transition-colors hover:text-[#A76545]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}

          <div className="hidden items-center gap-3 lg:flex">
            <AccountMenu />

            <Button
              className={`h-10 rounded-full px-5 text-sm font-semibold ${darkGreenButton}`}
              asChild
            >
              <Link href="/cart">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart
              </Link>
            </Button>
          </div>

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 text-[#183F2A] lg:hidden"
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE NAV */}

        {menuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            className="border-t border-[#DCE4D8] bg-[#F8F5EC] px-5 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {navItems.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-[#203128]"
                >
                  {label}
                </Link>
              ))}

              <div className="border-t border-[#DCE4D8] pt-5">
                <AccountMenu />
              </div>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="font-semibold text-[#183F2A]"
              >
                <ShoppingBag className="mr-2 inline h-4 w-4" />
                Cart
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <div id="main-content">
        {/* ---------------------------------------------------------------- */}
        {/* HERO                                                              */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="home"
          className="relative overflow-hidden bg-[#F8F5EC]"
        >
          <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#E7EEE3] blur-3xl" />

          <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#F1E7CC]/50 blur-3xl" />

          <motion.div
            style={{
              y: heroY,
              opacity: heroOpacity,
            }}
            className="relative mx-auto grid min-h-[700px] max-w-[1320px] items-center gap-14 px-5 py-20 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:py-24"
          >
            {/* HERO COPY */}

            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <Badge className="rounded-full border border-[#D8E4D2] bg-[#E7EEE3] px-4 py-2 text-[#28583B] shadow-none">
                  <Sprout className="mr-2 h-4 w-4" />
                  Fresh from local growers
                </Badge>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.75,
                }}
                className="mt-7 max-w-3xl text-[48px] font-semibold leading-[1.01] tracking-[-0.055em] text-[#183F2A] sm:text-6xl lg:text-[76px]"
              >
                Pure food.
                <br />
                Honest farming.
                <br />
                <span className="text-[#A76545]">
                  A healthier tomorrow.
                </span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.24,
                  duration: 0.7,
                }}
                className="mt-7 max-w-xl text-[17px] leading-8 text-[#68766C]"
              >
                Amruta Dhaanya connects families with
                traditional foods sourced directly from
                growers we know by name — no warehouses,
                no anonymous sellers, only what is
                genuinely available today.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.4,
                }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  size="lg"
                  className={`h-[52px] rounded-full px-7 font-semibold ${lightGreenButton}`}
                  asChild
                >
                  <Link href="#products">
                    Explore Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className={`h-[52px] rounded-full px-7 font-semibold ${softGreenButton}`}
                  asChild
                >
                  <Link href="#growers">
                    Become a Grower
                  </Link>
                </Button>
              </motion.div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-[#68766C]">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E7EEE3]">
                    <Check className="h-3 w-3 text-[#28583B]" />
                  </span>
                  Verified growers
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E7EEE3]">
                    <Check className="h-3 w-3 text-[#28583B]" />
                  </span>
                  Checked before listing
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E7EEE3]">
                    <Check className="h-3 w-3 text-[#28583B]" />
                  </span>
                  Confirmed before payment
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
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
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative rounded-[42px] bg-[#E5ECDD] p-4 shadow-[0_35px_100px_rgba(24,63,42,.14)]"
              >
                <div className="relative min-h-[500px] overflow-hidden rounded-[34px] bg-[#D5E1CF] p-7">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/40" />

                  <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/30" />

                  <div className="relative flex items-center justify-between">
                    <Badge className="rounded-full border border-white/60 bg-white/80 px-4 py-2 text-[#28583B] shadow-none backdrop-blur">
                      Today&apos;s harvest
                    </Badge>

                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="text-3xl"
                    >
                      🌾
                    </motion.div>
                  </div>

                  <div className="relative flex min-h-[385px] flex-col items-center justify-center">
                    <div className="flex items-center gap-4 text-7xl sm:gap-6 sm:text-8xl">
                      <motion.span
                        animate={{
                          y: [0, -12, 0],
                        }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                        }}
                      >
                        🥬
                      </motion.span>

                      <motion.span
                        animate={{
                          y: [0, 10, 0],
                        }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                        }}
                      >
                        🌾
                      </motion.span>

                      <motion.span
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                        }}
                      >
                        🍎
                      </motion.span>
                    </div>

                    <h2 className="mt-8 text-center text-4xl font-semibold tracking-[-0.04em] text-[#183F2A]">
                      Grown nearby.
                    </h2>

                    <p className="mt-3 text-center text-base text-[#617268]">
                      Selected carefully. Shared honestly.
                    </p>
                  </div>

                  <div className="relative grid grid-cols-3 gap-3">
                    {[
                      ["✓", "Verified"],
                      ["🌱", "Local"],
                      ["♡", "Trusted"],
                    ].map(([icon, label]) => (
                      <motion.div
                        key={label}
                        whileHover={{
                          y: -4,
                        }}
                        className="rounded-2xl border border-white/60 bg-white/75 p-4 text-center shadow-sm backdrop-blur"
                      >
                        <div className="text-xl">
                          {icon}
                        </div>

                        <div className="mt-1 text-xs font-medium text-[#50665A]">
                          {label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD */}

              <motion.div
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-7 -left-5 hidden rounded-2xl border border-[#DCE4D8] bg-[#FCFAF4] p-4 shadow-[0_18px_45px_rgba(24,63,42,.13)] sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1E7CC]">
                    <Leaf className="h-5 w-5 text-[#A76545]" />
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-[#183F2A]">
                      Local harvest
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#738078]">
                      Available today
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* MARQUEE                                                           */}
        {/* ---------------------------------------------------------------- */}

        <HarvestMarquee />

        {/* ---------------------------------------------------------------- */}
        {/* TRUST STRIP                                                       */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-b border-[#DCE4D8] bg-[#FCFAF4]">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-[#DCE4D8] px-5 py-8 sm:grid-cols-4 lg:px-8">
            {trustItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
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
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E7EEE3]">
                    <Icon className="h-5 w-5 text-[#28583B]" />
                  </div>

                  <div>
                    <div className="text-xs font-bold text-[#203128] sm:text-sm">
                      {item.title}
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#77827B] sm:text-xs">
                      {item.text}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SEARCH                                                             */}
        {/* ---------------------------------------------------------------- */}

        <section className="bg-[#F8F5EC] px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-[920px] text-center">
            <motion.div
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
            >
              <SectionLabel>
                Find what you need
              </SectionLabel>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#183F2A] sm:text-5xl">
                What are you looking for today?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[#68766C]">
                Explore what local growers and producers
                have genuinely available today.
              </p>

              <div className="relative mx-auto mt-9 max-w-2xl">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B978D]" />

                <Input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search vegetables, fruits, groceries..."
                  className="h-16 rounded-full border-[#D8E2D3] bg-white pl-14 pr-28 text-base shadow-[0_15px_45px_rgba(24,63,42,.07)] focus-visible:ring-[#28583B]"
                />

                <Button
                  className="absolute right-2 top-2 h-12 rounded-full bg-[#D5E2D0] px-6 font-semibold text-[#183F2A] shadow-sm hover:bg-[#C7D8C1] hover:text-[#183F2A]"
                  onClick={() => {
                    document
                      .getElementById("products")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                >
                  Search
                </Button>
              </div>

              {search && (
                <p className="mt-4 text-sm text-[#718078]">
                  Showing fresh products for{" "}
                  <span className="font-semibold text-[#28583B]">
                    &quot;{search}&quot;
                  </span>
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CATEGORIES                                                        */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="fresh"
          className="bg-[#F8F5EC] px-5 pb-28 lg:px-8"
        >
          <div className="mx-auto max-w-[1320px]">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <SectionLabel>Browse</SectionLabel>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#183F2A] sm:text-4xl">
                  Fresh categories
                </h2>
              </div>

              <Link
                href="#products"
                className="hidden items-center text-sm font-semibold text-[#A76545] sm:flex"
              >
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 20,
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
                  whileHover={{
                    y: -7,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="group rounded-[26px] border border-[#DCE4D8] bg-[#FCFAF4] p-5 text-center shadow-[0_6px_25px_rgba(24,63,42,.035)] transition-all hover:border-[#C7D5C2] hover:shadow-[0_18px_40px_rgba(24,63,42,.09)]"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7EEE3] text-3xl transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>

                  <div className="mt-4 text-sm font-semibold text-[#304237]">
                    {category.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PRODUCTS / FRESH BASKETS                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="products"
          className="relative overflow-hidden bg-[#E7EEE3] px-5 py-28 lg:px-8"
        >
          <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-white/30 blur-3xl" />

          <div className="relative mx-auto max-w-[1320px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <SectionLabel>
                  Our collection
                </SectionLabel>

                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#183F2A] sm:text-5xl">
                  Food with a story.
                </h2>

                <p className="mt-4 max-w-2xl text-[#68766C]">
                  Traditional foods sourced directly from
                  the growers and producers we work with.
                </p>
              </div>

              <Button
                variant="outline"
                className={`w-fit rounded-full ${softGreenButton}`}
                asChild
              >
                <Link href="#fresh">
                  View Fresh List
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {products.map((product, index) => {
                const accent =
                  product.accent === "gold"
                    ? {
                        bg: "#F1E7CC",
                        text: "#8B6B35",
                      }
                    : product.accent === "terracotta"
                      ? {
                          bg: "#F2E1D8",
                          text: "#8D533A",
                        }
                      : {
                          bg: "#D5E2D0",
                          text: "#28583B",
                        };

                return (
                  <motion.div
                    key={product.slug}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.12,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                  >
                    <Card className="group overflow-hidden rounded-[30px] border-[#D6E0D2] bg-[#FCFAF4] shadow-[0_8px_35px_rgba(24,63,42,.055)] transition-shadow hover:shadow-[0_20px_55px_rgba(24,63,42,.12)]">
                      <Link
                        href={`/products/${product.slug}`}
                      >
                        <div
                          className="relative flex h-72 items-center justify-center overflow-hidden"
                          style={{
                            backgroundColor: accent.bg,
                          }}
                        >
                          <motion.div
                            whileHover={{
                              scale: 1.15,
                              rotate: 5,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="text-8xl"
                          >
                            {product.emoji}
                          </motion.div>

                          <Badge
                            className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/80 shadow-none backdrop-blur"
                            style={{
                              color: accent.text,
                            }}
                          >
                            Local harvest
                          </Badge>
                        </div>
                      </Link>

                      <CardContent className="p-7">
                        <Link
                          href={`/products/${product.slug}`}
                        >
                          <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#203128] transition-colors hover:text-[#A76545]">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#6B796F]">
                          {product.description}
                        </p>

                        <div className="mt-7 flex items-end justify-between">
                          <div>
                            <span className="text-2xl font-semibold text-[#183F2A]">
                              {product.price}
                            </span>

                            <span className="ml-1 text-sm text-[#7A857D]">
                              {product.unit}
                            </span>
                          </div>

                          <Button
                            size="icon"
                            className="h-11 w-11 rounded-full bg-[#183F2A] text-white shadow-md transition-transform group-hover:scale-110 hover:bg-[#10301F] hover:text-white"
                            asChild
                          >
                            <Link
                              href={`/products/${product.slug}`}
                              aria-label={`View ${product.name}`}
                            >
                              <ShoppingBag className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PURPOSE / ABOUT                                                   */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="about"
          className="bg-[#F8F5EC] px-5 py-28 lg:px-8"
        >
          <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <Badge className="rounded-full border border-[#D8E4D2] bg-[#E7EEE3] text-[#28583B] shadow-none">
                Why we started
              </Badge>

              <h2 className="mt-6 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#183F2A] sm:text-5xl">
                A better way for local harvests to reach nearby homes.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#66756B]">
                Many local growers face waste, unstable
                pricing, and limited access to nearby
                households. Amruta Dhaanya was started to
                build a more trustworthy and responsible
                local fresh-food network for both growers
                and families.
              </p>

              <Button
                className={`mt-8 rounded-full px-6 font-semibold ${lightGreenButton}`}
                asChild
              >
                <Link href="/about">
                  About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[42px] bg-[#183F2A] p-8 text-white shadow-[0_25px_70px_rgba(24,63,42,.18)] sm:p-12">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

                <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full border border-white/10" />

                <div className="relative">
                  <div className="text-6xl">
                    🌱
                  </div>

                  <p className="mt-8 text-xs font-medium uppercase tracking-[0.22em] text-[#C9D9C4]">
                    Ahaar Kutumbam
                  </p>

                  <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
                    Every home can grow.
                    <br />
                    Every harvest has value.
                  </h3>

                  <p className="mt-6 max-w-lg leading-7 text-[#C8D9C4]">
                    A community of growers, local agents and
                    families participating in one transparent,
                    trust-based marketplace.
                  </p>

                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {[
                      ["Growers", "Local"],
                      ["Families", "Connected"],
                      ["Harvests", "Valued"],
                    ].map(([title, subtitle]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm"
                      >
                        <div className="text-sm font-bold">
                          {title}
                        </div>

                        <div className="mt-1 text-[10px] uppercase tracking-wider text-[#B8D3AD]">
                          {subtitle}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* HONESTY                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section className="bg-[#F0EEE3] px-5 py-28 lg:px-8">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl">
              <SectionLabel>
                How we keep it honest
              </SectionLabel>

              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#183F2A] sm:text-5xl">
                Real availability. Private sellers. Nothing promised until it&apos;s confirmed.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#66756B]">
                We don&apos;t stock a warehouse and we don&apos;t
                promise everything, every day. Every item
                comes from a registered local seller, is
                checked for basic freshness before it&apos;s
                listed, and is confirmed with you before
                anything is processed or paid for.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {[
                [
                  "01",
                  "Registered Seller Codes",
                  "Every local seller is assigned a private service code. Their identity stays protected, and every order stays traceable.",
                ],
                [
                  "02",
                  "Checked Before Listing",
                  "Poor-quality or damaged items simply aren&apos;t listed. What&apos;s available is what genuinely passed a basic freshness check.",
                ],
                [
                  "03",
                  "Confirmed Before Payment",
                  "We confirm stock, final price and delivery with you first. If something isn't available, you'll know before you pay.",
                ],
                [
                  "04",
                  "Not Quick Commerce",
                  "We're not built for instant delivery. We're built to get it right — careful sourcing, handling and delivery.",
                ],
              ].map(([number, title, text], index) => (
                <motion.div
                  key={number}
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
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-[28px] border border-[#D8E1D4] bg-[#FCFAF4] p-7 shadow-[0_7px_25px_rgba(24,63,42,.04)]"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-sm font-bold text-[#A76545]">
                      {number}
                    </span>

                    <div>
                      <h3 className="text-xl font-semibold text-[#203128]">
                        {title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-[#6B786F]">
                        {text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* HOW IT WORKS                                                      */}
        {/* ---------------------------------------------------------------- */}

        <section className="bg-[#F8F5EC] px-5 py-28 lg:px-8">
          <div className="mx-auto max-w-[1320px]">
            <div className="text-center">
              <SectionLabel>
                Simple by design
              </SectionLabel>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#183F2A] sm:text-5xl">
                How it works
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[#68766C]">
                A simple process built around real availability
                and honest confirmation.
              </p>
            </div>

            <div className="relative mt-16 grid gap-12 md:grid-cols-3">
              <div className="absolute left-[17%] right-[17%] top-10 hidden h-px bg-[#D5DFD1] md:block" />

              {[
                [
                  "01",
                  Search,
                  "Browse & Order",
                  "Choose from today&apos;s available products or select a planned weekly basket.",
                ],
                [
                  "02",
                  Check,
                  "We Confirm",
                  "Stock, final price and delivery are confirmed before you're charged.",
                ],
                [
                  "03",
                  Truck,
                  "Delivered Fresh",
                  "Your order is handled carefully from grower to your door.",
                ],
              ].map(([number, Icon, title, text], index) => {
                const StepIcon = Icon as typeof Search;

                return (
                  <motion.div
                    key={number as string}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.15,
                    }}
                    className="relative text-center"
                  >
                    <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#F8F5EC] bg-[#E7EEE3] text-[#28583B] shadow-[0_5px_20px_rgba(24,63,42,.08)]">
                      <StepIcon className="h-7 w-7" />
                    </div>

                    <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A76545]">
                      {number as string}
                    </div>

                    <h3 className="mt-2 text-2xl font-semibold text-[#203128]">
                      {title as string}
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#6B786F]">
                      {text as string}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* DELIVERY                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section className="bg-[#F8F5EC] px-5 pb-28 lg:px-8">
          <div className="mx-auto max-w-[1320px]">
            <motion.div
              whileHover={{
                scale: 1.005,
              }}
              className="overflow-hidden rounded-[40px] bg-[#E3EBDD] shadow-[0_12px_45px_rgba(24,63,42,.06)]"
            >
              <div className="grid lg:grid-cols-2">
                {/* LEFT SIDE */}

                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FCFAF4] text-[#28583B]">
                    <MapPin />
                  </div>

                  <h2 className="mt-7 max-w-lg text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#183F2A]">
                    Not sure if we deliver to your area?
                  </h2>

                  <p className="mt-5 max-w-lg leading-7 text-[#617268]">
                    We are currently testing delivery and
                    pickup support in selected areas of
                    Warangal, Hanamkonda, Kazipet and
                    nearby local communities.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={area}
                      onChange={(e) =>
                        setArea(e.target.value)
                      }
                      placeholder="Enter your area or pincode"
                      className="h-12 rounded-full border-white bg-white focus-visible:ring-[#28583B]"
                    />

                    <Button
                      type="button"
                      className="h-12 shrink-0 rounded-full bg-[#183F2A] px-6 text-white transition-all hover:bg-[#28583B]"
                      onClick={() => {
                        const phoneNumber = "919177751088";

                        const message = area.trim()
                          ? `Hi Amruta Dhaanya, I would like to check delivery availability for ${area.trim()}.`
                          : "Hi Amruta Dhaanya, I would like to check delivery availability in my area.";

                        const whatsappUrl =
                          `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

                        window.location.href = whatsappUrl;
                      }}
                    >
                      Check on WhatsApp
                    </Button>
                  </div>

                  <p className="mt-3 text-xs text-[#748279]">
                    We&apos;ll open WhatsApp with your area filled
                    in — just hit send.
                  </p>
                </div>

                {/* RIGHT SIDE */}

                <div className="relative min-h-[380px] overflow-hidden bg-[#CBDABE]">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                    }}
                    className="absolute inset-10 rounded-[30px] border border-white/50 bg-white/20"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl">
                        📍
                      </div>

                      <div className="mt-4 text-2xl font-semibold text-[#345E3C]">
                        Warangal
                      </div>

                      <div className="mt-1 text-sm text-[#617968]">
                        Hanamkonda · Kazipet · Nearby
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* GROWERS                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="growers"
          className="relative overflow-hidden bg-[#183F2A] px-5 py-28 text-white lg:px-8"
        >
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-white/[0.06]" />

          <div className="pointer-events-none absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

          <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <Badge className="border border-white/10 bg-white/[0.08] text-[#C8D9C4] shadow-none">
                For local harvest households
              </Badge>

              <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl">
                If your harvest is small, it can still have value.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#C9D9C5]">
                Many homes, terrace gardens, backyard
                growers and local growing families may have
                limited but useful harvests. Amruta Dhaanya
                creates a simple path for genuine local
                supply to reach nearby households.
              </p>

              <Button
                size="lg"
                className="mt-8 h-[52px] rounded-full bg-[#D5E2D0] px-7 font-semibold text-[#183F2A] shadow-lg hover:bg-[#C7D8C1] hover:text-[#183F2A]"
                asChild
              >
                <Link href="/share-your-harvest">
                  Register as a Grower
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="flex h-48 w-48 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-8xl shadow-[0_20px_60px_rgba(0,0,0,.15)]"
            >
              🌾
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                               */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="faq"
          className="bg-[#F8F5EC] px-5 py-28 lg:px-8"
        >
          <div className="mx-auto max-w-[920px]">
            <div className="text-center">
              <SectionLabel>
                Questions
              </SectionLabel>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#183F2A] sm:text-5xl">
                Frequently asked questions
              </h2>

              <p className="mt-4 text-[#6C796F]">
                Everything you need to know about ordering
                from Amruta Dhaanya.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="mt-12 rounded-[28px] border border-[#DCE4D8] bg-[#FCFAF4] px-6 shadow-[0_10px_35px_rgba(24,63,42,.04)] sm:px-8"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-[#DCE4D8]"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-semibold text-[#203128] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 text-sm leading-7 text-[#68766D]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}

      <footer className="bg-[#10301F] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-12 md:grid-cols-[1.6fr_.7fr_.7fr]">
            {/* BRAND */}

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-white/20">
                  <Image
                  src="/amruta-dhaanya-logo.png"
                  alt="Amruta Dhaanya"
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-1"
                />
                </div>

                <div>
                  <div className="text-xl font-semibold tracking-tight">
                    Amruta Dhaanya
                  </div>

                  <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-[#A9BFA9]">
                    An Ahaar Kutumbam Initiative
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#B7C4B9]">
                Fresh, traditional food sourced directly
                from growers — selected carefully, handled
                honestly and shared through a trusted local
                network.
              </p>

              <div className="mt-7 space-y-2 text-sm text-[#B7C4B9]">
                <div>
                  Phone: +91 9177751088
                </div>

                <div>
                  Email: amrutadhaanya@gmail.com
                </div>

                <div>
                  Location: Vangapahad, Warangal,
                  Telangana 506006
                </div>
              </div>
            </div>

            {/* EXPLORE */}

            <div>
              <h3 className="text-sm font-semibold text-white">
                Explore
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#B7C4B9]">
                <Link
                  href="#home"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="#fresh"
                  className="transition-colors hover:text-white"
                >
                  Today&apos;s Fresh List
                </Link>

                <Link
                  href="#products"
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
                  href="#about"
                  className="transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* TRUST */}

            <div>
              <h3 className="text-sm font-semibold text-white">
                Trust
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#B7C4B9]">
                <Link
                  href="/Participate"
                  className="transition-colors hover:text-white"
                >
                  Participate
                </Link>

                <Link
                  href="/share-your-harvest"
                  className="transition-colors hover:text-white"
                >
                  Become a Grower
                </Link>

                <Link
                  href="/FAQ"
                  className="transition-colors hover:text-white"
                >
                  FAQ
                </Link>

                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>

                <Link
                  href="/legal"
                  className="transition-colors hover:text-white"
                >
                  Legal & Policies
                </Link>

                <Link
                  href="/cart"
                  className="transition-colors hover:text-white"
                >
                  Cart
                </Link>

                <Link
                  href="/login"
                  className="transition-colors hover:text-white"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}

          <div className="mt-14 border-t border-white/10 pt-7">
            <div className="flex flex-col justify-between gap-3 text-xs text-[#899A8D] sm:flex-row">
              <div>
                © 2026 Amruta Dhaanya. All rights reserved.
              </div>

              <div>
                A trusted local harvest network built around
                real daily availability and community care.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}