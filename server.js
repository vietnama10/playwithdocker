const express = require('express')
const app = express()
const mysql = require('mysql2');
const hostname = '127.0.0.1';
const port = 3000;

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB
} = process.env;

const con = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = "INSERT INTO customers (name, address) VALUES ('Bao Bong Bot', 'Cam Le, Da Nang')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

app.get('/customers', (req, res) => {
  let customers = [];
  con.connect(function(err) {
    if (err) throw err;
    const sql = "SELECT * FROM customers";
    con.query(sql, function (err, result) {
        if (err) throw err;
        customers = result;
      });
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ customers }));
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
