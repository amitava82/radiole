module.exports = function (deps) {

    return function(req, res, next){
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            if(req.xhr || req.url.indexOf('/api/') > -1){
                res.status(401).send({
                    error: "Authorization required",
                    code: 401
                })
            } else {
                res.redirect('/login');
            }
        }else
            next();
    };
};