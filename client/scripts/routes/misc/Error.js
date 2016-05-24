/**
 * Created by amitava on 31/01/16.
 */
import React from 'react';
import Helmet from 'react-helmet';

export default class NotFound extends React.Component{

    render(){
        return (
            <div>
                <Helmet title="Error - Spotch" />
                <div className="container">
                    <div className="row">
                        <div className="text-center">
                            <h2 className="text-display-2">Oops</h2>
                            <h4 className="text-title">An error has occurred</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}