/**
 * Navigation - Tropical Pop Art style sticky nav
 * Features: Brand logo with gradient, fun links, cart icon
 * Design: Tropical Pop Art Explosion
 */
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "Prices", href: "#prices" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-orange-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo - Prominent brand identity */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img
              src="/manus-storage/logo-mark_26884e61.png"
              alt="Juice World Logo"
              className="w-11 h-11 md:w-13 md:h-13 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
            />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-[#FF6B35]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-display text-xl md:text-[1.35rem] bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] bg-clip-text text-transparent leading-none">
            Juice World
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative font-medium text-[#1A1A2E] hover:text-[#FF6B35] transition-colors duration-200 py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[#FF6B35] after:to-[#FF2D87] after:transition-all after:duration-300 hover:after:w-full after:rounded-full"
            >
              {link.label}
            </a>
          ))}
          <button className="relative flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white px-5 py-2.5 rounded-full font-medium hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-orange-300/30">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {/* Cart badge */}
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFD23F] text-[#1A1A2E] rounded-full text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#1A1A2E] relative z-10"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-orange-100">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-[#1A1A2E] hover:text-[#FF6B35] py-2 border-b border-orange-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF2D87] text-white px-5 py-3 rounded-full font-medium mt-2">
              <ShoppingCart className="w-5 h-5" />
              <span>View Cart</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
