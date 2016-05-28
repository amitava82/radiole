import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';


import {toggleSidebar} from '../redux/modules/uistate';

@connect(state => state)
export default class Header extends React.Component {
    
    @autobind
    toggle(){
        this.props.dispatch(toggleSidebar());   
    }
    
    render () {
        return (
            <div className="header hidden-md hidden-lg">
                <div className="navbar navbar-default">
                    <button type="button" className="navbar-toggle" onClick={() => this.toggle()}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand brand" href="/">radiole</a>
                </div>
            </div>
        )
    }
}