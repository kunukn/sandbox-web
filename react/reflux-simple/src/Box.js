import React from 'react';
import Reflux from 'reflux';

import Store from './Store';
import Actions from './Actions';

class Box extends Reflux.Component {

    constructor(props)
    {
        super(props);
        this.stores = [Store];
    }

    render() {

        let onClick = () => Actions.update(this.props.index);
        let styles = getStylesFromState(this.state);
        
        return (
            <button
                style={styles}
                className={'box box--' + this.props.index}
                onClick={onClick}>
                box {this.props.index + 1}
            </button>
        );
    }
}

function getStylesFromState({index}) {
    let styles = {};
    const size = '5px';
    switch (index) {
        case 0:
            styles.boxShadow = `inset 0 0 0 ${size} #00a1f1`;
            break;
        case 1:
            styles.boxShadow = `inset 0 0 0 ${size} #7cbb00`;
            break;
        case 2:
            styles.boxShadow = `inset 0 0 0 ${size} #ffbb00`;
            break;
        case 3:
            styles.boxShadow = `inset 0 0 0 ${size} #f65314`;
            break;
        default:
            styles.boxShadow = `none`;
            break;
    }
    return styles;
}

export default Box;
