import React from 'react';
import OrderDelivery from '../User/OrderDelivery';
import Sidebar from '../../../components/Sidebar/OrderAdmin/Sidebar';

const ViewDelivery = () => {
  return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
    <Sidebar/>
    </div>
    <div style={{ flex: 1 }}>
    <OrderDelivery/>
    </div>
    </div>
  );
}

export default ViewDelivery;
