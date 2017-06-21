import React, {Component} from 'react';

class InventoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    render() {
        const {product, onRemove} = this.props;

        let cx = 'inventory-item';
        cx +=  this.state.hover ? ' hover' : '';

        const onEnter = () => this.setState({hover: true});
        const onLeave = () => this.setState({hover: false});

        return (
            <div className={cx}>
                <div className='inventory-item__title'>
                    {product.name}
                </div>
                <button
                    onClick={onRemove}
                    className='btn inventory-item__action'
                    aria-label='delete'
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}>
                    <i className="material-icons" aria-hidden="true">remove_circle_outline</i>
                </button>
            </div>
        );
    }
}

export default InventoryItem;