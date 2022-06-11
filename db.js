const mysql = require('mysql2');

const {
	MYSQL_HOST: HOST,
	MYSQL_USER: USER,
	MYSQL_PASSWORD: PASSWORD,
	MYSQL_DB: DB
} = process.env;

var pool;
const getPool = () => {
	if (pool) return pool;
	pool = mysql.createPool({
		host: HOST,
		user: USER,
		password: PASSWORD,
		database: DB
	});
	return pool;
};

const query = (sql) => {
	const pool = getPool();
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) throw err;
			connection.query(sql, (err, result) => {
				connection.release();
				return err ? reject(err) : resolve(result);
			});
		});
	});
}

module.exports = {
	query
}
