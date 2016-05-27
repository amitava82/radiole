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


const [LOAD_WATCHING, WATCH, UNWATCH, WATCHALL, UNWATCHALL] =
    createAction('watchlist', ["LOAD_WATCHING", "WATCH", "UNWATCH", "WATCHALL", "UNWATCHALL"]);


function playlist(state = {}, action){
    const {payload, type} = action;

    switch(type){
        case resolve(WATCH):
            return extend({}, state, {
                [payload._id]: payload
            })
    }
}

export default function watchlistReducer(state = {
    loading: false,
    ids: [],
    entities: {},
    error: null
}, action){
    
    const {type, payload} = action;
    
    switch(type){
        case LOAD_WATCHING:
        case WATCH:
        case UNWATCH:
            return extend({}, state, {
                loading: true,
                error: null
            });

        case _reject(LOAD_WATCHING):
        case _reject(WATCH):
        case _reject(UNWATCH):
            return extend({}, state, {
                loading: false,
                error: payload
            });

        case resolve(LOAD_WATCHING):
            const norm = normalize(payload, Schemas.WATCHLIST_ARRAY);

            return extend({}, state, {
                loading: false,
                error: null,
                ids: union(state.ids, norm.result),
                entities: extend({}, state.entities, norm.entities.watchlist)
            });

        case resolve(WATCH):
            const {data: {name, cover}, id} = action.meta;
            return extend({}, state, {
                loading: false,
                error: null,
                ids: union(state.ids, [id]),
                entities: extend({}, state.entities, playlist(null, action))
            });

        default:
            return state;
    }
}

export function loadWatching() {
    return {
        type: LOAD_WATCHING,
        payload: {
            promise: api => api.get('playlists/watching')
        }
    }
}

export function watchPlaylist(id, data){
    return {
        type: WATCH,
        payload: {
            promise: api => api.put(`playlists/${id}/watch`, {data}),
            id,
            data
        }
    }
}

export function unwatchPlaylist(id){
    return {
        type: WATCH,
        payload: {
            promise: api => api.put(`playlists/${id}/unwatch`),
            id
        }
    }
}

export function watchAllPlaylists(){
    return {
        type: WATCHALL,
        payload: {
            promise: api => api.put(`playlists/watchall`)
        }
    }
}

export function unwatchAllPlaylists(){
    return {
        type: UNWATCHALL,
        payload: {
            promise: api => api.put(`playlists/unwatchall`)
        }
    }
}
