"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "@/components/cart/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const products = {
  "traditional-rice": {
    name: "Traditional Rice",
    price: 120,
    unit: "kg",
    emoji: "🌾",
    category: "Traditional Grains",
    description:
      "Naturally grown, hand-selected rice sourced directly from growers we work with regularly.",
    longDescription:
      "Our traditional rice comes through our local grower network rather than anonymous bulk supply chains. Availability depends on what growers genuinely have available, helping us keep the marketplace connected to real local harvests.",
    features: [
      "Sourced from local growers",
      "Checked before listing",
      "Availability confirmed before payment",
      "No warehouse stock",
    ],
  },

  "traditional-millets": {
    name: "Traditional Millets",
    price: 150,
    unit: "kg",
    emoji: "🌾",
    category: "Traditional Grains",
    description:
      "Traditional grains grown with care and brought to nearby families through our local network.",
    longDescription:
      "Millets have always been part of traditional food systems. We connect available millet harvests from local growers with families looking for simple, traditional foods.",
    features: [
      "Traditional grain varieties",
      "Local grower sourcing",
      "Checked before listing",
      "Confirmed before payment",
    ],
  },

  "cold-pressed-oil": {
    name: "Cold-Pressed Oils",
    price: 280,
    unit: "litre",
    emoji: "🫒",
    category: "Traditional Oils",
    description:
      "Slow-extracted using traditional methods — no heat, no chemicals, no shortcuts.",
    longDescription:
      "Our cold-pressed oils are sourced through the local network and listed according to genuine availability. We focus on transparent sourcing and careful handling rather than mass warehouse inventory.",
    features: [
      "Traditional extraction",
      "Local producer network",
      "Checked before listing",
      "Availability confirmed before payment",
    ],
  },
};

export default function ProductPage() {
  const params = useParams();

  const slug = params.slug as string;

  const { addItem, totalItems } = useCart();

  const product =
    products[slug as keyof typeof products] ??
    products["cold-pressed-oil"];

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const total = product.price * quantity;

  function addToCart() {
    addItem(
      {
        id: slug,
        name: product.name,
        price: product.price,
        unit: product.unit,
        emoji: product.emoji,
      },
      quantity
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2200);
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#1f3023]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{
                rotate: 5,
                scale: 1.05,
              }}
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
              className="rounded-full border-[#376540] px-5 text-[#2e5b39]"
              asChild
            >
              <Link href="/">Home</Link>
            </Button>

            <Button
              className="rounded-full bg-[#2d6339] px-5 hover:bg-[#214e2d]"
              asChild
            >
              <Link href="/cart">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart ({totalItems})
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* PRODUCT */}
      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          {/* BACK */}
          <Link
            href="/#products"
            className="mb-10 inline-flex items-center text-sm font-semibold text-[#55735b] transition-colors hover:text-[#2d6339]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* IMAGE */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <div className="relative overflow-hidden rounded-[40px] bg-[#e2eadb] p-6 shadow-[0_30px_80px_rgba(44,76,49,.10)]">
                <div className="absolute left-7 top-7 z-10">
                  <Badge className="rounded-full bg-white/90 px-4 py-2 text-[#35613e]">
                    Local harvest
                  </Badge>
                </div>

                <div className="flex min-h-[500px] items-center justify-center rounded-[32px] bg-[#d8e5cf]">
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-[150px] sm:text-[190px]"
                  >
                    {product.emoji}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* DETAILS */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="flex flex-col justify-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                {product.category}
              </p>

              <h1 className="mt-3 text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
                {product.name}
              </h1>

              <p className="mt-6 text-lg leading-8 text-[#65756a]">
                {product.description}
              </p>

              {/* PRICE */}
              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-bold">
                  ₹{product.price}
                </span>

                <span className="mb-1 text-[#78857c]">
                  / {product.unit}
                </span>
              </div>

              {/* TRUST */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-[#dce5d8] bg-white p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                      <Check className="h-4 w-4 text-[#47744b]" />
                    </div>

                    <span className="text-sm font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* QUANTITY */}
              <div className="mt-9 flex items-center gap-4">
                <div className="flex items-center rounded-full border border-[#ccd8c9] bg-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-10 text-center font-semibold">
                    {quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-[#758178]">
                  {product.unit}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  onClick={addToCart}
                  className="h-14 flex-1 rounded-full bg-[#2d6339] text-base shadow-lg shadow-[#2d6339]/15 hover:bg-[#214e2d]"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />

                  {added
                    ? "Added to Cart ✓"
                    : `Add to Cart · ₹${total}`}
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-14 w-14 rounded-full border-[#bfcdbb]"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* SUCCESS MESSAGE */}
              {added && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 rounded-2xl bg-[#e7f0e1] p-4 text-sm font-medium text-[#35613e]"
                >
                  Product added to your cart.
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="border-y border-[#dce5d8] bg-white/60 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-3">
          <Card className="rounded-[28px] border-[#dce5d8] shadow-sm">
            <CardContent className="p-7">
              <ShieldCheck className="h-8 w-8 text-[#47744b]" />

              <h3 className="mt-5 text-xl font-bold">
                Verified sourcing
              </h3>

              <p className="mt-3 leading-7 text-[#6c796f]">
                Products come through our local grower and producer
                network.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-[#dce5d8] shadow-sm">
            <CardContent className="p-7">
              <Truck className="h-8 w-8 text-[#47744b]" />

              <h3 className="mt-5 text-xl font-bold">
                Local delivery
              </h3>

              <p className="mt-3 leading-7 text-[#6c796f]">
                Delivery availability is confirmed for your area before
                processing.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-[#dce5d8] shadow-sm">
            <CardContent className="p-7">
              <Check className="h-8 w-8 text-[#47744b]" />

              <h3 className="mt-5 text-xl font-bold">
                Confirmed before payment
              </h3>

              <p className="mt-3 leading-7 text-[#6c796f]">
                We confirm availability, price and delivery before your
                order is processed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* STORY */}
      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
            About this product
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Food with a story.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#66756b]">
            {product.longDescription}
          </p>

          <div className="mt-10 rounded-[30px] bg-[#234f32] p-8 text-white sm:p-10">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b8d3ad]">
              Ahaar Kutumbam
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              From local harvests to nearby homes.
            </h3>

            <p className="mt-4 max-w-2xl leading-7 text-[#c8d9c4]">
              Amruta Dhaanya is built around a simple idea: local
              growers, local families and honest availability can create
              a better food network together.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#172c1d] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 sm:flex-row">
          <div>
            <div className="font-bold">Amruta Dhaanya</div>

            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9caf9d]">
              An Ahaar Kutumbam Initiative
            </div>
          </div>

          <Link
            href="/"
            className="text-sm text-[#b7c4b9] hover:text-white"
          >
            Return to Home →
          </Link>
        </div>
      </footer>
    </main>
  );
}