import React from 'react';
import Reflux from 'reflux';

import BoxStore from './BoxStore';
import BoxActions from './BoxActions';

class Box extends Reflux.Component {

    constructor(props)
    {
        super(props);
        this.stores = [BoxStore];
        this.onClick = () => BoxActions.update(this.props.index);

        if (this.props.local) {
            this.onClick = () => this.setState({index: this.props.index});
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
                <footer>state {this.state.index}</footer>
            </button>
        );
    }
}

function getStylesFromState({index}) {

    if (!index) {
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
    styles.boxShadow = `inset 0 0 0 5px ${colors[+index]}`;
    return styles;
}

export default Box;
