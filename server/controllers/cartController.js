const { Cart, CartItem, Product, ProductImage } = require('../models');

// Helper: Get or create a cart for the authenticated user
const getOrCreateCart = async (userId) => {
  // findOrCreate returns [instance, wasCreated]
  const [cart] = await Cart.findOrCreate({
    where: { user_id: userId },
    defaults: { user_id: userId },
  });
  return cart;
};

// GET /api/cart — Get the current user's cart with all items
const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);

    // Fetch all items in this cart, including product details
    const items = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'original_price', 'discount_percent', 'stock', 'brand'],
          include: [
            { model: ProductImage, as: 'images', attributes: ['image_url'], limit: 1 }
          ],
        },
      ],
    });

    // Calculate totals
    let totalItems = 0;
    let totalPrice = 0;
    let totalDiscount = 0;

    items.forEach(item => {
      totalItems += item.quantity;
      totalPrice += item.Product.price * item.quantity;
      if (item.Product.original_price) {
        totalDiscount += (item.Product.original_price - item.Product.price) * item.quantity;
      }
    });

    res.json({
      cart_id: cart.id,
      items,
      totalItems,
      totalPrice: Math.round(totalPrice * 100) / 100,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      totalOriginalPrice: Math.round((totalPrice + totalDiscount) * 100) / 100,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// POST /api/cart/add — Add a product to cart (or increase quantity if already in cart)
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;

    // Validate: check if product exists and is in stock
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    const cart = await getOrCreateCart(req.user.id);

    // Check if product already exists in cart
    const existingItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id },
    });

    if (existingItem) {
      // Product already in cart — increase quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      res.json({ message: 'Cart updated', item: existingItem });
    } else {
      // New product — add to cart
      const newItem = await CartItem.create({
        cart_id: cart.id,
        product_id,
        quantity,
      });
      res.status(201).json({ message: 'Added to cart', item: newItem });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

// PUT /api/cart/update/:itemId — Update quantity of a cart item
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // If quantity is 0 or less, remove item instead
    if (quantity <= 0) {
      await item.destroy();
      return res.json({ message: 'Item removed from cart' });
    }

    // Check stock availability
    const product = await Product.findByPk(item.product_id);
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    item.quantity = quantity;
    await item.save();
    res.json({ message: 'Quantity updated', item });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

// DELETE /api/cart/remove/:itemId — Remove an item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await CartItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
