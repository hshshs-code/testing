const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: path.join(__dirname, 'university.db'),
    driver: sqlite3.Database,
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );`);
  await db.exec(`CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );`);
  await db.exec(`CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );`);
  await db.exec(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );`);
  await db.exec(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId INTEGER,
    amount REAL
  );`);
}

function crudRoutes(entity, fields) {
  const table = entity;
  app.get(`/api/${entity}`, async (req, res) => {
    const rows = await db.all(`SELECT * FROM ${table}`);
    res.json(rows);
  });

  app.post(`/api/${entity}`, async (req, res) => {
    const values = fields.map(f => req.body[f]);
    const placeholders = fields.map(() => '?').join(',');
    const { lastID } = await db.run(
      `INSERT INTO ${table} (${fields.join(',')}) VALUES (${placeholders})`,
      values
    );
    const item = await db.get(`SELECT * FROM ${table} WHERE id=?`, lastID);
    res.json(item);
  });

  app.put(`/api/${entity}/:id`, async (req, res) => {
    const sets = fields.map(f => `${f}=?`).join(',');
    const values = fields.map(f => req.body[f]);
    await db.run(
      `UPDATE ${table} SET ${sets} WHERE id=?`,
      [...values, req.params.id]
    );
    const item = await db.get(`SELECT * FROM ${table} WHERE id=?`, req.params.id);
    res.json(item);
  });

  app.delete(`/api/${entity}/:id`, async (req, res) => {
    await db.run(`DELETE FROM ${table} WHERE id=?`, req.params.id);
    res.json({ id: req.params.id });
  });
}

async function start() {
  await initDb();
  crudRoutes('classes', ['name']);
  crudRoutes('courses', ['name']);
  crudRoutes('doctors', ['name']);
  crudRoutes('students', ['name']);
  crudRoutes('payments', ['studentId', 'amount']);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();
