/**
 * Created by amitava on 31/01/16.
 */
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from './middleware/simple-promise';
import {syncHistory} from 'react-router-redux';
import thunk from 'redux-thunk';

import reducer from './modules/reducer';
import clientMiddleware from './middleware/clientMiddleware';




export default function (initialState = {}, history, apiClient) {

    const reduxRouterMiddleware = syncHistory(history);
    const createStoreWithMiddleware = applyMiddleware(thunk, clientMiddleware(apiClient), promiseMiddleware(), reduxRouterMiddleware)(createStore);

    return createStoreWithMiddleware(reducer, initialState);
}
