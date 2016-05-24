import React from 'react';
import ReactDOM from 'react-dom'
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { push } from 'react-router-redux';
import autobind from 'autobind-decorator';

import {Navbar, Nav, NavItem, Button, Input, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
//import Avatar from './Avatar';

@connect(state => state)
export default class Header extends React.Component {



    render () {
        return (<div>Header</div>)
    }
}