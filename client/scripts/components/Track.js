/**
 * Created by amitava on 25/05/16.
 */
import React from 'react';
import {Link} from 'react-router';
import get from 'lodash/get';
import TimeAgo from 'react-timeago';

export default class Track extends React.Component{

    static propTypes = {
        data: React.PropTypes.object.isRequired
    };

    render(){
        const {data} = this.props;
        const cover = get(data, 'tract_details.track.album.images[2].url');
        const artists = get(data, 'track_details.track.artists[0].name');

        return (
            <div className="row track">
                <div className="col-xs-9">
                    <img src={cover} className="cover" />
                    <div className="track-details">
                        <p className="album-name">{data.track_details.track.name}</p>
                        <p className="artist">{`by ${artists}`}</p>
                    </div>
                </div>
                <div className="col-xs-3 text-right timestamp">
                    Added &nbsp; <TimeAgo date={data.added_at} />
                </div>
            </div>
        )
    }
}