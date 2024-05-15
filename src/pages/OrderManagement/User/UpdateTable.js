import React, { useState, useEffect } from "react";
import {
  Typography,
  FormLabel,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateOrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    delivery: "",
    orderItems: [],
  });

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/order/order/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/order/order/${id}`, formData);
      navigate("/view-order-details"); // Redirect to the order details page after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Update Order Details
      </Typography>
      <form onSubmit={handleSubmit} style={{ maxWidth: "786px", margin: "auto" }}>
        <div style={{ marginBottom: "1em" }}>
          <FormLabel htmlFor="firstName" style={{ fontWeight: "bold", marginRight: "10px" }}>
            First Name:
          </FormLabel>
          <TextField
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <FormLabel htmlFor="lastName" style={{ fontWeight: "bold", marginRight: "10px" }}>
            Last Name:
          </FormLabel>
          <TextField
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>
        <div style={{ marginBottom: "1em" }}>
          <FormLabel htmlFor="delivery" style={{ fontWeight: "bold", marginRight: "10px" }}>
            Delivery:
          </FormLabel>
          <TextField
            type="text"
            name="delivery"
            value={formData.delivery}
            placeholder="Delivery Method"
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>
        {/* Display order items */}
        <div style={{ marginBottom: "1em" }}>
  <FormLabel
    htmlFor="orderItems"
    className="text-light"
    style={{ fontWeight: "bold", marginRight: "10px" }}
  >
    Order Items:
  </FormLabel>
  {formData.orderItems && formData.orderItems.map((item, index) => (
    <div key={index}>
      <TextField
        type="text"
        value={item.productName} // Assuming productName is a field in order item
        disabled // Assuming order items are not editable in the update form
        fullWidth
        size="small"
      />
    </div>
  ))}
</div>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UpdateOrderForm;
