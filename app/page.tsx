"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import { AccountMenu } from "@/components/auth/account-menu";
import { Button } from "@/components/ui/button";

const image1 = "/categories/Image 1.JPG";
const image2 = "/categories/Image 2.JPG";
const image3 = "/categories/Image 3.JPG";

const categories = [
  { name: "Vegetables", image: "/images/vegetables.jpg" },
  { name: "Fruits", image: "/images/fruits.jpg" },
  { name: "Leafy Greens", image: "/images/leafy-greens.jpg" },
  { name: "Flowers", image: "/images/flowers.jpg" },
  { name: "Sacred Greens", image: "/images/sacred-greens.jpg" },
  { name: "Grains", image: "/images/grains.jpg" },
  { name: "Pulses", image: "/images/pulses.jpg" },
  { name: "Dairy", image: "/images/dairy.jpg" },
];

const products = [
  {
    name: "Traditional Rice",
    description:
      "Naturally grown and sourced through growers we know.",
    price: "₹120",
    unit: "per kg",
    image: image1,
    tag: "Local harvest",
  },
  {
    name: "Traditional Millets",
    description:
      "Traditional grains brought to nearby families.",
    price: "₹150",
    unit: "per kg",
    image: image2,
    tag: "Local harvest",
  },
  {
    name: "Cold-Pressed Oils",
    description:
      "Slow-extracted using traditional methods.",
    price: "₹280",
    unit: "per litre",
    image: image3,
    tag: "Traditional",
  },
];

const faqs = [
  [
    "What is Ahaar Kutumbam and how is it different from Amruta Dhaanya?",
    "Ahaar Kutumbam is the wider community initiative connecting growers, local agents and families. Amruta Dhaanya is the customer-facing marketplace built within that initiative.",
  ],
  [
    "How do I know the products are genuinely traditional?",
    "We work with registered local growers and sellers, check products before listing and confirm actual availability before an order is processed.",
  ],
  [
    "Where do you currently deliver?",
    "We are currently testing delivery and pickup support in selected areas of Warangal, Hanamkonda, Kazipet and nearby local communities.",
  ],
  [
    "How fresh is the stock?",
    "We do not operate like a warehouse-based quick-commerce service. Availability is based on what local growers genuinely have available.",
  ],
  [
    "How do I become a grower partner?",
    "Use the Share Your Harvest section and submit your details. Our team will contact you and guide you through registration.",
  ],
  [
    "What if a product I ordered isn't available?",
    "We confirm availability, final price and delivery before processing. If something is unavailable, you know before payment rather than after.",
  ],
];

/**
 * Premium letter-by-letter motion.
 *
 * Each letter starts 1 second after the previous letter.
 * Spaces are preserved without being animated.
 */
function LetterReveal({
  text,
  className = "",
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.32em] ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: startDelay,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          variants={{
            hidden: {
              opacity: 0,
              y: 10,
              filter: "blur(5px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f2e9] text-[#18271e]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#193e25] focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to Main Content
      </a>

      {/* TOP ANNOUNCEMENT */}
      <div className="border-b border-[#35583d] bg-[#193e25] px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#eee8da] sm:text-[11px]">
        Fresh availability is updated every morning · Local harvests only
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#ded8ca] bg-[#f6f2e9]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1380px] items-center justify-between px-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#d8d1c1] bg-white">
              <Image
                src="/amruta-dhaanya-logo.png"
                alt="Amruta Dhaanya"
                width={44}
                height={44}
                className="h-full w-full object-contain p-1"
                priority
              />
            </span>

            <span className="hidden sm:block">
              <span className="block text-[15px] font-semibold tracking-[-0.02em] text-[#193e25]">
                AMRUTA DHAANYA™
              </span>

              <span className="mt-0.5 block text-[8px] uppercase tracking-[0.25em] text-[#7d806f]">
                An Ahaar Kutumbam Initiative
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {[
              ["Home", "/"],
              ["Today's Fresh List", "/fresh"],
              ["Fresh Baskets", "/products"],
              ["Share Your Harvest", "/share-your-harvest"],
              ["About Us", "/about"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="text-[12px] font-medium tracking-[0.03em] text-[#455048] transition-colors hover:text-[#a4663d]"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <AccountMenu />

            <Button
              asChild
              className="h-10 rounded-full bg-[#193e25] px-5 text-xs font-semibold text-white hover:bg-[#12301b]"
            >
              <Link href="/cart">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart
              </Link>
            </Button>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full border border-[#d7d1c4] p-2.5 text-[#193e25] lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#ded8ca] bg-[#f6f2e9] px-5 py-5 lg:hidden">
            <nav className="mx-auto flex max-w-[1380px] flex-col gap-4">
              {[
                ["Home", "/"],
                ["Today's Fresh List", "#fresh"],
                ["Fresh Baskets", "/products"],
                ["Share Your Harvest", "/share-your-harvest"],
                ["About Us", "/about"],
                ["Login", "/login"],
                ["Cart", "/cart"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-[#24352a]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <div id="main-content">
        {/* ========================================================= */}
        {/* HERO */}
        {/* ========================================================= */}

        <section
          id="home"
          className="mx-auto max-w-[1380px] px-5 pt-5 sm:pt-7 lg:px-10 lg:pt-8"
        >
          <div className="relative min-h-[640px] overflow-hidden rounded-[32px] bg-[#183a23] sm:min-h-[680px] lg:min-h-[720px]">
            <Image
              src={image1}
              alt="Fresh local greens growing near a home"
              fill
              priority
              className="object-cover object-center opacity-65"
              sizes="(max-width: 768px) 100vw, 1380px"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#102919]/95 via-[#193b24]/65 to-[#193b24]/10" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2617]/70 via-transparent to-transparent" />

            {/* subtle moving light */}
            <motion.div
              className="pointer-events-none absolute -left-[20%] top-0 h-full w-[35%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent blur-3xl"
              animate={{
                x: ["0%", "420%", "0%"],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative flex min-h-[690px] flex-col justify-between p-7 sm:p-10 lg:p-16">
              <div className="flex items-start justify-between gap-5">
                <div className="max-w-[330px]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d4a45f]">
                    An Ahaar Kutumbam Initiative
                  </p>

                  <div className="mt-3 h-px w-16 bg-[#d4a45f]/80" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2,
                  }}
                  className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-md sm:block"
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#8ed36e]" />
                  Today's harvest
                </motion.div>
              </div>

              <div className="grid gap-10 lg:grid-cols-[1.1fr_.6fr] lg:items-end">
                <div className="max-w-[780px]">
                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-display text-[clamp(3.6rem,8vw,7.9rem)] leading-[0.87] tracking-[-0.055em] text-[#f7f2e7]"
                  >
                    Fresh from
                    <span className="block italic text-[#d7a260]">
                      local growers.
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.5,
                    }}
                    className="mt-7 max-w-[650px] text-base leading-7 text-white/80 sm:text-lg"
                  >
                    Pure food. Honest farming. A healthier tomorrow. We
                    connect families with traditional foods sourced directly
                    from growers we know — no warehouses, no anonymous sellers,
                    only what is genuinely available.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.9,
                    }}
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                  >
                    <Button
                      asChild
                      className="h-12 rounded-full bg-[#d39c55] px-7 text-sm font-semibold text-[#1b2d20] hover:bg-[#e0ae6c]"
                    >
                      <Link href="/products">
                        Explore Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-full border-white/35 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
                    >
                      <Link href="/share-your-harvest">
                        Become a Grower
                      </Link>
                    </Button>
                  </motion.div>
                </div>

                {/* ===================================================== */}
                {/* LETTER BY LETTER PREMIUM TEXT */}
                {/* ===================================================== */}

                <div className="hidden max-w-[330px] justify-self-end lg:block">
                  <div className="border-t border-white/25 pt-5">
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d4a45f]">
                        <LetterReveal
                          text="SELECTED, NOT JUST SOLD."
                          startDelay={1.1}
                        />
                      </p>
                    </div>

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 3,
                      }}
                      className="mt-3 text-sm leading-6 text-white/70"
                    >
                      Every harvest is checked, availability is real, and
                      confirmation comes before payment.
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TRUST STRIP */}
        {/* ========================================================= */}

        <section className="mx-auto max-w-[1380px] px-5 py-6 lg:px-10 lg:py-8">
          <div className="grid border-y border-[#d9d2c3] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Verified growers", "Real local sellers"],
              ["02", "Checked before listing", "Basic freshness check"],
              ["03", "Confirmed before payment", "No unwanted surprises"],
              ["04", "No warehouse stock", "Genuinely available"],
            ].map(([number, title, text], i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                }}
                className={`px-4 py-6 sm:px-6 lg:py-7 ${
                  i !== 3
                    ? "border-b border-[#d9d2c3] lg:border-b-0 lg:border-r"
                    : ""
                } ${
                  i === 1 ? "sm:border-r" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-2xl text-[#b97945]">
                    {number}
                  </span>

                  <Check className="h-4 w-4 text-[#4d724e]" />
                </div>

                <p className="mt-5 text-sm font-semibold text-[#213429]">
                  {title}
                </p>

                <p className="mt-1 text-xs text-[#7a7b70]">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

{/* ========================================================= */}
{/* CHOOSE YOUR PATH */}
{/* ========================================================= */}

<section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
  {/* Heading */}
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8 }}
    className="max-w-[760px]"
  >
    <div className="flex items-center gap-3">
      <span className="h-px w-10 bg-[#b97945]" />

      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a4663d]">
        Start here
      </p>
    </div>

    <h2 className="mt-5 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-[-0.055em] text-[#1d2d22]">
      What are you
      <span className="block italic text-[#315e34]">
        here for?
      </span>
    </h2>

    <p className="mt-6 max-w-[600px] text-base leading-7 text-[#707268] sm:text-lg">
      Choose how you want to be part of the local harvest network.
      Buy individual produce, choose a ready basket, or share what
      you grow.
    </p>
  </motion.div>

  {/* Three paths */}
  <div className="mt-12 grid gap-5 lg:grid-cols-3">
    {/* ===================================================== */}
    {/* FRESH LIST */}
    {/* ===================================================== */}

    <Link href="/fresh" className="group">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.05 }}
        whileHover={{ y: -8 }}
        className="relative min-h-[480px] overflow-hidden rounded-[28px] bg-[#315e34]"
      >
        {/* Background image */}
        <Image
          src={image1}
          alt="Fresh individual produce from local growers"
          fill
          className="object-cover transition duration-[1000ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102618]/95 via-[#193e25]/35 to-transparent" />

        {/* Number */}
        <div className="absolute left-6 top-6">
          <span className="font-display text-3xl text-white/40">
            01
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/50 group-hover:bg-white group-hover:text-[#193e25]">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-6 bottom-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d5a15c]">
            Buy individual items
          </p>

          <h3 className="mt-3 font-display text-4xl leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
            Fresh List
          </h3>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/70">
            See the individual harvests available today and choose
            exactly what you need.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Explore Fresh List
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </Link>

    {/* ===================================================== */}
    {/* FRESH BASKETS */}
    {/* ===================================================== */}

    <Link href="/products" className="group">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        whileHover={{ y: -8 }}
        className="relative min-h-[480px] overflow-hidden rounded-[28px] bg-[#b88955]"
      >
        {/* Background image */}
        <Image
          src={image2}
          alt="Curated fresh basket prepared from local harvests"
          fill
          className="object-cover transition duration-[1000ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2117]/95 via-[#6f5434]/35 to-transparent" />

        {/* Number */}
        <div className="absolute left-6 top-6">
          <span className="font-display text-3xl text-white/45">
            02
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/50 group-hover:bg-white group-hover:text-[#352817]">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-6 bottom-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#f1c985]">
            Buy a ready basket
          </p>

          <h3 className="mt-3 font-display text-4xl leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
            Fresh Baskets
          </h3>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/70">
            Prefer something already put together? Explore baskets
            prepared from available local harvests.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Explore Fresh Baskets
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </Link>

    {/* ===================================================== */}
    {/* SHARE YOUR HARVEST */}
    {/* ===================================================== */}

    <Link href="/share-your-harvest" className="group">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.25 }}
        whileHover={{ y: -8 }}
        className="relative min-h-[480px] overflow-hidden rounded-[28px] bg-[#d7c19e]"
      >
        {/* Background image */}
        <Image
          src={image3}
          alt="Local grower harvest"
          fill
          className="object-cover transition duration-[1000ms] ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Image treatment */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#263a29]/95 via-[#3b513c]/30 to-transparent" />

        {/* Number */}
        <div className="absolute left-6 top-6">
          <span className="font-display text-3xl text-white/45">
            03
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/50 group-hover:bg-white group-hover:text-[#193e25]">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-6 bottom-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#e4bd7e]">
            For local growers
          </p>

          <h3 className="mt-3 font-display text-4xl leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
            Share Your Harvest
          </h3>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/70">
            Have something genuine to share? Join the local network
            and make your harvest available to nearby families.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Share Your Harvest
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </Link>
  </div>

  {/* Bottom statement */}
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className="mt-7 flex flex-col gap-3 border-t border-[#d9d2c3] pt-5 sm:flex-row sm:items-center sm:justify-between"
  >
    <p className="text-xs leading-5 text-[#77776d]">
      One local network. Different ways to participate.
    </p>

    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#96968a]">
      Amruta Dhaanya · Ahaar Kutumbam Initiative
    </p>
  </motion.div>
</section>
       {/* ========================================================= */}
{/* TODAY'S HARVEST — HOMEPAGE EDITORIAL SECTION */}
{/* ========================================================= */}
<section
  id="fresh"
  className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-32"
>
  {/* Section heading */}
  <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#b97945]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a4663d]">
          Today's harvest
        </p>
      </div>

      <h2 className="mt-5 max-w-[850px] font-display text-[clamp(3rem,6vw,6.2rem)] leading-[0.9] tracking-[-0.055em] text-[#1d2d22]">
        Grown nearby.
        <span className="block italic text-[#2d612c]">
          Available today.
        </span>
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="lg:pb-2"
    >
      <p className="text-sm leading-6 text-[#707268]">
        We don't fill shelves just to make them look full.
        This is a snapshot of what local growers genuinely
        have available right now.
      </p>

      <Link
        href="/products"
        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#244b2b] transition hover:text-[#a4663d]"
      >
        Explore the complete fresh list
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  </div>

  {/* Editorial harvest cards */}
  <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_.8fr_.8fr]">
    {products.map((product, index) => (
      <Link
        href={`/products/${product.name
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        key={product.name}
        className="group"
      >
        <motion.article
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
            margin: "-60px",
          }}
          transition={{
            duration: 0.75,
            delay: index * 0.12,
          }}
          whileHover={{
            y: -8,
          }}
          className={`relative overflow-hidden rounded-[24px] ${
            index === 0
              ? "min-h-[570px] lg:min-h-[610px]"
              : "min-h-[420px] lg:min-h-[610px]"
          }`}
        >
          {/* Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-[900ms] group-hover:scale-[1.06]"
            sizes={
              index === 0
                ? "(max-width: 1024px) 100vw, 55vw"
                : "(max-width: 1024px) 100vw, 25vw"
            }
          />

          {/* Image treatment */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2114]/95 via-[#193e25]/20 to-transparent" />

          {/* Top metadata */}
          <div className="absolute left-5 right-5 top-5 flex items-start justify-between">
            <span className="rounded-full border border-white/20 bg-[#f6f2e9]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#315e34] backdrop-blur-md">
              {product.tag}
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-[#193e25]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
            <div className="max-w-[520px]">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d5a15c]">
                Local harvest
              </p>

              <h3
                className={`font-display tracking-[-0.035em] text-white ${
                  index === 0
                    ? "text-4xl sm:text-5xl"
                    : "text-3xl"
                }`}
              >
                {product.name}
              </h3>

              <p className="mt-3 max-w-[430px] text-sm leading-6 text-white/70">
                {product.description}
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="font-display text-2xl text-white">
                  {product.price}
                </span>

                <span className="text-xs text-white/55">
                  {product.unit}
                </span>
              </div>
            </div>
          </div>
        </motion.article>
      </Link>
    ))}
  </div>

  {/* Availability note */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.25 }}
    className="mt-7 flex flex-col gap-3 border-t border-[#d9d2c3] pt-5 sm:flex-row sm:items-center sm:justify-between"
  >
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#5f8b50]" />

      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#687066]">
        Live local availability
      </span>
    </div>

    <p className="text-xs text-[#88887d]">
      Availability changes with the harvest. Orders are confirmed before
      processing.
    </p>
  </motion.div>
</section>

        {/* ========================================================= */}
{/* STORY — THE CLOSER STORY */}
{/* ========================================================= */}

<section className="relative overflow-hidden bg-[#e9e3d6]">
  {/* Decorative background detail */}
  <div className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full border border-[#c9c1b1]/40" />

  <div className="pointer-events-none absolute -right-20 top-32 h-[280px] w-[280px] rounded-full border border-[#c9c1b1]/30" />

  <div className="mx-auto max-w-[1380px] px-5 py-24 lg:px-10 lg:py-36">
    {/* Intro */}
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-[900px]"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#a4663d]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b633f]">
          The Amruta Dhaanya way
        </p>
      </div>

      <h2 className="mt-6 font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.88] tracking-[-0.06em] text-[#1d2d22]">
        Food should have
        <span className="block italic text-[#315e34]">
          a closer story.
        </span>
      </h2>
    </motion.div>

    {/* Main story */}
    <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:items-center">
      {/* Image composition */}
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
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <div className="relative aspect-[1.05/1] overflow-hidden rounded-[28px]">
          <Image
            src={image2}
            alt="Local harvest and traditional plants"
            fill
            className="object-cover transition duration-[1200ms] hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#14291a]/70 via-transparent to-transparent" />

          {/* Image caption */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d5a15c]">
                  Grown nearby
                </p>

                <p className="mt-2 max-w-[300px] font-display text-2xl leading-tight text-white sm:text-3xl">
                  Selected carefully.
                  <br />
                  Shared honestly.
                </p>
              </div>

              <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md sm:flex">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
            </div>
          </div>
        </div>

        {/* Small floating detail */}
        <motion.div
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
            duration: 0.7,
            delay: 0.4,
          }}
          className="absolute -bottom-6 -right-4 hidden rounded-[18px] border border-[#c8c0b0] bg-[#f6f2e9] px-5 py-4 shadow-[0_18px_45px_rgba(42,48,35,.10)] sm:block lg:-right-8"
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8a8a7e]">
            Our principle
          </p>

          <p className="mt-1 font-display text-xl text-[#244b2b]">
            Real food.
          </p>
        </motion.div>
      </motion.div>

      {/* Story copy */}
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
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="lg:pl-4"
      >
        <p className="max-w-[580px] text-lg leading-8 text-[#555c52] sm:text-xl">
          We believe the distance between a grower and a family
          should be smaller.
        </p>

        <p className="mt-6 max-w-[580px] text-sm leading-7 text-[#71736a]">
          Amruta Dhaanya is built around a simple idea: local food
          becomes more meaningful when you know where it comes from,
          who grew it and whether it is actually available.
        </p>

        <p className="mt-5 max-w-[580px] text-sm leading-7 text-[#71736a]">
          Instead of building another anonymous marketplace, we are
          creating a trusted local network connecting growers,
          households and communities through real daily harvests.
        </p>

        {/* Principles */}
        <div className="mt-10 grid max-w-[600px] grid-cols-2 border-t border-[#c9c1b1]">
          {[
            ["Local", "Closer to home"],
            ["Verified", "Known growers"],
            ["Traditional", "Food with heritage"],
            ["Honest", "Availability before promises"],
          ].map(([title, text], index) => (
            <motion.div
              key={title}
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
                duration: 0.5,
                delay: 0.3 + index * 0.08,
              }}
              className={`py-5 ${
                index % 2 === 0
                  ? "border-r border-[#c9c1b1] pr-5"
                  : "pl-5"
              } ${
                index > 1
                  ? "border-t border-[#c9c1b1]"
                  : ""
              }`}
            >
              <p className="font-display text-xl text-[#244b2b]">
                {title}
              </p>

              <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#88887d]">
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#244b2b] transition hover:text-[#a4663d]"
        >
          Read the Amruta Dhaanya story
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  </div>
</section>
        {/* ========================================================= */}
{/* HARVEST INDEX — HOMEPAGE CATEGORY EXPERIENCE */}
{/* ========================================================= */}

<section className="mx-auto max-w-[1380px] px-5 py-24 lg:px-10 lg:py-36">
  <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
    {/* Intro */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="lg:sticky lg:top-32 lg:self-start"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-[#b97945]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a4663d]">
          The harvest index
        </p>
      </div>

      <h2 className="mt-6 font-display text-[clamp(3rem,6vw,5.8rem)] leading-[0.9] tracking-[-0.055em] text-[#1d2d22]">
        From the
        <span className="block italic text-[#315e34]">
          local soil.
        </span>
      </h2>

      <p className="mt-7 max-w-[360px] text-sm leading-6 text-[#74766c]">
        Explore the different kinds of food and harvests that
        make up our local network.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#244b2b] transition hover:text-[#a4663d]"
      >
        Explore everything
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>

    {/* Category index */}
    <div className="border-t border-[#d9d2c3]">
      {categories.map((category, index) => (
        <Link
          href="/products"
          key={category.name}
          className="group block"
        >
          <motion.div
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
              margin: "-30px",
            }}
            transition={{
              duration: 0.55,
              delay: index * 0.05,
            }}
            className="relative flex items-center justify-between gap-6 border-b border-[#d9d2c3] py-5 transition-colors duration-300 hover:bg-[#eee9dd]"
          >
            {/* Number */}
            <span className="w-10 shrink-0 font-display text-lg text-[#b97945]">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Name */}
            <div className="flex min-w-0 flex-1 items-center gap-5">
              <h3 className="font-display text-3xl tracking-[-0.035em] text-[#26362a] transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                {category.name}
              </h3>
            </div>

            {/* Image preview */}
            <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-[12px] sm:block">
              <Image
                src={category.image}
                alt=""
                fill
                className="object-cover grayscale-[20%] transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
                sizes="112px"
              />

              <div className="absolute inset-0 bg-[#193e25]/10 transition group-hover:bg-transparent" />
            </div>

            {/* Arrow */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#cfc8b9] text-[#6f746b] transition-all duration-300 group-hover:border-[#315e34] group-hover:bg-[#315e34] group-hover:text-white">
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  </div>
</section>

        {/* ========================================================= */}
{/* HONESTY — HOW AMRUTA DHAANYA WORKS */}
{/* ========================================================= */}

<section className="relative overflow-hidden bg-[#f6f2e9]">
  <div className="mx-auto max-w-[1380px] px-5 py-24 lg:px-10 lg:py-36">
    {/* Heading */}
    <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[#b97945]" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a4663d]">
            How we keep it honest
          </p>
        </div>

        <h2 className="mt-6 font-display text-[clamp(3.1rem,6vw,6rem)] leading-[0.88] tracking-[-0.055em] text-[#1d2d22]">
          Real availability.
          <span className="block italic text-[#b36e43]">
            Real people.
          </span>
          <span className="block">No empty promises.</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="flex items-end"
      >
        <p className="max-w-[560px] text-lg leading-8 text-[#66695f]">
          We are deliberately different from a warehouse-first,
          instant-delivery marketplace. Our system starts with what
          growers actually have, then builds the order around that
          reality.
        </p>
      </motion.div>
    </div>

    {/* Principles */}
    <div className="mt-16 border-t border-[#d9d2c3]">
      {[
        {
          number: "01",
          title: "Known growers",
          text: "We work with registered local growers and sellers rather than anonymous supply.",
        },
        {
          number: "02",
          title: "Checked before listing",
          text: "Products are reviewed before they appear. Poor-quality or unsuitable harvests simply don't make the list.",
        },
        {
          number: "03",
          title: "Confirmation before payment",
          text: "Availability, final price and delivery are confirmed before an order is processed.",
        },
        {
          number: "04",
          title: "No warehouse fiction",
          text: "We don't pretend something is available just because a catalogue says it is. Daily availability comes from the actual harvest.",
        },
      ].map((item, index) => (
        <motion.div
          key={item.number}
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
            margin: "-50px",
          }}
          transition={{
            duration: 0.65,
            delay: index * 0.08,
          }}
          className="group grid gap-6 border-b border-[#d9d2c3] py-8 lg:grid-cols-[90px_1fr_1.2fr] lg:items-center lg:py-10"
        >
          {/* Number */}
          <div>
            <span className="font-display text-3xl text-[#b97945] transition-colors duration-300 group-hover:text-[#315e34]">
              {item.number}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-display text-3xl tracking-[-0.035em] text-[#24352a] sm:text-4xl">
              {item.title}
            </h3>
          </div>

          {/* Description */}
          <div className="flex items-center justify-between gap-6">
            <p className="max-w-[480px] text-sm leading-6 text-[#77776d]">
              {item.text}
            </p>

            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#cfc8b9] text-[#7d806f] transition-all duration-300 group-hover:border-[#315e34] group-hover:bg-[#315e34] group-hover:text-white sm:flex">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom statement */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#8b8b80]">
          Our promise
        </p>

        <p className="mt-2 font-display text-2xl text-[#244b2b] sm:text-3xl">
          What you see should be what you can actually receive.
        </p>
      </div>

      <Link
        href="/about"
        className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#244b2b] transition hover:text-[#a4663d]"
      >
        Learn how we operate
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  </div>
</section>

     {/* ========================================================= */}
{/* ORIGIN / TRACEABILITY */}
{/* ========================================================= */}

<section className="bg-[#193e25] text-[#f7f2e7]">
  <div className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      
      {/* LEFT */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d5a15c]">
          Know the source
        </p>

        <h2 className="mt-5 max-w-[520px] font-display text-5xl leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          Your food should
          <span className="block italic text-[#d5a15c]">
            have an origin.
          </span>
        </h2>

        <p className="mt-7 max-w-[430px] text-sm leading-7 text-white/65">
          Amruta Dhaanya is built around a simple idea — when food comes
          from nearby, you should be able to understand where it came
          from, who supplied it and whether it is actually available.
        </p>

        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f4d29c] transition hover:gap-3"
        >
          Why we built this
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* RIGHT */}
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            number: "01",
            title: "The grower",
            text: "We know who is supplying the harvest rather than relying on anonymous marketplace listings.",
          },
          {
            number: "02",
            title: "The harvest",
            text: "Availability is based on what is genuinely available today — not warehouse inventory.",
          },
          {
            number: "03",
            title: "The check",
            text: "Products are reviewed before they are listed so families know what they are requesting.",
          },
          {
            number: "04",
            title: "The confirmation",
            text: "Stock, price and delivery are confirmed before the order moves forward.",
          },
        ].map((item, index) => (
          <motion.div
            key={item.number}
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
              margin: "-80px",
            }}
            transition={{
              duration: 0.65,
              delay: index * 0.1,
            }}
            className="group rounded-[22px] border border-white/10 bg-white/[0.035] p-7 transition duration-500 hover:border-[#d5a15c]/40 hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-3xl text-[#d5a15c]">
                {item.number}
              </span>

              <ArrowRight className="h-4 w-4 text-white/25 transition duration-300 group-hover:translate-x-1 group-hover:text-[#d5a15c]" />
            </div>

            <h3 className="mt-12 text-base font-semibold">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/55">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* BOTTOM STATEMENT */}
    <div className="mt-16 border-t border-white/10 pt-7 lg:mt-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl tracking-[-0.02em] text-white/90 sm:text-3xl">
          From someone you can know.
          <span className="italic text-[#d5a15c]">
            To someone you can trust.
          </span>
        </p>

        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
          Ahaar Kutumbam Initiative
        </span>
      </div>
    </div>
  </div>
</section>

        {/* ========================================================= */}
        {/* GROWER CTA */}
        {/* ========================================================= */}

        <section className="mx-auto max-w-[1380px] px-5 py-20 lg:px-10 lg:py-28">
          <motion.div
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
              duration: 0.9,
            }}
            className="grid overflow-hidden rounded-[26px] bg-[#d7c19e] lg:grid-cols-[1fr_.85fr]"
          >
            <div className="relative min-h-[390px]">
              <Image
                src={image3}
                alt="Flowering local harvest"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="section-kicker !text-[#785d3f]">
                For local harvest households
              </p>

              <h2 className="mt-4 font-display text-5xl leading-[.95] tracking-[-0.04em] text-[#1f2e23] sm:text-6xl">
                A small harvest
                <span className="block italic text-[#315e34]">
                  should never feel small.
                </span>
              </h2>

              <p className="mt-6 max-w-[510px] text-sm leading-6 text-[#5e5d52]">
                Terrace gardens, backyard growers and local growing families
                may have limited but useful harvests. Amruta Dhaanya creates
                a simple path for genuine local supply to reach nearby
                households.
              </p>

              <Button
                asChild
                className="mt-8 h-12 w-fit rounded-full bg-[#193e25] px-7 text-sm text-white hover:bg-[#12301b]"
              >
                <Link href="/share-your-harvest">
                  Register as a Grower
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* ========================================================= */}
        {/* FAQ */}
        {/* ========================================================= */}

        <section className="mx-auto max-w-[1380px] px-5 pb-20 lg:px-10 lg:pb-28">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <p className="section-kicker">Questions</p>

              <h2 className="section-title mt-4">
                Everything you need to know.
              </h2>

              <p className="mt-5 max-w-[330px] text-sm leading-6 text-[#77776d]">
                Clear answers about availability, growers, traditional foods
                and delivery.
              </p>
            </div>

            <div className="border-t border-[#d9d2c3]">
              {faqs.map(([question, answer], index) => (
                <div
                  key={question}
                  className="border-b border-[#d9d2c3]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setFaqOpen(
                        faqOpen === index ? null : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-sm font-medium text-[#26372b]">
                      {question}
                    </span>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#7d806f] transition ${
                        faqOpen === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {faqOpen === index && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="max-w-[760px] overflow-hidden pb-6 pr-10 text-sm leading-6 text-[#77776d]"
                    >
                      {answer}
                    </motion.p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================== */}
      {/* FOOTER */}
      {/* =========================================================== */}

      <footer className="border-t border-[#d9d2c3] bg-[#efeade]">
        <div className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-12 md:grid-cols-[1.3fr_.7fr_.7fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#d0c9ba] bg-white">
                  <Image
                    src="/amruta-dhaanya-logo.png"
                    alt="Amruta Dhaanya"
                    width={44}
                    height={44}
                    className="h-full w-full object-contain p-1"
                  />
                </span>

                <div>
                  <p className="text-sm font-semibold text-[#193e25]">
                    AMRUTA DHAANYA™
                  </p>

                  <p className="text-[8px] uppercase tracking-[0.22em] text-[#7d806f]">
                    An Ahaar Kutumbam Initiative
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-[430px] text-sm leading-6 text-[#77776d]">
                Fresh, traditional food sourced directly from growers —
                selected carefully, handled honestly and shared through a
                trusted local network.
              </p>

              <p className="mt-5 text-xs leading-5 text-[#77776d]">
                Vangapahad, Warangal, Telangana 506006
                <br />
                +91 9177751088 · amrutadhaanya@gmail.com
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a4663d]">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-[#465148]">
                <Link href="/">Home</Link>
                <Link href="/products">
                  Today's Fresh List
                </Link>
                <Link href="/products">
                  Fresh Baskets
                </Link>
                <Link href="/share-your-harvest">
                  Share Your Harvest
                </Link>
                <Link href="/about">About Us</Link>
              </div>
            </div>
            <div>
  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a4663d]">
    Trust & support
  </p>

  <div className="mt-5 flex flex-col gap-3 text-sm text-[#465148]">
    <Link
      href="/grower-register"
      className="transition-colors hover:text-[#193e25]"
    >
      Become a Grower
    </Link>

    <Link
      href="/Participate"
      className="transition-colors hover:text-[#193e25]"
    >
      Participate
    </Link>

    <Link
      href="/FAQ"
      className="transition-colors hover:text-[#193e25]"
    >
      FAQ
    </Link>

    <Link
      href="/contact-us"
      className="transition-colors hover:text-[#193e25]"
    >
      Contact Us
    </Link>

    <Link
      href="/legal"
      className="transition-colors hover:text-[#193e25]"
    >
      Legal & Policies
    </Link>

    <Link
      href="/cart"
      className="transition-colors hover:text-[#193e25]"
    >
      Cart
    </Link>

    <Link
      href="/login"
      className="transition-colors hover:text-[#193e25]"
    >
      Login
    </Link>
  </div>
</div>
          </div>

          <div className="mt-12 flex flex-col gap-2 border-t border-[#d9d2c3] pt-5 text-[10px] uppercase tracking-[0.12em] text-[#85857a] sm:flex-row sm:items-center sm:justify-between">
            <span>
              © 2026 Amruta Dhaanya. All rights reserved.
            </span>

            <span>
              A trusted local harvest network built around real daily
              availability.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}