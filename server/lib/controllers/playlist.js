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
            deps.models.Watchlist.findByIdAndUpdate(list_id, {
                user_id: req.user._id,
                owner_id: req.body.owner_id,
                name: req.body.name,
                cover: req.body.cover
            }, {upsert: true, new: true}).exec().then(
                r => res.send(r),
                next
            );
        },

        unwatchPlaylist(req, res, next){
            var list_id = req.params.id;
            deps.models.Watchlist.findByIdAndRemove(list_id).exec().then(
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
            deps.models.Watchlist.find({user_id: req.user._id}).exec().then(
                r => res.send(r),
                next
            )
        },

        getPlaylistDetails(req, res, next){
            deps.models.Report.find({playlist_id: req.params.id}).sort('-added_at').exec().then(
                r => res.send(r),
                next
            )
        }
    }
};