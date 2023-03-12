const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api/todo');

const cors = require('cors')

require('dotenv').config();

const port = process.env.PORT;

const app = express();

const mongoEndpoint = process.env.MONGODB
const feEndpoint = process.env.FRONTEND_URL || "*"

console.log("Launching API on port", port)
console.log("Connecting to MongoDB at", mongoEndpoint)
console.log("Allowing CORS for", feEndpoint)

//connect to database

mongoose.connect(mongoEndpoint, {useNewUrlParser: true})
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));

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