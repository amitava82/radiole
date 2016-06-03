/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, useRouterHistory } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import HTML from './html';
import routes from './routes';
import createStore from './redux/createStore';
import ApiClient from './helpers/api';
import config from 'config';

import { storeSession } from './redux/modules/session';
import {fetchComponentData, fetchData} from './helpers/fetchComponentData';


module.exports = function (deps, app, callback) {

    app.use(handleRender);


    function handleRender(req, res){
        const api = new ApiClient(req, config.get('api'));
        const history = createHistory(req.originalUrl);
        const store = createStore({}, history, api);

        if(req.isAuthenticated()){
            store.dispatch(storeSession(req.user));
        }

        const _routes = routes(store);

        match({history, routes: _routes, location: req.originalUrl}, function (err, redirect, props) {
            if (err) {
                deps.log.error(err);
                res.status(500);
                res.send(err.message);
            }else if(redirect){
                res.redirect(redirect.pathname + redirect.search);
            }else if(!props){
                res.status(404);
                res.render('error', {error: 'Page not found', title: '404 - Not found'});
            }else{
                //hydrate(props);
                return fetchData(props.components, store, props).then(
                    r => {
                        res.send(hydrate(props, store));
                    }
                ).catch(e => {
                    deps.log.error(e);
                    res.render('error', {error: 'Something broke :(', title: 'Error'})
                });
            }
        });
    }

    function hydrate(props, store){
        const InitialComponent = (
            <Provider store={store}>
                <RouterContext {...props} />
            </Provider>
        );

        const _state = JSON.stringify(store.getState());

        let renderedHtml = '';
        try {
            renderedHtml = renderToString(InitialComponent);
        }catch(e){
            throw e;
        }
        const head = Helmet.rewind();
        return HTML(renderedHtml, _state, head);
    }

};
