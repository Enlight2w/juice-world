/**
 * Product data for Juice World
 * All products with pricing, descriptions, and image URLs
 */

export interface Product {
  id: number;
  name: string;
  category: "juices" | "smoothies" | "milkshakes" | "puddings";
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  badge?: string;
  popular?: boolean;
}

export const products: Product[] = [
  // JUICES
  {
    id: 1,
    name: "Classic Orange Splash",
    category: "juices",
    price: 4.99,
    description: "Fresh-squeezed Valencia oranges with a hint of sunshine",
    ingredients: ["Valencia Oranges", "Lemon Zest", "Vitamin C"],
    image: "/manus-storage/citrus-splash_f8182f2c.png",
    badge: "Bestseller",
    popular: true,
  },
  {
    id: 2,
    name: "Tropical Paradise",
    category: "juices",
    price: 5.99,
    description: "Pineapple, mango, and passion fruit fusion",
    ingredients: ["Pineapple", "Mango", "Passion Fruit", "Coconut Water"],
    image: "/manus-storage/tropical-juice_78531b43.png",
    badge: "New",
    popular: true,
  },
  {
    id: 3,
    name: "Green Detox Blend",
    category: "juices",
    price: 6.49,
    description: "A refreshing mix of greens for a healthy reset",
    ingredients: ["Kale", "Cucumber", "Green Apple", "Mint", "Lemon"],
    image: "/manus-storage/green-detox_9c406ba5.png",
  },
  {
    id: 4,
    name: "Berry Burst",
    category: "juices",
    price: 5.49,
    description: "Mixed berries blended to perfection",
    ingredients: ["Strawberries", "Blueberries", "Raspberries", "Lemon"],
    image: "/manus-storage/berries-smoothie_4d980906.png",
    popular: true,
  },
  {
    id: 5,
    name: "Watermelon Wave",
    category: "juices",
    price: 4.49,
    description: "Cool, refreshing, and oh-so-summery",
    ingredients: ["Watermelon", "Mint", "Lime"],
    image: "/manus-storage/fruit-juice-collection_9a4ff52e.png",
  },
  {
    id: 6,
    name: "Carrot Ginger Kick",
    category: "juices",
    price: 5.99,
    description: "Earthy carrots with a spicy ginger finish",
    ingredients: ["Carrot", "Ginger", "Orange", "Turmeric"],
    image: "/manus-storage/citrus-splash_f8182f2c.png",
  },

  // SMOOTHIES
  {
    id: 7,
    name: "Mango Tango",
    category: "smoothies",
    price: 6.99,
    description: "Thick, creamy, and absolutely tropical",
    ingredients: ["Mango", "Banana", "Greek Yogurt", "Honey"],
    image: "/manus-storage/juice-smoothie_dcaae237.png",
    badge: "Fan Favorite",
    popular: true,
  },
  {
    id: 8,
    name: "Berry Bliss",
    category: "smoothies",
    price: 7.49,
    description: "A berry bonanza in every sip",
    ingredients: ["Mixed Berries", "Banana", "Acai", "Almond Milk"],
    image: "/manus-storage/berries-smoothie_4d980906.png",
    badge: "Popular",
    popular: true,
  },
  {
    id: 9,
    name: "Green Machine",
    category: "smoothies",
    price: 7.99,
    description: "Your daily dose of greens, made delicious",
    ingredients: ["Spinach", "Banana", "Pineapple", "Chia Seeds", "Almond Milk"],
    image: "/manus-storage/green-detox_9c406ba5.png",
  },
  {
    id: 10,
    name: "Peanut Butter Power",
    category: "smoothies",
    price: 7.49,
    description: "Protein-packed and peanut butter obsessed",
    ingredients: ["Peanut Butter", "Banana", "Oats", "Honey", "Milk"],
    image: "/manus-storage/juice-smoothie_dcaae237.png",
  },
  {
    id: 11,
    name: "Acai Berry Bowl",
    category: "smoothies",
    price: 8.99,
    description: "Thick acai smoothie with fresh toppings",
    ingredients: ["Acai", "Banana", "Granola", "Fresh Berries", "Honey"],
    image: "/manus-storage/berries-smoothie_4d980906.png",
    badge: "Premium",
  },

  // MILKSHAKES
  {
    id: 12,
    name: "Classic Vanilla Shake",
    category: "milkshakes",
    price: 5.99,
    description: "Old school creamy vanilla perfection",
    ingredients: ["Vanilla Ice Cream", "Milk", "Whipped Cream"],
    image: "/manus-storage/milkshake-classic_e8f4ac67.png",
  },
  {
    id: 13,
    name: "Double Chocolate",
    category: "milkshakes",
    price: 6.49,
    description: "Rich, decadent chocolate overload",
    ingredients: ["Chocolate Ice Cream", "Chocolate Syrup", "Whipped Cream", "Cookie Crumbs"],
    image: "/manus-storage/chocolate-milkshake_9c54a269.png",
    badge: "Indulgent",
    popular: true,
  },
  {
    id: 14,
    name: "Strawberry Dream",
    category: "milkshakes",
    price: 6.49,
    description: "Fresh strawberries meet creamy vanilla",
    ingredients: ["Strawberries", "Vanilla Ice Cream", "Milk", "Whipped Cream"],
    image: "/manus-storage/milkshake-classic_e8f4ac67.png",
  },
  {
    id: 15,
    name: "Cookies & Cream",
    category: "milkshakes",
    price: 6.99,
    description: "Crushed cookies in a creamy milkshake",
    ingredients: ["Cookies & Cream Ice Cream", "Oreo Crumbs", "Whipped Cream"],
    image: "/manus-storage/chocolate-milkshake_9c54a269.png",
    badge: "Bestseller",
  },
  {
    id: 16,
    name: "Caramel Delight",
    category: "milkshakes",
    price: 6.99,
    description: "Buttery caramel swirled to perfection",
    ingredients: ["Caramel Ice Cream", "Caramel Sauce", "Whipped Cream", "Pecans"],
    image: "/manus-storage/milkshake-classic_e8f4ac67.png",
  },

  // PUDDINGS
  {
    id: 17,
    name: "Mango Panna Cotta",
    category: "puddings",
    price: 5.99,
    description: "Silky smooth mango paradise",
    ingredients: ["Mango Puree", "Cream", "Vanilla", "Gelatin"],
    image: "/manus-storage/mango-pudding_f78ee9c1.png",
    badge: "Chef's Pick",
    popular: true,
  },
  {
    id: 18,
    name: "Chocolate Mousse",
    category: "puddings",
    price: 5.49,
    description: "Airy, rich, and deeply chocolatey",
    ingredients: ["Dark Chocolate", "Eggs", "Cream", "Vanilla"],
    image: "/manus-storage/pudding-dessert_43655a0b.png",
  },
  {
    id: 19,
    name: "Mixed Berry Trifle",
    category: "puddings",
    price: 6.99,
    description: "Layers of cake, custard, and fresh berries",
    ingredients: ["Sponge Cake", "Custard", "Mixed Berries", "Cream"],
    image: "/manus-storage/pudding-dessert_43655a0b.png",
    badge: "New",
  },
  {
    id: 20,
    name: "Coconut Rice Pudding",
    category: "puddings",
    price: 4.99,
    description: "Creamy, comforting, and tropical",
    ingredients: ["Rice", "Coconut Milk", "Vanilla", "Cinnamon"],
    image: "/manus-storage/mango-pudding_f78ee9c1.png",
  },
  {
    id: 21,
    name: "Passion Fruit Creme Brûlée",
    category: "puddings",
    price: 7.99,
    description: "Classic custard with a tropical twist",
    ingredients: ["Passion Fruit", "Cream", "Egg Yolks", "Caramelized Sugar"],
    image: "/manus-storage/pudding-dessert_43655a0b.png",
    badge: "Premium",
  },
];

export const categoryColors: Record<string, string> = {
  juices: "#FF6B35",
  smoothies: "#8B5CF6",
  milkshakes: "#FFD23F",
  puddings: "#7AC74F",
};

export const categoryEmojis: Record<string, string> = {
  juices: "🍊",
  smoothies: "🥤",
  milkshakes: "🥛",
  puddings: "🍮",
};

export const categoryImages: Record<string, string> = {
  juices: "/manus-storage/fruit-juice-collection_9a4ff52e.png",
  smoothies: "/manus-storage/juice-smoothie_dcaae237.png",
  milkshakes: "/manus-storage/milkshake-classic_e8f4ac67.png",
  puddings: "/manus-storage/pudding-dessert_43655a0b.png",
};
