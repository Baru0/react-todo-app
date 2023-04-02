const express = require('express');
const mysql = require('mysql')
const fs = require('fs')
const router = express.Router();
require('dotenv').config();

/* CONNECTION */

console.log("Connecting to MySQL at", process.env.MYSQL_HOST)

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: 3306, // default
    ssl: {
        ca: fs.readFileSync("./mysql-cert.pem")
    }
})

let error = ""

connection.connect((err) => {
    if(err) {
        console.log(err)
        error = err
    } else {
        console.log("Successfully connected.")
    }
})

/* UTILITY FUNCTIONS */

const fallback = (responder) => {
    if(error) {
        responder.json({error})
        return true
    }
}

const returner = (responder, err, result) => {
    responder.json(
        err ?
            { err }
            :
            result
    )
}

/* API ENDPOINT DEFINITIONS */

router.get('/todos', (req, res) => {
    if(fallback(res)) return

    const op = "SELECT * FROM todos;"
    console.log("Executing", op)
    connection.query(op, (err, result) => returner(res, err, result))
})

router.post('/todos', (req,res) => {
    if(fallback(res)) return
    if(!req.body.action){
        res.json({
            error: "The input field is empty"
        })
    }

    const op = `INSERT INTO todos (action) VALUES (${mysql.escape(req.body.action)});`
    console.log("Executing", op)
    connection.query(op, (err, result) => returner(res, err, result))
})

router.delete('/todos/:id', (req, res) => {
    if(fallback(res)) return

    const op = `DELETE FROM todos WHERE _id=${mysql.escape(req.params.id)};`
    console.log("Executing", op)
    connection.query(op, (err, result) => returner(res, err, result))
})

module.exports = router;