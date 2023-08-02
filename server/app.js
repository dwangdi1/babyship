const express = require('express');
const app = express();
const path = require('path');
var cors = require('cors');
require('dotenv').config()
app.use(express.json());
app.use(cors());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(express.static('public'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/products', require('./api/products'))
app.use("/api/payment", require("./api/payment"));


app.use((req, res, next) => {
   res.status(404).send("Page not found");
});

module.exports = app;
