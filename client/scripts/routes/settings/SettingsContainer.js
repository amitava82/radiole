/**
 * Created by amitava on 04/02/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';


@connect(state => state)
export default class SettingsContainer extends React.Component {


    render(){

        return (
            <div className="settings-container">
                <Helmet title="Settings" />

                <div>settings container</div>
                
            </div>
        )
    }
}