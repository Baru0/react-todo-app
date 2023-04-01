const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/todo');

const cors = require('cors')

require('dotenv').config();

const port = process.env.BE_PORT_LOL

const app = express();

const mysqlEndpoint = process.env.MYSQLDB
const feEndpoint = process.env.FRONTEND_URL || "*"

console.log("Launching API on port", port)
console.log("Connecting to MySQL at", mysqlEndpoint)
console.log("Allowing CORS for", feEndpoint)


app.use(cors({origin: feEndpoint}))
app.use(bodyParser.json());
app.use('/api',routes);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", feEndpoint);
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(port, () => {
    console.log(`Port running on ${port}`)
});

app.listen(8080, () => {
    console.log(`Port also running on 8080`)
});

app.listen(443, () => {
    console.log(`Port also running on 443`)
});

app.listen(5050, () => {
    console.log(`Port also running on 5050`)
});