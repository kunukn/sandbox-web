// libs
import {Store} from 'reflux';
import _ from 'lodash';
// flux
import ShopActions from '../../actions/Shop/ShopActions';
// utils
import {log, error} from '../../../utils';
import {fetchShopData} from '../../../communication/shop';

class ShopStore extends Store {

    constructor() {
        super();
        this.state = {
            loadingTracker: {
                isLoading: true
            }
        };
        this.listenables = ShopActions; // convention
        // or this.listenToMany(ShopActions); // convention

        this.onInit();
    }

    onInit() {
        log('onInit');

        this.setupLoadingTracker();

        log('loading data');

        //ShopActions.loadData();
  //      return;
  
        fetchShopData({
            completed: ({products, inventory, stock}) => {
                this.updateCompletedState({products, inventory, stock, isLoading: false})
            },
            failed: exception => {
                this.updateErrorState({isLoadingFailed: true, isLoading: false, exception})
            }
        });
    }

    onUpdateBasketLocation(basketLocation) {
        log('onUpdateBasketLocation');
        //log(basketLocation);
        this.setState({basketLocation});
    }

    onAddToInventory(product) {

        this.setState((prevState) => {

            let stockItem = _.find(prevState.stock, {productId: product.productId});
            if (stockItem.count <= 0) {
                return {};
            }

            stockItem.count--;
            prevState
                .inventory
                .push({
                    productId: product.productId,
                    timestamp: + new Date()
                });

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });
    }

    onRemoveFromInventory(removeFromInventory) {

        this.setState((prevState) => {

            let {index, product} = removeFromInventory;
            let stockItem = _.find(prevState.stock, {productId: product.productId});

            stockItem.count++;
            prevState
                .inventory
                .splice(index, 1);

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });
    }

    onLoadDataCompleted({products, inventory, stock}) {
        log('onLoadCompleted');
        this.updateCompletedState({products, inventory, stock, isLoading: false})
    }

    onLoadDataFailed(exception) {
        log('onLoadFailed');
        this.updateErrorState({isLoadingFailed: true, isLoading: false, exception});
    }

    updateCompletedState({products, inventory, stock, isLoading}) {
        // simulate latency
        setTimeout(() => {

            this.setState(() => ({
                loadingTracker: {
                    isLoading
                },
                products: _.cloneDeep(products),
                inventory: _.cloneDeep(inventory),
                stock: _.cloneDeep(stock)
            }));

            clearTimeout(this.longLoadingTimer);
        }, 1000);
    }

    updateErrorState({isLoading, isLoadingFailed, exception}) {
        // simulate latency
        setTimeout(() => {
            error(exception);
            this.setState(() => ({
                loadingTracker: {
                    isLoading,
                    isLoadingFailed
                }
            }));
            clearTimeout(this.longLoadingTimer);
        }, 1000);
    }

    setupLoadingTracker() {
        this.loadingSpinnerTimer = setTimeout(() => this.setState(prevState => {
            const loadingTracker = Object.assign({}, prevState.loadingTracker, {isLoadingSpinner: true});
            return Object.assign({}, prevState, {loadingTracker});
        }), 500);
        this.longLoadingTimer = setTimeout(() => this.setState(prevState => {
            const loadingTracker = Object.assign({}, prevState.loadingTracker, {isLoadingLong: true});
            return Object.assign({}, prevState, {loadingTracker});
        }), 2000);
    }
}

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;