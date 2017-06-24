import React from 'react';
import Reflux from 'reflux';

import TrackerStore from   '../../stores/Tracker/TrackerStore';
import {track} from '../../stores/Tracker/TrackerActions';

class InventoryItem extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
        this.stores = [TrackerStore];
    }

    render() {
        const {product, onRemove} = this.props;

        let cx = 'inventory-item';
        cx +=  this.state.hover ? ' hover' : '';

        const onEnter = () => {
            this.setState({hover: true});
            track({action: 'mouseOverRemoveInventory', productId: product.id});
        };
        const onLeave = () => this.setState({hover: false});

        return (
            <div className={cx}>
                <div className='inventory-item__title'>
                    {product.name}
                </div>
                <button
                    onClick={onRemove}
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