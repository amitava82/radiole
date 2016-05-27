require("babel-register");

var redis = require("redis");
var async = require('async');
var config = require('config');
var routes = require('./server/routes');
var _  = require('lodash');
var path = require('path');

global.__CLIENT__ = false;
global.__SERVER__ = true;

var client = redis.createClient({
    socket_keepalive: true
});

var deps = {
    basedir: __dirname,
    config: config,
    routes: routes,
    log: null,
    server: null,
    mongodb: null,
    passport: null,
    redis: client
};

deps.passport = require('./server/lib/core/passport')(deps);


require('./server/lib')(deps);

async.eachSeries([
    'log',
    'mongodb',
    'app',
    'nodemailer',
    'agenda'
], function(item, done){
    var fn = require('./server/lib/core/'+item)(deps);

    if(_.isFunction(fn)){
        fn(function (err, result) {
            if(err) return done(err);

            deps[item] = result;
            done(null, result);

        })
    }else {
        process.nextTick(function(){
            deps[item] = fn;
            done(null, fn);
        });
    }

}, function (err, results) {
    if(err){
        console.log(err);
        process.exit(1);
    }

    deps.app.listen(3000, function () {
        console.log('app running on: ', 3000);
    });
});

