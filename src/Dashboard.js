import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const entities = ['classes', 'courses', 'doctors', 'students', 'payments'];

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = {};
      for (const e of entities) {
        const res = await fetch(`http://localhost:4000/api/${e}`);
        result[e] = await res.json();
      }
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <Container className="page-container">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        {entities.map((e) => (
          <Grid item xs={12} md={6} key={e}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{e}</Typography>
              <pre>{JSON.stringify(data[e], null, 2)}</pre>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
