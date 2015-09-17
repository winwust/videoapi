var Video = require('../models/video.model');

var list = function(req, res) {
	Video.find(function(err, videos) {
		if (err) {
			res.json({error: err.message});
		} else {
			res.json(videos);
		}
	});
};

var create = function(req, res) {
	var video = new Video();
	video.title = req.body.title;
	video.url = req.body.url;

	video.save(function(err) {
		if (err) {
			res.json({error: err.message});
		} else {
			res.json({confirmation: 'succeed'});
		}
	})
};

var read = function(req, res) {
	Video.findById(req.params.video_id, function(err, video) {
		if (err) {
			res.json({error: err.message});
		} else {
			res.json(video);
		}
	});
};

var update = function(req, res) {
	Video.findById(req.params.video_id, function(finderr, video) {
		if (finderr) {
			res.json({error: finderr.message});
		} else {
			if (video !== null) {
				video.title = req.body.title;
				video.url = req.body.url;

				video.save(function(saveerr) {
					if (saveerr) {
						res.json({error: saveerr.message});
					} else {
						res.json({confirmation: 'succeed'});
					}
				});
			} else {
				res.json({error: 'video not found'})
			}
		}
	});
};

var del = function(req, res) {
	Video.findById(req.params.video_id, function(finderr, video) {
		if (finderr) {
			res.json({error: finderr});
		} else {
			if (video !== null) {
				video.remove(function(delerr) {
					if (delerr) {
						res.json({error: delerr});
					} else {
						res.json({confirmation: 'succeed'});
					}
				});
			} else {
				res.json({error: 'video not found'});
			}
		}
	});
};

module.exports = {
	list: list,
	create: create,
	read: read,
	update: update,
	del: del
};