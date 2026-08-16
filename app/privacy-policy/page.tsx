import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f6f5ef] text-[#24352a]">
      {/* Header */}
      <header className="border-b border-[#e2e6dc] bg-[#f6f5ef]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#315d38] text-lg font-bold text-white">
              A
            </div>

            <div>
              <div className="text-lg font-bold tracking-tight text-[#24352a]">
                Amruta Dhaanya
              </div>
              <div className="text-xs font-medium tracking-wide text-[#71836f]">
                An Ahaar Kutumbam Initiative
              </div>
            </div>
          </Link>

          <Link
            href="/"
            className="hidden rounded-full border border-[#cfd9ca] px-5 py-2.5 text-sm font-semibold text-[#315d38] transition hover:bg-white sm:inline-flex"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#e2e6dc] bg-[#eef1e8]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6e8a62]">
              Legal & Policies
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#24352a] sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#657267] sm:text-lg">
              We respect your privacy and are committed to handling your
              information responsibly as we connect local growers, families,
              and fresh harvests.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#718078]">
              <span className="rounded-full bg-white px-4 py-2 font-medium shadow-sm">
                Last updated: 2026
              </span>

              <span className="text-[#9aa59d]">•</span>

              <span>Amruta Dhaanya</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,760px)] lg:items-start lg:justify-center">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-[#dfe6da] bg-white p-5 shadow-[0_8px_30px_rgba(36,53,42,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#79906f]">
                On this page
              </p>

              <nav className="mt-4 space-y-1 text-sm">
                <a
                  href="#introduction"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Introduction
                </a>

                <a
                  href="#information"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Information We Collect
                </a>

                <a
                  href="#use"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  How We Use Information
                </a>

                <a
                  href="#communication"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  WhatsApp & Communication
                </a>

                <a
                  href="#sharing"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Information Sharing
                </a>

                <a
                  href="#growers"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Grower Information
                </a>

                <a
                  href="#security"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Data Security
                </a>

                <a
                  href="#cookies"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Cookies
                </a>

                <a
                  href="#third-party"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Third-Party Services
                </a>

                <a
                  href="#choices"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Your Choices
                </a>

                <a
                  href="#changes"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Changes
                </a>

                <a
                  href="#contact"
                  className="block rounded-lg px-3 py-2 text-[#526258] hover:bg-[#f2f5ef] hover:text-[#315d38]"
                >
                  Contact Us
                </a>
              </nav>
            </div>
          </aside>

          {/* Policy */}
          <article className="rounded-3xl border border-[#e0e6dc] bg-white px-6 py-8 shadow-[0_12px_40px_rgba(36,53,42,0.05)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="space-y-12 leading-8 text-[#56665b]">
              <section id="introduction">
                <SectionTitle number="01" title="Introduction" />

                <p className="mt-5">
                  Amruta Dhaanya, an Ahaar Kutumbam Initiative, respects your
                  privacy and is committed to protecting the information you
                  share with us while using our website and services.
                </p>

                <p className="mt-4">
                  This Privacy Policy explains what information we may collect,
                  how we use it, how we protect it, and the choices available
                  to you.
                </p>
              </section>

              <section id="information">
                <SectionTitle number="02" title="Information We Collect" />

                <p className="mt-5">
                  Depending on how you interact with Amruta Dhaanya, we may
                  collect information such as your name, phone number, email
                  address, delivery address, locality, order information,
                  grower information, and messages or enquiries you send to us.
                </p>

                <p className="mt-4">
                  We only seek information that is reasonably necessary to
                  provide our services, communicate with you, process enquiries
                  and orders, and operate our local marketplace.
                </p>
              </section>

              <section id="use">
                <SectionTitle number="03" title="How We Use Your Information" />

                <ul className="mt-5 space-y-3 pl-5 marker:text-[#6d8b62]">
                  <li>To respond to enquiries and requests.</li>
                  <li>To confirm product availability and pricing.</li>
                  <li>To process and coordinate orders.</li>
                  <li>To arrange delivery or pickup.</li>
                  <li>To communicate important information about your order.</li>
                  <li>To onboard and communicate with grower partners.</li>
                  <li>To improve our website and services.</li>
                  <li>
                    To maintain records necessary for legitimate business
                    operations.
                  </li>
                </ul>
              </section>

              <section id="communication">
                <SectionTitle number="04" title="WhatsApp and Communication" />

                <p className="mt-5">
                  Some Amruta Dhaanya services may use WhatsApp or other
                  communication channels to confirm availability, orders,
                  delivery details, or customer enquiries.
                </p>

                <p className="mt-4">
                  When you choose to contact us through an external
                  communication platform, that platform may process your
                  information according to its own privacy policy and terms.
                </p>
              </section>

              <section id="sharing">
                <SectionTitle number="05" title="Information Sharing" />

                <div className="mt-5 rounded-2xl bg-[#f1f5ed] p-5 font-semibold text-[#315d38]">
                  We do not sell your personal information.
                </div>

                <p className="mt-5">
                  Information may be shared with trusted service providers,
                  delivery partners, or relevant participants in the Amruta
                  Dhaanya network when reasonably necessary to fulfil an order,
                  coordinate delivery, provide a requested service, or comply
                  with applicable law.
                </p>

                <p className="mt-4">
                  We aim to share only the information reasonably necessary for
                  the particular purpose.
                </p>
              </section>

              <section id="growers">
                <SectionTitle number="06" title="Grower and Seller Information" />

                <p className="mt-5">
                  Growers and local sellers may provide information during the
                  onboarding process. We may use internal seller or service
                  codes to help maintain traceability while limiting
                  unnecessary public disclosure of personal information.
                </p>
              </section>

              <section id="security">
                <SectionTitle number="07" title="Data Security" />

                <p className="mt-5">
                  We take reasonable steps to protect information against
                  unauthorized access, misuse, alteration, disclosure, or
                  destruction.
                </p>

                <p className="mt-4">
                  However, no website, electronic communication system, or
                  method of storage can be guaranteed to be completely secure.
                </p>
              </section>

              <section id="cookies">
                <SectionTitle
                  number="08"
                  title="Cookies and Website Technologies"
                />

                <p className="mt-5">
                  Our website may use cookies or similar technologies where
                  necessary for functionality, security, preferences,
                  analytics, or improving the user experience.
                </p>
              </section>

              <section id="third-party">
                <SectionTitle number="09" title="Third-Party Services" />

                <p className="mt-5">
                  Our website or services may use third-party services for
                  communication, hosting, analytics, payments, maps, delivery,
                  or other operational purposes. Those services may process
                  information according to their respective policies.
                </p>
              </section>

              <section id="choices">
                <SectionTitle number="10" title="Your Choices" />

                <p className="mt-5">
                  You may contact us to ask about the personal information we
                  hold about you, request correction of inaccurate information,
                  or ask questions about how your information is being used,
                  subject to applicable legal and operational requirements.
                </p>
              </section>

              <section id="changes">
                <SectionTitle number="11" title="Changes to This Privacy Policy" />

                <p className="mt-5">
                  We may update this Privacy Policy from time to time as our
                  services, technology, or legal requirements change. Any
                  updated version will be published on this page.
                </p>
              </section>

              <section id="contact">
                <SectionTitle number="12" title="Contact Us" />

                <p className="mt-5">
                  If you have questions regarding this Privacy Policy or how
                  your information is handled, please contact Amruta Dhaanya.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#dce5d8] bg-[#f7f8f3]">
                  <div className="border-b border-[#dce5d8] px-6 py-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#78906f]">
                      Amruta Dhaanya
                    </p>
                    <p className="mt-1 text-sm text-[#718078]">
                      An Ahaar Kutumbam Initiative
                    </p>
                  </div>

                  <div className="space-y-4 px-6 py-6 text-sm sm:text-base">
                    <p>
                      <strong className="text-[#24352a]">Email:</strong>{" "}
                      <a
                        href="mailto:amrutadhaanya@gmail.com"
                        className="text-[#315d38] hover:underline"
                      >
                        amrutadhaanya@gmail.com
                      </a>
                    </p>

                    <p>
                      <strong className="text-[#24352a]">Phone:</strong>{" "}
                      <a
                        href="tel:+919177751088"
                        className="text-[#315d38] hover:underline"
                      >
                        +91 9177751088
                      </a>
                    </p>

                    <p>
                      <strong className="text-[#24352a]">Location:</strong>{" "}
                      Vangapahad, Warangal, Telangana 506006
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Bottom navigation */}
            <div className="mt-14 flex flex-col gap-4 border-t border-[#e1e6de] pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/legal"
                className="font-semibold text-[#315d38] hover:underline"
              >
                ← Back to Legal & Policies
              </Link>

              <Link
                href="/"
                className="font-semibold text-[#315d38] hover:underline"
              >
                Return to Amruta Dhaanya →
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#dfe5da] bg-[#eef1e8]">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="flex flex-col gap-4 text-sm text-[#68766c] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-[#315d38]">Amruta Dhaanya</p>
              <p className="mt-1">
                An Ahaar Kutumbam Initiative
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <Link
                href="/privacy-policy"
                className="font-medium text-[#315d38]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/legal"
                className="hover:text-[#315d38]"
              >
                Legal & Policies
              </Link>

              <Link
                href="/"
                className="hover:text-[#315d38]"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-1 shrink-0 text-xs font-bold tracking-[0.15em] text-[#8aa080]">
        {number}
      </span>

      <h2 className="text-2xl font-bold tracking-tight text-[#24352a] sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
