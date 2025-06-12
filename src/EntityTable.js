import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

export default function EntityTable({ entity, fields }) {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const api = `http://localhost:4000/api/${entity}`;

  const load = async () => {
    const res = await fetch(api);
    setRows(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (editing) {
      await fetch(`${api}/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    } else {
      await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }
    setOpen(false);
    setForm({});
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    load();
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm(row);
    setOpen(true);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add {entity}
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map(f => (<TableCell key={f}>{f}</TableCell>))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {fields.map(f => (<TableCell key={f}>{row[f]}</TableCell>))}
              <TableCell>
                <Button size="small" onClick={() => openEdit(row)}>Edit</Button>
                <Button size="small" onClick={() => handleDelete(row.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => { setOpen(false); setEditing(null); }}>
        <DialogTitle>{editing ? 'Edit' : 'Add'} {entity}</DialogTitle>
        <DialogContent>
          {fields.map(f => (
            <TextField
              margin="dense"
              label={f}
              key={f}
              fullWidth
              value={form[f] || ''}
              onChange={e => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setEditing(null); }}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
