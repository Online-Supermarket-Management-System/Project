import React, { useState, useEffect } from "react";
import "./adminhome.css";

import { getUserRole } from "../../api/adminLogin";

function AdminHomePage() {
  const categories = [
    {label: "Super admin", href: "/superAdmin"},
    {label: "Product admin", href: "/productadmin-home"},
    {label: "Inventory admin", href: "/product-view"},
    {label: "Payment admin", href: "/paymentadmin-home"},
    {label: "Delivery admin", href: "/deliveryadmin-home"},
    {label: "Order management admin", href: "/orderadmin-home"},
    {label: "Feedback admin", href: "/feedbackadmin-home"},
    {label: "Financial admin", href: "/financialadmin-home"},
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getRole();
  }, []);

  const getRole = async () => {
    try {
      // const empId = localStorage.getItem("empId");
      // console.log("EmpId:", empId);
      // const body = {
      //   empId: empId,
      // };
      // console.log("EmpId:", empId);
      // const res = await getUserRole(body);

      const role = localStorage.getItem("role");
      console.log("role:", role);

      if (role === "ADMIN" || role === "SADMIN") {
        console.log("User is a super admin or admin");
      } else {
        window.location.href = "/adminLogin";
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const handleCategoryClick = (category) => {
    // setSelectedCategory(category);
    window.location.href = category.href;
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="admin-home">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-block"
          onClick={() => handleCategoryClick(category)}
        >
          <div className="category-content">{category.label}</div>
        </div>
      ))}
      {selectedCategory && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedCategory}</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHomePage;
