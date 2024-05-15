import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Radio, Typography, RadioGroup, FormControlLabel, Button, FormControl, FormLabel, Container } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../../components/Sidebar/FinancialAdmin/Sidebar';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Active',
    basicSalary: '',
    otHours: '',
    otRatePerHour: '',
    allowances: '',
    totalSalary: ''
  });

  const navigate = useNavigate(); // Access the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotalSalary = () => {
    const { basicSalary, otHours, otRatePerHour, allowances } = formData;
    const totalSalary =
      parseFloat(basicSalary) +
      parseFloat(otHours) * parseFloat(otRatePerHour) +
      parseFloat(allowances);
    setFormData({ ...formData, totalSalary: totalSalary.toFixed(2) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/salaryRoutes', formData);
      console.log(response.data);
      setFormData({
        name: '',
        email: '',
        status: 'Active',
        basicSalary: '',
        otHours: '',
        otRatePerHour: '',
        allowances: '',
        totalSalary: ''
      });

      // Display toast message
      toast.success("Employee added successfully");

      // Navigate to view page
      navigate('/view-salary-details');
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
          Add Employee Salary
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Use the below form to add employee's salary
        </Typography>
      </div>
    <form onSubmit={handleSubmit} id="add_user" style={{ maxWidth: '786px', margin: 'auto' }}>
      <div className="new_user">
        <div style={{ marginBottom: '1em' }}>
          <FormLabel htmlFor="name" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>Employee Name:</FormLabel>
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
          <FormLabel htmlFor="email" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>Employee Email:</FormLabel>
          <TextField
            type="email"
            name="email"
            value={formData.email}
            placeholder="example@gmail.com"
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <FormLabel className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>Employee Status:</FormLabel>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <FormControlLabel value="Active" control={<Radio />} label="Active" />
              <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
            </RadioGroup>
          </FormControl>
        </div>

        <div style={{ marginBottom: '1em' }}>
          <FormLabel htmlFor="basicSalary" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>Basic Salary:</FormLabel>
          <TextField
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            placeholder="Enter Basic salary..."
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <FormLabel htmlFor="otHours" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>OT Hours:</FormLabel>
          <TextField
            type="number"
            name="otHours"
            value={formData.otHours}
            placeholder="Enter OT hours..."
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <FormLabel htmlFor="otRatePerHour" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>OT Rate per Hour:</FormLabel>
          <TextField
            type="number"
            name="otRatePerHour"
            value={formData.otRatePerHour}
            placeholder="Enter OT rate per hour..."
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <FormLabel htmlFor="allowances" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>Allowances:</FormLabel>
          <TextField
            type="number"
            name="allowances"
            value={formData.allowances}
            placeholder="Enter Allowances..."
            required
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </div>

        <Button variant="contained" fullWidth onClick={calculateTotalSalary} style={{ marginBottom: '1em', backgroundColor: '#0ab342c7' }}>
          Calculate Total Salary
        </Button>

        <div style={{ marginBottom: '1em' }}>
          <FormLabel htmlFor="totalSalary" className="text-light" style={{ fontWeight: 'bold', marginRight: '10px' }}>Total Salary:</FormLabel>
          <TextField
            type="number"
            name="totalSalary"
            value={formData.totalSalary}
            placeholder="Enter Total Salary..."
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
    <ToastContainer position="top-center" autoClose={3000} />
    </Container>
    </div>
    </div>
  );
};

export default AddUserForm;
