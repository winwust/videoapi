var express = require('express');
var router = express.Router();

require('./routes/video.routes')(router);

module.exports = router;