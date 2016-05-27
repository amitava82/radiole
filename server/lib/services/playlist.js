/**
 * Created by amitava on 24/05/16.
 */
var SpotifyWebApi = require('spotify-web-api-node');

var Promise = require('bluebird');


function getBody(resp){
    return resp.body;
}


exports.getUserPlaylist = function(userId, accessToken){
    
    var spotifyApi = new SpotifyWebApi({
        accessToken : accessToken
    });

    spotifyApi.setAccessToken(accessToken);
    return spotifyApi.getUserPlaylists(userId).then(getBody)
};

exports.getFeaturedPlaylists = function (accessToken) {
    var spotifyApi = new SpotifyWebApi({
        accessToken : accessToken
    });

    return spotifyApi.getFeaturedPlaylists().then(getBody);
};

exports.getPlaylistTracks = function (userId, playlistId, accessToken) {
    var spotifyApi = new SpotifyWebApi({
        accessToken : accessToken
    });

    return spotifyApi.getPlaylistTracks(userId, playlistId).then(getBody);
};

exports.getPlaylistDetails = function (userId, playlistId, accessToken) {
    var spotifyApi = new SpotifyWebApi({
        accessToken : accessToken
    });
    
    return spotifyApi.getPlaylistTracks(userId, playlistId).then(getBody)
};