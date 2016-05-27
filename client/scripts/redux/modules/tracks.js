/**
 * Created by amitava on 26/05/16.
 */
/**
 * Created by amitava on 25/05/16.
 */
import { combineReducers } from 'redux'
import { resolve, reject as _reject } from '../middleware/simple-promise';
import merge from 'lodash/merge';
import extend from 'lodash/extend';
import union from 'lodash/union';
import {normalize} from 'normalizr';
import Schemas from '../schemas';

import createAction from '../createActions';


const [GET_PLAYLIST_TRACKS] =
    createAction('tracks', ["GET_PLAYLIST_TRACKS"]);


function playlist(state = {}, action){
    const {payload, type} = action;

    switch(type){
        case resolve(WATCH):
            return extend({}, state, {
                [payload._id]: payload
            })
    }
}

export default function trackReducer(state = {
    loading: false,
    entities: {},
    error: null
}, action){

    const {type, payload} = action;

    switch(type){
        case GET_PLAYLIST_TRACKS:
            return extend({}, state, {
                loading: true,
                error: null
            });

        case _reject(GET_PLAYLIST_TRACKS):
            return extend({}, state, {
                loading: false,
                error: payload
            });
        
        case resolve(GET_PLAYLIST_TRACKS):
            const {playlistId} = action.meta;
            return extend({}, state, {
                loading: false,
                error: null,
                entities: extend({}, state.entities, {[playlistId]: action.payload})
            });

        default:
            return state;
    }
}

export function getPlaylistTracks(playlistId) {
    return {
        type: GET_PLAYLIST_TRACKS,
        payload: {
            promise: api => api.get(`playlists/${playlistId}`),
            playlistId
        }
    }
}
