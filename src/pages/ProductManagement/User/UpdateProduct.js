import React, { useState, useEffect } from "react";
import {
  Typography,
  FormLabel,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Container,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../../components/Sidebar/ProductAdmin/Sidebar";

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    url:"",
    description: "",
    brand: '', // Add brand property here
    quantity: ''
  });

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/product/${id}`);
        console.log("User Data:", response.data); // Log user data by ID
        setFormData(response.data); // Update form data with the retrieved user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserById();
  }, [id]); // Add `id` as a dependency to refetch data when the ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/product/product/${id}`, formData);
      console.log("Form submitted with data:", formData);
      navigate("/view-product-details");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "200px",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Update Product Details
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Use the below form to update product details
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit}
            id="update_user"
            style={{ maxWidth: "786px", margin: "auto" }}
          >
            <div className="update_user">
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="name"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Product Name:
                </FormLabel>
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Ravi Ashwin"
                  pattern="[A-Za-z]{3,20}( [A-Za-z]{3,20})*"
                  title="Name must be 3-20 letters long and can contain spaces between names"
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
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="category"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Category:
                </FormLabel>
                <TextField
                  type="text"
                  name="category"
                  value={formData.category}
                  placeholder="category"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="brand"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Brand:
                </FormLabel>
                <TextField
                  type="text"
                  name="brand"
                  value={formData.brand}
                  placeholder="brand"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="quantity"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Quantity:
                </FormLabel>
                <TextField
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  placeholder="quantity"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="price"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Price:
                </FormLabel>
                <TextField
                  type="number"
                  name="price"
                  value={formData.price}
                  placeholder="Enter Price"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="description"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Description:
                </FormLabel>
                <TextField
                  type="text"
                  name="description"
                  value={formData.description}
                  placeholder="Enter Description"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ backgroundColor: "#0ab342c7" }}
              >
                Save
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default UpdateProductForm;
