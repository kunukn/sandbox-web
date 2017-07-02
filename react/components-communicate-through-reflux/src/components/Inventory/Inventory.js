// libs
import React from 'react';
import Reflux from 'reflux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// flux
import ShopStore from '../../flux/stores/Shop/ShopStore';
import ShopActions from '../../flux/actions/Shop/ShopActions';
import TrackerStore from '../../flux/stores/Tracker/TrackerStore';
import {track} from '../../flux/actions/Tracker/TrackerActions';
// utils
import _ from 'lodash';
//import {log} from '../../utils';
// components
import InventoryItem from './InventoryItem';
import LoadingTracker from '../LoadingTracker/LoadingTracker';

class Inventory extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: [],
        };
        this.stores = [ShopStore, TrackerStore];
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
            <LoadingTracker name={'inventory'} {...this.state.loadingTracker}>
                <div className={'box inventory inventory--theme-'+theme}>
                    <h2 className='inventory__title'>Inventory</h2>
                    {inventory && inventory.length > 0 && <ul className='inventory__list'>
                        {inventory.map((id, index) => {
                            const product = _.find(this.state.products, {id});
                            const onRemove = (domInventoryItem) => {
                                animateInventoryItem.call(this,domInventoryItem);
                                ShopActions.removeFromInventory({index, product});
                                track({action: 'remove', productId: product.id});
                            }
                            return (
                                <li key={index}>
                                    <InventoryItem product={product} onRemove={onRemove}/>
                                </li>
                            );
                        })}
                    </ul>}
                </div>
            </LoadingTracker>
        );
    }
}

function animateInventoryItem(domInventoryItem) {
    const rect = domInventoryItem.getBoundingClientRect();
    const animator = document.createElement('div');
    animator.className = 'inventory-item__animate';
    animator.style.left = `${rect.left + rect.width/2}px`;
    animator.style.top = `${rect.top - rect.height/2}px`;

    document.body.appendChild(animator);

    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            animator.style.transform = `scale(3)`;
            animator.style.opacity = '.0';
        });
    });

    ((animator) => {
        // DOM cleanup
        setTimeout(() => {
            if (animator) {
                document.body.removeChild(animator);
            }
        }, 2000);
    })(animator)
}

export default Inventory;