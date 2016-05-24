module.exports = function(deps){
    return function(done){
        require('./server')(deps, done);
    }
};