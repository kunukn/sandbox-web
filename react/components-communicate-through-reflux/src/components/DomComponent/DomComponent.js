import React, {Component} from 'react';

export default class DomComponent extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="dom-component">
                <div className="loader"></div>
                {this.props.children}
            </div>
        )
    }
}

