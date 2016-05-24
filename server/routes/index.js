var path = require('path');
var fs = require('fs');
var _ = require('lodash');

module.exports = _.reduce(fs.readdirSync(__dirname), function(memo, file){
    if(file !== path.basename(__filename)){
        memo[path.basename(file, path.extname(file))] = require(path.join(__dirname, file));
    }
    return memo;
}, {});