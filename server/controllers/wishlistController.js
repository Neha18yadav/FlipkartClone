const { Wishlist, Product, ProductImage } = require('../models');

// GET /api/wishlist — Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Product,
          include: [{ model: ProductImage, as: 'images', attributes: ['image_url'], limit: 1 }]
        }
      ]
    });
    res.json(wishlist);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

// POST /api/wishlist/toggle — Add or remove product from wishlist
const toggleWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    
    const existing = await Wishlist.findOne({
      where: { user_id: req.user.id, product_id }
    });

    if (existing) {
      await existing.destroy();
      return res.json({ message: 'Removed from wishlist', isFavorite: false });
    } else {
      await Wishlist.create({ user_id: req.user.id, product_id });
      return res.status(201).json({ message: 'Added to wishlist', isFavorite: true });
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    res.status(500).json({ error: 'Failed to update wishlist' });
  }
};

module.exports = { getWishlist, toggleWishlist };
