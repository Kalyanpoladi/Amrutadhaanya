"use client";

export default function HarvestMarquee() {
  const items = [
    "HARVESTED BY THE SUN",
    "BLESSED BY THE MOON",
    "GROWN WITH CARE",
    "SHARED WITH TRUST",
  ];

  return (
    <section className="overflow-hidden border-y border-[#cfc6b4] bg-[#efe8d9] py-5">
      <div className="relative flex w-max animate-[harvest-marquee_28s_linear_infinite]">
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center"
          >
            <span className="px-7 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#38583d] sm:px-10 sm:text-xs">
              {item}
            </span>

            <span className="text-[#b97945]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}