/**
 * Created by amitava on 31/01/16.
 */
import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

//import entities from './entities';
import errorMessage from './error';
import session from './session';
import toast from './toast';
import playlist from './playlist';
import watchlist from './watchlist';
import tracks from './tracks';
import uistate from './uistate'

export default combineReducers({
    errorMessage,
    //entities,
    session,
    toast,
    playlist,
    watchlist,
    tracks,
    uistate,
    routing: routeReducer
});