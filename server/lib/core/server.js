var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var _ = require('lodash');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var engine = require('ejs-mate');

module.exports = function (dependencies, callback) {

    var app = express();

    app.use(compression());

    app.engine('ejs', engine);

    app.use(favicon(dependencies.basedir + '/static/favicon.ico'));

    app.use('/static', express.static(path.join(dependencies.basedir, "build/public")));
    app.use('/static', express.static(path.join(dependencies.basedir, "build/public/lib/font-awesome")));
    app.use('/static', function(req, res) {
        res.sendStatus(404);
    });
    app.use('/', express.static(path.join(dependencies.basedir, 'client/static')));

    app.set('views', path.resolve(dependencies.basedir, './server/views'));
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use(session({
        store: new RedisStore({
            client: dependencies.redis,
            ttl: dependencies.config.get('session.ttl')
        }),
        secret: 'Something',
        resave: true,
        saveUninitialized: true,
        cookie: dependencies.config.get('session.cookie'),
        name: dependencies.config.get('session.name')
    }));

    app.use(dependencies.passport.initialize());
    app.use(dependencies.passport.session());


    //delete cache buster
    app.use(function (req, res, next) {
       delete req.query._;
        next();
    });

    _.each(dependencies.routes, function (data, key) {
        var middleware = data.middleware || [];
        var basePath = data.path || '';
        
        _.each(data.routes, function (route) {
            var _path =  route.path.indexOf('/') === 0 ? route.path : path.join(basePath, route.path),
                method = route.method,
                handler  = route.handler,
                _middlewares = [],
                middlewarefn = [];


            //common route middleware
            Array.prototype.push.apply(_middlewares, middleware || []);
            //route middleware
            Array.prototype.push.apply(_middlewares, route.middleware || []);

            _.reduce(_middlewares, function (memo, middlewareName) {
                var fn = dependencies.middleware[middlewareName];
                if(_.isFunction(fn) && _.indexOf(middlewarefn, fn) === -1) memo.push(fn);
                return memo;
            }, middlewarefn);

            var _handlerFn = dependencies.controllers[key][handler];

            if(_.isArray(_handlerFn)){
                Array.prototype.push.apply(middlewarefn, _handlerFn);
            }else if(_.isFunction(_handlerFn)){
                middlewarefn.push(_handlerFn);
            }else {
                throw new Error('Controller function not defined: ' + key + ' ' + handler);
            }

            app[method].call(app, _path, middlewarefn);
        });
    });

    app.use(dependencies.middleware.apiError);

    app.all('/api/*', function (req, res) {
        res.status(404).send('Invalid route');
    });

    function logErrors(err, req, res, next) {
        dependencies.log.error(err);
        next();
    }

    app.all("*", logErrors);

    var client = require('../../../client/scripts/server')(dependencies, app, _.noop);

    callback(null, app);
};