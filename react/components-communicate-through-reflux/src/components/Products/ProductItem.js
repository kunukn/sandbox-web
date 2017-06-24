import React from 'react';
import Reflux from 'reflux';

import TrackerStore from   '../../stores/Tracker/TrackerStore';
import {track} from '../../stores/Tracker/TrackerActions';

class ProductItem extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.stores = [TrackerStore];
  }

  render() {
    const { id, name, icon, onAdd, count } = this.props;
    
    let cx = 'product-item';
    cx += this.state.hover ? ' hover' : '';
    cx += count <= 0 ? ' disabled' : '';
    
    const onEnter = () => {
      this.setState({hover: true});
      track({action: 'mouseOverAddProduct', productId: id});
    }
    const onLeave = () => this.setState({hover: false});
    
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