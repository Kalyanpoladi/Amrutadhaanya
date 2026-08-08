"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert("Please fill in your name, phone number and message.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#203127]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8]/80 bg-[#f8f7f1]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
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

          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-[#376540] px-5 py-2.5 text-sm font-medium text-[#2e5b39] transition-colors hover:bg-[#e7f0e1]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="px-5 pb-14 pt-16 lg:px-8 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1180px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Contact Us
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              We&apos;d love to hear from you.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#66756b]">
              Have a question about today&apos;s harvest, delivery, growers,
              or Amruta Dhaanya? Reach out to us. We&apos;re happy to help.
            </p>
          </motion.div>

          {/* CONTACT CONTENT */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* CONTACT DETAILS */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              {/* PHONE */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                    <Phone className="h-5 w-5 text-[#2d6339]" />
                  </div>

                  <div>
                    <h2 className="font-bold">Call Us</h2>

                    <p className="mt-2 text-sm leading-6 text-[#718078]">
                      Speak with us directly for questions about products,
                      availability and delivery.
                    </p>

                    <a
                      href="tel:+919177751088"
                      className="mt-4 inline-block font-semibold text-[#2d6339] hover:underline"
                    >
                      +91 9177751088
                    </a>
                  </div>
                </div>
              </div>

              {/* WHATSAPP */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                    <MessageCircle className="h-5 w-5 text-[#2d6339]" />
                  </div>

                  <div>
                    <h2 className="font-bold">WhatsApp</h2>

                    <p className="mt-2 text-sm leading-6 text-[#718078]">
                      Send us a message on WhatsApp for quick assistance.
                    </p>

                    <a
                      href="https://wa.me/919177751088"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center font-semibold text-[#2d6339] hover:underline"
                    >
                      Chat on WhatsApp
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                    </a>
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                    <Mail className="h-5 w-5 text-[#2d6339]" />
                  </div>

                  <div>
                    <h2 className="font-bold">Email Us</h2>

                    <p className="mt-2 text-sm leading-6 text-[#718078]">
                      Send us your questions or feedback by email.
                    </p>

                    <a
                      href="mailto:amrutadhaanya@gmail.com"
                      className="mt-4 inline-block break-all font-semibold text-[#2d6339] hover:underline"
                    >
                      amrutadhaanya@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e7f0e1]">
                    <MapPin className="h-5 w-5 text-[#2d6339]" />
                  </div>

                  <div>
                    <h2 className="font-bold">Our Location</h2>

                    <p className="mt-2 text-sm leading-6 text-[#718078]">
                      Vangapahad, Warangal,
                      <br />
                      Telangana 506006
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
                {!submitted ? (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold">
                        Send us a message
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-[#748079]">
                        Fill in the details below and tell us how we can help.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="mt-8 space-y-6"
                    >
                      {/* NAME */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Full name *
                        </label>

                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(event) =>
                            setName(event.target.value)
                          }
                          placeholder="Enter your full name"
                          className="h-12 w-full rounded-xl border border-[#d4dfd0] bg-white px-4 text-sm outline-none transition focus:border-[#2d6339] focus:ring-2 focus:ring-[#2d6339]/10"
                        />
                      </div>

                      {/* PHONE */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Phone number *
                        </label>

                        <input
                          id="contact-phone"
                          type="tel"
                          inputMode="numeric"
                          value={phone}
                          onChange={(event) =>
                            setPhone(event.target.value)
                          }
                          placeholder="Enter your phone number"
                          className="h-12 w-full rounded-xl border border-[#d4dfd0] bg-white px-4 text-sm outline-none transition focus:border-[#2d6339] focus:ring-2 focus:ring-[#2d6339]/10"
                        />
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Email address
                        </label>

                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(event) =>
                            setEmail(event.target.value)
                          }
                          placeholder="Enter your email address"
                          className="h-12 w-full rounded-xl border border-[#d4dfd0] bg-white px-4 text-sm outline-none transition focus:border-[#2d6339] focus:ring-2 focus:ring-[#2d6339]/10"
                        />
                      </div>

                      {/* MESSAGE */}
                      <div>
                        <label
                          htmlFor="contact-message"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Message *
                        </label>

                        <textarea
                          id="contact-message"
                          value={message}
                          onChange={(event) =>
                            setMessage(event.target.value)
                          }
                          placeholder="How can we help you?"
                          rows={6}
                          className="w-full resize-none rounded-xl border border-[#d4dfd0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2d6339] focus:ring-2 focus:ring-[#2d6339]/10"
                        />
                      </div>

                      {/* SUBMIT */}
                      <button
                        type="submit"
                        className="flex h-14 w-full items-center justify-center rounded-full bg-[#2d6339] px-6 text-base font-semibold text-white shadow-lg shadow-[#2d6339]/15 transition-colors hover:bg-[#214e2d]"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </button>

                      <p className="text-center text-xs leading-5 text-[#87928a]">
                        We&apos;ll get back to you as soon as possible.
                      </p>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[500px] flex-col items-center justify-center text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e7f0e1]">
                      <CheckCircle2 className="h-10 w-10 text-[#2d6339]" />
                    </div>

                    <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                      Message received
                    </p>

                    <h2 className="mt-3 text-3xl font-bold">
                      Thank you, {name}!
                    </h2>

                    <p className="mt-4 max-w-md leading-7 text-[#68766d]">
                      Your message has been recorded. We&apos;ll get back to
                      you using the contact details you provided.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setPhone("");
                        setEmail("");
                        setMessage("");
                      }}
                      className="mt-8 rounded-full border border-[#376540] px-6 py-3 text-sm font-semibold text-[#2e5b39] transition-colors hover:bg-[#e7f0e1]"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#dce5d8] bg-[#eef4ea] px-5 py-12 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <div className="text-3xl">🌱</div>

              <h3 className="mt-3 font-bold">
                Local growers
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#718078]">
                Connected with growers through our local network.
              </p>
            </div>

            <div>
              <div className="text-3xl">🤝</div>

              <h3 className="mt-3 font-bold">
                Honest communication
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#718078]">
                We confirm availability and details before processing.
              </p>
            </div>

            <div>
              <div className="text-3xl">🏡</div>

              <h3 className="mt-3 font-bold">
                Nearby homes
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#718078]">
                Built around local harvests and local delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#172c1d] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[1.7fr_0.8fr_0.8fr]">
            {/* BRAND */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#286039] text-2xl">
                  🌱
                </div>

                <div>
                  <div className="text-lg font-bold tracking-tight">
                    Amruta Dhaanya
                  </div>

                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#9caf9d]">
                    An Ahaar Kutumbam Initiative
                  </div>
                </div>
              </Link>

              <p className="mt-7 max-w-xl text-base leading-7 text-[#c3d0c5]">
                Fresh, traditional food sourced directly from growers —
                selected carefully, handled honestly and shared through a
                trusted local network.
              </p>

              <div className="mt-7 space-y-3 text-sm text-[#b9c8bc]">
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+919177751088"
                    className="hover:text-white"
                  >
                    +91 9177751088
                  </a>
                </p>

                <p>
                  Email:{" "}
                  <a
                    href="mailto:amrutadhaanya@gmail.com"
                    className="hover:text-white"
                  >
                    amrutadhaanya@gmail.com
                  </a>
                </p>

                <p>
                  Location: Vangapahad, Warangal, Telangana 506006
                </p>
              </div>
            </div>

            {/* EXPLORE */}
            <div>
              <h3 className="text-base font-bold">
                Explore
              </h3>

              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Home
                </Link>

                <Link
                  href="/fresh-list"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Today&apos;s Fresh List
                </Link>

                <Link
                  href="/fresh-baskets"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Fresh Baskets
                </Link>

                <Link
                  href="/share-your-harvest"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Share Your Harvest
                </Link>

                <Link
                  href="/about"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  About Us
                </Link>
              </nav>
            </div>

            {/* TRUST */}
            <div>
              <h3 className="text-base font-bold">
                Trust
              </h3>

              <nav className="mt-6 flex flex-col gap-4">
                <Link
                  href="/#purpose"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Our Purpose
                </Link>

                <Link
                  href="/share-your-harvest"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Become a Grower
                </Link>

                <Link
                  href="/faq"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  FAQs
                </Link>

                {/* CONTACT US */}
                <Link
                  href="/contact-us"
                  className="text-sm font-medium uppercase tracking-[0.08em] text-[#b9c8bc] hover:text-white"
                >
                  Contact Us
                </Link>

                <Link
                  href="/legal"
                  className="text-sm text-[#b9c8bc] hover:text-white"
                >
                  Legal &amp; Policies
                </Link>
              </nav>
            </div>
          </div>

          <div className="mt-12 border-t border-[#35503b]" />

          <div className="flex flex-col justify-between gap-4 pt-7 text-xs text-[#8fa397] sm:flex-row">
            <p>
              © {new Date().getFullYear()} Amruta Dhaanya. All rights
              reserved.
            </p>

            <p>
              A trusted local harvest network, built around real daily
              availability and community care.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}