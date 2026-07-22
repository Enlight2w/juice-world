/**
 * CategoryTabs - Interactive category filtering tabs with pop-art flair
 * Comic burst active states, playful hover effects, color-coded categories
 * Design: Tropical Pop Art Explosion
 */

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categories = [
  { id: "all", label: "All", emoji: "🍹", color: "from-[#FF6B35] to-[#FF2D87]" },
  { id: "juices", label: "Juices", emoji: "🍊", color: "from-[#FFD23F] to-[#FF6B35]" },
  { id: "smoothies", label: "Smoothies", emoji: "🥤", color: "from-[#8B5CF6] to-[#FF2D87]" },
  { id: "milkshakes", label: "Milkshakes", emoji: "🥛", color: "from-[#FF6B35] to-[#FFD23F]" },
  { id: "puddings", label: "Puddings", emoji: "🍮", color: "from-[#7AC74F] to-[#FFD23F]" },
];

export default function CategoryTabs({ activeCategory, setActiveCategory }: CategoryTabsProps) {
  return (
    <section id="menu" className="py-16 md:py-24 relative">
      {/* Halftone background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6B35 1px, transparent 1px)`,
          backgroundSize: "18px 18px",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-handwritten text-[#FF2D87] text-xl md:text-2xl block mb-2">
            Our Delicious Selection
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1A1A2E] mb-4">
            What Would You Like?
          </h2>
          <p className="text-[#1A1A2E]/55 max-w-md mx-auto">
            Choose from our wide range of fresh drinks and desserts
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-base transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                    : "bg-white text-[#1A1A2E] hover:scale-105 shadow-md hover:shadow-lg border-2 border-transparent hover:border-[#FF6B35]/15"
                }`}
              >
                <span className={`text-xl ${isActive ? "scale-110" : ""} transition-transform duration-200`}>
                  {cat.emoji}
                </span>
                <span>{cat.label}</span>
                {isActive && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#7AC74F] rounded-full animate-pulse border-2 border-white shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
