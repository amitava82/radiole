/**
 * Created by amitava on 04/02/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';


@connect(state => state)
export default class HomeContainer extends React.Component {


    render(){

        return (
            <div className="home-container">
                <Helmet title="Playlist" />

                <div>Home container</div>
                
            </div>
        )
    }
}