import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const products = [
  // JUICES
  { name: "Classic Orange Splash", category: "juices", price: "4.99", description: "Fresh-squeezed Valencia oranges with a hint of sunshine", badge: "Bestseller", imageKey: "citrus-splash_f8182f2c.png", imageUrl: "/manus-storage/citrus-splash_f8182f2c.png", featured: "no" },
  { name: "Tropical Paradise", category: "juices", price: "5.99", description: "Pineapple, mango, and passion fruit fusion", badge: "New", imageKey: "tropical-juice_78531b43.png", imageUrl: "/manus-storage/tropical-juice_78531b43.png", featured: "yes" },
  { name: "Green Detox Blend", category: "juices", price: "6.49", description: "A refreshing mix of greens for a healthy reset", badge: null, imageKey: "green-detox_9c406ba5.png", imageUrl: "/manus-storage/green-detox_9c406ba5.png", featured: "no" },
  { name: "Berry Burst", category: "juices", price: "5.49", description: "Mixed berries blended to perfection", badge: "Popular", imageKey: "berries-smoothie_4d980906.png", imageUrl: "/manus-storage/berries-smoothie_4d980906.png", featured: "no" },
  { name: "Watermelon Wave", category: "juices", price: "4.49", description: "Cool, refreshing, and oh-so-summery", badge: null, imageKey: "fruit-juice-collection_9a4ff52e.png", imageUrl: "/manus-storage/fruit-juice-collection_9a4ff52e.png", featured: "no" },
  { name: "Carrot Ginger Kick", category: "juices", price: "5.99", description: "Earthy carrots with a spicy ginger finish", badge: null, imageKey: "citrus-splash_f8182f2c.png", imageUrl: "/manus-storage/citrus-splash_f8182f2c.png", featured: "no" },

  // SMOOTHIES
  { name: "Mango Tango", category: "smoothies", price: "6.99", description: "Thick, creamy, and absolutely tropical", badge: "Fan Favorite", imageKey: "juice-smoothie_dcaae237.png", imageUrl: "/manus-storage/juice-smoothie_dcaae237.png", featured: "no" },
  { name: "Berry Bliss", category: "smoothies", price: "7.49", description: "A berry bonanza in every sip", badge: "Popular", imageKey: "berries-smoothie_4d980906.png", imageUrl: "/manus-storage/berries-smoothie_4d980906.png", featured: "no" },
  { name: "Green Machine", category: "smoothies", price: "7.99", description: "Your daily dose of greens, made delicious", badge: null, imageKey: "green-detox_9c406ba5.png", imageUrl: "/manus-storage/green-detox_9c406ba5.png", featured: "no" },
  { name: "Peanut Butter Power", category: "smoothies", price: "7.49", description: "Protein-packed and peanut butter obsessed", badge: null, imageKey: "juice-smoothie_dcaae237.png", imageUrl: "/manus-storage/juice-smoothie_dcaae237.png", featured: "no" },
  { name: "Acai Berry Bowl", category: "smoothies", price: "8.99", description: "Thick acai smoothie with fresh toppings", badge: "Premium", imageKey: "berries-smoothie_4d980906.png", imageUrl: "/manus-storage/berries-smoothie_4d980906.png", featured: "no" },

  // MILKSHAKES
  { name: "Classic Vanilla Shake", category: "milkshakes", price: "5.99", description: "Old school creamy vanilla perfection", badge: null, imageKey: "milkshake-classic_e8f4ac67.png", imageUrl: "/manus-storage/milkshake-classic_e8f4ac67.png", featured: "no" },
  { name: "Double Chocolate", category: "milkshakes", price: "6.49", description: "Rich, decadent chocolate overload", badge: "Indulgent", imageKey: "chocolate-milkshake_9c54a269.png", imageUrl: "/manus-storage/chocolate-milkshake_9c54a269.png", featured: "yes" },
  { name: "Strawberry Dream", category: "milkshakes", price: "6.49", description: "Fresh strawberries meet creamy vanilla", badge: null, imageKey: "milkshake-classic_e8f4ac67.png", imageUrl: "/manus-storage/milkshake-classic_e8f4ac67.png", featured: "no" },
  { name: "Cookies & Cream", category: "milkshakes", price: "6.99", description: "Crushed cookies in a creamy milkshake", badge: "Bestseller", imageKey: "chocolate-milkshake_9c54a269.png", imageUrl: "/manus-storage/chocolate-milkshake_9c54a269.png", featured: "no" },
  { name: "Caramel Delight", category: "milkshakes", price: "6.99", description: "Buttery caramel swirled to perfection", badge: null, imageKey: "milkshake-classic_e8f4ac67.png", imageUrl: "/manus-storage/milkshake-classic_e8f4ac67.png", featured: "no" },

  // PUDDINGS
  { name: "Mango Panna Cotta", category: "puddings", price: "5.99", description: "Silky smooth mango paradise", badge: "Chef's Pick", imageKey: "mango-pudding_f78ee9c1.png", imageUrl: "/manus-storage/mango-pudding_f78ee9c1.png", featured: "yes" },
  { name: "Chocolate Mousse", category: "puddings", price: "5.49", description: "Airy, rich, and deeply chocolatey", badge: null, imageKey: "pudding-dessert_43655a0b.png", imageUrl: "/manus-storage/pudding-dessert_43655a0b.png", featured: "no" },
  { name: "Mixed Berry Trifle", category: "puddings", price: "6.99", description: "Layers of cake, custard, and fresh berries", badge: "New", imageKey: "pudding-dessert_43655a0b.png", imageUrl: "/manus-storage/pudding-dessert_43655a0b.png", featured: "no" },
  { name: "Coconut Rice Pudding", category: "puddings", price: "4.99", description: "Creamy, comforting, and tropical", badge: null, imageKey: "mango-pudding_f78ee9c1.png", imageUrl: "/manus-storage/mango-pudding_f78ee9c1.png", featured: "no" },
  { name: "Passion Fruit Creme Brulee", category: "puddings", price: "7.99", description: "Classic custard with a tropical twist", badge: "Premium", imageKey: "pudding-dessert_43655a0b.png", imageUrl: "/manus-storage/pudding-dessert_43655a0b.png", featured: "no" },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  // Check if products already exist
  const [existing] = await conn.query("SELECT COUNT(*) as count FROM products");
  if (existing[0].count > 0) {
    console.log(`Products table already has ${existing[0].count} rows. Skipping seed.`);
    await conn.end();
    process.exit(0);
  }

  for (const p of products) {
    await conn.query(
      `INSERT INTO products (name, category, price, description, badge, imageKey, imageUrl, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.name, p.category, p.price, p.description, p.badge, p.imageKey, p.imageUrl, p.featured]
    );
  }

  console.log(`Seeded ${products.length} products successfully.`);
  await conn.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
