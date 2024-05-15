import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/Sidebar/ProductAdmin/Sidebar';

const AddDriverForm = () => {
  const [driverData, setDriverData] = useState({
    name: '',
    nic: '',
    location: '',
    driverId: '' // Add driverId field
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDriverData({ ...driverData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/drivers', driverData);
      console.log(response.data);
      // Clear form data after successful submission
      setDriverData({
        name: '',
        nic: '',
        location: '',
        driverId: '' // Clear driverId as well
      });
      toast.success("Driver added successfully");
      navigate('/driverdashboard');
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
         Add Driver
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Use the below form to add a driver
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="new_user">
          
        <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="driverId" style={{ fontWeight: 'bold', marginRight: '10px' }}>Driver ID:</FormLabel>
            <TextField
              type="text"
              name="driverId"
              value={driverData.driverId}
              placeholder="Driver ID"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="name" style={{ fontWeight: 'bold', marginRight: '10px' }}>Name:</FormLabel>
            <TextField
              type="text"
              name="name"
              value={driverData.name}
              placeholder="Name"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="nic" style={{ fontWeight: 'bold', marginRight: '10px' }}>NIC:</FormLabel>
            <TextField
              type="number"
              name="nic"
              value={driverData.nic}
              placeholder="NIC"
              required
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </div>
          <div style={{ marginBottom: '1em' }}>
            <FormLabel htmlFor="location" style={{ fontWeight: 'bold', marginRight: '10px' }}>Location:</FormLabel>
            <TextField
              type="text"
              name="location"
              value={driverData.location}
              placeholder="Location"
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

export default AddDriverForm;
