/**
 * Created by amitava on 27/05/16.
 */
module.exports = function(deps){
    return function(callback){
        require('../../../engine/scheduler')(deps, callback);
    }
};