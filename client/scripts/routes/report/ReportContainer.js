/**
 * Created by amitava on 25/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import get from 'lodash/get';


import Track from '../../components/Track';
import Loading from '../../components/Loading';

import {getMyPlaylists} from '../../redux/modules/playlist';
import {getPlaylistTracks} from '../../redux/modules/tracks';
import {createToast} from '../../redux/modules/toast';


const today = new Date();
const TODAY = today.toDateString();
const LAST_WEEK = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));

@connect(state => state)
export default class ReportContainer extends React.Component {

    componentWillMount(){
        const {watchlist: {ids, entities, loading}, params} = this.props;
        const playlist = entities[params.id];

        if(!playlist){
            this.props.dispatch(getMyPlaylists()).then(
                r => {
                    this.props.dispatch(getPlaylistTracks(params.id))
                },
                e => this.props.dispatch(createToast(e))
            )
        }else{
            this.props.dispatch(getPlaylistTracks(params.id));
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.errorMessage);
        if(nextProps.params.id != this.props.params.id){
            this.props.dispatch(getPlaylistTracks(nextProps.params.id));
        }
    }

    isToday(d){
        return new Date(d).toDateString() === TODAY;
    }

    withinLastWeek(d){
        return Date.parse(d) > LAST_WEEK;
    }


    render(){

        const {watchlist: {ids, entities, loading}, params: {id}, tracks} = this.props;

        if(loading) return <Loading />;

        const playlist = entities[id];
        const trackList = tracks.entities[id] || [];
        const todayList = [];
        const weekList = [];

        if(!playlist) return <Loading />;

        let tracksContent = [];
        if(tracks.loading) tracksContent = <Loading />;
        else if(trackList.length === 0){
            tracksContent = <h4>Nothing added since last synced. We will send you update as new tracks get added.</h4>
        }
        else trackList.forEach(t => {
            let addedToWeek = false;

            if(this.isToday(t.added_at)){
                todayList.push(
                    <li key={t._id}>
                        <Track data={t}  />
                    </li>
                );
                addedToWeek = true;
                weekList.push(
                    <li key={t._id}>
                        <Track data={t}  />
                    </li>
                )
            }else if(this.withinLastWeek(t.added_at) && !addedToWeek){
                weekList.push(
                    <li key={t._id}>
                        <Track data={t}  />
                    </li>
                )
            }
            tracksContent.push(
                <li key={t._id}>
                    <Track data={t}  />
                </li>
            )
        });

        return (
            <div className="report-container">
                <Helmet title="radiole :: Playlist watch report" />
                <section>
                    <div className="section-header">
                        <h3>
                            Playlist Watch report
                        </h3>
                    </div>
                    <div className="section-body album-details">
                        <div className="row">
                            <div className="col-md-3 col-sm-4 cover-container">
                                <img src={playlist.cover} />
                            </div>
                            <div className="col-md-9 col-sm-8">
                                <div className="details">
                                    <h1>{playlist.name}</h1>
                                    <ul className="list-unstyled">
                                        <li>{`${todayList.length} track added today`}</li>
                                        <li>{`${weekList.length} track added this week`}</li>
                                        <li>{`${trackList.length} track added since watch`}</li>
                                    </ul>
                                    <button className="btn btn-default btn-sm">Unwatch</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <section>
                    <div className="section-header">
                        <h3>Songs Added Today</h3>
                    </div>
                    <div className="section-body">
                        {todayList.length ? (
                            <ul className="list-unstyled track-list">
                                {todayList}
                            </ul>
                        ) : (
                            <h4>Nothing added today.</h4>
                        )}

                    </div>
                </section>
                <section>
                    <div className="section-header">
                        <h3>Songs Added This Week</h3>
                    </div>
                    <div className="section-body">
                        <ul className="list-unstyled track-list">
                            {weekList}
                        </ul>
                    </div>
                </section>
                <section>
                    <div className="section-header">
                        <h3>Songs Added Since Watching</h3>
                    </div>
                    <div className="section-body">
                        <ul className="list-unstyled track-list">
                            {tracksContent}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}