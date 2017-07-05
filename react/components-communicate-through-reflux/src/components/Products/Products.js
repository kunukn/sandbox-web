// libs
import React from 'react';
import Reflux from 'reflux';
// utils
import _ from 'lodash';
// flux
import ShopStore from '../../flux/stores/Shop/ShopStore';
import {addToInventory} from '../../flux/actions/Shop/ShopActions';
import TrackerStore from '../../flux/stores/Tracker/TrackerStore';
import {track} from '../../flux/actions/Tracker/TrackerActions';
// components
import ProductItem from './ProductItem';
import LoadingTracker from '../LoadingTracker/LoadingTracker';

class Products extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            products: [],
        };
        this.stores = [ShopStore, TrackerStore];
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super.componentWillMount.call(this);
    }

    componentDidMount() {
    }

    render() {
        const {products, stock} = this.state;
        const {theme = 'default'} = this.props;

        return (
            <LoadingTracker name={'products'} {...this.state.loadingTracker}>
                <div className={'box products products--theme-'+theme}>
                    <h2 className='products__title'>Products</h2>
                    {products && products.length > 0 && <ul className='products__list'>
                        {products.map((product, index) => {
                            const onAdd = (domProductItemIcon) => {
                                animateProductItem.call(this,domProductItemIcon);
                                addToInventory(product);
                                track({action: 'add', productId: product.productId});
                            }
                            const stockItem = _.find(stock, {productId: product.productId});
                            return (
                                <li key={product.productId}>
                                    <ProductItem
                                        index={index}
                                        productId={product.productId}
                                        name={product.name}
                                        type={product.type}
                                        icon={product.icon}
                                        onAdd={onAdd}
                                        count={stockItem ? stockItem.count : 0}/>
                                </li>
                            );
                        })}
                    </ul>}
                </div>
            </LoadingTracker>
        );
    }
}

function animateProductItem(domProductItem) {

    if(!this.state.basketLocation){
        // If there is not basket, then don't animate
        return;
    }

    /*
        imperative code which could potentially be cleaned up 
        into function calls
    */

    // Create icon mover, which shakes
    let parent = domProductItem.parentElement;
    let iconAnimation = domProductItem.cloneNode(true);
    iconAnimation.classList.add('product-item__icon--animate');
    if(Math.random() > .5){
        iconAnimation.style.animationDirection = 'reverse';
    }

    // Create icon wrap which moves to basket
    let iconAnimationWrap = document.createElement('div');
    iconAnimationWrap.className = 'product-item__icon--animate-wrap';
    iconAnimationWrap.appendChild(iconAnimation);
    
    // Add to DOM
    parent.appendChild(iconAnimationWrap);

    // Animate to basket by using transition and transform
    window.requestAnimationFrame(()=>{
        // getBoundingClientRect causes repaint for browser, use sparringly
        let rect = domProductItem.getBoundingClientRect(); // repaint
        let dest = this.state.basketLocation;
        let x = ~~(dest.left + 1*dest.width / 2 - rect.left - 0*rect.width / 2);
        let y = ~~(dest.top + 1*dest.height / 2 - rect.top - 0*rect.height / 2);
        let currentTransform = getComputedStyle(iconAnimationWrap)
            .transform
            .replace('none', '');
        iconAnimationWrap.style.transform = `${currentTransform} translateX(${x}px) translateY(${y}px) translateZ(0)`;
        iconAnimationWrap.style.opacity = '0';

        ((el) => {
            // DOM cleanup
            setTimeout(() => {
                if(el){
                    parent.removeChild(el);
                }
            }, 10000);
        })(iconAnimationWrap);
    });
}

export default Products;