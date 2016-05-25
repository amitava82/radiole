/**
 * Created by amitava on 09/02/16.
 */
var config = require('config');
var _ = require('lodash');
var url = require('url');
var moment = require('moment');

module.exports = function(deps){
    var passport = require('passport');
    var refresh = require('passport-oauth2-refresh');
    var SpotifyStrategy = require('passport-spotify').Strategy;

    function callbackUrl(module){
        var port = deps.config.get('ui.port');
        return url.format({
            hostname: deps.config.get('ui.host'),
            port:  (port == 80 || port == 443) ? "" : deps.config.get('ui.port'),
            protocol: deps.config.get('ui.protocol'),
            pathname: 'auth/'+module+'/callback'
        });
    }

    function _callback(accessToken, refreshToken, profile, cb){
        var User = deps.models.User;
        var oauthId = profile.id;
        var photo = _.get(profile, 'photos[0]');

        User.findOne({_id: oauthId}, {lean: true}, (err, user) => {
            if(err){
                cb(err);
            }else if(!user) {
                //no account, create
                User.create({
                    _id: oauthId,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    token_expires: moment().second(3300).unix(), //in 55 min
                    photo: photo,
                    name: profile.displayName,
                    profile_url: profile.profileUrl
                }).then(
                    u => cb(null, u),
                    e => cb(e)
                )
            }else{
                //account exists, update
                user.access_token = accessToken;
                user.refresh_token = refreshToken;
                user.token_expires = moment().second(3300).unix(); //in 55 min
                user.photo = photo;
                user.name = profile.displayName;

                user.save().then(
                    u => cb(null, u),
                    e => cb(e)
                )
            }
        });
    }

    var spotify = new SpotifyStrategy({
            clientID: config.get('auth.spotify.clientId'),
            clientSecret: config.get('auth.spotify.clientSecret'),
            callbackURL: callbackUrl('spotify')
        }, _callback
    );

    passport.use(spotify);

    refresh.use(spotify);

    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        var User = deps.models.User;
        User.findById(id).select('+access_token').lean().exec(cb);
    });

    return passport;
};