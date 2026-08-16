import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="ad-faq-page">
      <div className="ad-faq">
        <style>{`
          .ad-faq-page {
            min-height: 100vh;
            background: #fafaf5;
            color: #1f2937;
          }

          .ad-faq {
            max-width: 900px;
            margin: 0 auto;
            padding: 28px 18px 60px;
            font-family:
              -apple-system,
              BlinkMacSystemFont,
              "Segoe UI",
              Arial,
              sans-serif;
          }

          /* ---------------------------------
             HOME / BACK BUTTON
          --------------------------------- */

          .ad-faq-home {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 18px;
          }

          .ad-faq-home a {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            padding: 9px 16px;
            border-radius: 999px;
            background: #ffffff;
            border: 1px solid rgba(6, 78, 59, 0.15);
            color: #065f46;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition:
              background 0.15s ease,
              transform 0.15s ease,
              box-shadow 0.15s ease;
          }

          .ad-faq-home a:hover {
            background: #f0fdf4;
            transform: translateY(-1px);
            box-shadow: 0 3px 10px rgba(6, 78, 59, 0.08);
          }

          /* ---------------------------------
             HEADER
          --------------------------------- */

          .ad-faq h1 {
            font-size: clamp(36px, 6vw, 58px);
            line-height: 1.05;
            font-weight: 800;
            color: #064e3b;
            text-align: center;
            margin: 8px 0 12px;
            letter-spacing: -0.035em;
            transform-origin: center;
            animation: adFaqPulse 2.8s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes adFaqPulse {
            0% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.035);
            }

            100% {
              transform: scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .ad-faq h1 {
              animation: none;
            }
          }

          .ad-faq-sub {
            max-width: 720px;
            margin: 0 auto 28px;
            text-align: center;
            color: #4b5563;
            font-size: 16px;
            line-height: 1.6;
          }

          /* ---------------------------------
             QUICK NAVIGATION
          --------------------------------- */

          .ad-faq-nav-wrapper {
            background: #ffffff;
            border: 1px solid rgba(6, 78, 59, 0.1);
            border-radius: 16px;
            padding: 14px;
            margin-bottom: 32px;
            box-shadow: 0 2px 12px rgba(6, 78, 59, 0.04);
          }

          .ad-faq-nav-title {
            text-align: center;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #059669;
            margin-bottom: 10px;
          }

          .ad-faq-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
          }

          .ad-faq-nav a {
            font-size: 13px;
            font-weight: 600;
            text-decoration: none;
            color: #065f46;
            background: #f0fdf4;
            border: 1px solid rgba(6, 78, 59, 0.15);
            border-radius: 999px;
            padding: 8px 14px;
            transition:
              background 0.15s ease,
              transform 0.15s ease;
          }

          .ad-faq-nav a:hover {
            background: #dcfce7;
            transform: translateY(-1px);
          }

          /* ---------------------------------
             SECTION HEADINGS
          --------------------------------- */

          .ad-faq h2 {
            font-size: 13px;
            letter-spacing: 0.09em;
            text-transform: uppercase;
            color: #059669;
            font-weight: 800;
            margin: 38px 0 12px;
            padding-bottom: 9px;
            border-bottom: 1px solid rgba(6, 78, 59, 0.14);
          }

          .ad-faq h2:first-of-type {
            margin-top: 10px;
          }

          /* ---------------------------------
             FAQ ACCORDION
          --------------------------------- */

          .ad-faq details {
            background: #ffffff;
            border: 1px solid rgba(6, 78, 59, 0.12);
            border-radius: 13px;
            margin-bottom: 10px;
            overflow: hidden;
            transition:
              box-shadow 0.2s ease,
              border-color 0.2s ease;
          }

          .ad-faq details[open] {
            border-color: rgba(6, 78, 59, 0.2);
            box-shadow: 0 4px 18px rgba(6, 78, 59, 0.08);
          }

          .ad-faq summary {
            list-style: none;
            cursor: pointer;
            padding: 17px 20px;
            font-weight: 650;
            font-size: 15.5px;
            line-height: 1.45;
            color: #064e3b;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            user-select: none;
          }

          .ad-faq summary::-webkit-details-marker {
            display: none;
          }

          .ad-faq summary::after {
            content: "+";
            flex-shrink: 0;
            font-size: 22px;
            line-height: 1;
            font-weight: 400;
            color: #059669;
            transition: transform 0.2s ease;
            width: 24px;
            height: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .ad-faq details[open] summary::after {
            content: "\\2212";
          }

          .ad-faq summary:hover {
            background: #f0fdf4;
          }

          .ad-faq .ad-faq-answer {
            padding: 0 20px 19px;
            color: #374151;
            font-size: 14.5px;
            line-height: 1.65;
          }

          .ad-faq .ad-faq-answer p {
            margin: 0 0 11px;
          }

          .ad-faq .ad-faq-answer p:last-child {
            margin-bottom: 0;
          }

          .ad-faq .ad-faq-answer ol,
          .ad-faq .ad-faq-answer ul {
            margin: 0 0 7px;
            padding-left: 21px;
          }

          .ad-faq .ad-faq-answer li {
            margin-bottom: 7px;
          }

          .ad-faq .ad-faq-answer strong {
            color: #064e3b;
          }

          .ad-faq .ad-faq-answer a {
            color: #047857;
            font-weight: 600;
          }

          /* ---------------------------------
             HIGHLIGHTED FILL AREAS
          --------------------------------- */

          .ad-fill {
            background: #fef08a;
            border-bottom: 1px dashed #ca8a04;
            padding: 0 2px;
            font-style: normal;
          }

          /* ---------------------------------
             HELP BOX
          --------------------------------- */

          .ad-faq-help {
            margin-top: 34px;
            background: #f0fdf4;
            border: 1px solid rgba(6, 78, 59, 0.15);
            border-radius: 14px;
            padding: 23px 20px;
            text-align: center;
            color: #374151;
            font-size: 14.5px;
            line-height: 1.65;
          }

          .ad-faq-help strong:first-child {
            color: #064e3b;
            display: block;
            margin-bottom: 7px;
            font-size: 17px;
          }

          /* ---------------------------------
             BOTTOM HOME BUTTON
          --------------------------------- */

          .ad-faq-bottom-home {
            display: flex;
            justify-content: center;
            margin-top: 28px;
          }

          .ad-faq-bottom-home a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            min-width: 150px;
            padding: 11px 20px;
            border-radius: 999px;
            background: #064e3b;
            color: #ffffff;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            transition:
              background 0.15s ease,
              transform 0.15s ease,
              box-shadow 0.15s ease;
          }

          .ad-faq-bottom-home a:hover {
            background: #065f46;
            transform: translateY(-1px);
            box-shadow: 0 5px 14px rgba(6, 78, 59, 0.2);
          }

          /* ---------------------------------
             MOBILE
          --------------------------------- */

          @media (max-width: 640px) {
            .ad-faq {
              padding: 20px 12px 45px;
            }

            .ad-faq h1 {
              font-size: 38px;
            }

            .ad-faq-sub {
              font-size: 14.5px;
              margin-bottom: 22px;
            }

            .ad-faq-nav-wrapper {
              padding: 12px;
            }

            .ad-faq-nav {
              gap: 6px;
            }

            .ad-faq-nav a {
              font-size: 12px;
              padding: 7px 11px;
            }

            .ad-faq summary {
              padding: 15px 16px;
              font-size: 15px;
            }

            .ad-faq .ad-faq-answer {
              padding: 0 16px 17px;
              font-size: 14px;
            }

            .ad-faq h2 {
              margin-top: 32px;
            }
          }
        `}</style>

        {/* ---------------------------------
            BACK TO HOME
        --------------------------------- */}

        <div className="ad-faq-home">
          <Link href="/">
            ← Back to Home
          </Link>
        </div>

        {/* ---------------------------------
            PAGE HEADER
        --------------------------------- */}

        <h1>Frequently Asked Questions</h1>

        <p className="ad-faq-sub">
          Who we are, how we work, and what to expect when you order from
          Amruta Dhaanya
        </p>

        {/* ---------------------------------
            QUICK JUMP NAVIGATION
        --------------------------------- */}

        <div className="ad-faq-nav-wrapper">
          <div className="ad-faq-nav-title">Quick jump</div>

          <nav className="ad-faq-nav">
            <a href="#ad-about">About us</a>
            <a href="#ad-how">How we work</a>
            <a href="#ad-products">Products & pricing</a>
            <a href="#ad-ordering">Ordering</a>
            <a href="#ad-delivery">Delivery</a>
            <a href="#ad-payments">Payments & billing</a>
            <a href="#ad-problems">If something goes wrong</a>
            <a href="#ad-growers">For growers</a>
          </nav>
        </div>

        {/* =================================
            ABOUT US
        ================================= */}

        <h2 id="ad-about">Who we are</h2>

        <details>
          <summary>What is Amruta Dhaanya?</summary>

          <div className="ad-faq-answer">
            <p>
              Amruta Dhaanya is a local <strong>Harvest Network</strong> based
              in Warangal, Telangana. We connect customers with trusted growers
              in Warangal and the surrounding villages, giving you access to
              fresh vegetables, fruits, leafy greens, flowers, grains, pulses,
              dairy and selected homemade products.
            </p>

            <p>
              In simple terms: instead of produce travelling through several
              mandis and middlemen before it reaches you, we collect it from
              the grower and bring it straight to your door.
            </p>
          </div>
        </details>

        <details>
          <summary>Who is behind Amruta Dhaanya?</summary>

          <div className="ad-faq-answer">
            <p>
              We are a small, locally run team operating in Warangal, Telangana,
              started in 2026 to give local growers a fairer, more direct route
              to customers.
            </p>

            <p>
              You can read more on our <strong>About Us</strong> page, or
              simply ask us on WhatsApp — we are happy to tell you who we are
              and how we source before you place your first order.
            </p>
          </div>
        </details>

        <details>
          <summary>
            Where are you located? Are you based in Telangana?
          </summary>

          <div className="ad-faq-answer">
            <p>
              Yes. Amruta Dhaanya is based in Warangal, Telangana, and we source
              produce from local growers in and around the region. Our
              deliveries currently focus on Warangal and nearby areas, and we
              are expanding based on demand.
            </p>
          </div>
        </details>

        <details>
          <summary>How can I be sure you are a genuine business?</summary>

          <div className="ad-faq-answer">
            <p>
              We are a new and small local operation, so we would rather you
              check us out than take our word for it. Before you spend anything:
            </p>

            <ul>
              <li>
                <strong>Call us and talk to a person.</strong> Our number is
                answered by us, not a call centre. Ask us anything about our
                growers or our produce first.
              </li>

              <li>
                <strong>Start with a small order.</strong> Try one basket before
                you rely on us for a weekly list.
              </li>

              <li>
                <strong>You get everything in writing.</strong> Items, weights
                and the final price are confirmed on WhatsApp before we pack,
                so you always hold a record.
              </li>

              <li>
                <strong>You are not asked to pay upfront.</strong> We never take
                money before confirming availability, price and delivery with
                you.
              </li>
            </ul>

            <p>
              We are based in Warangal and we deliver here ourselves — if
              something is wrong, you are talking to the same people who packed
              your order.
            </p>
          </div>
        </details>

        <details>
          <summary>Can I order in Telugu?</summary>

          <div className="ad-faq-answer">
            <p>
              Yes. You can call or message us in{" "}
              <strong>Telugu, English or Hindi</strong> — whichever you are
              most comfortable with. మీరు తెలుగులో కూడా ఆర్డర్ చేయవచ్చు.
            </p>
          </div>
        </details>

        <details>
          <summary>Which number and channels are officially yours?</summary>

          <div className="ad-faq-answer">
            <p>
              We operate through <strong>one official number only</strong>:{" "}
              <strong>+91 91777 51088</strong>. Our daily fresh list is sent
              from that number by WhatsApp broadcast, and orders and payments
              are confirmed there.
            </p>

            <p>
              We are <strong>not</strong> listed on any other app, marketplace,
              reseller or delivery platform. If you see Amruta Dhaanya produce
              being sold anywhere else, or you are contacted from a different
              number claiming to be us, please treat it as unrelated to us and
              check with us on our number first.
            </p>

            <p>
              We will never ask for your UPI PIN, OTP, card number or CVV.
            </p>
          </div>
        </details>

        <details>
          <summary>
            Why should I choose Amruta Dhaanya over a regular shop or big app?
          </summary>

          <div className="ad-faq-answer">
            <p>Three practical reasons:</p>

            <ul>
              <li>
                <strong>Fresher produce.</strong> Most items are harvested the
                same day or shortly before delivery, rather than sitting in
                storage and transit for days.
              </li>

              <li>
                <strong>Your money stays local.</strong> A larger share of what
                you pay reaches the grower, not a chain of intermediaries.
              </li>

              <li>
                <strong>You can actually talk to us.</strong> If something is
                wrong, you reach a person in Warangal, not a call centre script.
              </li>
            </ul>
          </div>
        </details>

        {/* =================================
            HOW WE WORK
        ================================= */}

        <h2 id="ad-how">How we work</h2>

        <details>
          <summary>
            How does Amruta Dhaanya actually work, step by step?
          </summary>

          <div className="ad-faq-answer">
            <ol>
              <li>
                <strong>Growers tell us what is ready.</strong> Our partner
                farmers share what they are harvesting that day.
              </li>

              <li>
                <strong>We send out the list.</strong> Whatever is genuinely
                available goes out on our official WhatsApp broadcast.
              </li>

              <li>
                <strong>You place an order</strong> by replying on WhatsApp or
                by calling us.
              </li>

              <li>
                <strong>We confirm with you</strong> — items, weights, final
                price and delivery slot, in writing.
              </li>

              <li>
                <strong>Harvest and packing.</strong> Your items are collected
                and packed close to delivery time.
              </li>

              <li>
                <strong>Delivery and payment.</strong> We deliver to your
                address and you pay by UPI, bank transfer, or cash where
                available.
              </li>
            </ol>
          </div>
        </details>

        <details>
          <summary>Where does my produce actually come from?</summary>

          <div className="ad-faq-answer">
            <p>
              From farms and home growers in and around Warangal district. We
              work directly with each grower rather than buying anonymous stock
              from a wholesale market, so we know which farm a given item came
              from.
            </p>

            <p>
              If you would like to know the source of a specific item in your
              order, ask us — we will tell you the village or farm it came
              from.
            </p>
          </div>
        </details>

        <details>
          <summary>Do you have a shop I can visit?</summary>

          <div className="ad-faq-answer">
            <p>
              No. We currently operate as a{" "}
              <strong>delivery-only service</strong> and do not have a walk-in
              retail shop. Everything is ordered on WhatsApp or by phone and
              delivered to your door.
            </p>
          </div>
        </details>

        <details>
          <summary>How do you select and check your growers?</summary>

          <div className="ad-faq-answer">
            <p>
              Before a grower joins us we visit or verify their growing setup,
              discuss their farming practices and agree on basic quality
              expectations for grading, cleaning and packing. We keep working
              with growers who consistently meet those standards, and we stop
              sourcing from those who do not.
            </p>
          </div>
        </details>

        {/* =================================
            PRODUCTS & PRICING
        ================================= */}

        <h2 id="ad-products">Products, freshness & pricing</h2>

        <details>
          <summary>Do you sell only vegetables?</summary>

          <div className="ad-faq-answer">
            <p>
              No. Depending on the season and daily availability we also offer
              fruits, leafy greens, flowers, grains, pulses, spices, dairy and
              selected homemade products.
            </p>
          </div>
        </details>

        <details>
          <summary>Do you sell eggs or meat?</summary>

          <div className="ad-faq-answer">
            <p>
              <strong>No. We do not sell eggs or meat of any kind.</strong>
            </p>

            <p>
              We deal in fresh farm produce — vegetables, fruits, greens,
              flowers, grains, pulses and spices — along with dairy and selected
              homemade products.
            </p>
          </div>
        </details>

        <details>
          <summary>Are all products available every day?</summary>

          <div className="ad-faq-answer">
            <p>
              No. Because we source directly from growers, availability depends
              on seasonal production and that day&apos;s harvest. The current
              list is always on our <strong>Today&apos;s Fresh List</strong>{" "}
              page, updated daily or whenever fresh stock arrives.
            </p>
          </div>
        </details>

        <details>
          <summary>How do I find out what is available today?</summary>

          <div className="ad-faq-answer">
            <p>
              We share the day&apos;s fresh list{" "}
              <strong>only through our official WhatsApp broadcast</strong>.
              Send us a message on our number and we will add you to it — you
              then get the list as soon as our growers confirm the day&apos;s
              harvest.
            </p>

            <p>
              The broadcast is a one-way list, so other customers cannot see
              your number, and you can ask us to remove you at any time.
            </p>
          </div>
        </details>

        <details>
          <summary>Why are some products unavailable?</summary>

          <div className="ad-faq-answer">
            <p>
              Seasonal changes, weather, and harvest schedules all affect what
              our growers can supply on a given day. We would rather show you
              an honest short list than promise items we cannot deliver fresh.
            </p>
          </div>
        </details>

        <details>
          <summary>How fresh are the products?</summary>

          <div className="ad-faq-answer">
            <p>
              Most items are harvested the same day as delivery or shortly
              before it. Leafy greens and flowers in particular are picked close
              to dispatch, since they lose quality fastest.
            </p>
          </div>
        </details>

        <details>
          <summary>Are your vegetables organic?</summary>

          <div className="ad-faq-answer">
            <p>
              Not automatically, and we will not claim otherwise. Some of our
              growers follow natural or low-chemical farming practices, and we
              mention the farming method whenever we have verified it.
            </p>

            <p>
              Unless an item specifically states it, please do not assume it is
              certified organic.
            </p>
          </div>
        </details>

        <details>
          <summary>How are prices decided?</summary>

          <div className="ad-faq-answer">
            <p>
              Prices depend on seasonal availability, prevailing market
              conditions and the grower&apos;s selling price. We aim for pricing
              that is fair to you and genuinely worthwhile for the grower.
            </p>

            <p>
              Because produce prices move, the rate for an item can change from
              week to week. Your confirmed order price is the price you pay.
            </p>
          </div>
        </details>

        <details>
          <summary>Do prices change after I order?</summary>

          <div className="ad-faq-answer">
            <p>
              No. Once we confirm your order in writing, that price stands. If
              an item&apos;s cost has changed since the list was published, we
              tell you <em>before</em> confirming so you can decide.
            </p>
          </div>
        </details>

        <details>
          <summary>
            What if the weight is slightly more or less than I ordered?
          </summary>

          <div className="ad-faq-answer">
            <p>
              Fresh produce cannot always be packed to an exact figure — a bunch
              of greens or a single pumpkin will never land precisely on 500 g.
              Small variations are normal.
            </p>

            <p>
              You are billed for the actual weight delivered, not the rounded
              figure. If a difference is large enough to matter, we contact you
              before dispatch rather than surprising you at delivery.
            </p>
          </div>
        </details>

        <details>
          <summary>How should I store the produce after delivery?</summary>

          <div className="ad-faq-answer">
            <p>
              Because our produce is not treated for long shelf life, it behaves
              like farm produce rather than supermarket stock:
            </p>

            <ul>
              <li>
                <strong>Leafy greens:</strong> use within 1–2 days; refrigerate
                loosely wrapped in cloth.
              </li>

              <li>
                <strong>Most vegetables:</strong> 3–5 days refrigerated.
              </li>

              <li>
                <strong>Tomatoes, bananas, onions, potatoes:</strong> keep out
                of the fridge, in a cool dark place.
              </li>

              <li>
                <strong>Grains and pulses:</strong> airtight container, away from
                moisture.
              </li>
            </ul>

            <p>Please wash all produce before use.</p>
          </div>
        </details>

        {/* =================================
            ORDERING
        ================================= */}

        <h2 id="ad-ordering">Placing an order</h2>

        <details>
          <summary>How do I place an order?</summary>

          <div className="ad-faq-answer">
            <p>
              Check the day&apos;s list on our WhatsApp broadcast, then simply
              reply with what you need — or give us a ring and tell us. We
              confirm availability, pricing and delivery details with you, and
              only then process the order.
            </p>

            <p>
              Order before <strong>10:00 PM</strong> and we deliver the same
              day.
            </p>
          </div>
        </details>

        <details>
          <summary>Do I need to create an account?</summary>

          <div className="ad-faq-answer">
            <p>
              No. There is nothing to sign up for. You order entirely over
              WhatsApp or by calling us, and we keep your address and usual
              items on file so repeat orders take one message.
            </p>
          </div>
        </details>

        <details>
          <summary>Is there a minimum order value?</summary>

          <div className="ad-faq-answer">
            <p>
              Yes — our minimum order value is <strong>₹110</strong>.
            </p>

            <p>
              Delivery is <strong>free on orders above ₹499</strong>. Below
              that, a flat <strong>₹25</strong> delivery charge applies.
            </p>
          </div>
        </details>

        <details>
          <summary>By what time should I order?</summary>

          <div className="ad-faq-answer">
            <p>
              <strong>
                Order before 10:00 PM and we deliver the same day you order
              </strong>
              , subject to stock and your location. Anything after 10:00 PM
              goes into the next day&apos;s harvest and delivery run.
            </p>
          </div>
        </details>

        <details>
          <summary>
            Can I add to or change my order after placing it?
          </summary>

          <div className="ad-faq-answer">
            <p>
              Usually yes, as long as packing has not started — message us on
              the same WhatsApp thread and we will update it and re-confirm the
              revised total.
            </p>
          </div>
        </details>

        <details>
          <summary>Can I schedule a regular weekly order?</summary>

          <div className="ad-faq-answer">
            <p>
              Yes. Many customers keep a standing weekly or twice-weekly list
              and we adjust it for whatever is in season. Tell us your usual
              items and preferred days and we will set it up.
            </p>
          </div>
        </details>

        <details>
          <summary>Can I order in bulk?</summary>

          <div className="ad-faq-answer">
            <p>
              Yes. We welcome bulk orders for homes, restaurants, hostels,
              messes, events and businesses. Please contact us in advance so we
              can plan the harvest with our growers — bulk quantities usually
              need about <strong>7 days</strong> notice.
            </p>
          </div>
        </details>

        <details>
          <summary>
            Can I request a specific item that is not on the list?
          </summary>

          <div className="ad-faq-answer">
            <p>
              Ask us. If one of our growers has it or can harvest it, we will
              add it to your order and tell you when it will be available. If
              nobody local is growing it that season, we will say so honestly
              rather than substitute something you did not ask for.
            </p>
          </div>
        </details>

        <details>
          <summary>Can I cancel my order?</summary>

          <div className="ad-faq-answer">
            <p>
              Orders can normally be cancelled before packing begins. Once an
              order is packed and dispatched, cancellation may not be possible,
              since fresh produce cannot be returned to stock.
            </p>
          </div>
        </details>

        {/* =================================
            DELIVERY
        ================================= */}

        <h2 id="ad-delivery">Delivery</h2>

        <details>
          <summary>Where do you deliver?</summary>

          <div className="ad-faq-answer">
            <p>
              We currently serve selected areas in and around Warangal,
              including <strong>Warangal, Hanamkonda and Kazipet</strong>. Our
              delivery area keeps expanding based on demand.
            </p>

            <p>
              Not sure if we reach you? Send us your locality or pin code on
              WhatsApp and we will confirm.
            </p>
          </div>
        </details>

        <details>
          <summary>Do you deliver on the same day?</summary>

          <div className="ad-faq-answer">
            <p>
              Yes. If you place your order before <strong>10:00 PM</strong>, we
              deliver it the same day, depending on stock and your location.
              Orders placed after 10:00 PM are delivered the following day.
            </p>

            <p>
              When we confirm your order we tell you the expected time, so you
              always know when to expect us.
            </p>
          </div>
        </details>

        <details>
          <summary>
            Where exactly will you deliver — and can you hand it to someone
            else?
          </summary>

          <div className="ad-faq-answer">
            <p>
              We deliver to the location and person you specify. Give us the
              address, and the name and number of whoever should receive it —
              that can be you, a family member, your security desk, or your shop
              or office.
            </p>

            <p>
              Our delivery person calls before arriving so nothing is left
              unattended.
            </p>
          </div>
        </details>

        <details>
          <summary>What time will my order arrive?</summary>

          <div className="ad-faq-answer">
            <p>
              Deliveries run between <strong>6:00 AM and 10:00 PM</strong>,
              every day of the week. We share the expected slot when we confirm
              your order, and let you know if anything shifts on the day.
            </p>
          </div>
        </details>

        <details>
          <summary>Is there a delivery charge?</summary>

          <div className="ad-faq-answer">
            <p>
              <strong>Delivery is free on orders above ₹499.</strong> Below
              that, a flat <strong>₹25</strong> charge applies within Warangal
              city.
            </p>

            <p>
              Any charge is shown in your order confirmation before you pay —
              there are no fees added later.
            </p>
          </div>
        </details>

        <details>
          <summary>
            What if I am not at home when the delivery arrives?
          </summary>

          <div className="ad-faq-answer">
            <p>
              Our delivery person will call you before arriving. If you cannot
              receive it, you can ask us to hand it to a neighbour or security,
              or leave it at your door at your own risk. If nobody is reachable,
              we will contact you to arrange redelivery — an additional
              delivery charge may apply.
            </p>

            <p>
              Because this is fresh produce, please try to keep the agreed slot
              free.
            </p>
          </div>
        </details>

        <details>
          <summary>How is my order packed?</summary>

          <div className="ad-faq-answer">
            <p>
              Items are cleaned, graded and packed close to dispatch time. We
              use minimal, biodegradable bags, and we take crates back on your
              next delivery.
            </p>
          </div>
        </details>

        {/* =================================
            PAYMENTS
        ================================= */}

        <h2 id="ad-payments">Payments & billing</h2>

        <details>
          <summary>What payment methods do you accept?</summary>

          <div className="ad-faq-answer">
            <p>
              We accept UPI, bank transfer and other available digital payment
              methods. Cash on delivery is available in selected areas.
            </p>
          </div>
        </details>

        <details>
          <summary>Do I have to pay before delivery?</summary>

          <div className="ad-faq-answer">
            <p>
              We never ask for money before your order is confirmed with you.
              Depending on your area and order size, you can pay on delivery, or
              after we confirm the packed weight. For bulk orders we may request
              a part payment in advance, and we will say so clearly up front.
            </p>
          </div>
        </details>

        <details>
          <summary>
            How do I know I can trust you with my payment?
          </summary>

          <div className="ad-faq-answer">
            <p>
              We only use established, secure channels — UPI and bank transfer
              to our business account in the name of{" "}
              <strong>AMRUTA DHAANYA</strong>. We never ask for advance payment
              before confirming availability, price and delivery with you, and
              every confirmation is in writing on WhatsApp or chat, so you
              always hold a record of the transaction.
            </p>

            <p>
              We will never ask for your UPI PIN, OTP, card number or CVV.
              Nobody from Amruta Dhaanya has any reason to request those — if
              someone does, it is not us.
            </p>
          </div>
        </details>

        <details>
          <summary>Will I get a bill or receipt?</summary>

          <div className="ad-faq-answer">
            <p>
              Yes. You receive an itemised bill showing each item, its actual
              weight and rate, any delivery charge and the final total — shared
              on WhatsApp or with the delivery.
            </p>
          </div>
        </details>

        <details>
          <summary>How do refunds work and how long do they take?</summary>

          <div className="ad-faq-answer">
            <p>
              Once we agree on a resolution, you can take it as a refund to your
              original payment method or as credit against your next order,
              whichever you prefer. Most refunds are processed quickly, and in
              all cases they are completed{" "}
              <strong>within 28 working days</strong>, depending on your bank.
            </p>

            <p>
              If you would rather not wait, taking the amount as credit against
              your next delivery is immediate.
            </p>
          </div>
        </details>

        {/* =================================
            PROBLEMS
        ================================= */}

        <h2 id="ad-problems">If something goes wrong</h2>

        <details>
          <summary>
            What if I receive damaged or poor-quality products?
          </summary>

          <div className="ad-faq-answer">
            <p>
              Contact us within 24 hours with clear photos of the item. We will
              review it and put it right — normally a replacement on your next
              delivery, a credit, or a refund for that item. You do not have to
              argue your case; if the produce was not up to standard, that is on
              us.
            </p>
          </div>
        </details>

        <details>
          <summary>What if an item is missing from my order?</summary>

          <div className="ad-faq-answer">
            <p>
              Tell us the same day. We will check it against your packing list
              and either deliver the missing item or refund it — your choice.
            </p>
          </div>
        </details>

        <details>
          <summary>
            What if an item I ordered could not be harvested?
          </summary>

          <div className="ad-faq-answer">
            <p>
              We inform you before dispatch and you decide: drop the item, or
              replace it with something similar. We do not substitute items on
              our own, and you are never billed for anything not delivered.
            </p>
          </div>
        </details>

        <details>
          <summary>What if my delivery is late?</summary>

          <div className="ad-faq-answer">
            <p>
              We will message you with a revised time as soon as we know. If a
              delay means the produce would no longer be fresh when it reaches
              you, we would rather cancel that item and refund it than deliver
              something substandard.
            </p>
          </div>
        </details>

        <details>
          <summary>Who do I contact if something goes wrong?</summary>

          <div className="ad-faq-answer">
            <p>
              <strong>Just give us a ring.</strong> If there is any problem with
              your order, call us on <strong>+91 91777 51088</strong> — we stay
              reachable and we will sort it out with you directly. There is no
              ticket system and no waiting for a reply from a distant support
              team.
            </p>

            <p>
              We are available <strong>every day, 5:20 AM to 10:20 PM</strong>.
              You can also email <strong>[email protected]</strong>.
            </p>

            <p>
              If you prefer to write, reply on the same WhatsApp thread as your
              order. That shows us your full order history straight away, which
              is usually the quickest way for us to check what happened.
            </p>
          </div>
        </details>

        <details>
          <summary>How do I give feedback or raise a complaint?</summary>

          <div className="ad-faq-answer">
            <p>
              Call us, send it on WhatsApp, or email. We are a team and we read
              everything ourselves. Feedback about a specific item or grower&apos;s
              quality genuinely matters — it is how we decide who we keep
              sourcing from.
            </p>
          </div>
        </details>

        <details>
          <summary>What do you do with my personal information?</summary>

          <div className="ad-faq-answer">
            <p>
              We use your name, phone number and address only to process and
              deliver your orders and to contact you about them. We do not sell
              or share your details with third parties for marketing. If you
              want your details removed from our records, ask us and we will do
              it.
            </p>
          </div>
        </details>

        {/* =================================
            GROWERS
        ================================= */}

        <h2 id="ad-growers">For growers & home producers</h2>

        <details>
          <summary>How do I become a grower partner?</summary>

          <div className="ad-faq-answer">
            <p>
              Visit the{" "}
              <strong>Share Your Harvest / Join as a Grower</strong> section,
              or contact us on chat or WhatsApp. We will explain the
              registration process and the basic quality requirements.
            </p>
          </div>
        </details>

        <details>
          <summary>Is there any registration fee for growers?</summary>

          <div className="ad-faq-answer">
            <p>
              No. There is currently no registration fee for genuine growers
              joining Amruta Dhaanya.
            </p>
          </div>
        </details>

        <details>
          <summary>How and when do growers get paid?</summary>

          <div className="ad-faq-answer">
            <p>
              Growers are paid <strong>within 24 hours of collection</strong>{" "}
              by UPI or bank transfer, against an agreed rate confirmed before
              collection. No deductions are made that were not agreed in
              advance.
            </p>
          </div>
        </details>

        <details>
          <summary>How much produce do I need to have to join?</summary>

          <div className="ad-faq-answer">
            <p>
              There is no large minimum. Even small kitchen-garden growers with
              a few kilos of surplus are welcome. Talk to us about what you grow
              and how much you typically have.
            </p>
          </div>
        </details>

        <details>
          <summary>Can I sell homemade food products?</summary>

          <div className="ad-faq-answer">
            <p>
              Selected homemade products may be accepted after a quality and
              safety review, which covers ingredients, preparation hygiene,
              packaging and shelf life. Contact us to check eligibility.
            </p>
          </div>
        </details>

        {/* =================================
            HELP BOX
        ================================= */}

        <div className="ad-faq-help">
          <strong>Still have a question? Just give us a ring.</strong>

          Call or WhatsApp us on{" "}
          <strong>
            <a href="tel:+919177751088">+91 91777 51088</a>
          </strong>{" "}
          — this is our only official number. We are online every day from
          5:20 AM to 10:20 PM, in Telugu, English or Hindi, and we are happy to
          answer anything about our produce, our growers, or your order before
          you pay a rupee.
        </div>

        {/* ---------------------------------
            BOTTOM HOME BUTTON
        --------------------------------- */}

        <div className="ad-faq-bottom-home">
          <Link href="/">← Return to Home</Link>
        </div>
      </div>
    </main>
  );
}
