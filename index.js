const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/todo');

const cors = require('cors')

const app = express();

const feEndpoint = process.env.FRONTEND_URL || "*"

console.log("Allowing CORS for", feEndpoint)

app.use(cors({origin: feEndpoint}))
app.use(bodyParser.json());
app.use('/api',routes);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", feEndpoint);
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(80, () => {
    console.log(`API listening to on HTTP 80`)
});

app.listen(443, () => {
    console.log(`API listening to HTTPS 443`)
});

app.listen(8080, () => {
    console.log(`API also listening to HTTP 8080`)
});