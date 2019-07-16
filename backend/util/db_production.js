const mysql = require('mysql2');
const pool = mysql.createPool(
  {
    host: process.env.JAWSDB_URL,
    user: process.env.JAWSDB_USER,
    password: process.env.JAWSDB_PASS,
    port: process.env.JAWSDB_PORT,
    database: process.env.JAWSDB_DATABASE
  }
);

module.exports = pool.promise();