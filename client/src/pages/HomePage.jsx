import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import BannerCarousel from '../components/BannerCarousel';
import DealCarousel from '../components/DealCarousel';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams] = useSearchParams();

  // Get search query from URL (set by Header search bar)
  const searchQuery = searchParams.get('search') || '';

  // Fetch products whenever search or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(searchQuery, selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [searchQuery, selectedCategory]);

  // Derived sections for a Flipkart-like feel
  const dealsOfTheDay = products
    .filter(p => (p.discount_percent || 0) >= 20)
    .slice(0, 10);

  const electronicsDeals = products
    .filter(p => p.category_id === 2 || p.category_id === 5)
    .slice(0, 10);

  // Handle category selection from CategoryBar
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="home-page">
      {/* Category Filter Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {/* Dynamic Banner Carousel */}
      <div className="home-banner-wrapper">
        <BannerCarousel />
      </div>

      <div className="home-content">
        {/* Deal Sections - Only show when not searching or filtering by category */}
        {!searchQuery && !selectedCategory && (
          <>
            <DealCarousel 
              title="Deals of the Day" 
              products={dealsOfTheDay} 
            />
            
            <DealCarousel 
              title="Best of Electronics" 
              products={electronicsDeals} 
            />
          </>
        )}

        {/* Search Result Info */}
        {searchQuery && (
          <div className="search-info">
            <p>Showing results for: <strong>"{searchQuery}"</strong></p>
            <span className="result-count">{products.length} products found</span>
          </div>
        )}

        {/* Product Grid */}
        <div className="products-section">
          <h2 className="section-title">
            {searchQuery ? "Search Results" : selectedCategory ? "Category Products" : "More Items You'll Love"}
          </h2>
          
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-results">
              <h2>No products found</h2>
              <p>Try a different search term or category</p>
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
