// libs
import React from 'react';
import Reflux from 'reflux';

// store
import ShopStore from   '../../stores/Shop/ShopStore';
import ShopActions from '../../stores/Shop/ShopActions';
import TrackerStore from   '../../stores/Tracker/TrackerStore';
import {track} from '../../stores/Tracker/TrackerActions';

// utils
import _ from 'lodash';
//import {log} from '../../utils';

// components
import InventoryItem from './InventoryItem';

class Inventory extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            products: []
        };
        this.stores = [ShopStore,TrackerStore];
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super.componentWillMount.call(this);
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
                        const onRemove = (el) => {
                            animateInventoryItem.bind(this)(el);
                            ShopActions.removeFromInventory({index, product});
                            track({action: 'remove', productId: product.id});
                        }
                        return (
                            <li key={index}>
                                <InventoryItem 
                                product={product} 
                                onRemove={onRemove} 
                                />
                            </li>
                        );
                    })}
                </ul>}
            </div>
        );
    }
}


function animateInventoryItem(domInventoryItem) {
    let parent = domInventoryItem.parentElement;
    let div = document.createElement('div');
    div.className = 'invetory-item__title--animate';
    parent.appendChild(div);

    ((div) => {
        // DOM cleanup
        setTimeout(() => {
            if(div){
                parent.removeChild(div);
            }
        }, 2000);
    })(div)
}


export default Inventory;