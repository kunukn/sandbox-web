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
import LoadingTracker from '../LoadingTracker';

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
        // Temp solution. Wait until DOM has settled with data updates
        // The position is known when all components are rendered with content.
        // If the basket is at the top, then the position is known because this components height is known.
        // Then we don't need setTimeout
        setTimeout( () => {
        if(this.domBasketIcon){
            updateBasketLocation(this.domBasketIcon.getBoundingClientRect());
        }},1000);
        

        window.addEventListener('resize', this.onResize); 
    }

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
        const {theme = 'default'} = this.props;

        return (
            <LoadingTracker name={'basket'} {...this.state.loadingTracker}>
                <div className={'box basket basket--theme-'+theme}>
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