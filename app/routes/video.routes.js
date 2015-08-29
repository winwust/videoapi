module.exports = function(router) {
    var videoCtrl = require('../controllers/video.controller');

    router.route('/videos')
        .get(videoCtrl.list)
        .post(videoCtrl.create);
    
    router.route('/videos/:video_id')
        .get(videoCtrl.read)
        .put(videoCtrl.update)
        .delete(videoCtrl.del);
};