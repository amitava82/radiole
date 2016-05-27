/**
 * Created by amitava on 11/04/16.
 */

var Promise = require('bluebird');
var moment = require('moment');
var refresh = require('passport-oauth2-refresh');
var requestNewAccessToken = Promise.promisify(refresh.requestNewAccessToken, {multiArgs: true});
var uuid = require('uuid');
var Sendgrid  = require('sendgrid');

module.exports = function(deps){

    var sendgrid = Sendgrid(deps.config.get('sendGrid'));

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
        },

        sendVerificationEmail(user){
            var hash = uuid();
            deps.redis.set(hash, JSON.stringify(user), function(err) {
                if (err) return deps.log.error(err);

                deps.redis.expire(hash, 604800);

                //TODO pretty template
                var grid = new sendgrid.Email({
                    to: user.email,
                    from: 'donotreplay@radiole.com',
                    fromname: 'radiole',
                    subject: 'Confirm your email address',
                    html: `
                            <html>
                                <body>
                                    <p>Hi, you have changed your email address in radiole. Please click the following link to validate your email address.</p>
                                    <a href="https://radiole.com/auth/validate/${hash}">Validate my email address</a>
                                    <br />
                                    <p>Or copy and paste following link into your browser: https://radiole.com/auth/validate/${hash}</p>
                                    <p>Thanks!</p>
                                    <p>radiole</p>
                                </body>
                            </html>
                        `,
                    text: `Hi, you have changed your email address in radiole. Please click the following link to validate your email address. Copy and paste following link to validate: https://radiole.com/auth/validate/${hash}`
                });

                return sendgrid.send(grid, function (err) {
                    if(err) deps.log.error(err);
                });
            });
        }

    }
    
};