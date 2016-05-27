/**
 * Created by amitava on 10/02/16.
 */
var mongoose = require('mongoose');
var ObjId = mongoose.Schema.Types.ObjectId;

const model = 'Report';

var reportSchema = mongoose.Schema({
    
    playlist_id: {
        type: String,
        index: 1,
        required: true,
        ref: 'Watchlist'
    },

    user_id: {
        type: String,
        ref: 'User',
        required: true
    },

    track_id: {
        type: String,
        required: true
    },
    
    track_details: {},

    added_at: {
        type: Date,
        required: true
    }

}, {timestamps: true});

reportSchema.index({playlist_id: 1, user_id: 1});
reportSchema.index({playlist_id: 1, added_at: -1});


module.exports =  function(){
    return mongoose.model(model, reportSchema);
};