"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  /*
   * EMPTY CART
   */
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f7f1]">
        <header className="border-b border-[#dfe5d8]/80 bg-[#f8f7f1]">
          <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#286039] text-2xl">
                🌱
              </div>

              <div>
                <div className="text-lg font-bold">
                  Amruta Dhaanya
                </div>

                <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#71836e]">
                  An Ahaar Kutumbam Initiative
                </div>
              </div>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full border-[#376540] text-[#2e5b39]"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-lg text-center"
          >
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#e7f0e1] text-6xl">
              🛒
            </div>

            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              Your cart is empty
            </h1>

            <p className="mt-4 leading-7 text-[#69776e]">
              Your local harvest basket is waiting.
              Explore today&apos;s available products
              and add something fresh.
            </p>

            <Button
              size="lg"
              className="mt-8 rounded-full bg-[#2d6339] px-8 hover:bg-[#214e2d]"
              asChild
            >
              <Link href="/">
                Explore Products
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>
    );
  }

  /*
   * CART
   */
  return (
    <main className="min-h-screen bg-[#f8f7f1]">
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
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
              <div className="text-lg font-bold">
                Amruta Dhaanya
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#71836e]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          <div className="rounded-full bg-[#e7f0e1] px-5 py-2 text-sm font-semibold text-[#35633d]">
            Cart ({totalItems})
          </div>
        </div>
      </header>

      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-[#55735b] hover:text-[#2d6339]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue shopping
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Your harvest basket
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Your Cart
            </h1>

            <p className="mt-3 text-[#69776e]">
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              selected.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_390px]">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <Card className="overflow-hidden rounded-[28px] border-[#dce5d8] bg-white shadow-sm">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex gap-5">
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#e2eadb] text-6xl sm:h-32 sm:w-32">
                          {item.emoji}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-xl font-bold">
                                {item.name}
                              </h2>

                              <p className="mt-1 text-sm text-[#77827b]">
                                ₹{item.price} /{" "}
                                {item.unit}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(item.id)
                              }
                              className="rounded-full p-2 text-[#8a948d] transition-colors hover:bg-red-50 hover:text-red-600"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-[#ccd8c9] bg-[#f8f9f5]">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>

                              <span className="w-9 text-center text-sm font-semibold">
                                {item.quantity}
                              </span>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-lg font-bold">
                              ₹
                              {(
                                item.price *
                                item.quantity
                              ).toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div>
              <Card className="sticky top-28 rounded-[30px] border-[#dce5d8] bg-white shadow-sm">
                <CardContent className="p-7">
                  <h2 className="text-2xl font-bold">
                    Order Summary
                  </h2>

                  <div className="mt-7 space-y-4">
                    <div className="flex justify-between text-[#68766d]">
                      <span>Items</span>
                      <span>{totalItems}</span>
                    </div>

                    <div className="flex justify-between text-[#68766d]">
                      <span>Subtotal</span>

                      <span>
                        ₹
                        {subtotal.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-[#68766d]">
                      <span>Delivery</span>

                      <span className="font-medium text-[#47744b]">
                        Confirmed later
                      </span>
                    </div>

                    <div className="border-t border-[#e0e6dc] pt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          Estimated total
                        </span>

                        <span className="text-2xl font-bold text-[#2d6339]">
                          ₹
                          {total.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="mt-7 h-14 w-full rounded-full bg-[#2d6339] text-base shadow-lg shadow-[#2d6339]/15 hover:bg-[#214e2d]"
                    asChild
                  >
                    <Link href="/checkout">
                      Continue to Checkout
                      <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                    </Link>
                  </Button>

                  <p className="mt-4 text-center text-xs leading-5 text-[#7b867f]">
                    Availability, final price and delivery
                    will be confirmed before payment.
                  </p>

                  <div className="mt-7 space-y-4 border-t border-[#e0e6dc] pt-6">
                    <div className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-[#47744b]" />

                      <div>
                        <div className="text-sm font-semibold">
                          Verified local sourcing
                        </div>

                        <div className="mt-1 text-xs text-[#78847c]">
                          Products come through our local
                          network.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Truck className="h-5 w-5 shrink-0 text-[#47744b]" />

                      <div>
                        <div className="text-sm font-semibold">
                          Local delivery
                        </div>

                        <div className="mt-1 text-xs text-[#78847c]">
                          Delivery is confirmed before
                          processing.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}