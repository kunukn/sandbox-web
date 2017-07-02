// libs
import React from 'react';
import Reflux from 'reflux';
// flux
import ShopStore from '../../flux/stores/Shop/ShopStore';
// utils
import _ from 'lodash';
import {log} from '../../utils';
// components
import LoadingTracker from '../LoadingTracker/LoadingTracker';
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
        return (
            <LoadingTracker name={'inventory summary'} {...this.state.loadingTracker}>
                <div className='box inventory-summary'>
                    <h2 className='inventory-summary__title'>Inventory Summary</h2>
                    {inventory && inventory.length > 0 && 
                    <div className="inventory-summary__items">
                        {this.getInventoryItems()}
                    </div>}
                </div>
            </LoadingTracker>
        );
    }

    getInventoryItems(){
        const {inventory, products} = this.state;
        let summary = {};
        inventory.forEach((id) =>{
            if(summary[id]) summary[id]++;
            else summary[id] = 1;
        } );
        
        return Object.keys(summary).map(id =>{
                let {name,icon} = _.find(products, {id: +id}) || {};
                return (
                <InventorySummaryItem 
                    key={id} 
                    name={name} 
                    count={summary[id]} 
                    icon={icon}
                />
                );
        });
    }
}

export default InventorySummary;