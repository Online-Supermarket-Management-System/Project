import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FeedbackView = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/feedback');
      setFeedbackData(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  return (
    <div>
      <h2>Feedback Data</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Cleanliness Rating</TableCell>
              <TableCell>Staff Friendliness Rating</TableCell>
              <TableCell>Amenities Rating</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Suggestions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{feedback.name}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell>{feedback.cleanlinessRating}</TableCell>
                <TableCell>{feedback.staffFriendlinessRating}</TableCell>
                <TableCell>{feedback.amenitiesRating}</TableCell>
                <TableCell>{feedback.comments}</TableCell>
                <TableCell>{feedback.suggestions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FeedbackView;
