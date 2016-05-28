/**
 * Created by amitava on 28/05/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import Loading from '../../components/Loading';

import {loadWatching} from '../../redux/modules/watchlist';


@connect(state => state)
export default class WatchlistContainer extends React.Component {

    componentDidMount(){
        this.props.dispatch(loadWatching());
    }

    render(){
        const {watchlist: {entities, ids, loading}} = this.props;

        let albums = null;

        if(loading){
            albums = <Loading />;
        }else{
            albums = ids.map(i => {
                const album = entities[i];
                return (
                    <li key={i}>
                        <div className="album">
                            <Link to={`/watching/${i}`}>
                                <img src={album.cover} />
                                <p className="album-name">{album.name}</p>
                            </Link>
                        </div>
                    </li>
                )
            });
        }

        return (
            <div className="home-container">
                <Helmet title="radiole :: My Watchlist" />
                <section>
                    <div className="section-header">
                        <h3>
                            Watchlist
                        </h3>
                    </div>
                    <div className="section-body">
                        <ul className="list-unstyled album-list">
                            {albums}
                        </ul>
                    </div>
                </section>
            </div>
        )
    }
}