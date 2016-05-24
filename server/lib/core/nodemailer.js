/**
 * Created by amitava on 18/02/16.
 */
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

module.exports = function(deps){

    var transport = nodemailer.createTransport(sgTransport
    ({
        auth: {
            api_key: deps.config.get('sendGrid')
        }
    }));


    return function(cb){
        cb(null, transport);
    }
};