import React from 'react';
import OrderDelivery from '../User/DriverDetails';
import Sidebar from '../../../components/Sidebar/DeliveryAdmin/Sidebar';
import DriverDetails from '../User/DriverDetails';

const ViewDriver = () => {
  return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
    <Sidebar/>
    </div>
    <div style={{ flex: 1 }}>
    <DriverDetails/>
    </div>
    </div>
  );
}

export default ViewDriver;
