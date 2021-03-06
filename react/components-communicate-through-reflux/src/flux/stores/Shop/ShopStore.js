// libs
import Reflux from 'reflux';
import _ from 'lodash';
// flux
import ShopActions from '../../actions/Shop/ShopActions';
import {track} from '../../actions/Tracker/TrackerActions';
// utils
import {log, error, LOADING_STATES} from '../../../utils';
import {fetchShopData} from '../../../communication/shop';

class ShopStore extends Reflux.Store {

    constructor() {
        super();
        this.state = {
            ignoreLoadingTracker: false,
        };

        this.listenables = ShopActions;

        this.onInit();

        window.getShopState = () => this.state;
        window.printShopState = () => JSON.stringify(this.state, null, '\t');
    }

    onInit() {
        log('onInit');

        log('loading data');
        this.fetchData();
    }

    fetchData(){
        this.setState({loadingState: LOADING_STATES.LOADING});
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
        this.setState({basketLocation: basketLocation});
    }

    onAddToInventory({product, eventTimestamp}) {

        let {inventory, stock} = this.state;

        let stockItem = _.find(stock, {productId: product.productId});
        if (stockItem.count <= 0) {
            return {};
        }

        stockItem.count--;
        inventory.push({
            productId: product.productId,
            eventTimestamp,
            timestamp: + new Date()
        });

        track({action: 'addToState', productId: product.productId, eventTimestamp});
        this.setState({
            inventory: _.cloneDeep(inventory),
            stock: _.cloneDeep(stock)
        });

    }

    onRemoveFromInventory({index, product, eventTimestamp}) {

        let {stock, inventory} = this.state;

        let stockItem = _.find(stock, {productId: product.productId});

        stockItem.count++;
        inventory.splice(index, 1);

        track({action: 'removeFromState', productId: product.productId, eventTimestamp});
        this.setState({
            inventory: _.cloneDeep(inventory),
            stock: _.cloneDeep(stock)
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
        const latencySimulate = this.state.ignoreLoadingTracker ? 0 : 4000;

        setTimeout(() => {
            this.setState({
                loadingState: LOADING_STATES.LOADED,
                products: _.cloneDeep(products),
                inventory: _.cloneDeep(inventory),
                stock: _.cloneDeep(stock)
            });
        }, latencySimulate);
    }

    updateErrorState({exception}) {
        // simulate latency
        const latencySimulate = this.state.ignoreLoadingTracker ? 0 : 2000;
        setTimeout(() => {
            error(exception);
            this.setState({loadingState: LOADING_STATES.LOADING_ERROR});
        }, latencySimulate);
    }
}

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;