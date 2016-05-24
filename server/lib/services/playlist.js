/**
 * Created by amitava on 24/05/16.
 */
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();
var Promise = require('bluebird');


function getBody(resp){
    console.log(JSON.stringify(resp.body, null, 4));
    return Promise.resolve(resp.body)
}

function error(err){
    console.log(err);
    return Promise.reject(err)
}

exports.getUserPlaylist = function(userId, accessToken){
    spotifyApi.setAccessToken(accessToken);
    return spotifyApi.getUserPlaylists(userId).then(getBody)
};

exports.getFeaturedPlaylists = function (accessToken) {
    spotifyApi.setAccessToken(accessToken);

    return spotifyApi.getFeaturedPlaylists().then(getBody);
};

exports.getPlaylistTracks = function (userId, playlistId, accessToken) {
    spotifyApi.setAccessToken(accessToken);

    return spotifyApi.getPlaylistTracks(userId, playlistId).then(getBody);
};