import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Dashboard from './Dashboard';
import Manage from './Manage';
import Login from './Login';
import StudentDashboard from './StudentDashboard';
import DoctorDashboard from './DoctorDashboard';
import ManagerDashboard from './ManagerDashboard';
import './App.css';

function App() {
  const [role, setRole] = useState(null);

  if (!role) {
    return <Login onLogin={setRole} />;
  }

  const getRoleComponent = () => {
    if (role === 'Student') return <StudentDashboard onLogout={() => setRole(null)} />;
    if (role === 'Doctor') return <DoctorDashboard onLogout={() => setRole(null)} />;
    if (role === 'Manager') return <ManagerDashboard onLogout={() => setRole(null)} />;
    return null;
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            University Manager
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/manage">Manage</Button>
          <Button color="inherit" onClick={() => setRole(null)}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={getRoleComponent()} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
    </Router>
  );
}

export default App;