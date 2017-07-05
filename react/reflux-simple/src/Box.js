import React from 'react';
import {Component} from 'reflux';

import BoxStore from './flux/BoxStore';
import BoxStore2 from './flux/BoxStore2';
import BoxActions from './flux/BoxActions';

class Box extends Component {
    
    constructor(props)
    {
        super(props);

        this.stores = [BoxStore];

        this.onClick = () => BoxActions.update(this.props.index);



        //this.state = {number: 1};



        if (this.props.local) {
            this.onClick = () => this.setState({number: this.props.index});
        }
    }

    render() {        
        return (
            <button
                style={getStylesFromState(this.state.number)}
                className={'box box--' + this.props.index}
                onClick={this.onClick}>

                <span className="box__text">box {this.props.index}</span>
                <footer className="box__state">state {this.state.number+''}</footer>
            </button>
        );
    }
}

function getStylesFromState(number) {

    if (!number) {
        return null;
    }

    let styles = {};
    let colors = [
        '',
        '#f65314',
        '#7cbb00',
        '#00a1f1',
        '#ffbb00',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ];
    styles.boxShadow = `inset 0 0 0 5px ${colors[+number]}`;
    return styles;
}

export default Box;
