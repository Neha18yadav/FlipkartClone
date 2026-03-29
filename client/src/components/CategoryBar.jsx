// CategoryBar.jsx — Horizontal scrollable category strip (like Flipkart homepage)
// Shows category icons that filter products when clicked

import { useEffect, useState } from 'react';
import { getCategories } from '../services/api';

const CategoryBar = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend when component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-bar">
      <div className="category-list">
        {/* "All" button to reset filter */}
        <div
          className={`category-item ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onCategorySelect('')}
        >
          <div className="category-icon-wrapper">
            <img
              src="https://img.icons8.com/color/80/grid-2.png"
              alt="All"
              className="category-icon"
            />
          </div>
          <span className="category-name">All</span>
        </div>

        {/* Category buttons */}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-item ${selectedCategory === String(cat.id) ? 'active' : ''}`}
            onClick={() => onCategorySelect(String(cat.id))}
          >
            <div className="category-icon-wrapper">
              <img
                src={cat.image_url}
                alt={cat.name}
                className="category-icon"
                onError={(e) => { e.target.src = 'https://img.icons8.com/color/80/category.png'; }}
              />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
