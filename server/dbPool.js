const mysql = require('mysql2');
const dotenv = require('dotenv');
let result = dotenv.config();

// Check variables
//console.log("reading variables: ", result);

const pool  = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
     user: process.env.MYSQL_USER,
     password: process.env.MYSQL_PASSWORD,
     database: process.env.MYSQL_DATABASE,
     port: process.env.MYSQL_PORT
});

module.exports = pool;