/**
 * Footer - Colorful pop-art footer with prominent brand identity
 * Halftone patterns, splash decorations, playful language
 * Design: Tropical Pop Art Explosion
 */
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#1A1A2E] text-white pt-20 pb-8 overflow-hidden">
      {/* Top wave with halftone */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,58.7C840,53,960,43,1080,42.7C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            fill="#1A1A2E"
          />
        </svg>
      </div>

      {/* Decorative halftone overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
        }}
      />

      {/* Color splash decorations */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[#FF6B35]/8 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#FF2D87]/6 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-[#7AC74F]/5 blur-3xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/manus-storage/logo-mark_26884e61.png"
                alt="Juice World"
                className="w-12 h-12"
              />
              <div>
                <span className="font-display text-2xl bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] bg-clip-text text-transparent block">
                  Juice World
                </span>
                <span className="font-handwritten text-xs text-white/40 block -mt-1">
                  since 2020
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Crafting fresh, delicious beverages and desserts with love, laughter, and 100% real fruit.
            </p>
            <div className="flex gap-2">
              {["🍊", "🍓", "🥭", "🍇"].map((emoji, i) => (
                <span
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm hover:bg-white/10 hover:scale-110 transition-all duration-200 cursor-pointer"
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span className="text-[#FF6B35]">Quick Links</span>
            </h4>
            <ul className="space-y-3">
              {["Home", "Menu", "Prices", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-white/50 hover:text-[#FF6B35] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-[#FF6B35] rounded-full transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7AC74F]" />
              <span className="text-[#7AC74F]">Categories</span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Fresh Juices", emoji: "🍊" },
                { name: "Smoothies", emoji: "🥤" },
                { name: "Milkshakes", emoji: "🥛" },
                { name: "Puddings", emoji: "🍮" },
              ].map((cat) => (
                <li key={cat.name}>
                  <a
                    href="#menu"
                    className="text-white/50 hover:text-[#FF6B35] transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-[#7AC74F] rounded-full transition-all duration-200" />
                    {cat.emoji} {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2D87]" />
              <span className="text-[#FF2D87]">Stay Fresh</span>
            </h4>
            <p className="text-white/50 text-sm mb-4">
              Get weekly specials and new flavor announcements straight to your inbox!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-full bg-white/8 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#FF6B35]/50 transition-colors"
              />
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg shadow-orange-500/20">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              &copy; 2026 Juice World. All rights reserved. Made with{" "}
              <Heart className="w-3 h-3 inline text-[#FF2D87]" /> and fresh fruit.
            </p>
            <p className="text-white/20 text-xs">
              hello@juiceworld.com &middot; +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
