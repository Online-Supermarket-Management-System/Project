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
import Sidebar from "../../../components/Sidebar/DeliveryAdmin/Sidebar";

const EditDriverForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    location: "",
  });

  useEffect(() => {
    const fetchDriverById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/drivers/${id}`);
        console.log("Driver Data from API:", response.data); // Log API response data
        setFormData(response.data); // Update form data with the retrieved driver data
        console.log("Form Data State:", formData); // Log form data state after setting
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/drivers/${id}`, formData);
      console.log("Form submitted with data:", formData);
      navigate("/driverdashboard");
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
              Update Driver Details
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Use the below form to update driver details
            </Typography>
          </div>
          <form
            onSubmit={handleSubmit}
            id="update_driver"
            style={{ maxWidth: "786px", margin: "auto" }}
          >
            <div className="update_driver">
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="name"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Name:
                </FormLabel>
                <TextField
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Name"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="nic"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  NIC:
                </FormLabel>
                <TextField
                  type="text"
                  name="nic"
                  value={formData.nic}
                  placeholder="NIC"
                  required
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <FormLabel
                  htmlFor="location"
                  className="text-light"
                  style={{ fontWeight: "bold", marginRight: "10px" }}
                >
                  Location:
                </FormLabel>
                <TextField
                  type="text"
                  name="location"
                  value={formData.location}
                  placeholder="Location"
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

export default EditDriverForm;
