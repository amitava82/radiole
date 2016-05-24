/**
 * Created by amitava on 16/02/16.
 */
var _ = require('lodash');
module.exports = function (deps) {
    return function (req, res, next) {
        var query = req.query;
        req.instance = {
            query: query
        };

        if(_.isEmpty(query)) return next();

        var formatted = {};
        _.each(query, function(val, key){
            if(key.indexOf(':') > 0){
                var keys = key.split(':');
                formatted[keys[0]] = {
                    [keys[1]]: val
                }
            }else{
                formatted[key] = val;
            }
        });

        req.instance.query = formatted;
        console.log(formatted);
        next();
    }
};