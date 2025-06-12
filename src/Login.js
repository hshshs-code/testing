import React, { useState } from 'react';
import { Container, Typography, Box, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Login({ onLogin }) {
  const [role, setRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <Container className="page-container login-container">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select labelId="role-label" value={role} label="Select Role" onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Login</Button>
      </Box>
    </Container>
  );
}

export default Login;
