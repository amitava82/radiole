/**
 * Created by amitava on 11/02/16.
 */
var _ = require('lodash');

module.exports = function (deps) {
    return function(err, req, res, next){
        if(err){

            if(process.env.NODE_ENV !== 'production'){
                console.log(err.stack)
            }

            if(err.name === 'ValidationError'){
                var errors = {
                    _error: 'Validation failed.',
                    message: err.message
                };
                _.reduce(err.errors, (memo, e) => {
                    memo[e.path] = e.message;
                    return memo;
                }, errors);

                res.status(400).send(errors);

            }else{
                res.status(err.status || 500).send({
                    _error: err.message,
                    error: err.name,
                    message: err.message
                });
            }
        }else{
            next();
        }
    }
};