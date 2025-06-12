import React from 'react';
import { Container, Typography } from '@mui/material';
import EntityTable from './EntityTable';

export default function Manage() {
  return (
    <Container className="page-container">
      <Typography variant="h4" gutterBottom>Manage Data</Typography>
      <EntityTable entity="classes" fields={["name"]} />
      <EntityTable entity="courses" fields={["name"]} />
      <EntityTable entity="doctors" fields={["name"]} />
      <EntityTable entity="students" fields={["name"]} />
      <EntityTable entity="payments" fields={["studentId", "amount"]} />
    </Container>
  );
}
