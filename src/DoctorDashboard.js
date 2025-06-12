import React from 'react';

function DoctorDashboard({ onLogout }) {
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <p>Welcome, doctor!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default DoctorDashboard;
