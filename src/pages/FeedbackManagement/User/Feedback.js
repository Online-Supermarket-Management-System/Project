import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const FeedbackTable = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/feedback");
      setFeedbackData(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/feedback/${id}`);
      setFeedbackData(feedbackData.filter((feedback) => feedback._id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Feedback Report", 10, 10);
    doc.autoTable({
      head: [["ID", "Name", "Email", "Cleanliness Rating", "Staff Friendliness Rating", "Amenities Rating", "Comments", "Suggestions"]],
      body: feedbackData.map(feedback => [feedback._id, feedback.name, feedback.email, feedback.cleanlinessRating, feedback.staffFriendlinessRating, feedback.amenitiesRating, feedback.comments, feedback.suggestions])
    });
    doc.save("feedback_report.pdf");
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={generateReport}
              style={{ backgroundColor: "#f0f0f0", color: "#934ae2" }}
            >
              Generate Report
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table aria-label="feedback table">
            <TableHead style={{ backgroundColor: "#2b2d42" }}>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Cleanliness Rating
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Staff Friendliness Rating
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Amenities Rating
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Comments
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Suggestions
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackData.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell>{feedback._id}</TableCell>
                  <TableCell>{feedback.name}</TableCell>
                  <TableCell>{feedback.email}</TableCell>
                  <TableCell>{feedback.cleanlinessRating}</TableCell>
                  <TableCell>{feedback.staffFriendlinessRating}</TableCell>
                  <TableCell>{feedback.amenitiesRating}</TableCell>
                  <TableCell>{feedback.comments}</TableCell>
                  <TableCell>{feedback.suggestions}</TableCell>
                  <TableCell>
                    <IconButton
                      style={{ color: "#934ae2" }}
                      onClick={() => deleteUser(feedback._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default FeedbackTable;
