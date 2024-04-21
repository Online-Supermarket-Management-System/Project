import React from 'react';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PastPurchace = () => {
    const dummyData = [
        {id: 1, orderId: "ORDER0001", date: "12/12/2023", totalbill: "12500rs", delivery: "Express"}
    ]

    const handlePrint = () => {
      const doc = new jsPDF();
      doc.autoTable({
        head: [['#', 'Order ID', 'Date', 'Total Bill', 'Delivery']],
        body: dummyData.map((row, index) => [index + 1, row.orderId, row.date, row.totalbill, row.delivery]),
      });
      doc.save('past_purchases.pdf');
    };
  

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
                    <td>{row.orderId}</td>
                    <td>{row.date}</td>
                    <td>{row.totalbill}</td>
                    <td>{row.delivery}</td>
                    <td>
                        <Button className = "purchaseprint" onClick={handlePrint}>Print</Button>
                       
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
    );
  };

    return (
        <div>
            <div className="super-admin-profile-header">
                <span>Past orders</span>
            </div>
            {renderTable(["Order ID", "Date", "Total Bill", "Delivery", "Action"], dummyData)}
        </div>
    );
};

export default PastPurchace;