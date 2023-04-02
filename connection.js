const mysql = require('mysql')
require('dotenv').config();

const mysqlHost = process.env.MYSQL_HOST
const feEndpoint = process.env.FRONTEND_URL || "*"

console.log("Launching API on port", port)
console.log("Connecting to MySQL at", mysqlHost)
console.log("Allowing CORS for", feEndpoint)

const connection = mysql.createConnection({
    host: mysqlHost,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
})

module.exports = connection