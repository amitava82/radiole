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
    
    render () {
        return (
            <nav className="sidebar navbar navbar-default navbar-fixed-top">
                <div className="navbar-collapse sidebar-navbar-collapse collapse">
                    <div className="dashboard-nav">
                        <ul className="nav navbar-nav">
                           <li>Home</li>
                            <li>Settings</li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}