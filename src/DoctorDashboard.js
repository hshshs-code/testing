import React from 'react';

import { Container, Typography, Button } from '@mui/material';

function DoctorDashboard({ onLogout }) {
  return (
    <Container className="page-container">
      <Typography variant="h4" gutterBottom>Doctor Dashboard</Typography>
      <Typography paragraph>Welcome, doctor!</Typography>
      <Button variant="contained" onClick={onLogout}>Logout</Button>
    </Container>
  );
}

export default DoctorDashboard;
