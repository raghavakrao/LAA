const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/index');
require("dotenv").config();
let app = express();
app.use(compression());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use('/api', routes);
app.get('/ui', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// const fs = require('fs') // this engine requires the fs module
// app.engine('ntl', (filePath, options, callback) => { // define the template engine
//   fs.readFile(filePath, (err, content) => {
//     if (err) return callback(err)
//     // this is an extremely simple template engine
//     const rendered = content.toString()
//       .replace('#title#', `<title>${options.title}</title>`)
//       .replace('#message#', `<h1>${options.message}</h1>`)
//     return callback(null, rendered)
//   })
// })
// app.set('views', './views') // specify the views directory
// app.set('view engine', 'ntl') // register the template engine

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