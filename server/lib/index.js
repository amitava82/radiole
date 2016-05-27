var path = require('path');
var fs = require('fs');
var _ = require('lodash');

module.exports = function(dependencies, folders){
    folders = folders || [
        'middleware',
        'models',
        'controllers'
    ];

    _.each(folders, function (dir) {
        dependencies[dir] = {};
      _.reduce(fs.readdirSync(path.join(__dirname, dir)), function(memo, file){
          if(file !== path.basename(__filename) && path.extname(file) === '.js'){
              var fn =  require(path.resolve(__dirname, dir, file));
              
              if(_.isFunction(fn))
                  memo[path.basename(file, '.js')] = fn(dependencies);
              else
                  memo[path.basename(file, '.js')] = fn;
          }
          return memo;
      }, dependencies[dir]);
    });

    return dependencies;
};