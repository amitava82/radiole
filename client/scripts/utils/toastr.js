/**
 * Created by amitava on 16/02/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

import {removeToast} from '../redux/modules/toast';

const ICONS = {
    'warn': 'fa-exclamation-circle',
    'error': 'fa-times-circle',
    'success': 'fa-check-circle',
    'info': 'fa-info-circle'
};

@connect(state => state)
export default class ToastFactory extends React.Component{
    constructor(props, ctx){
        super(props, ctx);

        this.state = {
            timers: {}
        }
    }

    @autobind
    removeToast(id){
        const timr = this.state.timers;
        if(timr[id]){
            clearTimeout(timr.id);
            delete timr.id;
        }
        this.setState({timers: timr}, () => {
            this.props.dispatch(removeToast(id));
        });
    }

    render(){

        const toasts = this.props.toast.toasts.map(i => {
            const timr = this.state.timers;
            if(!timr[i.id] && i.timeout){
                timr[i.id] = setTimeout(()=> {
                    this.removeToast(i.id);
                }, i.timeout);
            }
            const classes = classNames('toast-item', i.type);
            return (
                <div className={classes} key={i.id}>
                    <span onClick={() =>this.removeToast(i.id)} className="fa fa-times close" />
                    <i className={`fa ${ICONS[i.type]}`} />
                    <p className="toast-text">{i.text}</p>
                </div>
            )
        });
        return (
            <div id="toast-container">
                {toasts}
            </div>
        )
    }
}