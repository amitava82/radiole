/**
 * Created by amitava on 11/04/16.
 */

var Promise = require('bluebird');
var moment = require('moment');
var refresh = require('passport-oauth2-refresh');
var requestNewAccessToken = Promise.promisify(refresh.requestNewAccessToken, {multiArgs: true});

module.exports = function(deps){

    
    return {
        
        refresh: function(oauthID){

            return deps.model.User.findOne({oauthID: oauthID}).select('refresh_token').exec().then(
                user => requestNewAccessToken('spotify', user.refresh_token)
            ).spread(
                (access_token, refresh_token) => {
                    const token_expires = moment().second(3300).unix();

                    return deps.model.User.findOneAndUpdate({oauthID: oauthID}, {
                        access_token,
                        refresh_token,
                        token_expires
                    }).exec();
                }
            )

        }

    }
    
};