/**
 * Created by amitava on 10/02/16.
 */
var mongoose = require('mongoose');
var ObjId = mongoose.Schema.Types.ObjectId;
var uuid = require('uuid');

const model = 'Watchlist';

var watchlistSchema = mongoose.Schema({

    //playlist id
    _id: {
        type: String,
        index: 1,
        unique: 1
    },
    
    owner_id: {
        type: String,
        required: true
    },

    user_id: {
        type: String,
        ref: 'User',
        index: 1
    },

    name: String,

    cover: String,

    last_synced: {
        type: Date,
        default: Date.now
    }
    
}, {timestamps: true});


module.exports = function(){
    return mongoose.model(model, watchlistSchema);
};