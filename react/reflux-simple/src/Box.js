import React from 'react';
import Reflux from 'reflux';

import Store from './Store';
import Actions from './Actions';

class Box extends Reflux.Component {

    constructor(props)
    {
        super(props);
        this.stores = [Store];
        this.onClick = (() => Actions.update(this.props.index));
    }

    render() {
        
        /*
            Performance uptimization, minimize object creation. 
            e.g. onClick is created once in constructor.
        */ 
                
        return (
            <button
                style={getStylesFromState(this.state)}
                className={'box box--' + this.props.index}
                onClick={this.onClick}>
                box {this.props.index + 1}
            </button>
        );
    }
}












function getStylesFromState({index}) {

    console.log('getStylesFromState');

    if(index === undefined){
        return null;
    }

    let styles = {};    
    let colors = ['#00a1f1','#7cbb00','#ffbb00','#f65314','','','','','','','','','',''];    
    styles.boxShadow = `inset 0 0 0 5px ${colors[index]}`;
    return styles;
}

export default Box;
