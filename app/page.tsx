const products = [
  {
    name: "Traditional Rice",
    description: "Naturally grown rice sourced directly from trusted growers.",
    price: "₹120 / kg",
  },
  {
    name: "Millets",
    description: "Wholesome traditional grains for everyday healthy meals.",
    price: "₹150 / kg",
  },
  {
    name: "Cold-Pressed Oils",
    description: "Traditional oils prepared with care and authentic methods.",
    price: "₹280 / litre",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f1] text-[#243321]">
      {/* Header */}
      <header className="border-b border-[#ddd8c8] bg-[#faf8f1]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Amruta Dhaanya
            </h1>
            <p className="text-sm text-[#68735f]">
              An Ahaar Kutumbam Initiative
            </p>
          </div>

          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#" className="hover:text-[#7b5e2e]">
              Home
            </a>
            <a href="#products" className="hover:text-[#7b5e2e]">
              Products
            </a>
            <a href="#about" className="hover:text-[#7b5e2e]">
              About
            </a>
            <a href="#growers" className="hover:text-[#7b5e2e]">
              Grow With Us
            </a>
          </nav>

          <div className="flex gap-3">
            <button className="rounded-full border border-[#9b967f] px-5 py-2 text-sm font-medium hover:bg-white">
              Login
            </button>

            <button className="rounded-full bg-[#314b2c] px-5 py-2 text-sm font-medium text-white hover:bg-[#253b22]">
              Cart
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b35]">
            From our growers to your home
          </p>

          <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Pure food.
            <br />
            Honest farming.
            <br />
            <span className="text-[#8a6b35]">A healthier tomorrow.</span>
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5e6757]">
            Amruta Dhaanya connects families with carefully sourced
            traditional foods while creating better opportunities for
            farmers and growers.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button className="rounded-full bg-[#314b2c] px-7 py-3.5 font-semibold text-white hover:bg-[#253b22]">
              Explore Products
            </button>

            <button className="rounded-full border border-[#aaa38e] bg-transparent px-7 py-3.5 font-semibold hover:bg-white">
              Become a Grower
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b35]">
              Our collection
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Food with a story
            </h2>

            <p className="mt-4 max-w-2xl text-[#68735f]">
              Carefully selected products that bring traditional food
              practices closer to modern families.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-2xl border border-[#e2dfd4] bg-[#faf8f1] p-7"
              >
                <div className="mb-6 flex h-48 items-center justify-center rounded-xl bg-[#e8e4d5]">
                  <span className="text-sm text-[#7a806f]">
                    Product Image
                  </span>
                </div>

                <h3 className="text-xl font-bold">{product.name}</h3>

                <p className="mt-3 min-h-14 text-sm leading-6 text-[#68735f]">
                  {product.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-semibold text-[#8a6b35]">
                    {product.price}
                  </span>

                  <button className="rounded-full bg-[#314b2c] px-5 py-2 text-sm font-semibold text-white">
                    View
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b35]">
              Our purpose
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Building a better food ecosystem
            </h2>

            <p className="mt-6 leading-8 text-[#68735f]">
              Amruta Dhaanya is designed to create a direct connection
              between growers and families, while preserving the value of
              traditional food and responsible farming.
            </p>
          </div>

          <div className="rounded-3xl bg-[#314b2c] p-10 text-white">
            <h3 className="text-2xl font-bold">
              Ahaar Kutumbam
            </h3>

            <p className="mt-4 leading-7 text-white/80">
              A food community where growers, agents and customers can
              participate in a transparent and trusted marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Growers */}
      <section id="growers" className="bg-[#e8e4d5] py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8a6b35]">
            Grow with us
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Are you a grower?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#5e6757]">
            Join Amruta Dhaanya and bring your products to customers
            looking for authentic, responsibly sourced food.
          </p>

          <button className="mt-8 rounded-full bg-[#314b2c] px-7 py-3.5 font-semibold text-white">
            Apply as a Grower
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#243321] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold">Amruta Dhaanya</p>
            <p className="text-sm text-white/60">
              An Ahaar Kutumbam Initiative
            </p>
          </div>

          <p className="text-sm text-white/60">
            © 2026 Amruta Dhaanya. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}