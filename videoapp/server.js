// 1. import third-party modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// 2. create and set up an Express.js web application
var app = express();
// 2.1. add the body-parser middleware so that the web application
//      can parse the HTTP request body into a JavaScript object as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// 2.2. add the method-override middleware so that the web application
//      can handle PUT and DELETE verbs through POST request
app.use(methodOverride('X-HTTP-Method-Override'));
// 2.3. optional: add CORS support so that our RESTful API can be
//      accessible publicly
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// 2.4. add all the server-side routes and make the RESTful API
//      available at /api
app.use('/api', require('./app/dispatcher'));
// 2.5. make the public folder to serve client-side files
app.use (express.static('public'));

// 3. connect to a MongoDB database and launch the Express.js 
//    web application once the database is connected
// 3.1. the /config/env.js file stores the hard-coded configuration data,
//      such as the database connection string and the listening port
var env = require('./config/env');
// 3.2. specify the event handlers for the mongoose connection
mongoose.connection.on('error', function(err) {throw err})
    .on('disconnected', function() {
        console.log('Mongoose connection to DB has been disconnected');
    })
    .on('connected', function() {
// 3.3. once the Mongoose DB connection is up, launch the Express.js application
        app.listen(process.env.PORT, process.env.IP);
    });

// 4. Make sure that the Mongoose DB connection is closed when Node.js process ends
var closeDBConnection = function() {
    mongoose.connection.close(function() { process.exit(0); });
};
process.on('SIGINT', closeDBConnection)
    .on('SIGTERM', closeDBConnection);

// 5. Connect to MongoDB
try {
    mongoose.connect(env.db);
} catch (err) {
    console.log(err.message);
}

