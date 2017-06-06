import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';

import ProductItem from './ProductItem';

class Products extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [],
      products: [],
    };
    this.stores = [props.store];
    this.storeActions = props.storeActions;
    this.storeActions.addToInventory = this.storeActions.addToInventory.bind(this);
  }

  componentDidMount() {
    this.storeActions.getData();
  }

  render() {
    const products = this.state.products;
    const stock = this.state.stock;
    return (
      <div className='box products'>
        <h2 className='products__title'>Products</h2>
        {products && products.length > 0 && <ul className='products__list'>
          {products.map((p) => {
            const onAdd = () => this.storeActions.addToInventory({addToInventory: p})
            const stockItem = _.find(stock, {id: p.id});
            return (
              <li key={p.id}>
                <ProductItem
                  id={p.id}
                  name={p.name}
                  type={p.type}
                  icon={p.icon}
                  onAdd={onAdd}
                  count={stockItem ? stockItem.count : 0}/>
              </li>
            );
          })}
        </ul>}
      </div>
    );
  }
}

export default Products;