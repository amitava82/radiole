import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
    render (){
        return (
            <footer>
                <p className="links">
                    <a href="https://github.com/amitava82/radiole" target="_blank" className="fa fa-github fa-3x" />
                    <a href="https://in.linkedin.com/in/amitavaksaha" target="_blank" className="fa fa-linkedin-square fa-3x" />
                    <a href="mailto:amitava82@gmail.com" className="fa fa-envelope-o fa-3x" />
                </p>
                <p>Copyright &copy; {new Date().getFullYear()} Amitava Saha</p>
            </footer>
        )
    }
}