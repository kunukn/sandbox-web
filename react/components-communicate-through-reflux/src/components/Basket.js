import React from 'react';
import Reflux from 'reflux';

class Basket extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: 0
    };
    this.store = props.store;
    this.storeAction = props.storeAction;
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