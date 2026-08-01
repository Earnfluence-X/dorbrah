import { db } from './src/db';
import { seedProducts, seedReviews } from './src/lib/seed';
import { products, reviews } from './src/db/schema';

async function seed() {
  console.log('🌱 Seeding database...');
  
  // Insert products
  await db.insert(products).values(seedProducts);
  console.log(`✅ Inserted ${seedProducts.length} products`);
  
  // Insert reviews
  await db.insert(reviews).values(seedReviews);
  console.log(`✅ Inserted ${seedReviews.length} reviews`);
  
  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed();