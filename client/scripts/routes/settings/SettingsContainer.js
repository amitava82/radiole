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
import BrandHeader from '../../components/BrandHeader';

import {saveSettings, resendCode, optout} from '../../redux/modules/session';
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

    @autobind
    deleteAccount(){
        if(confirm("Are you sure? This action can not be reversed. All your data will be deleted.")){
            this.props.dispatch(optout()).then(
                () => window.location = '/auth/logout'
            )
        }
    }

    render(){

        const {frequency, email, resetSent} = this.state;
        const {session: {user}} = this.props;

        return (
            <div className="settings-container full-height">
                <Helmet title="radiole :: Settings" />
                <form onSubmit={this.submit}>
                    <BrandHeader />
                    {user.email && !user.email_verified && !resetSent ? (
                        <div className="alert alert-danger">Your email address is not verified. <Link to="#" onClick={this.verify}>Click here</Link> to resend verification email.</div>
                    ) : null}
                    {!user.email && <div className="alert alert-info">Please enter the email address where we'd send you the digest.</div>}
                    <div className="form-group">
                        <input className="form-control input-lg" placeholder="Enter your email address" value={email} onChange={this.onEmailChange} />
                    </div>
                    <div className="form-group">
                        <RadioGroup options={OPTIONS} value={frequency} name="frequency" onClick={this.onFrequencySelect} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-lg btn-block btn-success" type="submit">Done</button>
                    </div>
                    <div className="form-group">
                        <button onClick={this.deleteAccount} className="btn btn-danger btn-block btn-lg" type="button">Delete my profile</button>
                    </div>
                </form>
            </div>
        )
    }
}