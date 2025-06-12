import React from 'react';

function ManagerDashboard({ onLogout }) {
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <p>Welcome, manager!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default ManagerDashboard;
