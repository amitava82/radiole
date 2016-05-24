import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
    render (){
        return (
            <footer className="">
                <div className="">
                    <p className="links">
                        <Link to="/about">ABOUT</Link>
                        <a href="/privacy">PRIVACY</a>
                        <a href="/terms">TERMS & CONDITIONS</a>
                        <Link to="/contact-us">GET IN TOUCH</Link>
                    </p>
                    <p>Copyright &copy; {new Date().getFullYear()} Amitava Saha</p>
                </div>
                <div>
                    
                </div>
            </footer>
        )
    }
}