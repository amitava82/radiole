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

        signup: function (req, res, next) {

            var data = _.pick(req.body, 'email', 'password', 'name');
            data.role = 'USER';

            helper.signup(data).then(
                r => res.send('OK'),
                e => next(e)
            );
        },

        validate: function(req, res, next){
            var key = 'signup:' + req.params.code;

            deps.redis.get(key, function(err, data){
                if(err) return next(err);

                if(!data){
                    return res.status(400).redirect('/signup/error?code=NotFound');
                }

                var u = JSON.parse(data);

                deps.models.User.signup(u).then(
                    u => {
                        deps.redis.expire(key, 0, _.noop);
                        const user = u.toObject();
                        delete user.password;
                        delete user.salt;
                        req.login(user, loginErr => {
                            if (loginErr) {
                                return next(loginErr);
                            }
                            return res.redirect(user.role === 'USER' ? '/' : '/dashboard');
                        });
                    },
                    e => res.status(400).redirect('/signup/error?message='+e.message)
                )
            });
        },

        sendResetMail: function (req, res, next) {
            var id = uuid();
            var key = 'reset:'+ id;
            var template = 'c71c7556-677c-453a-9452-6baa05e0749b';

            deps.redis.set(key, req.body.email, function(err){
                if(err) return next(err);

                deps.redis.expire(key, 86400);

                var grid = new sendgrid.Email({
                    to: req.body.email,
                    from: 'donotreplay@spotch.com',
                    fromname: 'Spotch',
                    subject: 'Password reset',
                    html: ' ',
                    text: ' '
                });

                grid.setFilters({
                    templates: {
                        settings: {
                            enable: 1,
                            template_id: template
                        }
                    }
                });

                grid.setSubstitutions({
                    '-code-': [id]
                });

                return sendgrid.send(grid, function (err) {
                    if(err) return next(err);

                    res.send('OK');
                });

            })
        },

        resetPassword: function(req, res, next){
            var code = req.params.code;
            deps.redis.get('reset:'+code, function (err, email) {
                if(!email)  return renderError(res, Error('Invalid request. Reset request has been expired.'));

                deps.models.User.findOne({email: email}).then(
                    user => {
                        req.session._csrf = code;
                        res.render('reset-password', {title: 'Reset password - Careerraft', data: { code: code}});
                    }
                ).onReject(
                    e => renderError(res, e)
                )
            })
        },

        updatePassword: function(req, res){
            var code = req.session && req.session._csrf;
            if(!req.body.csrf || req.body.csrf !== code){
                return renderError(res, new Error('Invalid CSRF'))
            }

            if(!req.body.password || req.body.password !== req.body.confirmPassword)
                return res.render('reset-password', {title: 'Reset password - Careerraft', data: {code: code, error: 'Password do not match'}});

            deps.redis.get('reset:'+code, function (err, email) {
                if(!email) return renderError(res, new Error('Invalid request'));

                deps.models.User.updatePassword(email, req.body.password).then(
                    () => {
                        deps.redis.expire('reset:'+code, 0);
                        res.render('reset-password', {data: {success: true}, title: 'Reset password - Careerraft'});
                    },
                    e => renderError(res, e)
                )
            });
        },

        /*
            /create-profile view for account creating
         */
        showSignup: function (req, res) {
            req.session._csrf = Date.now().toString(36);
            res.render('signup', {title: 'Signup - Careerraft', data: {}});
        },

        createSignup: function(req, res){
            var data = _.pick(req.body, 'email', 'name', 'password', 'kind');

            data.role = 'PROVIDER';

            helper.signup(data).then(
                r => {
                    res.render('signup', {title: 'Signup - Careerraft', data: {success: true}});
                },
                e => {
                    console.log(e)
                    res.render('signup', {title: 'Signup - Careerraft', data: {error: 'Please check your input'}});
                }
            )
        }
    }
};

function renderError(res, e){
    res.render('error', {error: e.message, title: 'Error - Careerraft'})
}