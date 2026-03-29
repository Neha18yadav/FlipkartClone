const { Order, OrderItem, Cart, CartItem, Product, ProductImage } = require('../models');
const sequelize = require('../config/database');
const { sendOrderConfirmation } = require('../services/emailService');
const User = require('../models/User');

// POST /api/orders — Place a new order from the items in the cart
const placeOrder = async (req, res) => {
  // Use a database transaction to ensure all-or-nothing (if any step fails, everything rolls back)
  const transaction = await sequelize.transaction();

  try {
    const { shipping_name, shipping_address, shipping_city, shipping_state, shipping_pincode, shipping_phone } = req.body;

    // Validate shipping details
    if (!shipping_name || !shipping_address || !shipping_city || !shipping_state || !shipping_pincode || !shipping_phone) {
      await transaction.rollback();
      return res.status(400).json({ error: 'All shipping fields are required' });
    }

    // Get the user's cart
    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Get all cart items with product details
    const cartItems = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{ model: Product }],
    });

    if (cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.Product.price * item.quantity;

      // Check stock one more time before placing order
      if (item.Product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          error: `Not enough stock for ${item.Product.name}. Available: ${item.Product.stock}`,
        });
      }
    }

    // Step 1: Create the order
    const order = await Order.create({
      user_id: req.user.id,
      total_amount: Math.round(totalAmount * 100) / 100,
      shipping_name,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_pincode,
      shipping_phone,
    }, { transaction });

    // Step 2: Create order items and reduce stock
    for (const item of cartItems) {
      // Add each cart item as an order item
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.Product.price, // Capture current price
      }, { transaction });

      // Reduce product stock
      await Product.update(
        { stock: item.Product.stock - item.quantity },
        { where: { id: item.product_id }, transaction }
      );
    }

    // Step 3: Clear the cart
    await CartItem.destroy({ where: { cart_id: cart.id }, transaction });

    // Commit the transaction — everything succeeded
    await transaction.commit();

    // Trigger asynchronous email confirmation (non-blocking)
    if (req.user && req.user.email) {
      sendOrderConfirmation(req.user.email, order);
    }

    res.status(201).json({
      message: 'Order placed successfully',
      order_id: order.id,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// GET /api/orders/:id — Get order details for confirmation page
const getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              attributes: ['id', 'name', 'brand'],
              include: [
                { model: ProductImage, as: 'images', attributes: ['image_url'], limit: 1 }
              ],
            },
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// GET /api/orders — Get all orders for the current user (Order History)
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              attributes: ['id', 'name'],
              include: [{ model: ProductImage, as: 'images', attributes: ['image_url'], limit: 1 }]
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
};

module.exports = { placeOrder, getOrder, getUserOrders };
