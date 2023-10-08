const mysql = require('mysql');
const util = require('util');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'loviConnect',
    connectionLimit: 10,
    port: 8889,
    dateStrings : true,
    multipleStatements: true
});

connection.getConnection((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to mysql");
});

connection.query = util.promisify(connection.query);

module.exports = connection;