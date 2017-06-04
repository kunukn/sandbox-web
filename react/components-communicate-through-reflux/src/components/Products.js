import React from 'react';
import Reflux from 'reflux';
import ProductItem from './ProductItem';

class Products extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.store = props.store;
    this.storeAction = props.storeAction;
    
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const products = this.state.products;
    
    return (
      <div className="box products">
        <h2 className="products__title">Products</h2>
        {products &&
          products.length>0 &&
          <ul className="products__list">
            {products.map((p, index) => {
              const onAdd = () => this.onClick(p);
              return (
                <li key={p.id}>
                  <ProductItem id={p.id} name={p.name} type={p.type} icon={p.icon} onAdd = {onAdd}/>
                </li>
              );
            })}
          </ul>}
      </div>
    );
  }

  onClick(product) {
    this.storeAction({addToInventory: product});
  }
}

export default Products;