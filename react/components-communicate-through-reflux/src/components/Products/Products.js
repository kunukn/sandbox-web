// libs
import React from 'react';
import Reflux from 'reflux';

// utils
import _ from 'lodash';

// store
import ShopStore from '../../stores/Shop/ShopStore';
import ShopActions from '../../stores/Shop/ShopActions';

// components
import ProductItem from './ProductItem';

class Products extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            products: []
        };
        this.stores = [ShopStore];
        this.storeActions = ShopActions;
        this.storeActions.addToInventory = this
            .storeActions
            .addToInventory
            .bind(this);
    }

    componentWillMount() {
        // https://github.com/reflux/refluxjs/issues/499
        super
            .componentWillMount
            .call(this);
    }

    componentDidMount() {}

    render() {
        const products = this.state.products;
        const stock = this.state.stock;
        return (
            <div className='box products'>
                <h2 className='products__title'>Products</h2>
                {products && products.length > 0 && <ul className='products__list'>
                    {products.map((product) => {
                        const onAdd = () => this
                            .storeActions
                            .addToInventory(product)
                        const stockItem = _.find(stock, {id: product.id});
                        return (
                            <li key={product.id}>
                                <ProductItem
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

export default Products;