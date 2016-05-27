import React from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { push } from 'react-router-redux';
import autobind from 'autobind-decorator';

import {Navbar, Nav, NavItem, Button, Input, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Loading from './Loading';
import {loadWatching} from '../redux/modules/watchlist';

@connect(state => state)
export default class SideBar extends React.Component {

    componentDidMount(){
        this.props.dispatch(loadWatching())
    }

    render () {

        const {watchlist: {ids, entities, loading}} = this.props;

        let watching = null;

        if(loading){
            watching = <Loading />;
        }else if(ids.length === 0){
            watching = <p>You are not watching any playlist.</p>
        }else{
            watching = ids.map(i => {
                const item = entities[i];
                return (
                    <li key={i}>
                        <Link to={`/watching/${i}`} activeClassName="active">
                            <img src={item.cover}/>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                )
            })
        }

        return (
            <aside className="hidden-sm hidden-xs">
                <div className="dashboard-nav">
                    <div className="text-center brand">
                        <a href="#">
                            radiole
                            <i className="fa fa-volume-up" />
                        </a>

                    </div>
                    <ul className="menus list-unstyled">
                        <li>
                            <Link to="/home" activeClassName="active">
                                <i className="fa fa-home"></i>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" activeClassName="active">
                                <i className="fa fa-cog"></i>
                                Settings
                            </Link>
                        </li>
                        <li>
                            <a href="/auth/logout">
                                <i className="fa fa-sign-out">
                                </i>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
                <hr />
                <div className="now-watch">
                    <p>Now watching</p>
                    <ul className="watch-list list-unstyled">
                        {watching}
                    </ul>
                </div>
            </aside>
        )
    }
}