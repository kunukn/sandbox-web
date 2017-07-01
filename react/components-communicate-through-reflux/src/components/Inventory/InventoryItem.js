import React from 'react';
import Reflux from 'reflux';
import classNames from 'classnames';

import {track} from '../../flux/stores/Tracker/TrackerActions';

class InventoryItem extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {product, onRemove} = this.props;

        let inventoryItemClassName = classNames(
            'inventory-item', 
            {hover: this.state.hover});

        const onEnter = () => {
            this.setState({hover: true});
            track({action: 'mouseOverRemoveInventory', productId: product.id});
        };
        const onLeave = () => this.setState({hover: false});
        const onRemoveInventoryItem = () => onRemove(this.domItem);

        return (
            <div className={inventoryItemClassName}>
                <div className='inventory-item__title' ref={ el => this.domItem = el }>
                    {product.name}
                </div>
                <button
                    onClick={onRemoveInventoryItem}
                    className='btn inventory-item__action'
                    aria-label='delete'
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}>
                    <i className="material-icons" aria-hidden="true">remove_circle_outline</i>
                </button>
            </div>
        );
    }
}

export default InventoryItem;