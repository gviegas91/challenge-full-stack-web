const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 1000,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
});

exports.execute = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, result, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

exports = pool;
