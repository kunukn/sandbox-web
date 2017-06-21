// libs
import React from 'react';
import Reflux from 'reflux';

// utils
import _ from 'lodash';

// components
import InventoryItem from './InventoryItem';

class Inventory extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
            products: [],
        };
        this.stores = [props.store];
        this.storeActions = props.storeActions;
        this.storeActions.removeFromInventory = this.storeActions.removeFromInventory.bind(this);
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super.componentWillMount.call(this);
        this.storeActions.init();
    }

    componentDidMount() {
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
                        const onRemove = () => this.storeActions.removeFromInventory({
                            removeFromInventory: {
                                index,
                                product
                            }
                        })
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