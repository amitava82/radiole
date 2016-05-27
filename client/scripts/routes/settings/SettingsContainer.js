/**
 * Created by amitava on 04/02/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import Helmet from 'react-helmet';

import RadioGroup from '../../components/RadioGroup';

import {saveSettings, resendCode} from '../../redux/modules/session';
import {createToast} from '../../redux/modules/toast';

const OPTIONS = [
    {label: 'Daily Digest', value: 'daily'},
    {label: 'Weekly Digest', value: 'weekly'}
];
@connect(state => state)
export default class SettingsContainer extends React.Component {

    constructor(...args){
        super(...args);
        const user = this.props.session.user;
        this.state = {
            email: user.email,
            frequency: user.digest_frequency,
            resetSent: false
        }
    }

    @autobind
    submit(e){
        e.preventDefault();
        this.props.dispatch(saveSettings(this.state.email, this.state.frequency)).then(
            r => {
                this.props.dispatch(createToast('Settings Saved!'));
                this.props.dispatch(push('/home'));
            }
        )
    }

    @autobind
    onFrequencySelect(val){
        this.setState({frequency: val})
    }

    @autobind
    onEmailChange(e){
        this.setState({email: e.target.value});
    }

    @autobind
    verify(){
        this.props.dispatch(resendCode());
        this.props.dispatch(createToast('Please check your email for verification.'));
        this.setState({resetSent: true});
    }

    render(){

        const {frequency, email, resetSent} = this.state;
        const {session: {user}} = this.props;

        return (
            <div className="settings-container">
                <Helmet title="radiole :: Settings" />
                {user.email && !user.email_verified && !resetSent ? (
                    <div className="alert alert-danger">Your email address is not verified. <Link to="#" onClick={this.verify}>Click here</Link> to resend verification email.</div>
                ) : null}

                <form onSubmit={this.submit}>
                    {!user.email && <div className="alert alert-info">Please enter the email address where we'd send you the digest.</div>}
                    <div className="form-group">
                        <input className="form-control input-lg" placeholder="Enter your email address" value={email} onChange={this.onEmailChange} />
                    </div>
                    <div className="form-group">
                        <RadioGroup options={OPTIONS} value={frequency} name="frequency" onClick={this.onFrequencySelect} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-lg btn-block btn-primary" type="submit">Done</button>
                    </div>
                </form>
                
            </div>
        )
    }
}