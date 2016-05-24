/**
 * Created by amitava on 16/02/16.
 */
import extend from 'lodash/extend';
import reject from 'lodash/reject';
import union from 'lodash/union';

import { resolve, reject as _reject } from '../middleware/simple-promise';

import createAction from '../createActions';
const [TOAST, REMOVE_TOAST] = createAction('toast', ["TOAST", "REMOVE_TOAST"]);

const initialState = {
    toasts: []
};

const toastDefaults = {
  type: 'info',
  timeout: 5000
};

export default function(state=initialState, action = {}){
    //debugger;
    switch (action.type){
        case TOAST:
            const data = action.payload;
            let toast = {};
            if (typeof data === 'string'){
                extend(toast, toastDefaults, {text: data});
            }else{
                if(data.message || data._error){
                    toast.text = data.message || data._error;
                    toast.type = 'error';
                    toast = extend({}, toastDefaults, toast);
                }else
                    toast = extend(toast, toastDefaults, data);
            }
            toast.id = id();
            return extend( {}, state, {
                toasts: union(state.toasts, [toast])
            });

        case REMOVE_TOAST:
            return extend({}, state, {
                toasts: reject(state.toasts, {id: action.payload})
            });

        default:
            return state;
    }
}


function id(){
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

export function createToast(data){
    return {
        type: TOAST,
        payload: data
    }
}

export function removeToast(id){
    return {
        type: REMOVE_TOAST,
        payload: id
    }
}