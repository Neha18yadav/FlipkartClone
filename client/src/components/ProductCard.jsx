import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    
    try {
      await toggleWishlist(product.id);
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const imageUrl = product.images && product.images.length > 0
    ? product.images[0].image_url
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="product-card-wrapper">
      <Link to={`/product/${product.id}`} className="product-card" id={`product-${product.id}`}>
        <div className="product-card-image">
          <img src={imageUrl} alt={product.name} loading="lazy" />
          <button className={`wishlist-heart ${isFavorite ? 'active' : ''}`} onClick={handleWishlist}>
            <svg viewBox="0 0 24 24" fill={isFavorite ? '#ff4343' : '#fff'} stroke={isFavorite ? '#ff4343' : '#dbdbdb'}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        <div className="product-card-info">
          <h3 className="product-card-name">{product.name}</h3>
          <div className="product-card-rating">
            <span className="rating-badge">{product.rating || '4.2'} ★</span>
            <span className="rating-count">({product.review_count?.toLocaleString() || '1,234'})</span>
          </div>
          <div className="product-card-price">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.original_price && (
              <span className="original-price">₹{product.original_price.toLocaleString()}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
