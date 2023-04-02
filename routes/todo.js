const express = require('express');
const router = express.Router();
const connection = require('../connection')

// https://www.npmjs.com/package/mysql

//router.get('/todos', (req,res) => {
//    res.json([{action: "Hardcoded todo 1"}, {action: "Hardcoded todo 2"}])
//});

const returner = (responder, queryResult) => {
    responder.json(
        queryResult.error ?
            { error: queryResult.error }
            :
            queryResult.results
    )
}

router.get('/todos', (req, res) => {
    connection.query("SELECT * from XX", queryResult => returner(res, queryResult))
})

router.post('/todos', (req,res) => {
    if(!req.body.action){
        res.json({
            error: "The input field is empty"
        })
    }
    connection.query(`INSERT ${req.body.action} into XX`, queryResult => returner(res, queryResult))
})

router.delete('/todos/:id', (req, res) => {
    connection.query(`DELETE * WHERE id=${req.params.id} from XX`, queryResult => returner(res, queryResult))
})  
  

module.exports = router;