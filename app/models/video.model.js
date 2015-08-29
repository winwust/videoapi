// because the mongoose module is shared, 
// at this point the mongoose instance is connected to the MongoDB.
var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    title: String,
    url: String
});

module.exports = mongoose.model('Video', videoSchema);