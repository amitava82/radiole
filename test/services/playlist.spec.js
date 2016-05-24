/**
 * Created by amitava on 24/05/16.
 */

var chai = require('chai');
chai.should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var playlistSvc = require('../../server/lib/services/playlist');

var access_token = "BQCVjNulWAZdMTlICAU_VM7tmry8iA32_7Try59tbjXNx1WdGDHPNHktP554CAzdgi75ZIKqEZOoaiIfvt5zzZ78_TlI0Ea4v97AahL3W2BlvP4wx2s1u1YrHuQg9El1amvwSh4pyA8aY2EwwL5lHcpTVo-o9DRgvxzX_DvxkkmVqCKWG_k";
var user_id = "22rnhjuk4jreckj3ghf4efv3i";
var playlistId = "7ErJpqhlmiekXD9ZHiDha3";


describe('playlist service', function () {
    this.timeout(5000);

    it('should fetch user playlist', function(){
        return playlistSvc.getUserPlaylist(user_id, access_token).should.eventually.be.fulfilled
    });

    it('should fetch playlist tracks', function(){
        return playlistSvc.getPlaylistTracks(user_id, playlistId, access_token).should.be.fulfilled;
    });

    it('should fetch featured playlists', function () {
        return playlistSvc.getFeaturedPlaylists(access_token).should.be.fulfilled;
    })
});