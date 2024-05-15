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
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";
import Sidebar from "../../../components/Sidebar/DeliveryAdmin/Sidebar";
import { Link } from "react-router-dom";

const DriverDetails = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const deleteDriver = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/drivers/${id}`);
      // Filter out the deleted driver from the drivers array
      setDrivers(drivers.filter((driver) => driver._id !== id));
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <div style={{ padding: "20px" }}>
          
          <h2>Driver Details</h2>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table aria-label="driver table">
              <TableHead style={{ backgroundColor: "#2b2d42", color: "white" }}>
                <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>NIC</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Location</TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver._id}>
                    <TableCell>{driver._id}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.nic}</TableCell>
                    <TableCell>{driver.location}</TableCell>
                    <TableCell>
                      <Link to={`/edit-driver/${driver._id}`}>
                        <IconButton style={{ color: "#934ae2" }}>
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton
                        style={{ color: "#934ae2" }}
                        onClick={() => deleteDriver(driver._id)}
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
    </div>
  );
};

export default DriverDetails;
