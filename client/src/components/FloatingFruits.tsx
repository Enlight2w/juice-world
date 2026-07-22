/**
 * FloatingFruits - Animated fruit emojis floating in the background
 * Adds playful, interactive background movement to the site
 * Parallax effect based on scroll position
 */
import { useEffect, useState } from "react";

interface FloatingFruit {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  opacity: number;
  parallaxFactor: number;
}

const fruitEmojis = ["🍊", "🍓", "🥭", "🍇", "🍌", "🍑", "🫐", "🍍", "🍋", "🥥", "🍉", "🍒"];

function generateFruits(count: number): FloatingFruit[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: fruitEmojis[i % fruitEmojis.length],
    x: Math.random() * 95 + 2,
    y: Math.random() * 95 + 2,
    size: 14 + Math.random() * 22,
    speed: 18 + Math.random() * 25,
    delay: Math.random() * -30,
    opacity: 0.08 + Math.random() * 0.15,
    parallaxFactor: 0.3 + Math.random() * 0.7,
  }));
}

export default function FloatingFruits() {
  const [fruits, setFruits] = useState<FloatingFruit[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setFruits(generateFruits(18));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className="absolute"
          style={{
            left: `${fruit.x}%`,
            top: `${fruit.y + scrollY * fruit.parallaxFactor * 0.02}%`,
            fontSize: `${fruit.size}px`,
            opacity: fruit.opacity,
            animation: `float ${fruit.speed}s ease-in-out infinite`,
            animationDelay: `${fruit.delay}s`,
            filter: "blur(0.3px)",
            transition: "top 0.3s ease-out",
          }}
        >
          {fruit.emoji}
        </div>
      ))}
    </div>
  );
}
