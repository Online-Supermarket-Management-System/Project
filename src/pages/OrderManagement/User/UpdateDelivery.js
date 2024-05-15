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
import Sidebar from "../../../components/Sidebar/OrderAdmin/Sidebar";

const UpdateDeliveryOrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    delivery: "",
  });

  useEffect(() => {
    const fetchOrderById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/order/order/${id}`);
        console.log("Order Data:", response.data); // Log order data by ID
        setFormData(response.data); // Update form data with the retrieved order data
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderById();
  }, [id]); // Add `id` as a dependency to refetch data when the ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/order/order/${id}`, formData);
      console.log("Form submitted with data:", formData);
      navigate("/order-delivery-details");
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
              Update Order Delivery Details
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Use the below form to update order details
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit}
            id="update_order"
            style={{ maxWidth: "786px", margin: "auto" }}
          >
            <div className="update_order">
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="firstName"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
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
                <FormLabel
                  htmlFor="lastName"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
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
                <FormLabel
                  htmlFor="delivery"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
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

export default UpdateDeliveryOrderForm;
