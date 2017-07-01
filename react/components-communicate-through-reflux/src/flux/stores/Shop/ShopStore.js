// libs
import { Store } from 'reflux';
import _ from 'lodash';

// flux 
import ShopActions from '../../actions/Shop/ShopActions';

// utils
import { log } from '../../../utils';
//import { fetchShopData } from '../../../communication/shop';

class ShopStore extends Store {

    constructor() {
        super();
        this.state = {
            loadingTracker: {
                isLoading: true,
            }
        };
        this.listenables = ShopActions; // convention
        // or this.listenToMany(ShopActions); // convention

        this.onInit();
    }

    onInit() {
        log('onInit');

        log('loading data');
        ShopActions.loadData();

            // fetchShopData({
            //     completed: json => updateState(this, json),
            //     failed: ex => log(ex)
            // });
    }

    onUpdateBasketLocation(basketLocation){
        this.setState({
            basketLocation
        });
    }

    onAddToInventory(addToInventory) {

        this.setState((prevState) => {

            let stockItem = _.find(prevState.stock, {id: addToInventory.id});
            if (stockItem.count <= 0) {
                return {};
            }

            stockItem.count--;
            prevState.inventory.push(addToInventory.id);

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });

    }

    onRemoveFromInventory(removeFromInventory) {

        this.setState((prevState) => {

            let {index, product} = removeFromInventory;
            let stockItem = _.find(prevState.stock, {id: product.id});

            stockItem.count++;
            prevState.inventory.splice(index, 1);

            return {
                inventory: _.cloneDeep(prevState.inventory),
                stock: _.cloneDeep(prevState.stock)
            };
        });
    }

    onLoadDataCompleted(json) {
        setTimeout(()=>{
            // simulate latency
            log('onLoadCompleted');
            updateState(this, json);
        }, 2000);
    }

    onLoadDataFailed(message) {
        log('onLoadFailed');
        log(message);
        this.setState({
            loadingTracker: {
                isLoading: false,
                isLoadingFailed: true,
            }    
        });
    }
}

function updateState(store, {products, inventory, stock}) {
    store.setState(() => ({
        loadingTracker: {
            isLoading: false,
        },
        products: _.cloneDeep(products),
        inventory: _.cloneDeep(inventory),
        stock: _.cloneDeep(stock),
        
    }));
}

ShopStore.id = 'myUniqueGlobalShopStoreId';

export default ShopStore;