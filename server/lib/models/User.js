/**
 * Created by amitava on 10/02/16.
 */
var mongoose = require('mongoose');
var ObjId = mongoose.Schema.Types.ObjectId;
var uuid = require('uuid');

const model = 'User';

var userSchema = mongoose.Schema({

    _id: {
        type: String,
        index: 1,
        unique: 1
    },
    
    name: String,
    
    profile_url: String,

    email: {
        type: String,
        required: false,
        index: 1,
        unique: 1,
        trim: true,
        lowercase: true
    },

    access_token: {
        type: String,
        select: false
    },

    token_expires: Number,

    refresh_token: {
        type: String,
        select: false
    },

    photo: String,

    email_verified: {
        type: Boolean,
        required: true,
        default: false
    },

    digest_frequency: {
        type: 'String',
        enum: ['daily', 'weekly'],
        default: 'weekly'
    },

    watch_all: {
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: true});

module.exports = function(){
    return mongoose.model(model, userSchema);
};