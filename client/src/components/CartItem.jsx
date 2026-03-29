// CartItem.jsx — A single item row in the shopping cart
// Shows product image, name, price, quantity controls, and remove button

import { useState } from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [updating, setUpdating] = useState(false);
  const product = item.Product;

  // Get the first image
  const imageUrl = product.images && product.images.length > 0
    ? product.images[0].image_url
    : 'https://via.placeholder.com/100x100?text=No+Image';

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || updating) return;
    setUpdating(true);
    await onUpdateQuantity(item.id, newQuantity);
    setUpdating(false);
  };

  return (
    <div className="cart-item" id={`cart-item-${item.id}`}>
      {/* Product Image */}
      <div className="cart-item-image">
        <img src={imageUrl} alt={product.name} />
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.name}</h3>
        {product.brand && <span className="cart-item-brand">{product.brand}</span>}

        {/* Price */}
        <div className="cart-item-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="original-price">{formatPrice(product.original_price)}</span>
          )}
          {product.discount_percent > 0 && (
            <span className="discount-badge">{product.discount_percent}% off</span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button
              className="qty-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1 || updating}
            >
              −
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={updating}
            >
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() => onRemove(item.id)}
          >
            REMOVE
          </button>
        </div>
      </div>

      {/* Total for this item */}
      <div className="cart-item-total">
        {formatPrice(product.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
