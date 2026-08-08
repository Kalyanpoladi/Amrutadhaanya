"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ArrowRight,
  Check,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  Sprout,
  Truck,
  X,
  ShieldCheck,
} from "lucide-react";

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
    name: "Traditional Rice",
    description:
      "Naturally grown, hand-selected rice sourced directly from growers we work with regularly.",
    price: "₹120",
    unit: "/ kg",
    emoji: "🌾",
  },
  {
    name: "Traditional Millets",
    description:
      "Traditional grains grown with care and brought to nearby families through our local network.",
    price: "₹150",
    unit: "/ kg",
    emoji: "🌾",
  },
  {
    name: "Cold-Pressed Oils",
    description:
      "Slow-extracted using traditional methods — no heat, no chemicals, no shortcuts.",
    price: "₹280",
    unit: "/ litre",
    emoji: "🫒",
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
    question: "How do I know the products are genuinely traditional?",
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
/* HOME                                                                       */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 0.7]
  );

  const whatsappNumber = "919177751088";

  const openWhatsApp = (customMessage?: string) => {
    const message =
      customMessage ||
      (search
        ? `Hello Amruta Dhaanya, I would like to check availability for: ${search}`
        : "Hello Amruta Dhaanya, I would like to check today's fresh availability.");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* ACCESSIBILITY                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="sr-only focus-within:not-sr-only">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] rounded-lg bg-white px-4 py-3 shadow-lg"
        >
          Skip to Main Content
        </a>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* ANNOUNCEMENT                                                       */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#234f32] px-4 py-2.5 text-center text-sm font-medium text-white"
      >
        🌱 Fresh availability updated every morning.
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* NAVBAR                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/90 backdrop-blur-xl">
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

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-[#344b3a] transition-colors hover:text-[#477d45]"
            >
              Home
            </Link>

            <Link
              href="#fresh"
              className="text-sm font-medium text-[#344b3a] transition-colors hover:text-[#477d45]"
            >
              Today's Fresh List
            </Link>

            <Link
              href="#baskets"
              className="text-sm font-medium text-[#344b3a] transition-colors hover:text-[#477d45]"
            >
              Fresh Baskets
            </Link>

            <Link
              href="/share-your-harvest"
              className="text-sm font-medium text-[#344b3a] transition-colors hover:text-[#477d45]"
            >
              Share Your Harvest
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-[#344b3a] transition-colors hover:text-[#477d45]"
            >
              About Us
            </Link>
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Button
              variant="outline"
              className="rounded-full border-[#376540] bg-transparent px-6 text-[#2e5b39] hover:bg-[#e9f0e5]"
            >
              Login
            </Button>

            <Button
              className="rounded-full bg-[#2d6339] px-6 shadow-lg shadow-[#244d2f]/10 hover:bg-[#214e2d]"
              asChild
            >
              <Link href="/cart">
                <ShoppingBag className="h-4 w-4" />
                Cart
              </Link>
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-full p-2 lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}

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
            className="border-t border-[#dfe5d8] bg-[#f8f7f1] px-5 py-5 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-medium"
              >
                Home
              </Link>

              <Link
                href="#fresh"
                onClick={() => setMenuOpen(false)}
                className="font-medium"
              >
                Today's Fresh List
              </Link>

              <Link
                href="#baskets"
                onClick={() => setMenuOpen(false)}
                className="font-medium"
              >
                Fresh Baskets
              </Link>

              <Link
                href="/share-your-harvest"
                onClick={() => setMenuOpen(false)}
                className="font-medium"
              >
                Share Your Harvest
              </Link>

              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="font-medium"
              >
                About Us
              </Link>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
                className="font-medium"
              >
                Cart
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      <div id="main-content">
        {/* ---------------------------------------------------------------- */}
        {/* HERO                                                             */}
        {/* ---------------------------------------------------------------- */}

        <section id="home" className="relative">
          <motion.div
            style={{
              y: heroY,
              opacity: heroOpacity,
            }}
            className="mx-auto grid min-h-[690px] max-w-[1280px] items-center gap-12 px-5 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-24"
          >
            <div>
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
                  duration: 0.6,
                }}
              >
                <Badge className="rounded-full border-0 bg-[#e7f0e1] px-4 py-2 text-[#32633c]">
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
                  delay: 0.12,
                  duration: 0.7,
                }}
                className="mt-7 max-w-3xl text-5xl font-bold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[76px]"
              >
                Pure food.
                <br />
                Honest farming.
                <br />
                <span className="text-[#70965b]">
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
                  delay: 0.25,
                  duration: 0.7,
                }}
                className="mt-7 max-w-2xl text-lg leading-8 text-[#61716a]"
              >
                Amruta Dhaanya connects families with traditional
                foods sourced directly from growers we know by name —
                no warehouses, no anonymous sellers, only what's
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
                <Link
                  href="#products"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "rounded-full bg-[#2d6339] px-7 shadow-lg shadow-[#2d6339]/15 hover:bg-[#214e2d]",
                  })}
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/share-your-harvest"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "rounded-full border-[#376540] bg-transparent px-7 text-[#2e5b39]",
                  })}
                >
                  Become a Grower
                </Link>
              </motion.div>
            </div>

            {/* HERO CARD */}

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
                className="relative rounded-[38px] bg-[#e4eddc] p-5 shadow-[0_30px_80px_rgba(44,76,49,.12)]"
              >
                <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-[#d8e5cf] p-7">
                  <div className="flex items-center justify-between">
                    <Badge className="rounded-full bg-white/90 px-4 py-2 text-[#35613e]">
                      Today's harvest
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

                  <div className="flex min-h-[340px] flex-col items-center justify-center">
                    <div className="flex items-center gap-5 text-7xl">
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

                    <h2 className="mt-7 text-center text-4xl font-bold tracking-tight text-[#2e6139]">
                      Grown nearby.
                    </h2>

                    <p className="mt-3 text-center text-lg text-[#66806b]">
                      Selected carefully. Shared honestly.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
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
                        className="rounded-2xl bg-white/85 p-4 text-center"
                      >
                        <div className="text-xl">{icon}</div>

                        <div className="mt-1 text-sm text-[#50665a]">
                          {label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* HARVESTED BY SUN / MOON                                          */}
        {/* ---------------------------------------------------------------- */}

        <section className="relative overflow-hidden border-y border-[#dce5d8] bg-[#f3f6ee] py-12">
          <motion.div
            animate={{
              x: ["-30%", "130%"],
              opacity: [0, 0.35, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-0 top-1/2 h-40 w-96 -translate-y-1/2 rounded-full bg-[#e3b34b] blur-3xl"
          />

          <motion.div
            animate={{
              x: ["130%", "-30%"],
              opacity: [0, 0.25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="pointer-events-none absolute right-0 top-1/2 h-40 w-96 -translate-y-1/2 rounded-full bg-[#70965b] blur-3xl"
          />

          <div className="relative mx-auto flex min-h-[130px] max-w-[1280px] items-center justify-center px-5 lg:px-8">
            <div className="flex w-full items-center justify-center gap-5 sm:gap-8">
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
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e3b34b]/20 text-3xl sm:h-16 sm:w-16 sm:text-4xl"
              >
                ☀️
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="relative min-w-0 text-center"
              >
                <motion.div
                  animate={{
                    opacity: [1, 0, 0, 1],
                    y: [0, -5, 8, 0],
                    scale: [1, 0.96, 1.02, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    times: [0, 0.42, 0.58, 1],
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#78916e] sm:text-xs">
                    From nature to your home
                  </div>

                  <h2 className="mt-2 text-xl font-bold tracking-[0.06em] text-[#2e6139] sm:text-2xl md:text-3xl">
                    HARVESTED BY THE SUN,
                    <br className="sm:hidden" />
                    <span className="mx-2 text-[#9a8150]">
                      BLESSED BY THE MOON
                    </span>
                  </h2>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -7, 0],
                  rotate: [-5, 5, -5],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dfe5ee] text-3xl sm:h-16 sm:w-16 sm:text-4xl"
              >
                🌙
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            {["🌾", "🌿", "🍃", "🌾", "🌿", "🍃"].map(
              (item, index) => (
                <motion.span
                  key={`${item}-${index}`}
                  initial={{
                    left: `${index * 18 - 10}%`,
                    top: index % 2 === 0 ? "15%" : "65%",
                    opacity: 0,
                  }}
                  animate={{
                    left: ["-5%", "105%"],
                    top:
                      index % 2 === 0
                        ? ["15%", "70%"]
                        : ["70%", "15%"],
                    opacity: [0, 0.5, 0],
                    rotate: [0, 30, -20, 0],
                  }}
                  transition={{
                    duration: 10 + index * 1.5,
                    repeat: Infinity,
                    delay: index * 1.2,
                    ease: "linear",
                  }}
                  className="absolute text-xl"
                >
                  {item}
                </motion.span>
              )
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* TRUST STRIP                                                      */}
        {/* ---------------------------------------------------------------- */}

        <section className="border-y border-[#dce5d8] bg-white/60">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-x divide-[#dce5d8] px-5 py-7 sm:grid-cols-4 lg:px-8">
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f0e3]">
                    <Icon className="h-5 w-5 text-[#47744b]" />
                  </div>

                  <div>
                    <div className="text-sm font-bold">
                      {item.title}
                    </div>

                    <div className="text-xs text-[#77827b]">
                      {item.text}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* SEARCH                                                            */}
        {/* ---------------------------------------------------------------- */}

        <section className="px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-[900px] text-center">
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                Find what you need
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                What are you looking for today?
              </h2>

              <div className="relative mx-auto mt-8 max-w-2xl">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b978d]" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      openWhatsApp();
                    }
                  }}
                  placeholder="Search vegetables, fruits, groceries..."
                  className="h-16 rounded-full border-[#d8e2d3] bg-white pl-14 pr-28 text-base shadow-[0_12px_40px_rgba(38,70,45,.06)]"
                />

                <Button
                  onClick={() => openWhatsApp()}
                  className="absolute right-2 top-2 rounded-full bg-[#2d6339] px-6 hover:bg-[#214e2d]"
                >
                  Search
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CATEGORIES                                                        */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="fresh"
          className="px-5 pb-24 lg:px-8"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                  Browse
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Fresh categories
                </h2>
              </div>

              <Link
                href="#products"
                className="hidden items-center text-sm font-semibold text-[#477047] sm:flex"
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
                  onClick={() => {
                    setSearch(category.name);

                    document
                      .getElementById("products")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="group rounded-3xl border border-[#dde6d8] bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#345e3c]/10"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3e9] text-3xl transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>

                  <div className="mt-4 text-sm font-semibold">
                    {category.name}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PRODUCTS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="products"
          className="bg-[#eef3e9] px-5 py-24 lg:px-8"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                  Our collection
                </p>

                <h2 className="mt-2 text-4xl font-bold tracking-tight">
                  Food with a story.
                </h2>

                <p className="mt-3 max-w-2xl text-[#68786d]">
                  Traditional foods sourced directly from the
                  growers and producers we work with.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-fit rounded-full border-[#4c7752]"
                onClick={() =>
                  openWhatsApp(
                    "Hello Amruta Dhaanya, I would like to see today's fresh list."
                  )
                }
              >
                View Fresh List
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
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
                  <Card className="group overflow-hidden rounded-[28px] border-[#dce6d7] bg-[#fbfcf8] shadow-sm">
                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#e2eadb]">
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

                      <Badge className="absolute left-5 top-5 rounded-full bg-white/90 text-[#35613e]">
                        Local harvest
                      </Badge>
                    </div>

                    <CardContent className="p-7">
                      <h3 className="text-2xl font-bold">
                        {product.name}
                      </h3>

                      <p className="mt-3 min-h-[72px] leading-6 text-[#6b796f]">
                        {product.description}
                      </p>

                      <div className="mt-6 flex items-end justify-between">
                        <div>
                          <span className="text-2xl font-bold">
                            {product.price}
                          </span>

                          <span className="ml-1 text-sm text-[#7a857d]">
                            {product.unit}
                          </span>
                        </div>

                        <Button
                          size="icon"
                          className="rounded-full bg-[#2d6339] transition-transform group-hover:scale-110 hover:bg-[#214e2d]"
                          onClick={() =>
                            openWhatsApp(
                              `Hello Amruta Dhaanya, I would like to check availability for ${product.name}.`
                            )
                          }
                          aria-label={`Request ${product.name}`}
                        >
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PURPOSE                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="about"
          className="px-5 py-28 lg:px-8"
        >
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-2 lg:items-center">
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
              <Badge className="rounded-full bg-[#e8f0e3] text-[#38633e]">
                Why we started
              </Badge>

              <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                A better way for local harvests to reach nearby
                homes.
              </h2>

              <p className="mt-6 text-lg leading-8 text-[#66756b]">
                Many local growers face waste, unstable pricing,
                and limited access to nearby households. Amruta
                Dhaanya was started to build a more trustworthy and
                responsible local fresh-food network for both
                growers and families.
              </p>

              <Button
                className="mt-8 rounded-full bg-[#2d6339] hover:bg-[#214e2d]"
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
              <div className="rounded-[40px] bg-[#244f31] p-8 text-white sm:p-12">
                <div className="text-6xl">🌱</div>

                <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-[#b8d3ad]">
                  Ahaar Kutumbam
                </p>

                <h3 className="mt-3 text-4xl font-bold">
                  Every home can grow.
                  <br />
                  Every harvest has value.
                </h3>

                <p className="mt-6 leading-7 text-[#c8d9c4]">
                  A community of growers, local agents and families
                  participating in one transparent, trust-based
                  marketplace.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    ["Growers", "Local"],
                    ["Families", "Connected"],
                    ["Harvests", "Valued"],
                  ].map(([title, subtitle]) => (
                    <div
                      key={title}
                      className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
                    >
                      <div className="font-bold">{title}</div>

                      <div className="mt-1 text-xs text-[#b8d3ad]">
                        {subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* HONESTY                                                           */}
        {/* ---------------------------------------------------------------- */}

        <section className="bg-[#f0f4ec] px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                How we keep it honest
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Real availability. Private sellers. Nothing promised
                until it's confirmed.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#66756b]">
                We don't stock a warehouse and we don't promise
                everything, every day. Every item comes from a
                registered local seller, is checked for basic
                freshness before it's listed, and is confirmed with
                you before anything is processed or paid for.
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
                  "Poor-quality or damaged items simply aren't listed. What's available is what genuinely passed a basic freshness check.",
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
                  className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-sm font-bold text-[#70915f]">
                      {number}
                    </span>

                    <div>
                      <h3 className="text-xl font-bold">
                        {title}
                      </h3>

                      <p className="mt-3 leading-7 text-[#6b786f]">
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
        {/* HOW IT WORKS                                                     */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="baskets"
          className="px-5 py-28 lg:px-8"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                Simple by design
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                How it works
              </h2>
            </div>

            <div className="relative mt-16 grid gap-10 md:grid-cols-3">
              {[
                [
                  "01",
                  Search,
                  "Browse & Order",
                  "Choose from today's available products or select a planned weekly basket.",
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
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f0e1] text-[#35633d]">
                      <StepIcon className="h-8 w-8" />
                    </div>

                    <div className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#78916e]">
                      {number as string}
                    </div>

                    <h3 className="mt-2 text-2xl font-bold">
                      {title as string}
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm leading-7 text-[#6b786f]">
                      {text as string}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* DELIVERY                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section className="px-5 pb-28 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              whileHover={{
                scale: 1.005,
              }}
              className="overflow-hidden rounded-[38px] bg-[#e4eddd]"
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-8 sm:p-12 lg:p-16">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3b6941]">
                    <MapPin />
                  </div>

                  <h2 className="mt-7 text-4xl font-bold tracking-tight">
                    Not sure if we deliver to your area?
                  </h2>

                  <p className="mt-5 leading-7 text-[#617268]">
                    We are currently testing delivery and pickup
                    support in selected areas of Warangal, Hanamkonda,
                    Kazipet and nearby local communities.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Input
                      value={search}
                      onChange={(event) =>
                        setSearch(event.target.value)
                      }
                      placeholder="Enter your area or pincode"
                      className="h-12 rounded-full border-white bg-white"
                    />

                    <Button
                      onClick={() => openWhatsApp()}
                      className="h-12 shrink-0 rounded-full bg-[#2d6339] px-6 hover:bg-[#214e2d]"
                    >
                      Check on WhatsApp
                    </Button>
                  </div>

                  <p className="mt-3 text-xs text-[#748279]">
                    We'll open WhatsApp with your area filled in —
                    just hit send.
                  </p>
                </div>

                <div className="relative min-h-[360px] overflow-hidden bg-[#cadcbf]">
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
                      <div className="text-8xl">📍</div>

                      <div className="mt-4 text-2xl font-bold text-[#345e3c]">
                        Warangal
                      </div>

                      <div className="mt-1 text-[#617968]">
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
        {/* GROWERS                                                          */}
        {/* ---------------------------------------------------------------- */}

        <section
          id="growers"
          className="bg-[#234f32] px-5 py-24 text-white lg:px-8"
        >
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div>
              <Badge className="border-0 bg-white/10 text-[#c8ddc2]">
                For local harvest households
              </Badge>

              <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                If your harvest is small, it can still have value.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#c9d9c5]">
                Many homes, terrace gardens, backyard growers and
                local growing families may have limited but useful
                harvests. Amruta Dhaanya creates a simple path for
                genuine local supply to reach nearby households.
              </p>

              <Button
                size="lg"
                className="mt-8 rounded-full bg-white px-7 text-[#234f32] hover:bg-[#edf4e9]"
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
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="flex h-44 w-44 items-center justify-center rounded-full bg-white/10 text-8xl"
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
          className="px-5 py-28 lg:px-8"
        >
          <div className="mx-auto max-w-[900px]">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                Questions
              </p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Frequently asked questions
              </h2>

              <p className="mt-4 text-[#6c796f]">
                Everything you need to know about ordering from
                Amruta Dhaanya.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="mt-12"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-[#dce5d8]"
                >
                  <AccordionTrigger className="py-6 text-left text-base font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 text-base leading-7 text-[#68766d]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}

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
                Fresh, traditional food sourced directly from growers —
                selected carefully, handled honestly and shared through
                a trusted local network.
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
              <h3 className="font-semibold">
                Explore
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#b7c4b9]">
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="#fresh"
                  className="transition-colors hover:text-white"
                >
                  Today's Fresh List
                </Link>

                <Link
                  href="#baskets"
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
              <h3 className="font-semibold">
                Trust
              </h3>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#b7c4b9]">

                {/* BECOME A GROWER */}
                <Link
                  href="/share-your-harvest"
                  className="transition-colors hover:text-white"
                >
                  Become a Grower
                </Link>

                {/* PARTICIPATE - DIRECT PAGE */}
               < Link
               href="/Participate"
              className="transition-colors hover:text-white"
               >
              Participate
              </Link>

                {/* FAQ */}
                <Link
                  href="#faq"
                  className="transition-colors hover:text-white"
                >
                  FAQs
                </Link>

                {/* CONTACT US */}
                <Link
                  href="/contact-us"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>

                {/* LEGAL */}
                <Link
                 href="/legal"
                 className="transition-colors hover:text-white"
                >
                 Legal & Policies
                </Link>

              </div>
            </div>

          </div>

          {/* COPYRIGHT */}
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
    </>
  );
}