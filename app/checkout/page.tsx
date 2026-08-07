"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Check,
  MapPin,
  Phone,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [pincode, setPincode] = useState("");
  const [notes, setNotes] = useState("");

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  function placeOrder() {
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanAddress = address.trim();
    const cleanArea = area.trim();
    const cleanPincode = pincode.trim();

    if (
      !cleanName ||
      !cleanPhone ||
      !cleanAddress ||
      !cleanArea ||
      !cleanPincode
    ) {
      alert("Please fill in all required details.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!/^\d{10}$/.test(cleanPhone.replace(/\D/g, ""))) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(cleanPincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return;
    }

    setPlacingOrder(true);

    window.setTimeout(() => {
      const generatedOrderNumber = `AD-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      setOrderNumber(generatedOrderNumber);
      setOrderPlaced(true);
      setPlacingOrder(false);
      clearCart();
    }, 1200);
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#f8f7f1] text-[#1f2a22]">
        <header className="border-b border-[#dfe5d8]/80 bg-[#f8f7f1]">
          <div className="mx-auto flex h-[76px] max-w-[1280px] items-center px-5 lg:px-8">
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
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-76px)] items-center px-5 py-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-3xl"
          >
            <Card className="rounded-[36px] border-[#dce5d8] bg-white text-center shadow-sm">
              <CardContent className="px-7 py-12 sm:px-12 sm:py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                    stiffness: 180,
                  }}
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e7f0e1]"
                >
                  <Check className="h-12 w-12 text-[#2d6339]" />
                </motion.div>

                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                  Order received
                </p>

                <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                  Thank you, {name}!
                </h1>

                <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-[#66756b]">
                  Your request has been received. We will confirm availability,
                  final price and delivery with you before processing the order.
                </p>

                <div className="mx-auto mt-8 max-w-md rounded-3xl bg-[#eef4ea] p-6">
                  <div className="text-sm text-[#718078]">Order reference</div>

                  <div className="mt-2 text-2xl font-bold tracking-wider text-[#2d6339]">
                    {orderNumber}
                  </div>

                  <div className="mt-4 text-sm text-[#718078]">
                    Payment method
                  </div>

                  <div className="mt-1 font-semibold">Cash on Delivery</div>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#2d6339] px-7 hover:bg-[#214e2d]"
                  >
                    <Link href="/">Continue Shopping</Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[#376540] px-7 text-[#2e5b39]"
                  >
                    <Link href="/about">About Amruta Dhaanya</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f7f1] text-[#1f2a22]">
        <header className="border-b border-[#dfe5d8]/80 bg-[#f8f7f1]">
          <div className="mx-auto flex h-[76px] max-w-[1280px] items-center px-5 lg:px-8">
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
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-76px)] items-center px-5 py-16 lg:px-8">
          <Card className="mx-auto w-full max-w-2xl rounded-[36px] border-[#dce5d8] bg-white text-center shadow-sm">
            <CardContent className="px-7 py-14 sm:px-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f0e1] text-4xl">
                🧺
              </div>

              <h1 className="mt-7 text-4xl font-bold">Your cart is empty</h1>

              <p className="mt-4 leading-7 text-[#68766d]">
                Add something from today&apos;s local harvest before continuing
                to checkout.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-[#2d6339] px-7 hover:bg-[#214e2d]"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#1f2a22]">
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
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

          <Button
            asChild
            variant="outline"
            className="rounded-full border-[#376540] text-[#2e5b39]"
          >
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>
      </header>

      <section className="px-5 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Checkout
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Complete your order
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#66756b]">
              Tell us where to deliver your harvest. We confirm availability,
              final price and delivery before processing your order.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-[32px] border-[#dce5d8] bg-white shadow-sm">
                <CardHeader className="p-7 sm:p-8">
                  <CardTitle className="text-2xl">
                    Delivery details
                  </CardTitle>

                  <p className="text-sm text-[#748079]">
                    Fields marked with * are required.
                  </p>
                </CardHeader>

                <CardContent className="space-y-6 px-7 pb-8 sm:px-8">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name *</Label>

                    <Input
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 rounded-xl border-[#d4dfd0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number *</Label>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#829087]" />

                      <Input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Enter your 10-digit phone number"
                        className="h-12 rounded-xl border-[#d4dfd0] pl-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery address *</Label>

                    <Textarea
                      id="address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="House number, street, village / locality"
                      className="min-h-[110px] resize-none rounded-xl border-[#d4dfd0]"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="area">Area / Locality *</Label>

                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#829087]" />

                        <Input
                          id="area"
                          value={area}
                          onChange={(event) => setArea(event.target.value)}
                          placeholder="e.g. Hanamkonda"
                          className="h-12 rounded-xl border-[#d4dfd0] pl-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode *</Label>

                      <Input
                        id="pincode"
                        inputMode="numeric"
                        maxLength={6}
                        value={pincode}
                        onChange={(event) =>
                          setPincode(
                            event.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                        placeholder="506001"
                        className="h-12 rounded-xl border-[#d4dfd0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional notes</Label>

                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Landmark, preferred delivery time, or anything else..."
                      className="min-h-[100px] resize-none rounded-xl border-[#d4dfd0]"
                    />
                  </div>

                  <div>
                    <Label>Payment method</Label>

                    <div className="mt-3 rounded-2xl border-2 border-[#2d6339] bg-[#eef4ea] p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                          💵
                        </div>

                        <div>
                          <div className="font-semibold text-[#2d6339]">
                            Cash on Delivery
                          </div>

                          <p className="mt-1 text-sm text-[#68766d]">
                            Pay when your order is delivered.
                          </p>
                        </div>

                        <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-[#2d6339]">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#dce5d8] bg-[#f7faf5] p-5">
                    <div className="flex gap-4">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#47744b]" />

                      <div>
                        <div className="font-semibold">
                          Confirmed before payment
                        </div>

                        <p className="mt-1 text-sm leading-6 text-[#718078]">
                          We will confirm product availability, final price and
                          delivery with you before processing your order.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    disabled={placingOrder}
                    onClick={placeOrder}
                    className="h-14 w-full rounded-full bg-[#2d6339] text-base shadow-lg shadow-[#2d6339]/15 hover:bg-[#214e2d]"
                  >
                    {placingOrder ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="mr-2 h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        />

                        Confirming Order...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Place Order · ₹{total}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <Card className="rounded-[32px] border-[#dce5d8] bg-white shadow-sm">
                <CardHeader className="p-7">
                  <CardTitle className="text-2xl">Your order</CardTitle>

                  <p className="text-sm text-[#748079]">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </p>
                </CardHeader>

                <CardContent className="px-7 pb-7">
                  <div className="space-y-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e7efe2] text-3xl">
                          {item.emoji}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="font-semibold">{item.name}</div>

                          <div className="mt-1 text-sm text-[#78857c]">
                            ₹{item.price} / {item.unit}
                          </div>

                          <div className="mt-1 text-sm text-[#78857c]">
                            Quantity: {item.quantity}
                          </div>
                        </div>

                        <div className="font-semibold">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="my-7 border-t border-[#e0e7dc]" />

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#718078]">Subtotal</span>
                      <span className="font-medium">₹{subtotal}</span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-[#718078]">Delivery</span>

                      <span className="text-right font-medium text-[#47744b]">
                        Confirmed before processing
                      </span>
                    </div>
                  </div>

                  <div className="my-7 border-t border-[#e0e7dc]" />

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm text-[#718078]">Order total</div>

                      <div className="mt-1 text-3xl font-bold">₹{total}</div>
                    </div>

                    <div className="rounded-full bg-[#e7f0e1] px-4 py-2 text-xs font-semibold text-[#35633d]">
                      COD
                    </div>
                  </div>

                  <div className="mt-7 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#f5f8f2] p-4">
                      <Truck className="h-5 w-5 shrink-0 text-[#47744b]" />

                      <span className="text-sm text-[#65736a]">
                        Local delivery availability confirmed before processing
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl bg-[#f5f8f2] p-4">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-[#47744b]" />

                      <span className="text-sm text-[#65736a]">
                        Products sourced through our local network
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="mt-5 text-center text-xs leading-5 text-[#87928a]">
                By placing your order, you agree that availability, final price
                and delivery will be confirmed before processing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-[#172c1d] px-5 py-10 text-white lg:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 sm:flex-row">
          <div>
            <div className="font-bold">Amruta Dhaanya</div>

            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[#9caf9d]">
              An Ahaar Kutumbam Initiative
            </div>
          </div>

          <div className="text-sm text-[#9caf9d]">
            From local harvests to nearby homes.
          </div>
        </div>
      </footer>
    </main>
  );
}