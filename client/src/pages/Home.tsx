/**
 * Juice World - Tropical Pop Art Explosion
 * Design: Bold color blocks, playful overlapping elements, fruit-forward imagery
 * Typography: Fredoka One (display), Poppins (body), Righteous (prices), Permanent Marker (labels)
 * Colors: Vibrant Orange (#FF6B35), Electric Pink (#FF2D87), Lime (#7AC74F), Sunshine (#FFD23F), Berry (#8B5CF6)
 */
import { useState } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import CategoryTabs from "@/components/CategoryTabs";
import ProductGrid from "@/components/ProductGrid";
import PriceList from "@/components/PriceList";
import FeaturedSection from "@/components/FeaturedSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingFruits from "@/components/FloatingFruits";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <div className="min-h-screen bg-[#FFF8F0] relative overflow-hidden">
      {/* Floating fruit background elements */}
      <FloatingFruits />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Featured Section */}
      <FeaturedSection />

      {/* Category Tabs */}
      <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Product Grid */}
      <ProductGrid activeCategory={activeCategory} />

      {/* Full Price List */}
      <PriceList />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
