const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function seed() {
  const db = await open({
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

  const tables = [
    { name: 'classes', field: 'name', prefix: 'Class' },
    { name: 'courses', field: 'name', prefix: 'Course' },
    { name: 'doctors', field: 'name', prefix: 'Doctor' },
    { name: 'students', field: 'name', prefix: 'Student' },
  ];

  for (const { name, field, prefix } of tables) {
    const insert = await db.prepare(`INSERT INTO ${name} (${field}) VALUES (?)`);
    for (let i = 1; i <= 1000; i++) {
      await insert.run(`${prefix} ${i}`);
    }
    await insert.finalize();
  }

  // payments references students
  const insertPayment = await db.prepare(
    'INSERT INTO payments (studentId, amount) VALUES (?, ?)'
  );
  for (let i = 1; i <= 1000; i++) {
    const studentId = Math.ceil(Math.random() * 1000);
    const amount = Math.floor(Math.random() * 1000) + 1;
    await insertPayment.run(studentId, amount);
  }
  await insertPayment.finalize();

  await db.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
