// libs
import React from 'react';
import Reflux from 'reflux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// flux
import ShopStore from '../../flux/stores/Shop/ShopStore';
import {removeFromInventory} from '../../flux/actions/Shop/ShopActions';
import TrackerStore from '../../flux/stores/Tracker/TrackerStore';
import {track} from '../../flux/actions/Tracker/TrackerActions';
// utils
import _ from 'lodash';
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
    }

    render() {
        const {inventory} = this.state;
        const {theme = 'default'} = this.props;

        return (
            <LoadingTracker name={'inventory'} loadingState={this.state.loadingState} ignoreLoadingTracker={this.state.ignoreLoadingTracker}>
                <div className={'box inventory inventory--theme-'+theme}>
                    <h2 className='inventory__title'>Inventory</h2>
                    {inventory && inventory.length > 0 
                        && <ReactCSSTransitionGroup
                            component="ul"
                            className="inventory__list"
                            transitionName="inventory-item"
                            transitionAppear={true}
                            transitionAppearTimeout={300}
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                        {inventory.map(({productId,timestamp}, index) => {
                            const product = _.find(this.state.products, {productId});
                            const onRemove = (domInventoryItem) => {
                                let eventTimestamp = +new Date();
                                track({action: 'remove', productId: product.productId,eventTimestamp});
                                animateInventoryItem.call(this,domInventoryItem);
                                removeFromInventory({index, product, eventTimestamp});
                            }   
                            return (                                
                                <InventoryItem key={timestamp} product={product} onRemove={onRemove}/>
                            );
                        
                        })}
                            </ReactCSSTransitionGroup>
                }
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