/**
 * Created by amitava on 31/01/16.
 */
import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';


import session from './session';
import toast from './toast';


export default combineReducers({
    session,
    toast,
    routing: routeReducer
});