import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#f8f7f1] text-[#24352a]">
      {/* Header */}
      <header className="border-b border-[#dfe5d8] bg-[#f8f7f1]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2d6339] text-2xl">
              🌱
            </div>

            <div>
              <div className="text-lg font-bold">
                Amruta Dhaanya
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#71836e]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#35633d] hover:text-[#214e2d]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Page */}
      <div className="mx-auto max-w-[1000px] px-5 py-16 lg:px-8 lg:py-24">
        {/* Title */}
        <div className="rounded-[32px] bg-[#234f32] p-8 text-white sm:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
            <ShieldCheck className="h-7 w-7 text-[#c8ddc2]" />
          </div>

          <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#b8d3ad]">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-[#c9d9c5]">
            Please read these terms carefully before using
            Amruta Dhaanya or participating in our local
            harvest network.
          </p>

          <p className="mt-6 text-sm text-[#b8d3ad]">
            Last updated: 2026
          </p>
        </div>

        {/* Content */}
        <article className="mt-10 rounded-[32px] border border-[#dce5d8] bg-white p-7 shadow-sm sm:p-10 lg:p-12">
          <section>
            <h2 className="text-2xl font-bold">
              1. Introduction
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Amruta Dhaanya is an initiative of Ahaar Kutumbam
              created to connect local growers, producers and
              nearby households through a transparent and
              community-oriented marketplace.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              By accessing or using this website, you agree to
              follow these Terms of Service. If you do not agree
              with these terms, please do not use the website or
              our services.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              2. About Our Marketplace
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Amruta Dhaanya is designed around genuine local
              availability. We do not operate as a conventional
              warehouse-based quick-commerce platform.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Products displayed on the website may depend on
              current availability from participating growers,
              producers and local sellers.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              3. Product Availability
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Product availability, quantity and pricing may
              change based on actual local supply.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Where applicable, we may confirm availability,
              final pricing and delivery details with you before
              an order is processed.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              4. Product Information
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              We make reasonable efforts to provide accurate
              product descriptions and availability information.
              However, agricultural products are naturally subject
              to variations in size, appearance, seasonality and
              availability.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              5. Orders and Confirmation
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Submitting an enquiry or order request does not
              necessarily mean that the order has been accepted.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              An order may be considered confirmed only after
              availability, price and delivery details have been
              verified where such confirmation is required.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              6. Pricing
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Prices shown on the website may be subject to
              change depending on local supply, quantity,
              availability and other applicable factors.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Where a final price needs to be confirmed, we will
              communicate the applicable price before processing
              the order.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              7. Payments
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Payment methods may vary depending on the service
              and location available at the time of ordering.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              If an order requires confirmation before payment,
              payment should not be considered due until the
              applicable confirmation has been provided.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              8. Delivery and Pickup
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Delivery and pickup availability depends on the
              location, product and local operating conditions.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Delivery times communicated by Amruta Dhaanya are
              estimates and may change because of weather,
              availability, transportation or other circumstances
              outside our reasonable control.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              9. Grower and Seller Participation
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Individuals or households participating as growers
              or local sellers are expected to provide truthful
              information about their products and availability.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Amruta Dhaanya may review, reject, suspend or remove
              listings that do not meet our operational,
              quality or trust requirements.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              10. User Responsibilities
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Users agree to provide accurate information when
              submitting enquiries, orders, grower registrations
              or other forms through the website.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Users must not misuse the website, attempt to
              interfere with its operation, submit fraudulent
              information or use the platform for unlawful
              purposes.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              11. Website Content
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              Content on this website, including text, branding,
              graphics, design elements and other materials, may
              belong to Amruta Dhaanya or its respective owners
              and may not be reproduced or used without
              appropriate permission.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              12. Limitation of Service
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              We aim to provide a reliable and transparent local
              marketplace, but we cannot guarantee uninterrupted
              website availability or that every product will be
              available at all times.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Agricultural supply can be affected by seasonal
              conditions, weather, production levels,
              transportation and other factors.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              13. Changes to These Terms
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              We may update these Terms of Service from time to
              time as the Amruta Dhaanya platform and services
              develop.
            </p>

            <p className="mt-4 leading-8 text-[#65736a]">
              Updated terms will be published on this page with
              an updated date where appropriate.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              14. Contact
            </h2>

            <p className="mt-4 leading-8 text-[#65736a]">
              If you have questions regarding these Terms of
              Service, you can contact Amruta Dhaanya through
              the Contact Us page.
            </p>

            <div className="mt-6 rounded-2xl bg-[#eef3e9] p-6">
              <p className="font-semibold text-[#315b39]">
                Amruta Dhaanya
              </p>

              <p className="mt-2 text-sm leading-6 text-[#65736a]">
                An Ahaar Kutumbam Initiative
                <br />
                Vangapahad, Warangal, Telangana 506006
                <br />
                Phone: +91 9177751088
                <br />
                Email: amrutadhaanya@gmail.com
              </p>
            </div>
          </section>
        </article>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/legal"
            className="text-sm font-semibold text-[#35633d] hover:text-[#214e2d]"
          >
            ← Legal &amp; Policies
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-[#35633d] hover:text-[#214e2d]"
          >
            Back to Amruta Dhaanya
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#172c1d] px-5 py-10 text-center text-sm text-[#9caf9d]">
        © 2026 Amruta Dhaanya. All rights reserved.
      </footer>
    </main>
  );
}