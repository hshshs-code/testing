import React from 'react';

import { Container, Typography, Button } from '@mui/material';

function ManagerDashboard({ onLogout }) {
  return (
    <Container className="page-container">
      <Typography variant="h4" gutterBottom>Manager Dashboard</Typography>
      <Typography paragraph>Welcome, manager!</Typography>
      <Button variant="contained" onClick={onLogout}>Logout</Button>
    </Container>
  );
}

export default ManagerDashboard;
