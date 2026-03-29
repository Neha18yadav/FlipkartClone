import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const banners = [
  {
    id: 1,
    brand: "APPLE",
    name: "iPhone 15 Pro Max",
    productId: 2,
    priceInfo: "Just ₹5,999/M*",
    subtext: "The titanium design with a 5x Telephoto camera.",
    image: "/images/products/iphone_15_pro_max.png",
    color: "#f5f5f7",
    textColor: "#1d1d1f",
    isLight: true
  },
  {
    id: 2,
    brand: "APPLE",
    name: "MacBook Air M2",
    productId: 6,
    priceInfo: "Starting from ₹8,490/M*",
    subtext: "Strikingly thin. Fast. Silent.",
    image: "/images/products/macbook_air_m2.png",
    color: "#2874f0",
    textColor: "#ffffff",
    isLight: false
  },
  {
    id: 3,
    brand: "DYSON",
    name: "V12 Detect Slim",
    productId: 15,
    priceInfo: "Limited Time Offer*",
    subtext: "Deep cleans. Everywhere. No cord.",
    image: "/images/products/dyson_vacuum.png",
    color: "#ffffff",
    textColor: "#333333",
    isLight: true
  }
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleShopNow = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="banner-carousel perfect-banners">
      <div 
        className="carousel-track" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className="banner-slide"
            style={{ backgroundColor: banner.color }}
          >
            <div className={`banner-content ${banner.isLight ? 'light-banner' : ''}`}>
              <div className="banner-text-side">
                <h2 className="banner-brand">{banner.brand}</h2>
                <h1 className="banner-product-name">{banner.name}</h1>
                <p className="banner-price">{banner.priceInfo}</p>
                <p className="banner-subtext">{banner.subtext}</p>
                <button 
                  className="banner-action-btn"
                  onClick={() => handleShopNow(banner.productId)}
                >
                  SHOP NOW
                </button>
              </div>
              <div className="banner-image-side">
                <img src={banner.image} alt={banner.name} className="banner-product-img" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="banner-btn prev" onClick={handlePrev}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button className="banner-btn next" onClick={handleNext}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="banner-dots">
        {banners.map((_, index) => (
          <div 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
