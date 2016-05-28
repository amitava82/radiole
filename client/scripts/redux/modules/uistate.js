/**
 * Created by amitava on 28/05/16.
 */
import { combineReducers } from 'redux'
import { resolve, reject as _reject } from '../middleware/simple-promise';
import merge from 'lodash/merge';
import extend from 'lodash/extend';
import union from 'lodash/union';
import {normalize} from 'normalizr';
import Schemas from '../schemas';

import createAction from '../createActions';


const [TOGGLE_SIDEBAR] =
    createAction('uistate', ["TOGGLE_SIDEBAR"]);


export default function reducer(state = {
    sidebarOn: false
}, action){

    const {type, payload} = action;

    switch(type){
        case TOGGLE_SIDEBAR:
            return extend({}, state, {
                sidebarOn: !state.sidebarOn
            });

        default:
            return state;
    }
}

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR,
        payload: {}
    }
}
