/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import autobind from 'autobind-decorator';
import merge from 'lodash/merge';
import get from 'lodash/get';
import Helmet from 'react-helmet';

var GoogleAnalytics = require('react-g-analytics');

import {SITE_DESC} from './constants';

import Sidebar from './components/SideBar';
import Footer from './components/Footer';
import Toastr from './utils/toastr';


@connect(state => state)
export default class App extends React.Component {

    render(){
        return (
            <main>
                <Helmet title="Spotcher" meta={[
                    {
                        name: 'description',
                        content: SITE_DESC
                    }
                ]} />
                <Sidebar />
                <div id="main">
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
                <Footer />
                <Toastr />
                <GoogleAnalytics id="UA-73916287-1" />
            </main>
        )
    }
}
