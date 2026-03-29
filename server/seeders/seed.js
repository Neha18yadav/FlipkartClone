// seed.js — Populates the database with sample categories and products
// Run this once: node seeders/seed.js

const sequelize = require('../config/database');
const { Category, Product, ProductImage } = require('../models');

const seedDatabase = async () => {
  try {
    // Connect and sync all tables (force: true drops existing tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database tables created');

    // ============================================================
    // STEP 1: Create Categories
    // ============================================================
    const categories = await Category.bulkCreate([
      { name: 'Mobiles', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop' },
      { name: 'Electronics', image_url: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=200&auto=format&fit=crop' },
      { name: 'Fashion', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop' },
      { name: 'Home & Furniture', image_url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=200&auto=format&fit=crop' },
      { name: 'Appliances', image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop' },
      { name: 'Beauty & Personal Care', image_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200&auto=format&fit=crop' },
      { name: 'Sports & Fitness', image_url: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?q=80&w=200&auto=format&fit=crop' },
      { name: 'Books', image_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=200&auto=format&fit=crop' },
    ]);
    console.log('✅ Categories created');

    // ============================================================
    // STEP 2: Create Products
    // Each product has: name, description, specs (JSON), price, original_price,
    // discount %, stock, brand, rating, review_count, category_id
    // ============================================================
    const products = [
      // --- MOBILES ---
      {
        name: 'Samsung Galaxy S24 Ultra 5G',
        description: 'Flagship smartphone with S Pen, 200MP camera, and Snapdragon 8 Gen 3 processor. Features a stunning 6.8-inch Dynamic AMOLED display with 120Hz refresh rate.',
        specifications: JSON.stringify({ RAM: '12 GB', Storage: '256 GB', Display: '6.8 inch QHD+', Battery: '5000 mAh', Processor: 'Snapdragon 8 Gen 3', Camera: '200MP + 12MP + 50MP + 10MP' }),
        price: 129999, original_price: 149999, discount_percent: 13, stock: 15,
        brand: 'Samsung', rating: 4.5, review_count: 12453, category_id: 1,
      },
      {
        name: 'iPhone 15 Pro Max',
        description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and 48MP camera system. Features Dynamic Island and Always-On display.',
        specifications: JSON.stringify({ RAM: '8 GB', Storage: '256 GB', Display: '6.7 inch Super Retina XDR', Battery: '4441 mAh', Processor: 'A17 Pro', Camera: '48MP + 12MP + 12MP' }),
        price: 156900, original_price: 169900, discount_percent: 8, stock: 10,
        brand: 'Apple', rating: 4.7, review_count: 8921, category_id: 1,
      },
      {
        name: 'OnePlus 12',
        description: 'Performance flagship with Snapdragon 8 Gen 3, Hasselblad camera, and 100W fast charging. 2K LTPO AMOLED display with Dolby Vision.',
        specifications: JSON.stringify({ RAM: '12 GB', Storage: '256 GB', Display: '6.82 inch 2K AMOLED', Battery: '5400 mAh', Processor: 'Snapdragon 8 Gen 3', Camera: '50MP + 48MP + 64MP' }),
        price: 64999, original_price: 69999, discount_percent: 7, stock: 25,
        brand: 'OnePlus', rating: 4.4, review_count: 6782, category_id: 1,
      },
      {
        name: 'Redmi Note 13 Pro+ 5G',
        description: 'Best-in-class 200MP camera phone with curved AMOLED display and MediaTek Dimensity 7200 Ultra processor.',
        specifications: JSON.stringify({ RAM: '8 GB', Storage: '256 GB', Display: '6.67 inch 120Hz AMOLED', Battery: '5000 mAh', Processor: 'Dimensity 7200 Ultra', Camera: '200MP + 8MP + 2MP' }),
        price: 28999, original_price: 34999, discount_percent: 17, stock: 50,
        brand: 'Xiaomi', rating: 4.2, review_count: 15234, category_id: 1,
      },

      // --- ELECTRONICS ---
      {
        name: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling wireless headphones with exceptional sound quality. 30-hour battery life and crystal clear hands-free calling.',
        specifications: JSON.stringify({ Type: 'Over-Ear', Connectivity: 'Bluetooth 5.2', Battery: '30 hours', 'Noise Canceling': 'Yes', Weight: '250g', Driver: '30mm' }),
        price: 26990, original_price: 34990, discount_percent: 23, stock: 30,
        brand: 'Sony', rating: 4.6, review_count: 9823, category_id: 2,
      },
      {
        name: 'Apple MacBook Air M2',
        description: 'Supercharged by M2 chip. Strikingly thin design with 13.6-inch Liquid Retina display. Up to 18 hours of battery life.',
        specifications: JSON.stringify({ Processor: 'Apple M2', RAM: '8 GB', Storage: '256 GB SSD', Display: '13.6 inch Liquid Retina', Battery: '18 hours', Weight: '1.24 kg' }),
        price: 99990, original_price: 119900, discount_percent: 17, stock: 12,
        brand: 'Apple', rating: 4.7, review_count: 5432, category_id: 2,
      },
      {
        name: 'Samsung 55" Crystal 4K UHD TV',
        description: 'Crystal Processor 4K delivers a crystal clear, natural picture. Smart TV powered by Tizen with built-in voice assistant.',
        specifications: JSON.stringify({ 'Screen Size': '55 inches', Resolution: '4K UHD (3840x2160)', 'Refresh Rate': '60Hz', 'Smart TV': 'Yes', HDR: 'HDR10+', Speakers: '20W' }),
        price: 41990, original_price: 64900, discount_percent: 35, stock: 8,
        brand: 'Samsung', rating: 4.3, review_count: 7654, category_id: 2,
      },

      // --- FASHION ---
      {
        name: 'Levi\'s Men Slim Fit Jeans',
        description: 'Classic 511 Slim Fit jeans in dark indigo wash. Made with stretch denim for comfort and flexibility throughout the day.',
        specifications: JSON.stringify({ Material: '98% Cotton, 2% Elastane', Fit: 'Slim', Rise: 'Mid Rise', Closure: 'Zip', 'Wash Care': 'Machine Wash' }),
        price: 1799, original_price: 3999, discount_percent: 55, stock: 100,
        brand: "Levi's", rating: 4.3, review_count: 23421, category_id: 3,
      },
      {
        name: 'Nike Air Max 270 Running Shoes',
        description: 'The Nike Air Max 270 features Nike\'s biggest heel Air unit yet for a super-soft ride. Breathable mesh upper keeps your foot cool.',
        specifications: JSON.stringify({ Material: 'Mesh & Synthetic', Sole: 'Rubber', Closure: 'Lace-Up', 'Shoe Width': 'Medium', 'Heel Height': '32mm Air Unit' }),
        price: 8995, original_price: 13995, discount_percent: 36, stock: 45,
        brand: 'Nike', rating: 4.4, review_count: 11234, category_id: 3,
      },
      {
        name: 'Allen Solly Women Formal Blazer',
        description: 'Premium formal blazer with single-button closure. Perfect for office wear with a tailored fit and notched lapel collar.',
        specifications: JSON.stringify({ Material: '70% Polyester, 30% Viscose', Fit: 'Regular', Closure: 'Single Button', Lining: 'Full Lined', 'Wash Care': 'Dry Clean Only' }),
        price: 3499, original_price: 5999, discount_percent: 42, stock: 35,
        brand: 'Allen Solly', rating: 4.1, review_count: 3456, category_id: 3,
      },

      // --- HOME & FURNITURE ---
      {
        name: 'Wakefit Orthopedic Memory Foam Mattress',
        description: 'Medium firm mattress with memory foam layer for pressure relief. CertiPUR-US certified foam. 10-year warranty.',
        specifications: JSON.stringify({ Size: 'Queen (78x60)', Thickness: '6 inches', Material: 'Memory Foam + HR Foam', Firmness: 'Medium Firm', Warranty: '10 Years' }),
        price: 8499, original_price: 15999, discount_percent: 47, stock: 20,
        brand: 'Wakefit', rating: 4.3, review_count: 45678, category_id: 4,
      },
      {
        name: 'IKEA Wooden Study Desk',
        description: 'Minimalist study desk with cable management. Made from sustainable bamboo with steel legs. Perfect for home office setup.',
        specifications: JSON.stringify({ Material: 'Bamboo Top, Steel Legs', Dimensions: '120cm x 60cm x 75cm', Weight: '15 kg', 'Max Load': '50 kg', Assembly: 'Required' }),
        price: 7999, original_price: 12999, discount_percent: 38, stock: 15,
        brand: 'IKEA', rating: 4.2, review_count: 2345, category_id: 4,
      },
      {
        name: 'Prestige Pressure Cooker 5L',
        description: 'Classic stainless steel pressure cooker with dual lid, gasket release system and metallic safety plug for safe cooking.',
        specifications: JSON.stringify({ Material: 'Stainless Steel', Capacity: '5 Litres', Induction: 'Compatible', Warranty: '5 Years', 'Safety Features': 'Gasket Release, Metallic Safety Plug' }),
        price: 2199, original_price: 3495, discount_percent: 37, stock: 60,
        brand: 'Prestige', rating: 4.4, review_count: 18923, category_id: 4,
      },

      // --- APPLIANCES ---
      {
        name: 'LG 8 Kg Front Load Washing Machine',
        description: 'AI Direct Drive technology for fabric care. TurboWash 360° for a thorough clean in just 39 minutes. Steam wash for allergen removal.',
        specifications: JSON.stringify({ Capacity: '8 Kg', Type: 'Front Load', 'Motor Type': 'AI Direct Drive', 'Spin Speed': '1400 RPM', 'Energy Rating': '5 Star', Warranty: '2 Years' }),
        price: 36990, original_price: 49990, discount_percent: 26, stock: 10,
        brand: 'LG', rating: 4.4, review_count: 5678, category_id: 5,
      },
      {
        name: 'Dyson V12 Detect Slim Vacuum',
        description: 'Intelligent cordless vacuum with laser dust detection. Piezo sensor measures and counts dust particles. Up to 60 minutes runtime.',
        specifications: JSON.stringify({ Type: 'Cordless Stick', Suction: '150 AW', Battery: '60 minutes', Weight: '2.2 kg', Filter: 'HEPA', 'Dust Capacity': '0.35L' }),
        price: 52900, original_price: 58900, discount_percent: 10, stock: 8,
        brand: 'Dyson', rating: 4.5, review_count: 3421, category_id: 5,
      },
      {
        name: 'Samsung 253L Frost Free Refrigerator',
        description: 'Double door frost free refrigerator with digital inverter technology for energy efficiency and less noise. Convertible 5-in-1 modes.',
        specifications: JSON.stringify({ Capacity: '253 Litres', Type: 'Double Door', 'Energy Rating': '3 Star', Compressor: 'Digital Inverter', 'Cooling Type': 'Frost Free', Warranty: '1 Year + 20 Years Compressor' }),
        price: 24990, original_price: 33490, discount_percent: 25, stock: 12,
        brand: 'Samsung', rating: 4.2, review_count: 8765, category_id: 5,
      },

      // --- BEAUTY & PERSONAL CARE ---
      {
        name: 'Maybelline Fit Me Foundation',
        description: 'Lightweight, natural-finish foundation that fits seamlessly with your skin tone. Oil-free formula for a poreless, natural look.',
        specifications: JSON.stringify({ Volume: '30 ml', Finish: 'Matte', Coverage: 'Medium', 'Skin Type': 'Normal to Oily', SPF: '22' }),
        price: 399, original_price: 599, discount_percent: 33, stock: 200,
        brand: 'Maybelline', rating: 4.1, review_count: 34567, category_id: 6,
      },
      {
        name: 'Philips BT3211 Beard Trimmer',
        description: 'DuraPower technology for efficient trimming. 20 lock-in length settings from 0.5mm to 10mm. Self-sharpening stainless steel blades.',
        specifications: JSON.stringify({ 'Runtime': '60 minutes', 'Charging Time': '1 hour', Blades: 'Stainless Steel', 'Length Settings': '20', Waterproof: 'Yes', Warranty: '2 Years' }),
        price: 1299, original_price: 1795, discount_percent: 28, stock: 75,
        brand: 'Philips', rating: 4.3, review_count: 45678, category_id: 6,
      },

      // --- SPORTS & FITNESS ---
      {
        name: 'Fitness Guru Yoga Mat 6mm',
        description: 'Premium anti-slip yoga mat with alignment lines. Made from eco-friendly TPE material. Includes carry strap.',
        specifications: JSON.stringify({ Material: 'TPE (Eco-Friendly)', Thickness: '6mm', Dimensions: '183cm x 61cm', Weight: '800g', 'Anti-Slip': 'Yes' }),
        price: 699, original_price: 1499, discount_percent: 53, stock: 150,
        brand: 'Fitness Guru', rating: 4.2, review_count: 12345, category_id: 7,
      },
      {
        name: 'Boldfit Adjustable Dumbbells 20kg Set',
        description: 'Versatile dumbbell set with multiple weight plates. Rubber coated for floor protection. Chrome-plated bars with secure collars.',
        specifications: JSON.stringify({ 'Total Weight': '20 kg', Material: 'Cast Iron, Rubber Coated', 'Bar Material': 'Chrome Plated Steel', Plates: '4x2.5kg, 4x1.25kg', Collars: '4 Star Lock' }),
        price: 1899, original_price: 3499, discount_percent: 46, stock: 40,
        brand: 'Boldfit', rating: 4.3, review_count: 6789, category_id: 7,
      },

      // --- BOOKS ---
      {
        name: 'Atomic Habits by James Clear',
        description: 'An easy and proven way to build good habits and break bad ones. The #1 New York Times bestselling book on habit formation.',
        specifications: JSON.stringify({ Author: 'James Clear', Pages: '320', Language: 'English', Publisher: 'Penguin Random House', Format: 'Paperback' }),
        price: 399, original_price: 799, discount_percent: 50, stock: 200,
        brand: 'Penguin', rating: 4.6, review_count: 56789, category_id: 8,
      },
      {
        name: 'The Psychology of Money',
        description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. 19 short stories exploring the strange ways people think about money.',
        specifications: JSON.stringify({ Author: 'Morgan Housel', Pages: '256', Language: 'English', Publisher: 'Jaico Publishing', Format: 'Paperback' }),
        price: 299, original_price: 499, discount_percent: 40, stock: 180,
        brand: 'Jaico', rating: 4.5, review_count: 43210, category_id: 8,
      },
      {
        name: 'Rich Dad Poor Dad',
        description: 'What the Rich Teach Their Kids About Money — That the Poor and Middle Class Do Not! A personal finance classic by Robert T. Kiyosaki.',
        specifications: JSON.stringify({ Author: 'Robert T. Kiyosaki', Pages: '336', Language: 'English', Publisher: 'Plata Publishing', Format: 'Paperback' }),
        price: 349, original_price: 599, discount_percent: 42, stock: 160,
        brand: 'Plata Publishing', rating: 4.5, review_count: 67890, category_id: 8,
      },
    ];

    const createdProducts = await Product.bulkCreate(products);
    console.log(`✅ ${createdProducts.length} Products created`);

    // ============================================================
    // STEP 3: Create Product Images
    // Using high-quality placeholder images from various free sources
    // ============================================================
    const productImages = [
      // Samsung Galaxy S24 Ultra
      { product_id: 1, image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop', display_order: 1 },
      { product_id: 1, image_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop', display_order: 2 },

      // iPhone 15 Pro Max
      { product_id: 2, image_url: '/images/products/iphone_15_pro_max.png', display_order: 1 },
      { product_id: 2, image_url: 'https://images.unsplash.com/photo-1592890284033-99712df88bcc?q=80&w=800&auto=format&fit=crop', display_order: 2 },

      // OnePlus 12
      { product_id: 3, image_url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Redmi Note 13 Pro+
      { product_id: 4, image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Sony Headphones
      { product_id: 5, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', display_order: 1 },
      { product_id: 5, image_url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop', display_order: 2 },

      // MacBook Air
      { product_id: 6, image_url: '/images/products/macbook_air_m2.png', display_order: 1 },
      { product_id: 6, image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', display_order: 2 },

      // Samsung TV
      { product_id: 7, image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Levi's Jeans
      { product_id: 8, image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Nike Shoes
      { product_id: 9, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Allen Solly Blazer
      { product_id: 10, image_url: '/images/products/allen_solly_blazer.png', display_order: 1 },

      // Wakefit Mattress
      { product_id: 11, image_url: '/images/products/wakefit_mattress.png', display_order: 1 },

      // IKEA Desk
      { product_id: 12, image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Prestige Cooker
      { product_id: 13, image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // LG Washing Machine
      { product_id: 14, image_url: '/images/products/lg_washing_machine.png', display_order: 1 },

      // Dyson Vacuum
      { product_id: 15, image_url: '/images/products/dyson_vacuum.png', display_order: 1 },

      // Samsung Fridge
      { product_id: 16, image_url: '/images/products/samsung_fridge.png', display_order: 1 },

      // Maybelline Foundation
      { product_id: 17, image_url: '/images/products/maybelline_foundation.png', display_order: 1 },

      // Philips Trimmer
      { product_id: 18, image_url: 'https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Yoga Mat
      { product_id: 19, image_url: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Dumbbells
      { product_id: 20, image_url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Atomic Habits
      { product_id: 21, image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Psychology of Money
      { product_id: 22, image_url: 'https://images.unsplash.com/photo-1592492159418-39f319320569?q=80&w=800&auto=format&fit=crop', display_order: 1 },

      // Rich Dad Poor Dad
      { product_id: 23, image_url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop', display_order: 1 },
    ];

    await ProductImage.bulkCreate(productImages);
    console.log('✅ Product images created');

    console.log('\n🎉 Database seeded successfully!');
    console.log(`   ${categories.length} categories`);
    console.log(`   ${createdProducts.length} products`);
    console.log(`   ${productImages.length} product images`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
