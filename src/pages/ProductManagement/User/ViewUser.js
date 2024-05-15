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
import { Link } from "react-router-dom";
import axios from "axios";
import { Edit, Delete, PersonAdd } from "@mui/icons-material";
import Sidebar from "../../../components/Sidebar/ProductAdmin/Sidebar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idCounter, setIdCounter] = useState(1);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/product");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on searchQuery when it changes
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/product/product/${id}`);
      // Filter out the deleted user from the users array
      setUsers(users.filter((user) => user._id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenerateReport = async () => {
    // Ensure filteredUsers state is updated before generating report
    await setSearchQuery(""); // Clear search query to show all users
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state to update

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(20);
    doc.text("Product Report", 10, 20);

    // Define columns for the table
    const columns = ["ID", "Name", "Category", "Price", "Description"];

    // Map filteredUsers to data array
    const data = filteredUsers.map((user, index) => [
      idCounter + index,
      user.name,
      user.category,
      user.price,
      user.description,
    ]);

    // Add autoTable
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: data,
    });

    // Save the document
    doc.save("product_report.pdf");
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
            <Link to="/add-product-details" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<PersonAdd />}
                style={{ backgroundColor: "#f0f0f0", color: "#934ae2" }}
              >
                Add Product Details
              </Button>
            </Link>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginRight: "30px", padding: "5px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              style={{
                marginRight: "30px",
                padding: "5px",
                backgroundColor: "#f0f0f0",
                color: "#934ae2",
              }}
            >
              Generate Report
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table aria-label="user table">
            <TableHead style={{ backgroundColor: "#2b2d42" }}>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Category
                </TableCell>
                {/* <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Image
                </TableCell> */}
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Price
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Brand
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Quantity
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Description
                </TableCell>

                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{idCounter + index}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.category}</TableCell>
                  {/* <TableCell>{user.image}</TableCell> */}
                  <TableCell>{user.price}</TableCell> 
                  <TableCell>{user.brand}</TableCell>
                  <TableCell>{user.quantity}</TableCell>
                  <TableCell>{user.description}</TableCell>
                  <TableCell>
                    {user._id && (
                      <Link to={{ pathname: `/update-product/${user._id}` }}>
                        <IconButton style={{ color: "#934ae2" }}>
                          <Edit />
                        </IconButton>
                      </Link>
                    )}
                    <IconButton
                      style={{ color: "#934ae2" }}
                      onClick={() => deleteUser(user._id)}
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

export default UserTable;
