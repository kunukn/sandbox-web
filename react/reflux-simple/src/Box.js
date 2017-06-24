import React from 'react';
import {Component} from 'reflux';

import BoxStore from './BoxStore';
import BoxActions from './BoxActions';

class Box extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.stores = [BoxStore];
        //this.storeKeys = ['value']; // <-- will only be mixed in from the store
        this.onClick = () => BoxActions.update(this.props.index);

        if (this.props.local) {
            this.onClick = () => this.setState({value: this.props.index});
        }
    }

    render() {

        /*
            Performance uptimization, minimize object creation.
            E.g. onClick is created once in constructor.
        */

        return (
            <button
                style={getStylesFromState(this.state)}
                className={'box box--' + this.props.index}
                onClick={this.onClick}>
                <span>box {this.props.index}</span>
                <footer>state {this.state.value}</footer>
            </button>
        );
    }
}

function getStylesFromState({value}) {

    if (!value) {
        return null;
    }

    let styles = {};
    let colors = [
        '',
        '#00a1f1',
        '#7cbb00',
        '#ffbb00',
        '#f65314',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
    ];
    styles.boxShadow = `inset 0 0 0 5px ${colors[+value]}`;
    return styles;
}

export default Box;
