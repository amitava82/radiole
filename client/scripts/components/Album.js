/**
 * Created by amitava on 25/05/16.
 */
import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';
import get from 'lodash/get';

export default class Album extends React.Component{

    static propTypes = {
        data: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func.isRequired,
        watching: React.PropTypes.bool
    };

    render(){
        const {data: {id, name, images, owner}, watching, onClick} = this.props;
        const cover = get(images, '[0].url');

        const classes = classNames('album', {watching});
        return (
            <div className={classes}>
                <div onClick={() => onClick(id, {name, cover, owner_id: owner.id})}>
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