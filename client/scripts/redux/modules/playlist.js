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


const [LOAD_FEATURED, LOAD_MINE] =
    createAction('playlist', ["LOAD_FEATURED", "LOAD_MINE"]);

function featuredReducer(state = {
    loading: false,
    ids: [],
    entities: {},
    error: null
}, action ={}) {
    const {type, payload} = action;

    switch (type){
        case LOAD_FEATURED:
            return extend({}, state, {
                loading: true,
                error: null
            });
        case _reject(LOAD_FEATURED):
            return extend({}, state, {
                loading: false,
                error: payload
            });
        case resolve(LOAD_FEATURED):
            const norm = normalize(payload.playlists.items, Schemas.PLAYLIST_ARRAY);

            return extend({}, state, {
                loading: false,
                error: null,
                ids: union(state.ids, norm.result),
                entities: extend({}, state.entities, norm.entities.playlists)
            });
        default:
            return state;
    }
}

function mineReducer(state = {
    loading: false,
    ids: [],
    entities: {},
    error: null
}, action = {}){
    const {type, payload} = action;

    switch (type){
        case LOAD_MINE:
            return extend({}, state, {
                loading: true,
                error: null
            });
        case _reject(LOAD_MINE):
            return extend({}, state, {
                loading: false,
                error: payload
            });
        case resolve(LOAD_MINE):
            const norm = normalize(payload.items, Schemas.PLAYLIST_ARRAY);
            return extend({}, state, {
                loading: false,
                error: null,
                ids: union(state.ids, norm.result),
                entities: extend({}, state.entities, norm.entities.playlists)
            });
        default:
            return state;
    }
}

var combinedReducer = combineReducers({
    featured: featuredReducer,
    mine: mineReducer
});

export default combinedReducer;


export function getFeaturedPlaylist() {
    return {
        type: LOAD_FEATURED,
        payload: {
            promise: api => api.get('playlists/featured')
        }
    }
}

export function getMyPlaylists() {
    return {
        type: LOAD_MINE,
        payload: {
            promise: api => api.get('playlists/mine')
        }
    }
}