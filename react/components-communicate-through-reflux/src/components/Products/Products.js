// libs
import React from 'react';
import Reflux from 'reflux';
// utils
import _ from 'lodash';
//import {log} from '../../utils';
// store
import ShopStore from '../../stores/Shop/ShopStore';
import ShopActions from '../../stores/Shop/ShopActions';
import TrackerStore from '../../stores/Tracker/TrackerStore';
import {track} from '../../stores/Tracker/TrackerActions';
// components
import ProductItem from './ProductItem';

class Products extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            products: []
        };
        this.stores = [ShopStore, TrackerStore];
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super
            .componentWillMount
            .call(this);
    }

    componentDidMount() {
        ShopActions.init();
    }

    render() {
        const products = this.state.products;
        const stock = this.state.stock;
        return (
            <div className='box products'>
                <h2 className='products__title'>Products</h2>
                {products && products.length > 0 && <ul className='products__list'>
                    {products.map((product, index) => {
                        const onAdd = (domProductItemIcon) => {
                            animateProductItem.bind(this)(domProductItemIcon);
                            ShopActions.addToInventory(product);
                            track({action: 'add', productId: product.id});
                        }
                        const stockItem = _.find(stock, {id: product.id});
                        return (
                            <li key={product.id}>
                                <ProductItem
                                    index={index}
                                    id={product.id}
                                    name={product.name}
                                    type={product.type}
                                    icon={product.icon}
                                    onAdd={onAdd}
                                    count={stockItem
                                    ? stockItem.count
                                    : 0}/>
                            </li>
                        );
                    })}
                </ul>}
            </div>
        );
    }
}

function animateProductItem(domProductItem) {

    let parent = domProductItem.parentElement;
    let iconAnimation = domProductItem.cloneNode(true);
    iconAnimation.classList.add('product-item__icon--animate');
    parent.appendChild(iconAnimation);

    // getBoundingClientRect causes repaint for browser, use sparringly
    let rect = domProductItem.getBoundingClientRect(); // can  reflow
    let dest = this.state.basketLocation;
    let x = ~~(dest.left + 1*dest.width / 2 - rect.left - 0*rect.width / 2);
    let y = ~~(dest.top + 1*dest.height / 2 - rect.top - 0*rect.height / 2);
    let currentTransform = getComputedStyle(iconAnimation)
        .transform
        .replace('none', '');
    iconAnimation.style.transform = `${currentTransform} translateX(${x}px) translateY(${y}px) translateZ(0)`;
    iconAnimation.style.opacity = '0';

    ((iconAnimation) => {
        // DOM cleanup
        setTimeout(() => {
            if(iconAnimation){
                parent.removeChild(iconAnimation);
            }
        }, 2000);
    })(iconAnimation)
}

export default Products;