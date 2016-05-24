/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './redux/createStore';
import apiClient from './helpers/api';

const createScrollHistory = useScroll(createBrowserHistory);
const appHistory = useRouterHistory(createScrollHistory)();

const store = createStore(window.__INITIAL_STATE__, appHistory, new apiClient());

const _routes = routes(store);

class Client extends React.Component {

    render() {

        return (
            <Provider store={store}>
                <Router history={appHistory}>
                    {_routes}
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<Client />, document.getElementById('app-root'));