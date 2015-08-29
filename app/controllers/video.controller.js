var Video = require('../models/video.model');

var list = function(req, res) {
	Video.find(function(err, videos) {
		if (err) {
			res.send(err);
		}
		res.json(videos);
	});
};

var create = function(req, res) {
	var video = new Video();
	video.title = req.body.title;
	video.url = req.body.url;

	video.save(function(err) {
		if (err) {
			res.send(err);
		}

		res.json({message: 'video created!'});
	})
};

var read = function(req, res) {
	Video.findById(req.params.video_id, function(err, video) {
		if (err) {
			res.send(err);
		}

		res.json(video);
	});
};

var update = function(req, res) {
	Video.findById(req.params.video_id, function(err, video) {
		if (err) {
			res.send(err);
		}

		video.title = req.body.title;
		video.url = req.body.url;

		video.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({message: 'video updated!'});
		});
	});
};

var del = function(req, res) {
	Video.findById(req.params.video_id, function(err, video) {
		if (err) {
			res.send(err);
		}

		video.remove(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({message: 'video deleted!'});
		});
	});
};

module.exports = {
	list: list,
	create: create,
	read: read,
	update: update,
	del: del
};