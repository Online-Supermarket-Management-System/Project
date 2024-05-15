import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderItems, setOrderItems] = useState([]); // New state for order items
  const navigate = useNavigate(); // React Navigation's navigate function

  useEffect(() => {
    // Fetch products from backend
    axios.get('http://localhost:4000/product/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleIncrement = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1
    }));
  };

  const handleDecrement = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max((prevQuantities[id] || 0) - 1, 0)
    }));
  };

  const addToCart = (id) => {
    const quantity = quantities[id] || 1; // Default to 1 if quantity not set
    console.log('Product ID:', id); // Log the ID to check its format
    console.log('Quantity:', quantity);
    axios.post(`http://localhost:4000/product/products/${id}/add-to-cart`, { quantity })
      .then(response => {
        console.log('Product added to cart:', response.data);
        // Optionally, you can display a message or update the UI to indicate that the product has been added to the cart
  
        // Update orderItems state with the latest quantity
        setOrderItems(prevOrderItems => [
          ...prevOrderItems,
          { _id: id, qty: quantity }
        ]);
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  const handleGiveFeedback = () => {
    // Navigate to feedback page
    navigate("/feedback");
  };


  return (
    <div>
      <h1>Products</h1>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Description: {product.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Price: {product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Brand: {product.brand}
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}> {/* Adjust styles */}
    <Button onClick={() => handleDecrement(product._id)}>-</Button>
    <span style={{ margin: '0 5px' }}>{quantities[product._id] || 0}</span>
    <Button onClick={() => handleIncrement(product._id)}>+</Button>
  </div>
                  <div>
                    <Button variant="contained" style={{ backgroundColor: '#0ab342c7', marginLeft: '40px', marginBottom: '10px' }} onClick={() => addToCart(product._id)}>
                      Add to Cart
                    </Button>
                    <Button variant="contained" style={{  marginLeft: '60px', marginBottom: '10px' }}color="secondary" onClick={handleGiveFeedback}>
                      Give Feedback
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', marginBottom: '10px' }}>
        <Link to="/checkout" state={{ quantities, orderItems }}>
          <Button variant="contained" style={{ backgroundColor: '#0ab342c7' }}>
            View Cart
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
