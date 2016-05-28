/**
 * Created by amitava on 28/05/16.
 */
import React from 'react';

export default function BrandHeader(){
    return (
        <div className="brand-header">
            <p className="brand">radiole</p>
            <div className="icons">
                        <span>
                            <i className="fa fa-spotify"></i>
                            <i className="fa fa-heart"></i>
                            <i className="fa fa-feed"></i>
                            <i className="fa fa-envelope"></i>
                        </span>
            </div>
        </div>
    )
}