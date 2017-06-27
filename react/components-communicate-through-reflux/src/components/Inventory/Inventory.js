// libs
import React from 'react';
import Reflux from 'reflux';

// store
import ShopStore from '../../stores/Shop/ShopStore';
import ShopActions from '../../stores/Shop/ShopActions';
import TrackerStore from '../../stores/Tracker/TrackerStore';
import {track} from '../../stores/Tracker/TrackerActions';

// utils
import _ from 'lodash';
import {log} from '../../utils';

// components
import InventoryItem from './InventoryItem';

class Inventory extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            products: []
        };
        this.stores = [ShopStore, TrackerStore];
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super
            .componentWillMount
            .call(this);
    }

    componentDidMount() {
        ShopActions.init();
    }

    render() {
        const inventory = this.state.inventory;
        const products = this.state.products;

        return (
            <div className='box inventory'>
                <h2 className='inventory__title'>Inventory</h2>
                {inventory && inventory.length > 0 && <ul className='inventory__list'>
                    {inventory.map((id, index) => {
                        const product = _.find(products, {id});
                        const onRemove = (domInventoryItem) => {
                            animateInventoryItem.bind(this)(domInventoryItem);
                            ShopActions.removeFromInventory({index, product});
                            track({action: 'remove', productId: product.id});
                        }
                        return (
                            <li key={index}>
                                <InventoryItem product={product} onRemove={onRemove}/>
                            </li>
                        );
                    })}
                </ul>}
            </div>
        );
    }
}

function animateInventoryItem(domInventoryItem) {
    const rect = domInventoryItem.getBoundingClientRect();
    const animator = document.createElement('div');
    animator.className = 'inventory-item__animate';
    animator.style.left = `${rect.left + rect.width/2}px`;
    animator.style.top = `${rect.top - rect.height/2}px`;

    document.body.appendChild(animator);

    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            animator.style.transform = `scale(3)`;
            animator.style.opacity = '.0';
        });
    });

    ((animator) => {
        // DOM cleanup
        setTimeout(() => {
            if (animator) {
                document.body.removeChild(animator);
            }
        }, 2000);
    })(animator)
}

export default Inventory;