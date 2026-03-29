// ImageCarousel.jsx — Product image viewer with thumbnails
// Left: clickable thumbnail list, Right: large selected image
// Includes previous/next navigation

import { useState } from 'react';

const ImageCarousel = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // If no images, show a placeholder
  if (images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="carousel-main">
          <img src="https://via.placeholder.com/500x500?text=No+Image" alt="No image" />
        </div>
      </div>
    );
  }

  // Navigate to previous image
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-carousel">
      {/* Thumbnail column (left side) */}
      <div className="carousel-thumbnails">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <img src={img.image_url} alt={`View ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Main image (right side) */}
      <div className="carousel-main">
        {images.length > 1 && (
          <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous image">‹</button>
        )}
        <div className="main-image-viewport">
          <img
            src={images[selectedIndex].image_url}
            alt="Product"
            className="main-image zoom-effect"
            key={selectedIndex} // Triggers re-animation on change
          />
        </div>
        {images.length > 1 && (
          <button className="carousel-btn next" onClick={handleNext} aria-label="Next image">›</button>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
