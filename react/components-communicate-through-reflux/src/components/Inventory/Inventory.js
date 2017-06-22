// libs
import React from 'react';
import Reflux from 'reflux';

// store
import ShopStore from   '../../stores/Shop/ShopStore';
import ShopActions from '../../stores/Shop/ShopActions';

// utils
import _ from 'lodash';

// components
import InventoryItem from './InventoryItem';

class Inventory extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            products: []
        };
        this.stores = [ShopStore];
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super.componentWillMount.call(this);

        ShopActions.init();
    }

    componentDidMount() {}

    render() {
        const inventory = this.state.inventory;
        const products = this.state.products;

        return (
            <div className='box inventory'>
                <h2 className='inventory__title'>Inventory</h2>
                {inventory && inventory.length > 0 && <ul className='inventory__list'>
                    {inventory.map((id, index) => {
                        const product = _.find(products, {id});
                        const onRemove = () => ShopActions
                            .removeFromInventory({index, product})
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

export default Inventory;