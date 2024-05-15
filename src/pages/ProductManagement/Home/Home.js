import React from 'react';
import UserTable from '../User/ViewUser';
import Sidebar from '../../../components/Sidebar/ProductAdmin/Sidebar';

const ProductHome = () => {
  return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
    <Sidebar/>
    </div>
    <div style={{ flex: 1 }}>
    <UserTable/>
    </div>
    </div>
  );
}

export default ProductHome;
