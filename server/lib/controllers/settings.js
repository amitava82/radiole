var Promise = require('bluebird');
var jobConstants = require('../../../engine/constants');


module.exports = function(deps){

    var schedulerHelper = require('../helpers/scheduler')(deps);
    var authHelper = require('../helpers/auth')(deps);

    return {
        savePreferences(req, res, next){
            const {email, digest_frequency} = req.body;
            const {user} = req;
            const currentEmail = user.email;
            const currentFrequency = user.digest_frequency;
            const currentEmailVerified = user.email_verified;

            let email_verified = false;
            let frequency_changed = false;
            
            if(email && currentEmail === email){
                email_verified = true;
            }

            if(currentFrequency !== digest_frequency){
                frequency_changed = true;
            }
            
            deps.models.User.findByIdAndUpdate(user._id, {
                email,
                digest_frequency,
                email_verified
            }, {new: true})
                .exec()
                .then(
                    u => {
                        //Reschedule job if email frequency changed
                        if(frequency_changed){
                            schedulerHelper.cancelJob({name: jobConstants.SEND_EMAIL_DIGEST, 'data.user_id': u._id});
                            schedulerHelper.createEmailJob(digest_frequency, u._id);
                        }
                        
                        if(!email_verified){
                            authHelper.sendVerificationEmail(u);
                        }
                        
                        return u;
                    }
                )
                .then(
                    u => res.send(u),
                    next
                )
            
        }
    }
};