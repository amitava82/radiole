/**
 * Created by amitava on 30/01/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import {push} from 'react-router-redux';
import Helmet from 'react-helmet';
import {SITE_DESC} from './constants';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Toastr from './utils/toastr';


@connect(state => state)
export default class App extends React.Component {

    render(){
        const {session: {isLoggedIn}} = this.props;

        const content = isLoggedIn ? (
            <main className="full-height">
                <Helmet title="Spotcher" meta={[
                    {
                        name: 'description',
                        content: SITE_DESC
                    }
                ]} />
                <Sidebar />
                <div id="main" className="full-height">
                    <Header />
                    {this.props.children}
                </div>
                <Toastr />
            </main>
        ) : (
            <div className="full-height">
                <Helmet title="Spotcher" meta={[
                    {
                        name: 'description',
                        content: SITE_DESC
                    }
                ]} />
                {this.props.children}
            </div>
        );
        return content;
    }
}
