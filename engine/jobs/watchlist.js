/**
 * Created by amitava on 25/05/16.
 */
var constants = require('../constants');
var playlistService = require('../../server/lib/services/playlist');
var _ = require('lodash');
var moment = require('moment');
var Promise = require('bluebird');

module.exports = function(deps, agenda){

    var auth = require('../../server/lib/helpers/auth')(deps);

    //parent job for fetching paylist tracks.
    //it will fetch all watched playlists and run job on each list
    agenda.define(constants.SYNC_PLAYLISTS, {concurrency: 5}, function(job, done){
       deps.models.Watchlist.find({}).select('user_id _id owner_id').lean().exec()
           .then(
               list => {
                   list.forEach(i => {
                       agenda.now(constants.FETCH_PLAYLIST_TRACKS, {
                           user_id: i.user_id,
                           playlist_id: i._id,
                           owner_id: i.owner_id
                       });
                   });
                   done();
               },
               done
           );
    });

    /*
        Job params
        @user_id
     */
    agenda.define(constants.FETCH_PLAYLIST_TRACKS, {concurrency: 10}, function(job, done){
        //import service and do the job
        var data = job.attrs.data;
        auth.refresh(data.user_id)
            .then(access_token => playlistService.getPlaylistDetails(data.owner_id, data.playlist_id, access_token))
            .then(
                playlist => deps.models.Watchlist.findById(data.playlist_id).lean().exec().then(
                    i => [playlist, i]
                )
            )
            .then(
                r => {
                    var [playlist, watchlist] = r;
                    var tracks = [];
                    _.each(playlist.items, track => {
                        if(moment(track.added_at).isAfter(watchlist.last_synced)){
                            tracks.push(({
                                playlist_id: data.playlist_id,
                                user_id: data.user_id,
                                track_id: track.track.id,
                                added_at: track.added_at,
                                track_details: track
                            }))
                        }
                    });

                    if(tracks.length)
                        return deps.models.Report.insertMany(tracks);
                    else
                        return Promise.resolve();
                }
            )
            .then(
                () => deps.models.Watchlist.findByIdAndUpdate(data.playlist_id, {last_synced: new Date()}).exec()
            )
            .then(
                ()=> {
                    job.remove(done);
                },
                e => {console.log(e); done(e)});

    });
};