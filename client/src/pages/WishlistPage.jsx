import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, loading, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const moveToCart = async (product) => {
    try {
      await addToCart(product.id, 1);
      await handleRemove(product.id);
    } catch (error) {
      console.error('Error moving to cart:', error);
    }
  };

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Fetching your wishlist...</p>
    </div>
  );

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header-card">
          <h1 className="page-title">My Wishlist ({wishlist.length})</h1>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="empty-wishlist-card">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39746d.png" alt="Empty Wishlist" />
            <h3>Your wishlist is empty!</h3>
            <p>Explore more and shortlist some items.</p>
            <Link to="/" className="btn-shop-now">Explore Store</Link>
          </div>
        ) : (
          <div className="wishlist-list-container">
            {wishlist.map(item => (
              <div key={item.id} className="wishlist-item-row">
                <div className="wishlist-item-img">
                  <img src={item.Product.images[0]?.image_url} alt={item.Product.name} />
                </div>
                <div className="wishlist-item-details">
                  <div className="wishlist-item-main">
                    <Link to={`/product/${item.Product.id}`} className="wishlist-item-name">
                      {item.Product.name}
                    </Link>
                    <div className="product-card-rating">
                      <span className="rating-badge">4.4 ★</span>
                      <span className="rating-count">(8,921)</span>
                    </div>
                    <div className="wishlist-item-price-row">
                      <span className="current-price">₹{item.Product.price.toLocaleString()}</span>
                      <span className="original-price">₹{item.Product.original_price.toLocaleString()}</span>
                      <span className="discount-badge">
                        {Math.round(((item.Product.original_price - item.Product.price) / item.Product.original_price) * 100)}% Off
                      </span>
                    </div>
                  </div>
                  <div className="wishlist-item-actions">
                    <button 
                      onClick={() => moveToCart(item.Product)} 
                      className="btn-move-to-cart"
                    >
                      ADD TO CART
                    </button>
                    <button 
                      onClick={() => handleRemove(item.Product.id)} 
                      className="btn-remove-wishlist"
                      title="Remove from wishlist"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#ff4343">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
