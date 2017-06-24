import React from 'react';
import Reflux from 'reflux';

import {track} from '../../stores/Tracker/TrackerActions';
import ProductItemStore from   '../../stores/ProductItem/ProductItemStore';
import {hover} from '../../stores/ProductItem/ProductItemActions';

class ProductItem extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [ProductItemStore];
  }

  render() {
    const { index, id, name, icon, onAdd, count } = this.props;
    
    let cx = 'product-item';
    cx += this.state.hover && this.state.hoverIndex === index ? ' hover' : '';
    cx += count <= 0 ? ' disabled' : '';
    
    const onEnter = () => {
      hover({hover: true, hoverIndex: index}); // store state
      //this.setState({hover: true}); // local state
      track({action: 'mouseOverAddProduct', productId: id});
    }
    const onLeave = () => {
      hover({hover: false, hoverIndex: index}); // store state
      //this.setState({hover: false}); // local state
    };
    
    return (
      <div className={cx} >
        <div className="product-item__info">
          <i className="material-icons">{icon}</i>
          <span>{name} ({count})</span>
        </div>
        <button
          className="btn product-item__action"
          aria-label="add"
          onClick={onAdd}
          onMouseEnter={onEnter} onMouseLeave={onLeave}
          disabled={count<=0 ? true : null}
        >
          <i className="material-icons" aria-hidden="true">
            add_circle_outline
          </i>
        </button>
      </div>
    );
  }
}

export default ProductItem;