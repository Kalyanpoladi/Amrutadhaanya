"use client";

import { useState } from "react";

const categories = [
  { name: "Vegetables", icon: "🥬" },
  { name: "Fruits", icon: "🍎" },
  { name: "Leafy Greens", icon: "🌿" },
  { name: "Flowers", icon: "🌸" },
  { name: "Sacred Greens", icon: "🌱" },
  { name: "Grains", icon: "🌾" },
  { name: "Pulses", icon: "🫘" },
  { name: "Dairy", icon: "🥛" },
];

const trustPoints = [
  {
    number: "01",
    title: "Registered Seller Codes",
    description:
      "Every local seller is assigned a private service code. Their identity stays protected, while every order remains traceable.",
  },
  {
    number: "02",
    title: "Checked Before Listing",
    description:
      "Poor-quality or damaged items simply aren't listed. What's available is what genuinely passed a basic freshness check.",
  },
  {
    number: "03",
    title: "Confirmed Before Payment",
    description:
      "We confirm stock, final price, and delivery with you first. If something isn't available, you'll know before you pay.",
  },
  {
    number: "04",
    title: "Not Quick Commerce",
    description:
      "We're not built for instant delivery. We're built to get it right — careful sourcing, careful handling, careful delivery.",
  },
];

const faqs = [
  {
    question: "What is Amruta Dhaanya?",
    answer:
      "Amruta Dhaanya is a local fresh-food marketplace connecting families with growers, home producers and trusted local sellers. We focus on genuine daily availability rather than maintaining a large warehouse stock.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Browse the products available today, choose what you need and submit your request. Our team confirms availability, final price and delivery before the order is processed.",
  },
  {
    question: "Are all products available every day?",
    answer:
      "No. Availability depends on what local growers and sellers genuinely have available. This helps us avoid promising products that are not actually in stock.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We are currently testing delivery and pickup support in selected areas of Warangal, Hanamkonda, Kazipet and nearby local communities.",
  },
  {
    question: "Do you deliver on the same day?",
    answer:
      "Same-day delivery depends on product availability, location and the day's delivery schedule. We confirm the delivery option with you before processing your order.",
  },
  {
    question: "How fresh are the products?",
    answer:
      "We focus on genuine local availability and basic freshness checks before products are listed. We do not claim that every product is harvested the same day.",
  },
  {
    question: "Are your vegetables organic?",
    answer:
      "We do not automatically label products as organic. Products are described according to what we can genuinely verify about their source and growing practices.",
  },
  {
    question: "How are prices decided?",
    answer:
      "Prices depend on the product, quantity, local availability and grower or seller pricing. We confirm the final price before processing the order.",
  },
  {
    question: "Can I order in bulk?",
    answer:
      "Yes. Bulk requests can be submitted and our team can check availability with the relevant growers or sellers.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "For the initial marketplace experience, payment can be handled through confirmed ordering and supported payment methods. Cash on Delivery can also be supported where available.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Cancellation depends on the stage of your order. Contact our team as soon as possible and we will help you with the request.",
  },
  {
    question: "What if I receive damaged or poor-quality products?",
    answer:
      "Please contact us with the order details and photos as soon as possible. We will review the issue and work toward an appropriate resolution.",
  },
  {
    question: "How do I become a grower partner?",
    answer:
      "Use the Share Your Harvest or Register as a Grower option and submit your details. Our team will contact you to understand your products and availability.",
  },
  {
    question: "Is there any registration fee for growers?",
    answer:
      "Our grower onboarding process is designed to be simple. Any applicable commercial terms will be explained clearly before you begin supplying.",
  },
  {
    question: "Can I sell homemade food products?",
    answer:
      "Potentially, yes. Homemade food products may be considered subject to product suitability, food-safety requirements and verification.",
  },
  {
    question: "Do you sell only vegetables?",
    answer:
      "No. Amruta Dhaanya is intended to support vegetables, fruits, leafy greens, grains, pulses, dairy, flowers, traditional foods and other suitable local products.",
  },
  {
    question: "How often is product availability updated?",
    answer:
      "Fresh availability can be updated regularly based on what local sellers and growers report. Our goal is to keep availability as close as possible to real supply.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact Amruta Dhaanya through WhatsApp, phone or email. We will help with product availability, orders, delivery and grower enquiries.",
  },
  {
    question: "Why are some products unavailable?",
    answer:
      "Because we don't want to pretend something is available when it isn't. Local harvests naturally vary by season, weather, quantity and grower availability.",
  },
  {
    question: "Why should I choose Amruta Dhaanya?",
    answer:
      "Because we're building a more transparent local food network where real availability matters, growers have a direct path to households, and families know what they are ordering before they pay.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsappNumber = "919177751088";

  const checkDelivery = () => {
    const area = (
      document.getElementById("delivery-area") as HTMLInputElement | null
    )?.value;

    const message = area
      ? `Hello Amruta Dhaanya, I would like to check delivery availability for ${area}.`
      : "Hello Amruta Dhaanya, I would like to check delivery availability in my area.";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const shareHarvest = () => {
    const message =
      "Hello Amruta Dhaanya, I would like to share my harvest and become a grower partner.";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#fbfaf5] text-[#26352a]">
      {/* Accessibility Links */}
      <div className="sr-only focus-within:not-sr-only">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 rounded-lg bg-[#245c3a] px-4 py-2 text-white"
        >
          Skip to Main Content
        </a>
      </div>

      {/* Announcement Bar */}
      <div className="bg-[#214f35] px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        🌱 Fresh availability is updated every morning.
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#dfe7dc] bg-[#fbfaf5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dfead9] text-xl">
              🌱
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-[#214f35]">
                Amruta Dhaanya
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#718174]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            <a
              href="#home"
              className="text-sm font-semibold text-[#214f35] transition hover:text-[#8b5e34]"
            >
              HOME
            </a>
            <a
              href="#fresh-list"
              className="text-sm font-medium text-[#526057] transition hover:text-[#214f35]"
            >
              TODAY&apos;S FRESH LIST
            </a>
            <a
              href="#baskets"
              className="text-sm font-medium text-[#526057] transition hover:text-[#214f35]"
            >
              FRESH BASKETS
            </a>
            <a
              href="#share"
              className="text-sm font-medium text-[#526057] transition hover:text-[#214f35]"
            >
              SHARE YOUR HARVEST
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-[#526057] transition hover:text-[#214f35]"
            >
              ABOUT US
            </a>
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <button className="rounded-full border border-[#cbd8c8] px-3 py-1.5 text-xs font-bold text-[#214f35]">
              EN
            </button>
            <button className="rounded-full px-3 py-1.5 text-xs font-medium text-[#738078] hover:bg-[#eef3eb]">
              TE
            </button>
          </div>

          <button className="rounded-lg border border-[#d3ddd0] p-2 lg:hidden">
            <span className="text-xl">☰</span>
          </button>
        </div>
      </header>

      <div id="main-content">
        {/* Hero */}
        <section id="home" className="relative overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e7f0df] blur-3xl" />
          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#f0e8d7] blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#d9e4d5] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#527253]">
                <span>🌾</span>
                Built for Local Harvests
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#214f35] sm:text-6xl lg:text-7xl">
                Pure food.
                <br />
                <span className="text-[#9a6a3c]">Honest farming.</span>
                <br />
                A healthier tomorrow.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5b665e]">
                Amruta Dhaanya connects families with traditional foods and
                fresh local produce sourced directly from growers we know —
                carefully selected, genuinely available, and shared with
                trust.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#fresh-list"
                  className="rounded-full bg-[#245c3a] px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-[#245c3a]/10 transition hover:bg-[#19482d]"
                >
                  Explore Products
                </a>

                <a
                  href="#share"
                  className="rounded-full border border-[#b9cbb8] bg-white px-7 py-3.5 text-center text-sm font-bold text-[#245c3a] transition hover:bg-[#eef3eb]"
                >
                  Become a Grower
                </a>
              </div>

              <div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  "Verified growers",
                  "Checked before listing",
                  "Confirmed before payment",
                  "No warehouse stock",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#e0e7dc] bg-white/70 p-3 text-xs font-semibold leading-5 text-[#536157]"
                  >
                    <span className="mr-1 text-[#5b8a54]">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-6 rounded-[2rem] bg-[#dfead7] blur-2xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white bg-[#edf3e8] p-5 shadow-2xl shadow-[#254a30]/10">
                  <div className="rounded-[1.5rem] bg-[#f9faf4] p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b796e]">
                        Today&apos;s Harvest
                      </span>
                      <span className="rounded-full bg-[#e4efdf] px-3 py-1 text-[10px] font-bold text-[#3f7042]">
                        FRESH
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-[#e7f0df] p-5">
                        <div className="text-4xl">🥬</div>
                        <div className="mt-4 font-bold text-[#214f35]">
                          Local Greens
                        </div>
                        <div className="mt-1 text-xs text-[#718174]">
                          Available today
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#f3eadb] p-5">
                        <div className="text-4xl">🌾</div>
                        <div className="mt-4 font-bold text-[#694c2e]">
                          Traditional Grains
                        </div>
                        <div className="mt-1 text-xs text-[#85745f]">
                          From local growers
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#e9eee5] p-5">
                        <div className="text-4xl">🍅</div>
                        <div className="mt-4 font-bold text-[#214f35]">
                          Seasonal Produce
                        </div>
                        <div className="mt-1 text-xs text-[#718174]">
                          Limited quantities
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#efe7d8] p-5">
                        <div className="text-4xl">🫘</div>
                        <div className="mt-4 font-bold text-[#694c2e]">
                          Pulses
                        </div>
                        <div className="mt-1 text-xs text-[#85745f]">
                          Carefully selected
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-[#214f35] p-5 text-white">
                      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-[#bdd1bb]">
                        Local • Fresh • Traceable
                      </div>
                      <div className="mt-2 text-xl font-semibold">
                        Every harvest has value.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="border-y border-[#e1e7dd] bg-white">
          <div className="mx-auto max-w-5xl px-5 py-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#728071]">
              Find What You Need
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-[#214f35]">
              What are you looking for today?
            </h2>

            <div className="mx-auto mt-5 flex max-w-2xl overflow-hidden rounded-full border border-[#cfdacd] bg-[#fbfcf8] p-1.5 shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vegetables, fruits, groceries..."
                className="min-w-0 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-[#9aa49b]"
              />

              <button className="rounded-full bg-[#245c3a] px-6 py-3 text-sm font-bold text-white">
                Search
              </button>
            </div>

            <p className="mt-3 text-xs text-[#788279]">
              🌱 Fresh availability updated every morning.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section id="fresh-list" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70806f]">
                Browse Categories
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#214f35]">
                Fresh from nearby sources
              </h2>
            </div>

            <a
              href="#"
              className="hidden text-sm font-bold text-[#8b5e34] sm:block"
            >
              View all →
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <a
                key={category.name}
                href="#"
                className="group rounded-2xl border border-[#e0e7dc] bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#b8cbb2] hover:shadow-md"
              >
                <div className="text-3xl transition group-hover:scale-110">
                  {category.icon}
                </div>
                <div className="mt-3 text-xs font-bold text-[#405247]">
                  {category.name}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Purpose */}
        <section id="about" className="bg-[#eaf1e5]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#607760]">
                Every Home Can Grow
              </p>

              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-[#214f35]">
                See how every home can become a food producer.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#59685b]">
                Amruta Dhaanya is reimagining how communities access fresh
                food. We connect households, growers, home producers and
                families through one trusted marketplace where every harvest
                has value and every request is based on real daily
                availability.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#fresh-list"
                  className="rounded-full bg-[#245c3a] px-6 py-3 text-sm font-bold text-white"
                >
                  I&apos;m Looking for Fresh Produce
                </a>

                <a
                  href="#baskets"
                  className="rounded-full border border-[#b8cbb5] bg-white px-6 py-3 text-sm font-bold text-[#245c3a]"
                >
                  Explore Fresh Baskets
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#214f35] p-8 text-white shadow-xl lg:p-10">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#b9d1b7]">
                Why We Started
              </div>

              <h3 className="mt-4 text-3xl font-semibold">
                A better way for local harvests to reach nearby homes.
              </h3>

              <p className="mt-5 leading-8 text-[#d1ded0]">
                Many local growers face waste, unstable pricing and limited
                access to nearby households. Amruta Dhaanya was started to
                build a more trustworthy and responsible local fresh-food
                network for both growers and families.
              </p>

              <a
                href="#about"
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#214f35]"
              >
                About Us
              </a>
            </div>
          </div>
        </section>

        {/* Delivery */}
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="rounded-[2rem] border border-[#dfe7dc] bg-white p-7 shadow-sm lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70806f]">
                  Delivery Availability
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#214f35]">
                  Not sure if we deliver to your area?
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-[#637066]">
                  We are currently testing delivery and pickup support in
                  selected areas of Warangal, Hanamkonda, Kazipet and nearby
                  local communities. Message us your area or pincode on
                  WhatsApp and our team will confirm.
                </p>
              </div>

              <div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="delivery-area"
                    placeholder="Enter your area or pincode"
                    className="min-w-0 flex-1 rounded-full border border-[#cfdacd] bg-[#fbfcf8] px-5 py-3.5 text-sm outline-none focus:border-[#6f966c]"
                  />

                  <button
                    onClick={checkDelivery}
                    className="rounded-full bg-[#245c3a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#19482d]"
                  >
                    Check on WhatsApp
                  </button>
                </div>

                <p className="mt-3 text-xs text-[#788279]">
                  We&apos;ll open WhatsApp with your area filled in — just hit
                  send.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Honesty */}
        <section className="bg-[#f1ede4]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b6d4c]">
                How We Keep It Honest
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#4e3d2a]">
                Real availability. Private sellers. Nothing promised until
                it&apos;s confirmed.
              </h2>

              <p className="mt-5 leading-8 text-[#706454]">
                We don&apos;t stock a warehouse and we don&apos;t promise
                everything, every day. Every item comes from a registered local
                seller, is checked for basic freshness before it&apos;s listed,
                and is confirmed with you — availability, price and delivery —
                before anything is processed or paid for.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trustPoints.map((point) => (
                <div
                  key={point.number}
                  className="rounded-2xl border border-[#e1d9c9] bg-white p-6"
                >
                  <div className="text-sm font-black text-[#9a6a3c]">
                    {point.number}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#4e3d2a]">
                    {point.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#706b61]">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#fresh-list"
                className="rounded-full bg-[#245c3a] px-6 py-3 text-sm font-bold text-white"
              >
                Check Today&apos;s Fresh List
              </a>

              <button
                onClick={shareHarvest}
                className="rounded-full border border-[#bba98f] bg-white px-6 py-3 text-sm font-bold text-[#6c4f32]"
              >
                Share Your Harvest
              </button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="baskets" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70806f]">
              Simple & Transparent
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#214f35]">
              How It Works
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Check Availability",
                description:
                  "See what is available today or choose a planned weekly basket.",
              },
              {
                number: "02",
                title: "Send Request",
                description:
                  "Submit your items, basket, address and preferred delivery date.",
              },
              {
                number: "03",
                title: "We Confirm",
                description:
                  "Our team confirms stock, final price and delivery before processing.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-[1.5rem] border border-[#dfe7dc] bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6efdf] text-sm font-black text-[#3f7042]">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#214f35]">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-[#667168]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Grower */}
        <section id="share" className="px-5 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#214f35]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 text-white lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9d1b7]">
                  For Local Harvest Households
                </p>

                <h2 className="mt-4 text-4xl font-semibold leading-tight">
                  If your harvest is small, it can still have value.
                </h2>

                <p className="mt-5 max-w-2xl leading-8 text-[#d2dfd1]">
                  Many homes, terrace gardens, backyard growers and local
                  growing families may have limited but useful harvests.
                  Amruta Dhaanya creates a simple path for genuine local supply
                  to reach nearby households through a trusted request-based
                  system.
                </p>

                <button
                  onClick={shareHarvest}
                  className="mt-8 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#214f35]"
                >
                  Register as a Grower
                </button>
              </div>

              <div className="flex items-center justify-center bg-[#2c6343] p-10">
                <div className="text-center">
                  <div className="text-7xl">🌾</div>
                  <div className="mt-6 text-2xl font-semibold text-white">
                    Every Harvest Has Value.
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#c9dcc8]">
                    Grow local. Share locally. Build stronger food
                    communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[#e1e7dd] bg-white">
          <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70806f]">
                Need to Know
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#214f35]">
                Frequently Asked Questions
              </h2>

              <p className="mt-3 text-[#6a756d]">
                Everything you need to know about ordering from Amruta Dhaanya
              </p>
            </div>

            <div className="mt-10 divide-y divide-[#e5e9e3] rounded-2xl border border-[#dfe7dc] bg-[#fbfcf9]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7"
                    >
                      <span className="text-sm font-bold text-[#34453a] sm:text-base">
                        {faq.question}
                      </span>

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e6eee2] text-[#416b43]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-6 text-sm leading-7 text-[#69746c] sm:px-7">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#183b28] text-white">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr]">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2b5d3d] text-xl">
                    🌱
                  </div>

                  <div>
                    <div className="text-xl font-bold">Amruta Dhaanya</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#a9c0aa]">
                      An Ahaar Kutumbam Initiative
                    </div>
                  </div>
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#c1d1c1]">
                  Fresh local produce requested with trust — selected daily,
                  handled carefully and shared through simple communication.
                </p>

                <div className="mt-7 text-sm leading-7 text-[#c1d1c1]">
                  <div>
                    <span className="font-bold text-white">Phone:</span>{" "}
                    +91 9177751088
                  </div>
                  <div>
                    <span className="font-bold text-white">Email:</span>{" "}
                    amrutadhaanya@gmail.com
                  </div>
                  <div>
                    <span className="font-bold text-white">Location:</span>{" "}
                    Vangapahad, Warangal, Telangana 506006
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white">Explore</h3>

                <div className="mt-5 space-y-3 text-sm text-[#b9cabb]">
                  <a className="block hover:text-white" href="#home">
                    HOME
                  </a>
                  <a className="block hover:text-white" href="#fresh-list">
                    TODAY&apos;S FRESH LIST
                  </a>
                  <a className="block hover:text-white" href="#baskets">
                    FRESH BASKETS
                  </a>
                  <a className="block hover:text-white" href="#share">
                    SHARE YOUR HARVEST
                  </a>
                  <a className="block hover:text-white" href="#about">
                    ABOUT US
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-white">Follow Along</h3>

                <p className="mt-5 text-sm leading-6 text-[#b9cabb]">
                  Follow our channel for fresh availability, local harvests
                  and community updates.
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#214f35]"
                >
                  Follow Our Channel
                </a>
              </div>
            </div>

            <div className="mt-12 border-t border-[#31523c] pt-6">
              <div className="flex flex-col gap-4 text-xs text-[#aebfae] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  © 2026 Amruta Dhaanya. All rights reserved.
                </div>

                <div className="flex flex-wrap gap-5">
                  <a href="#" className="hover:text-white">
                    CONTACT US
                  </a>
                  <a href="#" className="hover:text-white">
                    LEGAL & POLICIES
                  </a>
                  <a href="#" className="hover:text-white">
                    VERIFY
                  </a>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#91a792]">
                A trusted local harvest network built around real daily
                availability and community care.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}