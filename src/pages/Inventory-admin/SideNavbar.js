import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

function SideNavbar() {
  return (
    <div className="side-navbar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/orderdetails">Order Details</Link></li>
        <li><Link to="/mailbox">Recently |Sales Products</Link></li>
        <li><Link to="/tracking">Generate Report</Link></li>
      </ul>
    </div>
  );
}

export default SideNavbar;