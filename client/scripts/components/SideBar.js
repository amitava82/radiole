import React from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { push } from 'react-router-redux';
import autobind from 'autobind-decorator';

import {Navbar, Nav, NavItem, Button, Input, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Avatar from './Avatar';

@connect(state => state)
export default class SideBar extends React.Component {

    componentDidMount(){
        //fetch watch list
    }

    render () {
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
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="//placehold.it/80/80" />
                                <span>Awesome sauce ever</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}