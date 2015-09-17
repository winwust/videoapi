// 1. import third-party modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// 2. create and set up an Express.js web application
var app = express();
// 2.1. add the body-parser middleware so that the web application
//      can parse the HTTP request body into a JavaScript object as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// 2.2. add CORS support so that our RESTful API can be accessible publicly
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// 2.3. add the dispatcher module, which register all the server-side routes under /api, 
//      that support REST communication
app.use('/api', require('./app/dispatcher'));

// 3. connect to a MongoDB database and launch the Express.js 
//    web application once the database is connected
// 3.1. specify the event handlers for the mongoose connection
mongoose.connection
    .on('error', function(err) {console.log(err.message)})
    .on('disconnected', function() {
        console.log('Mongoose connection to DB has been disconnected');
    })
    .on('connected', function() {
// 3.2. once the Mongoose DB connection is up, launch the Express.js application
        app.listen(process.env.PORT, process.env.IP);
    });

// 4. Make sure that the Mongoose DB connection is closed when Node.js process ends
var closeDBConnection = function() {
    mongoose.connection.close(function() { process.exit(0); });
};
process.on('SIGINT', closeDBConnection)
    .on('SIGTERM', closeDBConnection);

// 5. Connect to MongoDB
mongoose.connect(require('./config/db').connectString);
