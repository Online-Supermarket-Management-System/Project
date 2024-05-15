import React, { useState, useEffect } from 'react';
import { Typography, FormLabel, FormControl, TextField, Radio, RadioGroup, FormControlLabel, Button, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../../components/Sidebar/FinancialAdmin/Sidebar';

const UpdateSalaryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchUserById = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/salaryRoutes/${id}`);
            console.log('User Data:', response.data); // Log user data by ID
            setFormData(response.data); // Update form data with the retrieved user data
          } catch (error) {
            console.error('Error fetching user data:', error);
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
            await axios.put(`http://localhost:4000/salaryRoutes/${id}`, formData);
            console.log('Form submitted with data:', formData);
            navigate('/view-salary-details');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const calculateTotalSalary = () => {
        const { basicSalary, otHours, otRatePerHour, allowances } = formData;
        const totalSalary =
          parseFloat(basicSalary) +
          parseFloat(otHours) * parseFloat(otRatePerHour) +
          parseFloat(allowances);
        setFormData({ ...formData, totalSalary: totalSalary.toFixed(2) });
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
                    Update Employee Salary
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Use the below form to update employee's salary
                </Typography>
            </div>
            <form onSubmit={handleSubmit} id="update_user" style={{ maxWidth: '786px', margin: 'auto' }}>
                <div className="update_user">
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
        </Container>
        </div>
        </div>
    );
};

export default UpdateSalaryForm;
