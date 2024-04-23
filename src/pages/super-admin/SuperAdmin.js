import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUserRole } from "../../api/adminLogin";

const SuperAdmin = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrationData();
    getRole()
  }, []);

  const getRole = async () => {
    try {
      const role = localStorage.getItem("role");
      console.log("role:", role);

      if (role === "SADMIN" ) {
        console.log("User is a super admin");
      } else {
        if (role === "ADMIN") {
          window.location.href = "/adminhome";
        } else {
          window.location.href = "/adminLogin";
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      toast.error("Error fetching user role");
    }
  };

  const fetchRegistrationData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/auth/");
      setRegistrationData(response.data);
      setFilteredData(response.data); // Initialize filtered data with all registration data
    } catch (error) {
      setError(error.message);
      console.error("Error fetching registration data:", error);
    }
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = registrationData.filter(
      (user) =>
        user.empId.includes(query) ||
        user.firstName.includes(query) ||
        user.lastName.includes(query) ||
        user.email.includes(query) ||
        user.contactNumber.includes(query)
    );
    setFilteredData(filtered);
  };
  const approveUser = async (userId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/auth/approve/${userId}`
      );
      console.log("Response after approval:", response.data);
      toast.success("User successfully approved");

      // Update the registration data and filtered data states
      const updatedData = registrationData.map((user) => {
        if (user._id === userId) {
          return { ...user, approved: true };
        }
        return user;
      });

      // Set the updated data in state
      setRegistrationData(updatedData);
      setFilteredData(updatedData); // Ensure both states are updated
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("Error approving user");
    }
  };

  const rejectUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/auth/${userId}`);
      // After successful rejection, update the local registration data by filtering out the rejected user
      const updatedData = registrationData.filter(
        (user) => user._id !== userId
      );
      setRegistrationData(updatedData);
      setFilteredData(updatedData); // Also update the filtered data state
      toast.success("User successfully deleted");
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.error("Error deleting user");
    }
  };

  const renderTable = (tableHeaders, rows) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.empId}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.contactNumber}</td>
              <td>
                {!row.approved && (
                  <Button
                    className="super-admin-approve"
                    onClick={() => approveUser(row._id)}
                  >
                    Approve
                  </Button>
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  className="super-admin-reject"
                  onClick={() => rejectUser(row._id)}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div className="super-admin-profile">
      <ToastContainer />
      <div className="super-admin-profile-header">
        <span>Upcoming Register Requests</span>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {filteredData.length > 0 ? (
        renderTable(
          [
            "Employee ID",
            "First Name",
            "Last Name",
            "Email",
            "Contact Number",
            "Action",
          ],
          filteredData
        )
      ) : (
        <p>No registration data available</p>
      )}
    </div>
  );
};

export default SuperAdmin;
