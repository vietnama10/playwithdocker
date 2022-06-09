const mysql = require('mysql2');

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

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
	const sql0 = "DROP TABLE IF EXISTS customers";
	con.query(sql0, function (err, result) {
		if (err) throw err;
		console.log("Table droped");
	});
	const sql1 = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
	con.query(sql1, function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
	const sql2 = "INSERT INTO customers (name, address) VALUES ('Dunzg Lukak', 'Thanh Khe, Da Nang')";
	con.query(sql2, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});
});

const query = (sql) => {
	return new Promise((resolve, reject) => {
		con.query(
			sql,
			(err, result) => {
				return err ? reject(err) : resolve(result);
			}
		);
	});
}

module.exports = {
	query
}
