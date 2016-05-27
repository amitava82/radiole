/**
 * Created by amitava on 25/05/16.
 */
import React from 'react';
import {Link} from 'react-router';
import get from 'lodash/get';

export default class Album extends React.Component{

    static propTypes = {
        data: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired
    };

    render(){
        const {data: {id, name, images, owner}} = this.props;
        const cover = get(images, '[0].url');

        return (
            <div className="album">
                <div onClick={() => this.props.onClick(id, {name, cover, owner_id: owner.id})}>
                    <img src={cover} />
                    <div className="hover-action">
                        <i className="fa fa-heart" />
                    </div>
                    <p className="album-name">{name}</p>
                </div>
            </div>
        )
    }
}