const mysql = require("mysql");
const util = require("util");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "lovichat",
  connectionLimit: 10,
  port: 8889,
});

// connection.getConnection((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("Connected to mysql");
// });

//connection.query = util.promisify(connection.query);

module.exports = connection;
