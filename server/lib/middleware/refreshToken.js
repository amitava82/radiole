/**
 * Created by amitava on 24/05/16.
 */

var moment = require('moment');

module.exports = function (deps) {

    var authHelper = require('../helpers/auth')(deps);

    return function(req, res, next){
        var user_id = req.user._id,
            token_expires = req.user.token_expires;

        if(!token_expires || moment.unix(token_expires).isBefore(new Date())){
            console.log('token expired, refreshing')
            authHelper.refresh(user_id).then(
                token => {
                    req.user.access_token = token;
                    next();
                }, next);
        }else{
            next();
        }
    };
};