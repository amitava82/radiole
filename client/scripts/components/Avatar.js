/**
 * Created by amitava on 24/05/16.
 */
import React from 'react';

export default class Avatar extends React.Component {

    render(){
        const {name, width=130, height=120, url} = this.props;

        const style = {width: width, height: height};
        let text = "";
        if(url){
            style.backgroundImage = `url(${url})`;
            style.backgroundRepeat = 'no-repeat';
            style.backgroundSize = 'cover';
            style.backgroundPosition = ' 50%';
        }else if(name) {
            const idx = Math.min(name.length % 6, 6);
            style.backgroundColor = colors[idx];
            const parts = name.split(' ');
            if(parts.length >1){
                text = parts[0][0] + parts[1][0];
            }else{
                text = name.substr(0, 2);
            }
        }
        return (
            <div className="avatar" style={style}>
                { url ? '' : text.toUpperCase()}
            </div>
        )

    }
}

const colors = [
    '#E05263', '#659157', '#69A2B0', '#DD1C1A', '#086788', '#06AED5', '#F0C808'
];