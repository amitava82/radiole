/**
 * Created by amitava on 25/05/16.
 */
var async = require('async');
var Sendgrid  = require('sendgrid');
var _ = require('lodash');
var moment = require('moment');
var fs = require('fs');
var path = require('path');

var constants = require('../constants');

module.exports = function(deps, agenda){

    var template = fs.readFileSync(path.resolve(__dirname, '../../templates/digest.html'), 'utf8');
    var compiledTemplate = _.template(template);

    var sendgrid = Sendgrid(deps.config.get('sendGrid'));


    function sendmail(to, data){
        var grid = new sendgrid.Email({
            to: to,
            from: 'donotreplay@radiole.com',
            fromname: 'radiole',
            subject: 'Your watchlist digest is here!',
            html: compiledTemplate({
                playlists: data
            })
        });

        return sendgrid.send(grid);
    }


    agenda.define(constants.SEND_EMAIL_DIGEST, function (job, done) {
        const user_id = job.attrs.data.user_id;
        let user = null;
        deps.models.User.aggregate([
            {$lookup: {
                from: 'watchlists',
                localField: '_id',
                foreignField: 'user_id',
                as: 'watchlists'
            }},
            {
                $match: {
                    _id: user_id,
                    email_verified: true
                }
            }
        ]).exec()
          .then(
                results => {

                    user = results[0];

                    if(user.email_verified === false){
                        done();
                        return Promise.resolve(false);
                    }

                    var watchlist = user.watchlists;
                    var last_sent = user.last_digest_sent_at;

                    if(watchlist.length === 0){
                        done();
                        return Promise.resolve(false);
                    }

                    else{
                        var watchIds = _.map(watchlist, '_id');

                        var query = {
                            playlist_id: {$in: watchIds}
                        };

                        //added today 1pm
                        //sent yesterday 1pm
                        if(last_sent){
                            query['added_at'] = {$gt: last_sent}
                        }

                        return deps.models.Report.find(query).populate('playlist_id').lean().exec();
                    }
                }
          )
            .then(
                tracks => {
                        
                    if(!tracks || tracks.length === 0){
                        done();
                        return Promise.resolve(false);
                    }

                    var grouped = _.groupBy(tracks, i => i.playlist_id._id);

                    var playlists = [];

                    _.forEach(grouped, function (val, key) {
                        if(val.length){

                            var playlist = val[0].playlist_id;

                            playlist.tracks = _.map(val, i => {
                                var track = i.track_details.track;
                                var album = track.album;
                                return {
                                    name: track.name,
                                    artist: _.get(track, 'artists[0].name', ''),
                                    url: track.external_urls.spotify,
                                    cover: _.get(album, 'images[0].url')
                                }
                            });

                            playlists.push(playlist);
                        }
                    });

                    return sendmail(user.email, playlists);
                }
            )
            .then(
                _continue => {
                    if(_continue === false) return done();
                    
                    deps.models.User.findByIdAndUpdate(user_id, {
                        last_digest_sent_at: new Date()
                    }).exec();

                    done();
                },
                done
            );
    });
};