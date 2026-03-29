import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const DealCarousel = ({ title, products, linkTo = "/" }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="deals-carousel-section">
      <div className="deals-header">
        <h2 className="deals-title">{title}</h2>
        <Link to={linkTo} className="view-all-btn">VIEW ALL</Link>
      </div>
      
      <div className="deals-content">
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div className="deals-scroll-container" ref={scrollContainerRef}>
          {products.map((product) => (
            <div key={product.id} className="deal-card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll('right')}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DealCarousel;
