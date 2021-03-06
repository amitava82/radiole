/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import get from 'lodash/get';

//import {ROUTE_MESSAGES} from './constants';
//import {setLoginMessage} from './redux/modules/session';

import {
    HomeContainer
} from './routes/home';
import {
    WatchlistContainer
} from './routes/watchlist';
import {
    ReportContainer
} from './routes/report';

import {
    LoginContainer
} from './routes/login';

import {
    SettingsContainer
} from './routes/settings'

import Error from './routes/misc/Error';

import App from './app';


export default (store) => {

    function ensureLoggedIn(nextState, replace, cb){
        const {session: {isLoggedIn, user}} = store.getState();
        if(!isLoggedIn){
            replace({pathname: '/login'});
        }else if(!user.email && this.path !== '/settings'){
            replace({pathname: '/settings'});
        }
        cb();
    }

    return (
        <Route path="/" component={App}>
            <IndexRedirect to="/home"/>
            <Route path="/login" component={LoginContainer} />
            <Route path="/home" component={HomeContainer} onEnter={ensureLoggedIn} />
            <Route path="/watching" component={WatchlistContainer} onEnter={ensureLoggedIn} />
            <Route path="/watching/:id" component={ReportContainer} onEnter={ensureLoggedIn} />
            <Route path="/settings" component={SettingsContainer} onEnter={ensureLoggedIn} />
            <Route path="/error" component={Error} />
        </Route>
    );
};