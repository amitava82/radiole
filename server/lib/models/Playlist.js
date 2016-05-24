/**
 * Created by amitava on 10/02/16.
 */
var mongoose = require('mongoose');
var ObjId = mongoose.Schema.Types.ObjectId;
var uuid = require('uuid');

const model = 'Playlist';

var userSchema = mongoose.Schema({

    _id: {
        type: String,
        index: 1,
        unique: 1
    },

    user_id: {
        type: String,
        ref: 'User'
    },

    watched: {
        type: Boolean,
        required: true,
        default: false
    }

}, {timestamps: true});

userSchema.index({
    _id: 1,
    user_id: 1
});

module.exports = function(){
    return mongoose.model(model, userSchema);
};