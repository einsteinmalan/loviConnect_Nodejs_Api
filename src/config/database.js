// const mysql = require("mysql2");
// const util = require("util");

// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "lovichat",
//   connectionLimit: 10,
//   port: 8889,
// });

// module.exports = connection;

const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  port: process.env.DB_PORT,
  queueLimit: 0,
});

module.exports = pool.promise();
