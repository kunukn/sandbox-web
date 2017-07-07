// libs
import Reflux from 'reflux';
import _ from 'lodash';
// flux
import ShopActions from '../../actions/Shop/ShopActions';
// utils
import {log, error, LOADING_STATES} from '../../../utils';
import {fetchShopData} from '../../../communication/shop';

class ShopStore extends Reflux.Store {

    constructor() {
        super();
        this.state = {};
        this.listenables = ShopActions; // convention
        // or this.listenToMany(ShopActions); // convention

        this.onInit();
    }

    onInit() {
        log('onInit');

        log('loading data');
        this.setState({loadingState: LOADING_STATES.LOADING});

        // Action handles data loading
        //ShopActions.loadData();
        //return;

        // Store handles data loading
        fetchShopData({
            completed: ({products, inventory, stock}) => {
                this.updateCompletedState({products, inventory, stock})
            },
            failed: exception => {
                this.updateErrorState({exception})
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
                    productId: product.productId + 0,
                    timestamp: +new Date(),
                });

            // cloneDeep might not be needed
            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock),
            };
        });
    }

    onRemoveFromInventory(removeFromInventory) {

        this.setState((prevState) => {

            let {index, product} = removeFromInventory;
            let stockItem = _.find(prevState.stock, {productId: product.productId});

            stockItem.count++;
            prevState.inventory.splice(index, 1);

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });
    }

    onLoadDataCompleted({products, inventory, stock}) {        
        log('onLoadCompleted');
        this.updateCompletedState({products, inventory, stock})
    }

    onLoadDataFailed(exception) {
        log('onLoadFailed');
        this.updateErrorState({exception});
    }

    updateCompletedState({products, inventory, stock}) {
        // simulate latency
        const latencySimulate = 4000;
        setTimeout(() => {
           this.setState({
                loadingState: LOADING_STATES.LOADED,
                products: _.cloneDeep(products),
                inventory: _.cloneDeep(inventory),
                stock: _.cloneDeep(stock),
           });
        }, latencySimulate);
    }

    updateErrorState({exception}) {
        // simulate latency
        const latencySimulate = 2000;
        setTimeout(() => {
            error(exception);
            this.setState({loadingState: LOADING_STATES.LOADING_ERROR});
        }, latencySimulate);
    }
}

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;