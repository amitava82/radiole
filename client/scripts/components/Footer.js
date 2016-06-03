import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
    render (){
        return (
            <footer>
                <p className="links">
                    <a href="https://github.com/amitava82/radiole" target="_blank" className="fa fa-github fa-2x" title="Github" />
                    <a href="https://in.linkedin.com/in/amitavaksaha" target="_blank" className="fa fa-linkedin-square fa-2x" title="LinkedIn" />
                    <a href='http://www.emailmeform.com/builder/form/d991h7wKL9dfdF3EeS4094' title='Contact Me' target='_blank' className="fa fa-envelope-o fa-2x" />
                </p>
                <p>Copyright &copy; {new Date().getFullYear()} Amitava Saha</p>
            </footer>
        )
    }
}