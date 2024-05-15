import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, FormLabel } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import Sidebar from '../../../components/Sidebar/ProductAdmin/Sidebar';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cleanlinessRating: 0,
    staffFriendlinessRating: 0,
    amenitiesRating: 0,
    comments: '',
    suggestions: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/feedback', formData);
      console.log(response.data);
      setFormData({
        name: '',
        email: '',
        cleanlinessRating: 0,
        staffFriendlinessRating: 0,
        amenitiesRating: 0,
        comments: '',
        suggestions: '',
      });
      toast.success("Feedback submitted successfully");
      navigate('/Viewfeedback');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
        {/* <Sidebar/> */}
      </div>
      <div style={{ flex: 1 }}>
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Feedback Form
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Use the below form to submit your feedback
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="feedback_form">
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <FormLabel component="legend" style={{ fontWeight: 'bold', marginBottom: '1em' }}>Ratings:</FormLabel>
              <TextField
                name="cleanlinessRating"
                label="Cleanliness Rating"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.cleanlinessRating}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <TextField
                name="staffFriendlinessRating"
                label="Staff Friendliness Rating"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.staffFriendlinessRating}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <TextField
                name="amenitiesRating"
                label="Amenities Rating"
                type="number"
                variant="outlined"
                fullWidth
                value={formData.amenitiesRating}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <TextField
                name="comments"
                label="Comments"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.comments}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <TextField
                name="suggestions"
                label="Suggestions"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.suggestions}
                onChange={handleChange}
                style={{ marginBottom: '1em' }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#0ab342c7' }}>
                Submit
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default FeedbackForm;
