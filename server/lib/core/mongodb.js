var mongoose = require('mongoose');

module.exports = function(dep){
    return function (done) {
        var config = dep.config;
        mongoose.connect(config.get('mongo.host'), config.get('mongo.db'), config.get('mongo.port'));
        var db = mongoose.connection;
        if(process.env.NODE_ENV !== 'production') mongoose.set('debug', true);
        db.on('error', done);
        db.once('open', function() {
            done(null, 'Connected');
        });
    }
};