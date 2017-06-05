import React from 'react';
import {Component} from 'reflux';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
    };
    this.stores = [props.store];
    this.storeActions = props.storeActions;
  }

  render() {

    const cx = 'box basket ';

    return (
      <div className={cx}>
        <h2 className="basket__info">
          <i className="material-icons">shopping_basket</i>
          <span>Basket</span>
          <span>
            ({this.state.inventory.length})</span>
        </h2>
        <div className='basket__notify'></div>
      </div>
    );
  }
}

export default Basket;