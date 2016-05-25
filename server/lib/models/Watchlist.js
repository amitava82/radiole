/**
 * Created by amitava on 10/02/16.
 */
var mongoose = require('mongoose');
var ObjId = mongoose.Schema.Types.ObjectId;
var uuid = require('uuid');

const model = 'Watchlist';

var userSchema = mongoose.Schema({

    //playlist id
    _id: {
        type: String,
        index: 1,
        unique: 1
    },

    user_id: {
        type: String,
        ref: 'User'
    },

    track_id: {
        type: Boolean,
        required: true,
        default: false
    },
    
    tract_details: {},
    
    added_on: Date

}, {timestamps: true});

module.exports =  function(){
    return mongoose.model(model, userSchema);
}