// libs
import React from 'react';
import Reflux from 'reflux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// flux
import ShopStore from '../../flux/stores/Shop/ShopStore';
// utils
import _ from 'lodash';
//import {log} from '../../utils';
// components
import LoadingTracker from '../LoadingTracker';
import InventorySummaryItem from './InventorySummaryItem';

class InventorySummary extends Reflux.Component {
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
    }

    componentDidMount() {
        //ShopActions.init();
    }

    render() {
        const {inventory} = this.state;
        const {theme = 'default'} = this.props;
        return (
            <LoadingTracker name={'inventory summary'} {...this.state.loadingTracker}>
                <div className={'box inventory-summary inventory-summary--theme-'+theme}>
                    <h2 className='inventory-summary__title'>Inventory Summary</h2>
                    {inventory && inventory.length > 0 && 
                    <ReactCSSTransitionGroup
                            component="div"
                            className="inventory-summary__items"
                            transitionName="inventory-summary-item"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                        {this.getInventoryItems()}
                    </ReactCSSTransitionGroup>}
                </div>
            </LoadingTracker>
        );
    }

    getInventoryItems(){
        const {inventory, products} = this.state;

        let summary = {};
        inventory.forEach(({productId}) =>{
            if(summary[productId]) summary[productId]++;
            else summary[productId] = 1;
        } );
        
        return Object.keys(summary).map(productId =>{
                let {name,icon} = _.find(products, {productId: +productId}) || {};
                return (
                <InventorySummaryItem 
                    key={productId} 
                    name={name} 
                    count={summary[productId]} 
                    icon={icon}
                />
                );
        });
    }
}

export default InventorySummary;