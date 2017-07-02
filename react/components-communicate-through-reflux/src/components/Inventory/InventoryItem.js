// libs
import React from 'react';
import Reflux from 'reflux';
import classNames from 'classnames';

// flux
import {track} from '../../flux/actions/Tracker/TrackerActions';

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
            <li className={inventoryItemClassName}>
                <div className='inventory-item__title' ref={ el => this.domItem = el }>
                    <div className='inventory-item__name'> {product.name}
                   </div>
                    <i className="inventory-item__icon material-icons" aria-hidden="true">
                        {product.icon}
                        </i>
                </div>
                <button
                    onClick={onRemoveInventoryItem}
                    className='btn inventory-item__action'
                    aria-label='delete'
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}>
                    <i className="material-icons" aria-hidden="true">remove_circle_outline</i>
                </button>
            </li>
        );
    }
}

export default InventoryItem;