/**
 * ProductGrid - Interactive product cards with pop-art styling
 * Staggered layout, hand-drawn price tags, comic-burst badges, splash effects
 * Design: Tropical Pop Art Explosion
 */
import { useState, useEffect, useRef } from "react";
import { products, categoryColors, categoryEmojis } from "@/data/products";
import type { Product } from "@/data/products";

interface ProductGridProps {
  activeCategory: string;
}

function PriceTag({ price, color }: { price: number; color: string }) {
  return (
    <div className="relative inline-block">
      {/* Hand-drawn tag shape using SVG */}
      <svg width="80" height="44" viewBox="0 0 80 44" className="absolute -top-1 -left-1">
        <path
          d="M5,0 L72,0 C75,0 78,3 78,6 L78,32 C78,35 75,38 72,38 L15,38 L8,44 L8,38 L5,38 C2,38 0,35 0,32 L0,6 C0,3 2,0 5,0 Z"
          fill={color}
          opacity="0.12"
        />
        <path
          d="M5,0 L72,0 C75,0 78,3 78,6 L78,32 C78,35 75,38 72,38 L15,38 L8,44 L8,38 L5,38 C2,38 0,35 0,32 L0,6 C0,3 2,0 5,0 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3,2"
        />
      </svg>
      <span
        className="relative font-price text-lg"
        style={{ color }}
      >
        ${price.toFixed(2)}
      </span>
    </div>
  );
}

function ComicBadge({ text, color }: { text: string; color: string }) {
  return (
    <div
      className="relative animate-wiggle"
      style={{ animationDuration: "3s" }}
    >
      {/* Comic burst shape */}
      <svg width="70" height="70" viewBox="0 0 70 70" className="absolute -top-3 -left-3 -right-3 -bottom-3">
        <path
          d="M35,2 L39,12 L49,7 L46,17 L56,14 L50,24 L60,23 L52,32 L62,33 L52,38 L60,45 L50,44 L54,54 L44,49 L43,60 L36,51 L29,62 L28,51 L19,58 L22,47 L12,50 L18,41 L8,43 L16,35 L6,35 L16,29 L8,23 L18,25 L14,15 L24,19 L26,9 L31,18 Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      <span className="relative text-[9px] font-bold text-white uppercase tracking-wider leading-none">
        {text}
      </span>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const color = categoryColors[product.category];
  const emoji = categoryEmojis[product.category];

  // Staggered animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 60);
    return () => clearTimeout(timer);
  }, [index]);

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Alternating tilt for staggered effect
  const tilt = index % 2 === 0 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]";

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div
        className={`group relative bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
          isHovered ? "scale-[1.03]" : "scale-100"
        } ${index % 3 === 0 ? tilt : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Color accent bar with halftone */}
        <div className="relative h-2 w-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: "4px 4px",
            }}
          />
        </div>

        {/* Image container with splash overlay */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse at bottom, ${color}44, transparent 70%)`,
            }}
          />

          {/* Comic badge for featured items */}
          {product.badge && product.popular && (
            <div className="absolute top-2 left-2 z-10">
              <ComicBadge text={product.badge} color={color} />
            </div>
          )}
          {product.badge && !product.popular && (
            <div
              className="absolute top-3 left-3 px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                transform: "rotate(-3deg)",
              }}
            >
              {product.badge}
            </div>
          )}

          {/* Hand-drawn price tag */}
          <div className="absolute top-3 right-3 z-10">
            <div
              className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg"
              style={{
                border: `2px dashed ${color}44`,
                transform: isHovered ? "rotate(3deg) scale(1.05)" : "rotate(-2deg)",
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <PriceTag price={product.price} color={color} />
            </div>
          </div>

          {/* Quick add button */}
          <button
            className={`absolute bottom-3 right-3 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              color: "white",
            }}
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 relative">
          {/* Category label with emoji */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{emoji}</span>
            <span
              className="font-handwritten text-xs tracking-wider uppercase"
              style={{ color }}
            >
              {product.category}
            </span>
          </div>

          <h3 className="font-display text-lg text-[#1A1A2E] mb-1 group-hover:text-[#FF6B35] transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-sm text-[#1A1A2E]/55 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Ingredients as pill tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.ingredients.slice(0, 3).map((ing) => (
              <span
                key={ing}
                className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: `${color}15`,
                  color: `${color}cc`,
                  border: `1px solid ${color}22`,
                }}
              >
                {ing}
              </span>
            ))}
            {product.ingredients.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 text-[#1A1A2E]/35">
                +{product.ingredients.length - 3} more
              </span>
            )}
          </div>

          {/* Order button */}
          <button
            className="w-full py-2.5 rounded-xl text-white text-sm font-semibold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            }}
          >
            Add to Cart
          </button>

          {/* Splash corner decoration */}
          <div
            className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full transition-all duration-500 blur-xl ${
              isHovered ? "opacity-20 scale-100" : "opacity-0 scale-50"
            }`}
            style={{ background: color }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ activeCategory }: ProductGridProps) {
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-8 md:py-16 relative">
      {/* Halftone background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6B35 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🍹</span>
            <p className="font-display text-2xl text-[#1A1A2E]/60">
              No products found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
