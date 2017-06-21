import React, {Component} from 'react';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  render() {
    const { name, icon, onAdd, count } = this.props;
    
    let cx = 'product-item';
    cx += this.state.hover ? ' hover' : '';
    cx += count <= 0 ? ' disabled' : '';
    
    const onEnter = () => this.setState({hover: true});
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