const express = require('express');
const mysql = require('mysql')
const router = express.Router();
require('dotenv').config();


console.log("Connecting to MySQL at", process.env.MYSQL_HOST)

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    // port: 1234
})

let error = ""

connection.connect((err) => {
    console.log(err)
    error = err
})

// https://www.npmjs.com/package/mysql

const fallback = (responder) => {
    if(error) {
        responder.json({error})
        return true
    }
}

const returner = (responder, queryResult) => {
    responder.json(
        queryResult.error ?
            { error: queryResult.error }
            :
            queryResult.results
    )
}


router.get('/todos', (req, res) => {
    if(fallback(res)) return
    connection.query("SELECT * from todos", queryResult => returner(res, queryResult))
})

router.post('/todos', (req,res) => {
    if(fallback(res)) return
    if(!req.body.action){
        res.json({
            error: "The input field is empty"
        })
    }
    connection.query(`INSERT INTO todos (action) VALUES ("${mysql.escape(req.body.action)}")`, queryResult => returner(res, queryResult))
})

router.delete('/todos/:id', (req, res) => {
    if(fallback(res)) return
    connection.query(`DELETE _id, action FROM todos WHERE _id=${mysql.escape(req.params.id)}`, queryResult => returner(res, queryResult))
})  
  

module.exports = router;