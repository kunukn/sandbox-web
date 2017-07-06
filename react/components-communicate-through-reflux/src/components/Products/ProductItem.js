// libs
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';
// flux
import {track} from '../../flux/actions/Tracker/TrackerActions';
import ProductItemStore from '../../flux/stores/ProductItem/ProductItemStore';
import {hover} from '../../flux/actions/ProductItem/ProductItemActions';

class ProductItem extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = ProductItemStore;

   this.onEnter = () => {
      hover({hover: true, hoverIndex: this.props.index}); // store state
      //this.setState({hover: true}); // local state
      track({action: 'mouseOverAddProduct', productId: this.props.productId});
    }
    this.onLeave = () => {
      hover({hover: false, hoverIndex: this.props.index}); // store state
      //this.setState({hover: false}); // local state
    };
    this.onAddProductItem = () => this.props.onAdd(this.domItem);

  }

  render() {
    const {
      index,
      name,
      icon,
      count
    } = this.props;

    let productItemClassName = cx('product-item', {
      'hover': this.state.hover && (this.state.hoverIndex === index)
    }, {
      'disabled': count <= 0
    });

    return (
      <div className={productItemClassName}>
        <div className="product-item__info">
          <i ref={el => this.domItem = el} className="product-item__icon material-icons">{icon}</i>
          <span>{name}
            ({count})</span>
        </div>
        <button
          className="btn product-item__action"
          aria-label="add"
          onClick={this.onAddProductItem}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
          disabled={count <= 0 ? true : null}>
          <i className="material-icons" aria-hidden="true">
            add_circle_outline
          </i>
        </button>
      </div>
    );
  }
}

export default ProductItem;