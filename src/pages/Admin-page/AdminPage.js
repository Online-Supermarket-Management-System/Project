import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "./AdminPage.css";

const AdminPage = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [purchasesData, setPurchaseData] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        _id: "1",
        firstName: "User1",
        lastName: "Lastname1",
        email: "user1@example.com",
        contactNumber: "0712345678",
      },
      {
        _id: "2",
        firstName: "User2",
        lastName: "Lastname2",
        email: "user2@example.com",
        contactNumber: "0723456789",
      },
      {
        _id: "3",
        firstName: "User3",
        lastName: "Lastname3",
        email: "user3@example.com",
        contactNumber: "0734567890",
      },
      {
        _id: "4",
        firstName: "User4",
        lastName: "Lastname4",
        email: "user4@example.com",
        contactNumber: "0745678901",
      },
      {
        _id: "5",
        firstName: "User5",
        lastName: "Lastname5",
        email: "user5@example.com",
        contactNumber: "0756789012",
      },
      {
        _id: "6",
        firstName: "User6",
        lastName: "Lastname6",
        email: "user6@example.com",
        contactNumber: "0767890123",
      },
      {
        _id: "7",
        firstName: "User7",
        lastName: "Lastname7",
        email: "user7@example.com",
        contactNumber: "0778901234",
      },
      {
        _id: "8",
        firstName: "User8",
        lastName: "Lastname8",
        email: "user8@example.com",
        contactNumber: "0789012345",
      },
      {
        _id: "9",
        firstName: "User9",
        lastName: "Lastname9",
        email: "user9@example.com",
        contactNumber: "0790123456",
      },
      {
        _id: "10",
        firstName: "User10",
        lastName: "Lastname10",
        email: "user10@example.com",
        contactNumber: "0701234567",
      },
      {
        _id: "11",
        firstName: "User11",
        lastName: "Lastname11",
        email: "user11@example.com",
        contactNumber: "0712345678",
      },
      {
        _id: "12",
        firstName: "User12",
        lastName: "Lastname12",
        email: "user12@example.com",
        contactNumber: "0723456789",
      },
      {
        _id: "13",
        firstName: "User13",
        lastName: "Lastname13",
        email: "user13@example.com",
        contactNumber: "0734567890",
      },
      {
        _id: "14",
        firstName: "User14",
        lastName: "Lastname14",
        email: "user14@example.com",
        contactNumber: "0745678901",
      },
      {
        _id: "15",
        firstName: "User15",
        lastName: "Lastname15",
        email: "user15@example.com",
        contactNumber: "0756789012",
      },
    ];

    setFilteredData(dummyData);

    const purchaseDummyData = [
      {
        purchaseId: "1",
        deliveryId: "1",
        purchaseAmount: "1000",
        status: "Completed",
      },
      {
        purchaseId: "2",
        deliveryId: "2",
        purchaseAmount: "2000",
        status: "Pending",
      },
      {
        purchaseId: "3",
        deliveryId: "3",
        purchaseAmount: "3000",
        status: "Completed",
      },
      {
        purchaseId: "4",
        deliveryId: "4",
        purchaseAmount: "4000",
        status: "Pending",
      },
      {
        purchaseId: "5",
        deliveryId: "5",
        purchaseAmount: "5000",
        status: "Completed",
      },
      {
        purchaseId: "6",
        deliveryId: "6",
        purchaseAmount: "6000",
        status: "Completed",
      },
      {
        purchaseId: "7",
        deliveryId: "7",
        purchaseAmount: "4589",
        status: "Completed",
      },
      {
        purchaseId: "8",
        deliveryId: "8",
        purchaseAmount: "8000",
        status: "Pending",
      },
      {
        purchaseId: "9",
        deliveryId: "9",
        purchaseAmount: "9000",
        status: "Completed",
      },
      {
        purchaseId: "10",
        deliveryId: "10",
        purchaseAmount: "10000",
        status: "Pending",
      },
    ];

    setPurchaseData(purchaseDummyData);
  }, []);

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
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.contactNumber}</td>
              <td>
                <Button
                  className="super-admin-reject"
                  //onClick={() => rejectUser(row._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderPurchaseTable = (tableHeaders, rows) => {
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
              <td>{row.purchaseId}</td>
              <td>{row.deliveryId}</td>
              <td>{row.purchaseAmount}</td>
              <td>{row.status}</td>
            </tr>
          ))}
          <tr>
            <td style={{ fontWeight: "bold" }}>Total</td>
            <td style={{ fontWeight: "bold" }}>
              {rows.reduce(
                (total, row) => total + Number(row.purchaseAmount),
                0
              )} Rs
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <div className="admin-home-profile">
      <div className="admin-home-header">
        <span>Customer details</span>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          //onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {filteredData.length > 0 ? (
        renderTable(
          ["First Name", "Last Name", "Email", "Contact Number", "Action"],
          filteredData
        )
      ) : (
        <p>No registration data available</p>
      )}

      <div className="admin-home-header">
        <span>Today Purchases</span>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          //onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {purchasesData.length > 0 ? (
        renderPurchaseTable(
          ["Purchase ID", "Delivery ID", "Purchase Amount", "Status"],
          purchasesData
        )
      ) : (
        <p>No registration data available</p>
      )}
    </div>
  );
};

export default AdminPage;
