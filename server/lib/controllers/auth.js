/**
 * Created by amitava on 08/02/16.
 */

var Sendgrid  = require('sendgrid');
var uuid = require('uuid');
var Promise = require('bluebird');
var _ = require('lodash');


module.exports = function(deps){

    var sendgrid = Sendgrid(deps.config.get('sendGrid'));
    var helper = require('../helpers/auth')(deps);

    return {

        oauthCallback: function(req, res, next){
            var returnUrl = req.session.return;
            if(returnUrl){
                delete req.session.return;
            }else{
                returnUrl = '/';
            }

            deps.passport.authenticate(req.params.module, {
                successRedirect: returnUrl,
                failureRedirect: '/login' }
            )(req, res, next)
        },


        login: function(req, res, next){
            req.session.return = req.query.return;
            deps.passport.authenticate(req.params.module, {scope: deps.config.get('auth.spotify.scope')}, function(err, user,info){
                if(err){
                    deps.middleware.apiError(err, req, res);
                }else if(!user){
                    deps.middleware.apiError(new Error(info.message), req, res);
                }else{
                    req.login(user, loginErr => {
                        if (loginErr) {
                            return next(loginErr);
                        }
                        return res.send(user);
                    });
                }
            })(req, res, next);
        },

        logout: function(req, res){
            req.logout();
            res.redirect('/');
        },

        validate: function(req, res, next){
            var key = req.params.code;

            deps.redis.get(key, function(err, data){
                if(err) return next(err);

                if(!data){
                    return res.status(400).redirect('/error?message=Invalid Validation Link');
                }

                var u = JSON.parse(data);

                deps.models.User.findByIdAndUpdate(u._id, {
                    email_verified: true
                }).exec().then(
                    r => {
                        deps.redis.expire(key, 0, _.noop);
                        res.redirect('/');
                    },
                    e => res.status(400).redirect('/error?message='+e.message)
                );
            });
        },

        resendCode(req, res, next){
            //todo
            helper.sendVerificationEmail(req.user);
            res.send('OK');
        }
    }
};