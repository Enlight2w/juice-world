/**
 * FeaturedSection - Highlighted products with pop-art flair
 * Fetches featured products from backend via tRPC
 * Asymmetric layout, splash decorations, tilted cards, comic bursts
 * Design: Tropical Pop Art Explosion
 */
import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

const categoryColors: Record<string, { main: string; accent: string }> = {
  juices: { main: "#FFD23F", accent: "#FF6B35" },
  smoothies: { main: "#8B5CF6", accent: "#FF2D87" },
  milkshakes: { main: "#FFD23F", accent: "#FF2D87" },
  puddings: { main: "#7AC74F", accent: "#FFD23F" },
};

type FeaturedProduct = {
  id: number;
  name: string;
  category: "juices" | "smoothies" | "milkshakes" | "puddings";
  price: number;
  description: string | null;
  imageUrl: string | null;
  badge: string | null;
};

function SplashCircle({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full blur-2xl animate-float"
      style={{
        width: size,
        height: size,
        background: `${color}22`,
        left: x,
        top: y,
        animationDelay: delay,
      }}
    />
  );
}

function FeaturedCard({ product, index }: { product: FeaturedProduct; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const colors = categoryColors[product.category] || categoryColors.juices;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Asymmetric sizing
  const sizeClass = index === 0 ? "md:col-span-2 md:row-span-2" : "";
  const imageHeight = index === 0 ? "h-72 md:h-full" : "h-64";
  const tilt = index % 2 === 0 ? "rotate-[1deg]" : "-rotate-[1deg]";

  return (
    <div
      ref={ref}
      className={`${sizeClass} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-600`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={`group relative cursor-pointer h-full ${index === 0 ? "" : tilt}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Splash background */}
        <SplashCircle color={colors.main} size={120} x="-20%" y="-10%" delay="0s" />
        <SplashCircle color={colors.accent} size={80} x="80%" y="70%" delay="2s" />

        <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 h-full flex flex-col">
          {/* Image */}
          <div className={`relative ${imageHeight} overflow-hidden`}>
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-6xl"
                style={{ background: `${colors.main}15` }}
              >
                🍹
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Label badge - comic style */}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <svg width="80" height="80" viewBox="0 0 80 80" className="absolute -top-2 -left-2 -right-2 -bottom-2">
                  <path
                    d="M40,3 L44,14 L56,9 L52,21 L64,17 L57,29 L68,28 L58,37 L68,42 L58,46 L66,56 L54,52 L53,64 L45,55 L36,66 L35,54 L24,62 L27,50 L15,54 L21,43 L10,46 L20,38 L10,34 L22,33 L17,22 L29,25 L32,14 L37,23 Z"
                    fill={colors.main}
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
                <span className="relative text-[8px] font-bold text-white uppercase tracking-wider leading-none text-center block">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Hand-drawn price tag */}
            <div
              className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
              style={{
                border: `2px dashed ${colors.main}66`,
                transform: isHovered ? "rotate(3deg) scale(1.05)" : "rotate(-2deg)",
              }}
            >
              <span className="font-price text-xl" style={{ color: colors.accent }}>
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-display text-xl text-[#1A1A2E] mb-2 group-hover:text-[#FF6B35] transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-[#1A1A2E]/55 text-sm leading-relaxed flex-1">
              {product.description}
            </p>

            <button
              className="mt-4 w-full py-3 rounded-xl text-white font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${colors.main}, ${colors.accent})`,
              }}
            >
              <span>Order This</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedSection() {
  const { data: products, isLoading } = trpc.products.list.useQuery();

  // Get featured products from backend (max 3)
  const featured = products?.filter((p) => p.featured === "yes").slice(0, 3) || [];

  return (
    <section className="py-16 md:py-24 relative">
      {/* Wave divider from hero */}
      <div className="absolute top-0 left-0 right-0 -mt-1">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="#FFF8F0"
          />
        </svg>
      </div>

      {/* Halftone background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6B35 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-handwritten text-[#FF2D87] text-xl md:text-2xl block mb-2">
            Staff Picks
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] mb-4">
            Featured Favorites
          </h2>
          <p className="text-[#1A1A2E]/55 max-w-md mx-auto">
            Our team's hand-picked recommendations that customers can't stop ordering
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#FF6B35]" />
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
            {featured.map((product, index) => (
              <FeaturedCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
