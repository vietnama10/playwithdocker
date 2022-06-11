const express = require('express');
const db = require('./db.js');
const app = express();
const hostname = '0.0.0.0';
const port = 3000;

app.get('/customers/create', async (req, res) => {
  const sql = "INSERT INTO customers (name, address) VALUES ('New Name', NOW())";
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(await db.query(sql));
})

app.get('/customers', async (req, res) => {
  const sql = "SELECT * FROM customers";
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(await db.query(sql));
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
