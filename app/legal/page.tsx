import Link from "next/link";
import { ArrowRight, FileText, Lock, ShieldCheck } from "lucide-react";

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#24352a]">
      {/* HEADER */}
      <section className="border-b border-[#dce5d8] bg-[#eef3e9]">
        <div className="mx-auto max-w-[1100px] px-5 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              Amruta Dhaanya
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              Legal & Policies
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#68766d]">
              Transparency and trust are important to us. This page
              provides information about the policies and terms that
              govern the use of the Amruta Dhaanya platform and services.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-[1100px]">
          {/* INTRODUCTION */}
          <div className="rounded-[32px] border border-[#dce5d8] bg-white p-8 shadow-sm sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0e3]">
              <ShieldCheck className="h-7 w-7 text-[#35633d]" />
            </div>

            <h2 className="mt-7 text-3xl font-bold tracking-tight">
              Our commitment to transparency
            </h2>

            <div className="mt-6 space-y-5 text-[16px] leading-8 text-[#68766d]">
              <p>
                Amruta Dhaanya is an initiative of Ahaar Kutumbam created
                to connect local growers, producers and nearby families
                through a more transparent and responsible local food
                network.
              </p>

              <p>
                We believe that customers should understand how our
                platform works, what information may be collected, and
                what terms apply when using our website and services.
              </p>

              <p>
                The policies provided on this page are intended to make
                our practices clear and help build a trustworthy
                relationship between Amruta Dhaanya, growers,
                participating sellers and customers.
              </p>
            </div>
          </div>

          {/* IMPORTANT INFORMATION */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e3]">
                <ShieldCheck className="h-6 w-6 text-[#35633d]" />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Trust & Transparency
              </h3>

              <p className="mt-3 leading-7 text-[#68766d]">
                We aim to communicate clearly about product
                availability, seller participation, confirmation and
                delivery.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e3]">
                <FileText className="h-6 w-6 text-[#35633d]" />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Terms & Conditions
              </h3>

              <p className="mt-3 leading-7 text-[#68766d]">
                Our Terms of Service explain the rules and conditions
                that apply when using the Amruta Dhaanya platform.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e3]">
                <Lock className="h-6 w-6 text-[#35633d]" />
              </div>

              <h3 className="mt-5 text-xl font-bold">
                Privacy
              </h3>

              <p className="mt-3 leading-7 text-[#68766d]">
                Our Privacy Policy explains how information may be
                collected, used and protected when you interact with us.
              </p>
            </div>
          </div>

          {/* GENERAL POLICY INFORMATION */}
          <div className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
              General Information
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How our platform works
            </h2>

            <div className="mt-8 space-y-8">
              {/* 01 */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
                <div className="flex gap-5">
                  <span className="text-sm font-bold text-[#70915f]">
                    01
                  </span>

                  <div>
                    <h3 className="text-xl font-bold">
                      Local availability
                    </h3>

                    <p className="mt-3 leading-7 text-[#68766d]">
                      Amruta Dhaanya does not operate as a conventional
                      warehouse-based quick-commerce platform. Products
                      are presented based on genuine availability from
                      participating local growers and sellers.
                    </p>
                  </div>
                </div>
              </div>

              {/* 02 */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
                <div className="flex gap-5">
                  <span className="text-sm font-bold text-[#70915f]">
                    02
                  </span>

                  <div>
                    <h3 className="text-xl font-bold">
                      Product confirmation
                    </h3>

                    <p className="mt-3 leading-7 text-[#68766d]">
                      Availability, final pricing and delivery details
                      may need to be confirmed before an order is
                      processed. This helps us avoid promising products
                      that are no longer available.
                    </p>
                  </div>
                </div>
              </div>

              {/* 03 */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
                <div className="flex gap-5">
                  <span className="text-sm font-bold text-[#70915f]">
                    03
                  </span>

                  <div>
                    <h3 className="text-xl font-bold">
                      Grower participation
                    </h3>

                    <p className="mt-3 leading-7 text-[#68766d]">
                      Growers and local sellers may participate through
                      the Amruta Dhaanya network. Seller information may
                      be handled privately while orders remain traceable
                      within the platform&apos;s operating process.
                    </p>
                  </div>
                </div>
              </div>

              {/* 04 */}
              <div className="rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-9">
                <div className="flex gap-5">
                  <span className="text-sm font-bold text-[#70915f]">
                    04
                  </span>

                  <div>
                    <h3 className="text-xl font-bold">
                      Delivery & pickup
                    </h3>

                    <p className="mt-3 leading-7 text-[#68766d]">
                      Delivery and pickup availability may vary by
                      location, product availability and operational
                      capacity. Customers may be contacted to confirm
                      these details before an order is finalized.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED POLICIES */}
          <section className="mt-20 border-t border-[#dce5d8] pt-14">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#70915f]">
                Related Policies
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Terms & Privacy
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-[#6b786f]">
                Please review our Terms of Service and Privacy Policy
                to understand the conditions for using Amruta Dhaanya
                and how we handle information.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* TERMS OF SERVICE */}
              <Link
                href="/terms-of-service"
                className="group rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#345e3c]/10"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e3] text-[#35633d]">
                      <FileText className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold">
                      Terms of Service
                    </h3>

                    <p className="mt-3 leading-7 text-[#68766d]">
                      Understand the terms and conditions that apply
                      when using the Amruta Dhaanya website, marketplace
                      and services.
                    </p>
                  </div>

                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-[#70915f] transition-transform group-hover:translate-x-1" />
                </div>

                <div className="mt-6 font-semibold text-[#2d6339]">
                  Read Terms of Service →
                </div>
              </Link>

              {/* PRIVACY POLICY */}
              <Link
                href="/privacy-policy"
                className="group rounded-[28px] border border-[#dce5d8] bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#345e3c]/10"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e3] text-[#35633d]">
                      <Lock className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold">
                      Privacy Policy
                    </h3>

                    <p className="mt-3 leading-7 text-[#68766d]">
                      Learn what information we collect, how we use it,
                      and the steps we take to protect your information.
                    </p>
                  </div>

                  <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-[#70915f] transition-transform group-hover:translate-x-1" />
                </div>

                <div className="mt-6 font-semibold text-[#2d6339]">
                  Read Privacy Policy →
                </div>
              </Link>
            </div>
          </section>

          {/* BACK HOME */}
          <div className="mt-14 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#376540] px-6 py-3 font-semibold text-[#2e5b39] transition-colors hover:bg-[#e9f0e5]"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}