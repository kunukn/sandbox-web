import React from 'react';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  render() {
    const { name, icon, onAdd } = this.props;
    
    const cx = 'product-item ' + (this.state.hover ? 'hover ' : '');
    
    const onEnter = () => this.setState({hover: true});
    const onLeave = () => this.setState({hover: false});
    
    return (
      <div className={cx} >
        <div className="product-item__info">
          <i className="material-icons">{icon}</i>
          <span>{name}</span>
        </div>
        <button
          className="btn product-item__action"
          aria-label="add"
          onClick={onAdd}
          onMouseEnter={onEnter} onMouseLeave={onLeave}
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