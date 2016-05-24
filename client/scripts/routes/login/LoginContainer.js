/**
 * Created by amitava on 24/05/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';


@connect(state => state)
export default class LoginContainer extends React.Component {


    render(){

        return (
            <div className="login-container">
                <Helmet title="Login with Spotify&trade;" />

                <div className="text-center">
                    <a href="/auth/login/spotify" className="btn btn-lg btn-spotify">
                        <i className="fa fa-spotify" />
                        &nbsp; LOGIN WITH SPOTIFY
                    </a>
                </div>

            </div>
        )
    }
}