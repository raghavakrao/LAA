const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
require("dotenv").config();
let app = express();
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use('/api', routes);

// Catch 404
app.use(function (req, res) {
    res.status(404).send('Unable to find the requested resource!');
});


// Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: process.env.NODE_ENV== 'production' ? {} : err
    });
});

module.exports = app;