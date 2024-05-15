import React from 'react';
// import UserTable from '../User/ViewUser';
import Sidebar from '../../../components/Sidebar/FeedbackAdmin/Sidebar';
import FeedbackTable from '../User/Feedback';

const ViewFeedback = () => {
  return (
    <div style={{ display: "flex" }}>
    <div style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "20px" }}>
    <Sidebar/>
    </div>
    <div style={{ flex: 1 }}>
    <FeedbackTable/>
    </div>
    </div>
  );
}

export default ViewFeedback;
