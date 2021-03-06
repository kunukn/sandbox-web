// libs
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';
// flux
import {track} from '../../flux/actions/Tracker/TrackerActions';
// components
import Svg from '../Images/Svg';

class InventoryItem extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onEnter = () => {
            this.setState({hover: true});
            track({action: 'mouseOverRemoveInventory', productId: this.props.product.productId});
        };
        this.onLeave = () => this.setState({hover: false});
        this.onRemoveInventoryItem = () => this.props.onRemove(this.domItem);
    }

    render() {
        const {product} = this.props;

        let inventoryItemClassName = cx(
            'inventory-item', 
            {hover: this.state.hover});

        return (
            <li className={inventoryItemClassName}>
                <div className='inventory-item__title' ref={ el => this.domItem = el }>
                    <div className='inventory-item__name'>{product.name}</div>
                    <Svg type={product.icon}/>
                </div>
                <button
                    onClick={this.onRemoveInventoryItem}
                    className='btn inventory-item__action'
                    aria-label='delete'
                    onMouseEnter={this.onEnter}
                    onMouseLeave={this.onLeave}>
                    <Svg type='remove_circle_outline' />
                </button>
            </li>
        );
    }
}

export default InventoryItem;