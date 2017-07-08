// libs
import React from 'react';
import Reflux from 'reflux';
import cx from 'classnames';
// flux
import {track} from '../../flux/actions/Tracker/TrackerActions';
// components 
import Svg from '../Images/Svg';

class ProductItem extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};

   this.onEnter = () => {
      this.setState({hover: true});
      track({action: 'mouseOverAddProduct', productId: this.props.productId});
    }
    this.onLeave = () => this.setState({hover: false});
    this.onAddProductItem = () => this.props.onAdd({domProductItemIcon:this.domItem, eventTimestamp:+ new Date()});
  }

  render() {
    const {
      name,
      icon,
      count
    } = this.props;



    let productItemClassName = cx('product-item', {
      'hover': this.state.hover
    }, {
      'disabled': count <= 0
    });

    return (
      <div className={productItemClassName}>
        <div className="product-item__info">
          <i ref={el => this.domItem = el} className="product-item__icon material-icons">{icon}</i>
          <span>{name} ({count})</span>
        </div>
        <button
          className="btn product-item__action"
          aria-label="add"
          onClick={this.onAddProductItem}
          onMouseEnter={this.onEnter}
          onMouseLeave={this.onLeave}
          disabled={count <= 0 ? true : null}>
          <Svg type='add_circle_outline'/>
        </button>
      </div>
    );
  }
}

export default ProductItem;