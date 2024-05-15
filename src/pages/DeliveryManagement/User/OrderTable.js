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
import Sidebar from "../../../components/Sidebar/DeliveryAdmin/Sidebar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [idCounter, setIdCounter] = useState(1);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/order/");
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    // Fetch orders when component mounts
    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on searchQuery when it changes
    const filtered = orders.filter((order) =>
      `${order.firstName} ${order.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/order/order/${id}`);
      // Filter out the deleted order from the orders array
      setOrders(orders.filter((order) => order._id !== id));
      setFilteredOrders(filteredOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleGenerateReport = async () => {
    // Ensure filteredOrders state is updated before generating report
    await setSearchQuery(""); // Clear search query to show all orders
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state to update

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(20);
    doc.text("Order Report", 10, 20);

    // Define columns for the table
    const columns = ["ID", "First Name", "Last Name", "Delivery", "Order Items", "Created At"];

    // Map filteredOrders to data array
    const data = filteredOrders.map((order, index) => [
      idCounter + index,
      order.firstName,
      order.lastName,
      order.delivery,
      order.orderItems.map(item => `${item.productName} (${item.quantity})`).join(", "),
      new Date(order.createdAt).toLocaleString(),
    ]);

    // Add autoTable
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: data,
    });

    // Save the document
    doc.save("order_report.pdf");
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
            <Link to="/add-driver" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                // endIcon={<PersonAdd />}
                style={{ backgroundColor: "#f0f0f0", color: "#934ae2" }}
              >
                Add Driver
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
          <Table aria-label="order table">
            <TableHead style={{ backgroundColor: "#2b2d42" }}>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  First Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Last Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Delivery
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Order Items
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Created At
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.firstName}</TableCell>
                  <TableCell>{order.lastName}</TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>
  {order.orderItems.map(item => `${item.productName} (${item.quantity})`).join(", ")}
</TableCell>

                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {/* <Link to={{ pathname: `/update-order/${order._id}` }}>
                      <IconButton style={{ color: "#934ae2" }}>
                        <Edit />
                      </IconButton>
                    </Link> */}
                    <IconButton
                      style={{ color: "#934ae2" }}
                      onClick={() => deleteOrder(order._id)}
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

export default OrderTable;
