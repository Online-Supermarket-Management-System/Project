import React from 'react';

import signatureImage from "../../Icons/NorthWay.jpg";
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
        theme: 'grid',
        head: [['#', 'Order ID', 'Date', 'Total Bill', 'Delivery']],
        body: dummyData.map((row, index) => [index + 1, row.orderId, row.date, row.totalbill, row.delivery]),
      });
    
      // Add a paragraph
      doc.text([
        'This notice serves as a declaration that the payment has been received and the transaction is considered complete.',
        'For any queries or clarifications, please contact us at +94 76 317 3092.',
        'Thank you for your business.',
        'Sincerely,',
        'Manager',
        'Manager',
        'Northway Supermart',
        '4/24/2024'
      ], 10, doc.autoTable.previous.finalY + 100); // Increased the gap
    
      // Add a link
      doc.setTextColor(0, 0, 255);
      doc.textWithLink('Click here to visit our website.', 10, doc.autoTable.previous.finalY + 30, { url: 'https://www.yourwebsite.com' }); // Increased the gap
      doc.setTextColor(0, 0, 0);
    
      // Add a digital signature
      doc.addImage(signatureImage, 'JPEG', 10, doc.autoTable.previous.finalY + 40, 100, 50); // Increased the gap
    
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