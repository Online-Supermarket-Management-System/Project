import React, { useState } from 'react';
import './adminhome.css';

function AdminHomePage() {
  const categories = ['Super admin', 'Product admin', 'Inventory admin', 'Payment admin', 'Delivery admin', 'Order management admin', 'Financial admin', 'Rating and feedback admin'];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    // setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="admin-home">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="category-block" 
          onClick={() => handleCategoryClick(category)}
        >
          <div className="category-content">
            {category}
          </div>
        </div>
      ))}
      {selectedCategory && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCategory}</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHomePage;