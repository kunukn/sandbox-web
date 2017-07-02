// libs
import React from 'react';
import Reflux from 'reflux';
// utils
import _ from 'lodash';
import {log} from '../../utils';
// flux
import ShopStore from '../../flux/stores/Shop/ShopStore';
import {updateBasketLocation} from '../../flux/actions/Shop/ShopActions';
// components
import LoadingTracker from '../LoadingTracker/LoadingTracker';

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
        if(this.domBasketIcon){
            updateBasketLocation(this.domBasketIcon.getBoundingClientRect());
        }
    }

    // Not sure if nextState is properly working with Reflux store state sharing
    // Seems to work.
    // https://facebook.github.io/react/docs/react-component.html#componentwillupdate about this lifecycle
    componentWillUpdate(nextProps, nextState){
        if (this.state.inventory.length > 0) {
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
            <LoadingTracker name={'basket'} {...this.state.loadingTracker}>
                <div className='box basket'>
                    <h2 className='basket__info'>
                        <i style={styles} ref={ el => this.domBasketIcon = el } className='basket__icon material-icons'>shopping_basket</i>
                        <div className="basket__status">
                            <span className="basket__label">Basket</span>
                            <span className='basket__value' ref={ el => this.domBasketValue = el }>
                ({this.state.inventory.length})</span>
                        </div>
                    </h2>
                </div>
            </LoadingTracker>
        );
    }

    animateBasket(){
        if(this.domBasketValue){
            this.domBasketValue.classList.add('anim');
            setTimeout(() => this.domBasketValue.classList.remove('anim'), 200);
        }
    }
}

function onResize(){
    log('onResize');
    if(this.domBasketIcon){
        updateBasketLocation(this.domBasketIcon.getBoundingClientRect());
    }
    
}

export default Basket;