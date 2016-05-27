/**
 * Created by amitava on 27/05/16.
 */
import React from 'react';
import autobind from 'autobind-decorator';

export default class RadioGroup extends React.Component{

    static propTypes = {
        options: React.PropTypes.array.isRequired,
        onClick: React.PropTypes.func.isRequired,
        value: React.PropTypes.any,
        name: React.PropTypes.string
    };

    constructor(...args){
        super(...args);
        this.state = {
            value: this.props.value
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }

    @autobind
    onRadioSelect(value){
        this.props.onClick(value);
    }

    render(){
        const {name, options, onClick} = this.props;
        const {value} = this.state;
        const content = options.map(i => {
            return (
                <div key={i.value}>
                    <input type="radio" id={i.value} name={name} value="all" checked={i.value == value} onChange={e => onClick(e.target.value)}  />
                    <label onClick={() => this.onRadioSelect(i.value)}>{i.label}</label>
                </div>
            )
        });

        return (
            <div className="radio-group">
                {content}
            </div>
        );
    }
}