/**
 * Created by amitava on 25/05/16.
 * This is the engine that runs the job. Run this outside webserver as stanalone service.
 */

require("babel-register");
var async = require('async');
var _ = require('lodash');
var jobs = require('./constants');
var jobConstants = require('./constants');

process.env['NODE_CONFIG_DIR'] = '../config';

var config = require('config');
var Scheduler = require('./scheduler');

var deps = {
    config: config
};

require('../server/lib')(deps, ['models']);

deps.passport = require('../server/lib/core/passport')(deps);

async.eachSeries([
    'log',
    'mongodb'
], function(item, done){
    var fn = require('../server/lib/core/'+item)(deps);

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

    Scheduler(deps, function(err, agenda){
        agenda.start();
        //Job to fetch new watched list tracks
        agenda.every('4 minutes', jobConstants.SYNC_PLAYLISTS);

        
        //agenda.now(jobConstants.SYNC_PLAYLISTS, {user_id: '22rnhjuk4jreckj3ghf4efv3i'});
        
        //daily email digest
        //agenda.every('day', jobConstants.DAILY_EMAIL_DIGEST);
        
        //weekly email digest
        //agenda.every('week', jobConstants.WEEKLY_EMAIL_DIGEST);

        //agenda.now(jobs.DAILY_EMAIL_DIGEST, {user_id: '22rnhjuk4jreckj3ghf4efv3i', playlist_id: '7ErJpqhlmiekXD9ZHiDha3', owner_id: '22rnhjuk4jreckj3ghf4efv3i'})
    });

});