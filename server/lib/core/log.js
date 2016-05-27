
module.exports = function(dep){

    return function (callback) {
        callback(null, {
            error: function (err) {
                console.log(err);
            }
        });
    }
};