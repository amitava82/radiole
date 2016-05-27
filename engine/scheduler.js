/**
 * Created by amitava on 25/05/16.
 * scheduler. It exports agenda object to callback function
 * 
 */
var Agenda = require('agenda');

module.exports = function (deps, callback) {

    var mongoConnectionString = "mongodb://127.0.0.1:27017/agenda";

    var agenda = new Agenda({db: {address: mongoConnectionString}});
    
    ['email', 'watchlist'].forEach(function(job){
        require('./jobs/'+job)(deps, agenda);
    });

    agenda.on('ready', function() {
        console.log('Agenda ready');
        agenda.purge(function(err, numRemoved) {
            console.log('purged count: ', numRemoved)
        });
        callback(null, agenda);
    });

    function graceful() {
        agenda.stop(function() {
            process.exit(0);
        });
    }

    process.on('SIGTERM', graceful);
    process.on('SIGINT' , graceful);

    agenda.on('start', function(job) {
        console.log("Job %s starting", job.attrs.name);
    });
    
    agenda.on('success', function(job) {
        console.log("Job %s Successfully completed.", job.attrs.name);
    });

    agenda.on('fail', function(err, job) {
        console.log("Job %s failed with error: %s", job.attrs.name, err.message);
    });

    agenda.on('error', function(e){
        console.log('**Agenda Error**');
        console.log(e);
    })
};