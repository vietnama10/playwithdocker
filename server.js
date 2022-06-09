const express = require('express');
const db = require('./db.js');
const app = express();
const hostname = '0.0.0.0';
const port = 3000;

app.get('/customers', async (req, res) => {
  const sql = "SELECT * FROM customers";
  console.log(await db.query(sql));
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(await db.query(sql));
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
