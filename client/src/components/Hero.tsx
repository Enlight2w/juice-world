/**
 * Hero Section - Tropical Pop Art Explosion
 * Full-width hero with vibrant banner, animated text, comic burst elements
 * Design: Bold color blocks, playful overlapping elements, fruit-forward imagery
 */
import { useState, useEffect } from "react";

function SplashCircle({ color, size, x, y, delay }: { color: string; size: number; x: string; y: string; delay: string }) {
  return (
    <div
      className="absolute rounded-full blur-2xl"
      style={{
        width: size,
        height: size,
        background: `${color}18`,
        left: x,
        top: y,
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background banner */}
      <div className="absolute inset-0 z-0">
        <img
          src="/manus-storage/hero-banner_957caf3b.png"
          alt="Tropical fruit splash"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F0]/90 via-[#FFF8F0]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF8F0]" />

        {/* Halftone overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #FF6B35 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }}
        />
      </div>

      {/* Animated decorative splash circles */}
      <SplashCircle color="#FF2D87" size={160} x="75%" y="10%" delay="0s" />
      <SplashCircle color="#FFD23F" size={120} x="65%" y="50%" delay="2s" />
      <SplashCircle color="#7AC74F" size={90} x="80%" y="35%" delay="4s" />
      <SplashCircle color="#8B5CF6" size={70} x="50%" y="70%" delay="1s" />
      <SplashCircle color="#FF6B35" size={100} x="10%" y="60%" delay="3s" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          {/* Fun badge */}
          <div
            className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg mb-8 transition-all duration-700 border border-[#FF6B35]/10 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="w-3 h-3 rounded-full bg-[#7AC74F] animate-pulse shadow-sm shadow-green-300" />
            <span className="font-medium text-sm text-[#1A1A2E]">Fresh & Made Daily</span>
            <span className="text-sm">✨</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-display text-5xl md:text-7xl lg:text-8xl text-[#1A1A2E] leading-[1.1] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Sip the{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] bg-clip-text text-transparent">
                Rainbow
              </span>
              {/* Underline splash */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 opacity-40"
                viewBox="0 0 200 12"
              >
                <path
                  d="M0,6 Q50,0 100,6 T200,6"
                  fill="none"
                  stroke="#FF2D87"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-[#1A1A2E]/60 max-w-lg mb-8 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Add some squeeze to your day! Hand-crafted juices, smoothies, milkshakes, and puddings made with 100% real fruit. No preservatives, just pure joy.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <a
              href="#menu"
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white px-8 py-4 rounded-full font-display text-lg shadow-xl shadow-orange-300/40 hover:shadow-2xl hover:shadow-pink-300/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Menu
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#prices"
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-[#1A1A2E] px-8 py-4 rounded-full font-display text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#FF6B35]/15"
            >
              View Prices
            </a>
          </div>

          {/* Fun stat badges */}
          <div
            className={`flex flex-wrap gap-8 mt-14 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {[
              { value: "50+", label: "Flavors", emoji: "🍹" },
              { value: "100%", label: "Natural", emoji: "🌿" },
              { value: "15min", label: "Fresh Made", emoji: "⚡" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="font-display text-3xl text-[#FF6B35] group-hover:scale-110 transition-transform duration-200">
                  {stat.value}
                </div>
                <div className="text-sm text-[#1A1A2E]/50 font-medium flex items-center justify-center gap-1">
                  <span>{stat.emoji}</span> {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
