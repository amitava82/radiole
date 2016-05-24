var Promise = require('bluebird');
var playlistSvc = require('../services/playlist');

module.exports = function(deps){
    return {

        getUserPlaylist(req, res, next){
            playlistSvc.getUserPlaylist(req.user._id, req.user.access_token).then(
                list => res.send(list),
                next
            )
        },

        getFeaturedPlaylist(req, res, next){
            playlistSvc.getFeaturedPlaylists(req.user.access_token).then(
                list => res.send(list),
                next
            )
        },

        watchPlaylist(req, res, next){
            var list_id = req.params.id;
            deps.models.Playlist.findByIdAndUpdate(list_id, {
                watched: true
            }).exec().then(
                r => res.send('OK'),
                next
            );
        },

        unwatchPlaylist(req, res, next){
            var list_id = req.params.id;
            deps.models.Playlist.findByIdAndUpdate(list_id, {
                watched: false
            }).exec().then(
                r => res.send('OK'),
                next
            );
        },

        watchAll(req, res, next){
            deps.models.User.findByIdAndUpdate(req.user._id, {
                watch_all: true
            }).exec().then(
                r => res.send('OK'),
                next
            );
        },

        getWatchedPlaylist(req, res, next){
            deps.models.Playlist.find({user_id: req.user._id, watched: true}).exec().then(
                r => res.send(r),
                next
            )
        }
    }
}