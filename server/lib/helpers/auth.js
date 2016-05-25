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
            var Model = deps.models.User;
            return Model.findOne({_id: oauthID}).select('refresh_token').exec()
                .then(user => requestNewAccessToken('spotify', user.refresh_token))
                .then(r => {
                    const [access_token] = r;
                    const token_expires = moment().second(3300).unix();
                    return Model.findOneAndUpdate({_id: oauthID}, {
                        access_token,
                        token_expires
                    }, {new: true}).select('+access_token').exec().then(u => u.access_token);
                })

        }

    }
    
};