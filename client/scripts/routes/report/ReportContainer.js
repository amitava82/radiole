/**
 * Created by amitava on 25/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import Switch from 'react-toggle-switch'

import Track from '../../components/Track';
import Loading from '../../components/Loading';

import {} from '../../redux/modules/playlist';


@connect(state => state)
export default class ReportContainer extends React.Component {

    componentDidMount(){
        //this.props.dispatch(getFeaturedPlaylist());
    }

    render(){

        return (
            <div className="home-container">
                <Helmet title="radiole :: Playlist watch report" />
                <section>
                    <div className="section-header">
                        <h3>
                            Playlist Watch report
                        </h3>
                    </div>
                    <div className="section-body">
                        <img src="//placehold.it/200/200" />
                        <div>
                            <p>100 Greatest Acoustic Songs Ever</p>
                            <a href="">Unwatch</a>
                            <summary>
                                <span>1 new track added today</span>
                                <span>1 new track added today</span>
                                <span>1 new track added today</span>
                            </summary>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="section-header">
                        <h3>Songs Added Today</h3>
                    </div>
                    <div className="section-body">
                        <ul className="list-unstyled track-list">
                            <li>
                                <Track />
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}