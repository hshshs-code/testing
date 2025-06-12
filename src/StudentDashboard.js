import React from 'react';

function StudentDashboard({ onLogout }) {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome, student!</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default StudentDashboard;
