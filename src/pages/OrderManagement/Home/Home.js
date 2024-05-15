import React from 'react';
import UserTable from '../User/OrderTable';
import Sidebar from '../../../components/Sidebar/OrderAdmin/Sidebar';

const OrderHome = () => {
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

export default OrderHome;
