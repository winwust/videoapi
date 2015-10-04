var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
    title: String,
    url: String
});

module.exports = mongoose.model('Video', videoSchema);