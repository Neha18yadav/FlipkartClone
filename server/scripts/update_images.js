const { Product, ProductImage } = require('../models');
const sequelize = require('../config/database');

const updates = [
  { productId: 2, oldIncludes: 'unsplash.com/photo-1510557880182-3d4d3cba3f21', newUrl: '/images/products/iphone_15_pro_max.png' },
  { productId: 14, oldIncludes: 'unsplash.com/photo-1626806819282-2c1dc619ef6b', newUrl: '/images/products/lg_washing_machine.png' },
  { productId: 15, oldIncludes: 'unsplash.com/photo-1527515637462-cff94eecc1ae', newUrl: '/images/products/dyson_vacuum.png' },
  { productId: 16, oldIncludes: 'unsplash.com/photo-1584622781564-1d9876a13d1a', newUrl: '/images/products/samsung_fridge.png' },
  { productId: 17, oldIncludes: 'unsplash.com/photo-1596462502278-27bfdc4033c8', newUrl: '/images/products/maybelline_foundation.png' },
  { productId: 6, oldIncludes: 'unsplash.com/photo-1517336714460-4c50111c3a67', newUrl: '/images/products/macbook_air_m2.png' },
  { productId: 10, oldIncludes: 'unsplash.com/photo-1591047139829-d91aec16adcd', newUrl: '/images/products/allen_solly_blazer.png' },
  { productId: 11, oldIncludes: 'unsplash.com/photo-1505691938895-1758d7eaa511', newUrl: '/images/products/wakefit_mattress.png' },
];

const runUpdate = async () => {
  try {
    console.log('🔄 Starting product image updates...');
    
    for (const update of updates) {
      const result = await ProductImage.update(
        { image_url: update.newUrl },
        { 
          where: { 
            product_id: update.productId,
            display_order: 1 // Assuming we only want to replace the primary image
          } 
        }
      );
      
      if (result[0] > 0) {
        console.log(`✅ Updated Product ID ${update.productId} with ${update.newUrl}`);
      } else {
        console.log(`⚠️ No update needed or found for Product ID ${update.productId}`);
      }
    }

    console.log('🎉 All updates completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating product images:', error);
    process.exit(1);
  }
};

runUpdate();
