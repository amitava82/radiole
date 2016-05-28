/**
 * Created by amitava on 24/05/16.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import BrandHeader from '../../components/BrandHeader';

@connect(state => state)
export default class LoginContainer extends React.Component {


    render(){

        return (
            <div className="login-container full-height text-center">
                <Helmet title="radiole :: Login with Spotify" />
                <BrandHeader />
                <p className="about">
                    Watch Spotify playlists and get notified when new tracks get added.
                </p>
                <a href="/auth/login/spotify" className="btn btn-lg btn-spotify">
                    <i className="fa fa-spotify" />
                    &nbsp; LOGIN WITH SPOTIFY
                </a>
            </div>
        )
    }
}