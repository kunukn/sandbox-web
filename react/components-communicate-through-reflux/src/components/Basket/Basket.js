// libs
import React from 'react';
import Reflux from 'reflux';

// utils
import _ from 'lodash';

// store
import ShopStore from '../../stores/Shop/ShopStore';
import {updateBasketLocation} from '../../stores/Shop/ShopActions';

class Basket extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
        };

        this.stores = [ShopStore];
        this.onResize = _.debounce(onResize, 200, { 'maxWait': 1000 }).bind(this);
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super.componentWillMount.call(this);
    }

    componentDidMount() {
        //ShopActions.init(); // https://stackoverflow.com/questions/27139366/why-do-the-react-docs-recommend-doing-ajax-in-componentdidmount-not-componentwi
        window.addEventListener('resize', this.onResize);

        setTimeout(()=>{
            // Wait until DOM has settled, quick prototype mode            
            updateBasketLocation(this.domBasketIcon.getBoundingClientRect());
        },1000);
        
    }

    componentWillUpdate(nextProps, nextState){
        if (this.state.inventory.length === nextState.inventory.length) {
            this.animateBasket();
        }
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount(){
        window.removeEventListener(this.onResize);
    }

    render() {

        const styles = {
            transform: `scale(${1+this.state.inventory.length/10})`
        };

        return (
            <div className='box basket'>
                <h2 className='basket__info'>
                    <i style={styles} ref={ el => this.domBasketIcon = el } className='basket__icon material-icons'>shopping_basket</i>
                    <div className="basket__status">
                        <span>Basket</span>
                        <span className='basket__value' ref={ el => this.domBasketValue = el }>
            ({this.state.inventory.length})</span>
                    </div>
                </h2>
            </div>
        );
    }

    animateBasket(){
        this.domBasketValue.classList.add('anim');
        setTimeout(() => this.domBasketValue.classList.remove('anim'), 200);
    }
}

function onResize(){
    updateBasketLocation(this.domBasketIcon.getBoundingClientRect());
}

export default Basket;