var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api', require('./app/dispatcher'));

mongoose.connection
    .on('error', function(err) {console.log(err.message)})
    .on('disconnected', function() {
        console.log('Mongoose connection to DB has been disconnected');
    })
    .on('connected', function() {
        app.listen(process.env.PORT, process.env.IP);
    });

var closeDBConnection = function() {
    mongoose.connection.close(function() { process.exit(0); });
};
process.on('SIGINT', closeDBConnection).on('SIGTERM', closeDBConnection);

mongoose.connect(require('./config/db').connectString);