import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, FormLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/Sidebar/ProductAdmin/Sidebar';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    productId:'',
    name: '',
    category: '',
    url: '',
    price: '',
    description: '',
    brand: '', // Add brand property here
    quantity: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setProductData({ ...productData, image: e.target.files[0] }); // Store the selected image file
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/product/uploadProduct', productData);
      console.log(response.data);
      // Clear form data after successful submission
      setProductData({
        productId:'',
        name: '',
        category: '',
        brand: '',
        price: '',
        description: '',
        url:'',
        quantity:''
      });
      toast.success("Product added successfully");
      navigate('/view-product-details');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
    <Sidebar/>
    </div>
    <div style={{ flex: 1 }}>
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
       <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography variant="h6" gutterBottom>
         Add Product
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Use the below form to add a product
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="new_user">
        <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="productId" style={{ fontWeight: 'bold', marginRight: '10px' }}>Product ID:</FormLabel>
            <TextField
              type="text"
              name="productId"
              value={productData.productId}
              placeholder="Product ID"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="name" style={{ fontWeight: 'bold', marginRight: '10px' }}>Product Name:</FormLabel>
            <TextField
              type="text"
              name="name"
              value={productData.name}
              placeholder="Product Name"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="category" style={{ fontWeight: 'bold', marginRight: '10px' }}>Category:</FormLabel>
            <TextField
              type="text"
              name="category"
              value={productData.category}
              placeholder="Category"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="brand" style={{ fontWeight: 'bold', marginRight: '10px' }}>Brand:</FormLabel>
            <TextField
              type="text"
              name="brand"
              value={productData.brand}
              placeholder="Brand"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="quantity" style={{ fontWeight: 'bold', marginRight: '10px' }}>Quantity:</FormLabel>
            <TextField
              type="number"
              name="quantity"
              value={productData.quantity}
              placeholder="Quantity"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
         <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="url" style={{ fontWeight: 'bold', marginRight: '10px' }}>Image:</FormLabel>
            <input
              type="file"
              accept="image/*"
              name="url"
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="price" style={{ fontWeight: 'bold', marginRight: '10px' }}>Price:</FormLabel>
            <TextField
              type="number"
              name="price"
              value={productData.price}
              placeholder="Price"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="description" style={{ fontWeight: 'bold', marginRight: '10px' }}>Description:</FormLabel>
            <TextField
              type="text"
              name="description"
              value={productData.description}
              placeholder="Description"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#0ab342c7' }}>
            Save
          </Button>
        </div>
      </form>
      </Container>
   </div>
   </div>
  );
};

export default AddProductForm;
