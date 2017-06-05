import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import InventoryItem from './InventoryItem';

class Inventory extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = props.store;
    this.storeAction = props.storeAction.bind(this);
  }

  render() {
    const inventory = this.state.inventory;
    const products = this.state.products;

    return (
      <div className="box inventory">
        <h2 className='inventory__title'>Inventory</h2>
        {inventory && inventory.length > 0 && <ul className='inventory__list'>
          {inventory.map((id, index) => {
            const product = _.find(products, {id});
            const onRemove = () => this.storeAction({removeFromInventory: {index, product}})
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