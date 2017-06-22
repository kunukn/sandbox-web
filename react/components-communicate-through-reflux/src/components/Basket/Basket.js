// libs
import React from 'react';
import Reflux from 'reflux';

// store
import ShopStore from   '../../stores/Shop/ShopStore';
import ShopActions from '../../stores/Shop/ShopActions';

class Basket extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
        };

        this.stores = [ShopStore];
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super.componentWillMount.call(this);

        ShopActions.init();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.inventory.length !== prevState.inventory.length) {
            this.domBasketValue.classList.add('anim');
            setTimeout(() => this.domBasketValue.classList.remove('anim'), 200);
        }
    }

    render() {
        return (
            <div className='box basket'>
                <h2 className='basket__info'>
                    <i className='material-icons'>shopping_basket</i>
                    <span>Basket</span>
                    <span className='basket__value' ref={ el => this.domBasketValue = el }>
            ({this.state.inventory.length})</span>
                </h2>
            </div>
        );
    }
}

export default Basket;