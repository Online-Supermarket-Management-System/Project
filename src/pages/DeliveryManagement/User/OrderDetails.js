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
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import Sidebar from "../../../components/Sidebar/ProductAdmin/Sidebar";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [drivers, setDrivers] = useState([]);
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

  // Function to fetch drivers
  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  useEffect(() => {
    // Fetch orders and drivers when component mounts
    fetchOrders();
    fetchDrivers();
  }, []);

  useEffect(() => {
    // Filter orders based on searchQuery when it changes
    const filtered = orders.filter((order) =>
      `${order.firstName} ${order.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
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

  const handleAssignDriver = async (id, driverId) => {
    try {
      // Ensure that both id and driverId are available
      if (!id || !driverId) {
        console.error("Both id and driverId are required");
        return;
      }
  
      console.log("Order ID:", id);
      console.log("Driver ID:", driverId);
  
      // Make the PUT request to assign driver to order
      await axios.put(`http://localhost:4000/order/assign-driver/${id}`, { id, driverId });
  
      // Optionally, you can handle success or update UI accordingly
      console.log("Order assigned to driver successfully");
    } catch (error) {
      console.error("Error assigning driver to order:", error);
    }
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
    const columns = [
      "ID",
      "First Name",
      "Last Name",
      "Delivery",
      "Order Items",
      "Created At",
      "Assigned Driver",
    ];

    // Map filteredOrders to data array
    const data = filteredOrders.map((order, index) => [
      idCounter + index,
      order.firstName,
      order.lastName,
      order.delivery,
      order.orderItems
        .map((item) => `${item.productName} (${item.quantity})`)
        .join(", "),
      new Date(order.createdAt).toLocaleString(),
      order.assignedDriver ? order.assignedDriver.name : "Not Assigned",
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
                  Assigned Driver
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
                    {order.orderItems
                      .map((item) => `${item.productName} (${item.quantity})`)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {order.assignedDriver ? (
                      order.assignedDriver.name
                    ) : (
                      <Select
                        value={""} // Set default value to empty string
                        onChange={(e) =>
                          handleAssignDriver(order._id, e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Driver
                        </MenuItem>
                        {drivers.map((driver) => (
                          <MenuItem key={driver._id} value={driver._id}>
                            {driver.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </TableCell>

                  <TableCell>
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

export default OrderDetails;
