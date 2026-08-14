/**
 * PriceList - Complete price list with pop-art styling
 * Fetches products from backend via tRPC
 * Hand-drawn price tags, comic bursts, diagonal color blocks, playful language
 * Design: Tropical Pop Art Explosion
 */
import { trpc } from "@/lib/trpc";
import { categoryColors, categoryEmojis } from "@/data/products";
import { Loader2 } from "lucide-react";

const categoryLabels: Record<string, string> = {
  juices: "Fresh Juices",
  smoothies: "Smoothies",
  milkshakes: "Milkshakes",
  puddings: "Puddings & Desserts",
};

const categoryTaglines: Record<string, string> = {
  juices: "Squeezed fresh, served with a smile",
  smoothies: "Thick, creamy, and absolutely dreamy",
  milkshakes: "The happy place between your spoon and your soul",
  puddings: "Sweet endings to perfectly squeezed days",
};

type BackendProduct = {
  id: number;
  name: string;
  category: "juices" | "smoothies" | "milkshakes" | "puddings";
  price: number;
  description: string | null;
  badge: string | null;
  imageKey: string | null;
  imageUrl: string | null;
  featured: "yes" | "no";
};

function CategorySection({ category, products }: { category: string; products: BackendProduct[] }) {
  const categoryProducts = products.filter((p) => p.category === category);
  const color = categoryColors[category] || "#FF6B35";
  const emoji = categoryEmojis[category] || "🍹";

  return (
    <div className="mb-12 last:mb-0">
      {/* Category Header with diagonal accent */}
      <div className="relative mb-8">
        <div
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 rounded-full"
          style={{ background: `linear-gradient(180deg, ${color}, transparent)` }}
        />
        <div className="flex items-center gap-3">
          <span className="text-4xl">{emoji}</span>
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-[#1A1A2E]">
              {categoryLabels[category]}
            </h3>
            <p className="font-handwritten text-sm" style={{ color: `${color}aa` }}>
              {categoryTaglines[category]}
            </p>
          </div>
        </div>
      </div>

      {/* Price Items */}
      <div className="space-y-3">
        {categoryProducts.map((product, idx) => (
          <div
            key={product.id}
            className="group flex items-center justify-between p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            style={{
              animationDelay: `${idx * 50}ms`,
            }}
          >
            {/* Hover accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 opacity-0 group-hover:opacity-100"
              style={{ background: color }}
            />

            <div className="flex items-center gap-4">
              <div className="relative">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${color}15` }}
                  >
                    {emoji}
                  </div>
                )}
                {/* Category dot */}
                <div
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: color }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors duration-200">
                    {product.name}
                  </h4>
                  {product.badge && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-md text-white font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                        transform: `rotate(${idx % 2 === 0 ? -2 : 2}deg)`,
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#1A1A2E]/45 mt-0.5">{product.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Hand-drawn style price */}
              <div className="text-right">
                <div
                  className="font-price text-xl"
                  style={{ color }}
                >
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                }}
              >
                <span className="font-bold">+</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PriceList() {
  const categories = ["juices", "smoothies", "milkshakes", "puddings"];
  const { data: products, isLoading } = trpc.products.list.useQuery();

  return (
    <section id="prices" className="py-16 md:py-24 relative">
      {/* Diagonal pop-art background accent */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full opacity-[0.03]"
        style={{
          background: `linear-gradient(135deg, #FF6B35, transparent)`,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-handwritten text-[#FF2D87] text-xl md:text-2xl block mb-2">
            Our Price List
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] mb-4">
            Transparent Pricing
          </h2>
          <p className="text-[#1A1A2E]/55 max-w-md mx-auto">
            Fresh, delicious, and fairly priced. No hidden fees, just pure goodness.
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#FF6B35]" />
          </div>
        )}

        {!isLoading && products && (
          <div className="max-w-4xl mx-auto">
            {categories.map((cat) => (
              <CategorySection key={cat} category={cat} products={products} />
            ))}
          </div>
        )}

        {/* Special Offers Banner */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="relative bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] rounded-3xl p-8 md:p-10 text-white overflow-hidden">
            {/* Halftone overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                backgroundSize: "6px 6px",
              }}
            />
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl animate-wiggle">🎉</span>
                <h3 className="font-display text-2xl md:text-3xl">
                  Happy Hour Specials!
                </h3>
              </div>
              <p className="text-white/85 mb-5">
                Every day from 2-4 PM, enjoy 20% off all smoothies and fresh juices. Perfect for your afternoon pick-me-up!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-full text-sm font-medium">
                  🕑 Mon-Fri: 2PM - 4PM
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-full text-sm font-medium">
                  💰 20% Off All Drinks
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-full text-sm font-medium">
                  🥤 Smoothies & Juices
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
