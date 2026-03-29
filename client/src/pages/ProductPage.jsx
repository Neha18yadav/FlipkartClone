// ProductPage.jsx — Product detail view
// Two-column layout: Image carousel (left) + Product details (right)

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../services/api';
import { useCart } from '../context/CartContext';
import ImageCarousel from '../components/ImageCarousel';

const ProductPage = () => {
  const { id } = useParams();           // Get product ID from URL
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedMessage, setAddedMessage] = useState('');

  // Fetch product details when page loads
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // Format price in INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Parse specifications from JSON string
  const parseSpecs = (specsString) => {
    try {
      return JSON.parse(specsString);
    } catch {
      return {};
    }
  };

  // Add product to cart
  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product.id);
      await refreshCart();             // Update cart badge in header
      setAddedMessage('✓ Added to cart!');
      setTimeout(() => setAddedMessage(''), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setAddingToCart(false);
  };

  // Buy Now = Add to cart + go to cart page
  const handleBuyNow = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product.id);
      await refreshCart();
      navigate('/cart');
    } catch (error) {
      console.error('Error:', error);
    }
    setAddingToCart(false);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <div className="no-results"><h2>Product not found</h2></div>;
  }

  const specs = parseSpecs(product.specifications);

  return (
    <div className="product-page">
      <div className="product-detail-container">
        {/* LEFT: Image Carousel */}
        <div className="product-detail-left">
          <ImageCarousel images={product.images || []} />

          {/* Action Buttons (below images on desktop) */}
          <div className="product-action-buttons">
            <button
              className="btn-add-to-cart"
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
              id="add-to-cart-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {addingToCart ? 'ADDING...' : 'ADD TO CART'}
            </button>
            <button
              className="btn-buy-now"
              onClick={handleBuyNow}
              disabled={addingToCart || product.stock === 0}
              id="buy-now-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 12l-.688 4h-.624L11 12H8l4-8 4 8h-3z" />
              </svg>
              BUY NOW
            </button>
          </div>

          {/* Success Message */}
          {addedMessage && (
            <div className="added-message">{addedMessage}</div>
          )}
        </div>

        {/* RIGHT: Product Details */}
        <div className="product-detail-right">
          {/* Breadcrumb */}
          <div className="product-breadcrumb">
            {product.Category && <span>{product.Category.name}</span>}
          </div>

          {/* Product Name */}
          <h1 className="product-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating-row">
            <span className="rating-badge-large">
              {product.rating} ★
            </span>
            <span className="rating-info">
              {product.review_count?.toLocaleString()} Ratings & Reviews
            </span>
          </div>

          {/* Special Price */}
          <div className="product-special-price">Special Price</div>

          {/* Price Block */}
          <div className="product-price-block">
            <span className="product-current-price">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="product-original-price">{formatPrice(product.original_price)}</span>
            )}
            {product.discount_percent > 0 && (
              <span className="product-discount">{product.discount_percent}% off</span>
            )}
          </div>

          {/* Stock Status */}
          <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0
              ? product.stock <= 5
                ? `Only ${product.stock} left in stock — Hurry!`
                : 'In Stock'
              : 'Out of Stock'
            }
          </div>

          {/* Description */}
          {product.description && (
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Specifications Table */}
          {Object.keys(specs).length > 0 && (
            <div className="product-specifications">
              <h3>Specifications</h3>
              <table className="specs-table">
                <tbody>
                  {Object.entries(specs).map(([key, value]) => (
                    <tr key={key}>
                      <td className="spec-key">{key}</td>
                      <td className="spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Brand */}
          {product.brand && (
            <div className="product-brand-info">
              <span className="brand-label">Brand:</span>
              <span className="brand-value">{product.brand}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
