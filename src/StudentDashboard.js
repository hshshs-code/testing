import React from 'react';

import { Container, Typography, Button } from '@mui/material';

function StudentDashboard({ onLogout }) {
  return (
    <Container className="page-container">
      <Typography variant="h4" gutterBottom>Student Dashboard</Typography>
      <Typography paragraph>Welcome, student!</Typography>
      <Button variant="contained" onClick={onLogout}>Logout</Button>
    </Container>
  );
}

export default StudentDashboard;
