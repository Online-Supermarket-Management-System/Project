import "./SuperAdmin.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import React, { useState } from "react";

const SuperAdmin = () => {
    const [searchKey, setSearchKey] = useState("");

    const dummyData = [
        {id: 1, employeeId: "EMP001", nic: "123456789V", contactNo: "0712345678", requestedTime: "2021-09-01 10:00:00"},
        {id: 2, employeeId: "EMP002,", nic: "123456789V", contactNo: "0712345678", requestedTime: "2021-09-01 10:00:00"},
        {id: 3, employeeId: "EMP003,", nic: "123456789V", contactNo: "0712345678", requestedTime: "2021-09-01 10:00:00"},
        {id: 4, employeeId: "EMP004,", nic: "123456789V", contactNo: "0712345678", requestedTime: "2021-09-01 10:00:00"},
        {id: 5, employeeId: "EMP005,", nic: "123456789V", contactNo: "0712345678", requestedTime: "2021-09-01 10:00:00"}
    ]

    const dummySearchData = [
        {id: 1, employeeId: "EMP001", nic: "123456789V", contactNo: "0712345678"}
    ]

    const onChange = (e) => {  
        setSearchKey(e.target.value);
    }

  const renderTable = (tableHeaders, rows) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {tableHeaders.map((header) => (<th>{header}</th>))}
          </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
                <tr>
                    <td>{row.id}</td>
                    <td>{row.employeeId}</td>
                    <td>{row.nic}</td>
                    <td>{row.contactNo}</td>
                    <td>{row.requestedTime}</td>
                    <td>
                        <Button className = "super-admin-approve">Approve</Button>
                        <Button  className = "super-admin-reject">Reject</Button>
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  const renderSearchTable = (tableHeaders, rows) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {tableHeaders.map((header) => (<th>{header}</th>))}
          </tr>
        </thead>
        <tbody>
            {rows.map((row) => (
                <tr>
                    <td>{row.id}</td>
                    <td>{row.employeeId}</td>
                    <td>{row.nic}</td>
                    <td>{row.contactNo}</td>
                    <td>
                        <Button className = "super-admin-delete">Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  return <div className="super-admin-profile">
    <div className="super-admin-profile-header">
        <span>Upcoming Register Requests</span>
    </div>
    {renderTable(["Employee ID", "NIC", "Contact No", "Requested Time", "Action"], dummyData)}
    <div className="super-admin-search-header">
        <span>Search Admin</span>
    </div>
    <div className="super-admin-search">
    <Form.Control
        placeholder={"Search Admin"}
        type="text"
        required
        value = {searchKey}
        onChange={onChange}
        size="sm"
      />
      </div>
    {renderSearchTable(["Employee ID", "NIC", "Contact No", "Action"], dummySearchData)}
  </div>;
};

export default SuperAdmin;
